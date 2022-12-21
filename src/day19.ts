import { clamp, int, max, sum } from './lib/util';

type State = {
    timeRemaining: number,
    resources: Resources,
    robots: Resources,
    previous?: State,
    score?: number
}

type Resources = { ore?: number; clay?: number; obsidian?: number; geode?: number };
const resourceKeys: Array<keyof Resources> = ['ore', 'clay', 'obsidian', 'geode'];

function addResources(a: Resources, b: Resources) {
    return {
        ore: (a.ore ?? 0) + (b.ore ?? 0),
        clay: (a.clay ?? 0) + (b.clay ?? 0),
        obsidian: (a.obsidian ?? 0) + (b.obsidian ?? 0),
        geode: (a.geode ?? 0) + (b.geode ?? 0)
    }
}

function subResources(a: Resources, b: Resources) {
    return {
        ore: (a.ore ?? 0) - (b.ore ?? 0),
        clay: (a.clay ?? 0) - (b.clay ?? 0),
        obsidian: (a.obsidian ?? 0) - (b.obsidian ?? 0),
        geode: (a.geode ?? 0) - (b.geode ?? 0)
    }
}

function hasResources(state: State, blueprint: Resources) {
    return ((state.resources.ore ?? 0) >= (blueprint.ore ?? 0)) &&
        ((state.resources.clay ?? 0) >= (blueprint.clay ?? 0)) &&
        ((state.resources.obsidian ?? 0) >= (blueprint.obsidian ?? 0)) &&
        ((state.resources.geode ?? 0) >= (blueprint.geode ?? 0))
}

function hasRobots(state: State, blueprint: Resources) {
    return ((state.robots.ore ?? 0) >= clamp(blueprint.ore ?? 0)) &&
        ((state.robots.clay ?? 0) >= clamp(blueprint.clay ?? 0)) &&
        ((state.robots.obsidian ?? 0) >= clamp(blueprint.obsidian ?? 0)) &&
        ((state.robots.geode ?? 0) >= clamp(blueprint.geode ?? 0))
}


class Blueprint {

    constructor(
        readonly id: number,
        readonly ore: { ore: number },
        readonly clay: { ore: number },
        readonly obsidian: { ore: number, clay: number },
        readonly geode: { ore: number, obsidian: number }) {

    }

    scoreState(state: State): State {
        const expectedGeodes = (state.resources.geode ?? 0) + (state.robots.geode ?? 0) * state.timeRemaining;
        // const expectedGeodes = Math.log((state.resources.geode ?? 0) + (state.robots.geode ?? 0) * state.timeRemaining + 2);
        // const expectedObsidian = Math.log((state.resources.obsidian ?? 0) + (state.robots.obsidian ?? 0) * state.timeRemaining + 2);
        // const expectedClay = Math.log((state.resources.clay ?? 0) + (state.robots.clay ?? 0) * state.timeRemaining + 2);
        // const expectedOre = Math.log((state.resources.ore ?? 0) + (state.robots.ore ?? 0) * state.timeRemaining + 2);
        // state.score = expectedGeodes * expectedObsidian;
        state.score = expectedGeodes;
        return state;
    }

    getMaxGeodes(minutes: number) {
        const states: State[] = [{
            timeRemaining: 24,
            resources: {},
            robots: { ore: 1 }
        }];

        let maxGeodes = 0;
        let count = 0;
        let pruned = 0;
        while (states.length) {
            states.sort((a, b) => a.score - b.score);

            const state = states.pop();
            if (count % 100 === 0) {
                console.log({ count, states: states.length, timeRemaining: state.timeRemaining, maxGeodes, pruned })
            }
            count++;


            if (state.timeRemaining <= 0) {
                maxGeodes = Math.max(maxGeodes, state.resources.geode ?? 0);
                continue
            } else if (state.resources.geode +
                state.timeRemaining * state.robots.geode +
                state.timeRemaining * state.timeRemaining
                < maxGeodes) {
                pruned += 1;
                continue;
            }

            for (const robot of resourceKeys) {
                let blueprint = this[robot];
                if (hasRobots(state, blueprint)) {
                    let nextState = {
                        ...state,
                        previous: state
                    };

                    while (!hasResources(nextState, blueprint) && nextState.timeRemaining > 0) {
                        nextState = {
                            ...nextState,
                            timeRemaining: nextState.timeRemaining - 1,
                            resources: addResources(nextState.resources, state.robots)
                        }
                    }

                    if (nextState.timeRemaining > 0) {
                        nextState = {
                            ...nextState,
                            timeRemaining: nextState.timeRemaining - 1,
                            resources: addResources(subResources(nextState.resources, blueprint), state.robots),
                            robots: {
                                ...state.robots,
                                [robot]: (state.robots[robot] ?? 0) + 1
                            }
                        }
                    }
                    states.push(this.scoreState(nextState));
                }
            }
        }

        return maxGeodes;
    }
}

export function day19(input: string) {
    const blueprints = input.trim().split('\n')
        .map(line => line.match(/Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./))
        .map(match => new Blueprint(int(match[1]),
            { ore: int(match[2]) },
            { ore: int(match[3]) },
            { ore: int(match[4]), clay: int(match[5]) },
            { ore: int(match[6]), obsidian: int(match[7]) }));

    const part1 = sum(blueprints.map(blueprint => blueprint.id * blueprint.getMaxGeodes(24)));

    return [part1, 0];
}
