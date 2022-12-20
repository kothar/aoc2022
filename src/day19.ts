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


class Blueprint {
    private readonly requiredTotals: Resources;

    private requiredRatios: Resources;

    constructor(
        readonly id: number,
        readonly ore: { ore: number },
        readonly clay: { ore: number },
        readonly obsidian: { ore: number, clay: number },
        readonly geode: { ore: number, obsidian: number }) {

        this.requiredTotals = {
            obsidian: geode.obsidian,
            clay: geode.obsidian * obsidian.clay,
            ore: geode.ore + geode.obsidian * (obsidian.ore + obsidian.clay * clay.ore)
        };
        const totalCount = sum(Object.values(this.requiredTotals));
        this.requiredRatios = Object.fromEntries(Object.entries(this.requiredTotals).map(([key, value]) => [key, value / totalCount]));
    }

    scoreState(state: State): State {
        let score = 0;
        // score += (state.robots.geode ?? 0) * state.timeRemaining * 100;
        // score += (state.resources.geode ?? 0) * 100;
        //
        // score += clamp(state.resources.ore ?? 0, this.requiredTotals.ore);
        // score += clamp(state.resources.clay ?? 0, this.requiredTotals.clay);
        // score += clamp(state.resources.obsidian ?? 0, this.requiredTotals.obsidian);
        //
        // score += ((state.robots.ore ?? 0) * state.timeRemaining - state.resources.ore) * this.requiredRatios.ore;
        // score += ((state.robots.clay ?? 0) * state.timeRemaining - state.resources.clay) * this.requiredRatios.clay;
        // score += ((state.robots.obsidian ?? 0) * state.timeRemaining - state.resources.obsidian) * this.requiredRatios.obsidian;

        state.score = score;
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
            if (count % 100_000 === 0) {
                console.log({ count, states: states.length, timeRemaining: state.timeRemaining, maxGeodes, pruned })
            }
            count++;

            const nextState = {
                ...state,
                previous: state,
                timeRemaining: state.timeRemaining - 1,
                resources: addResources(state.resources, state.robots)
            }


            if (nextState.timeRemaining <= 0) {
                maxGeodes = Math.max(maxGeodes, nextState.resources.geode ?? 0);
                continue
            } else if (nextState.resources.geode +
                nextState.timeRemaining * nextState.robots.geode +
                nextState.timeRemaining * nextState.timeRemaining
                < maxGeodes) {
                pruned += 1;
                continue;
            }

            states.push(this.scoreState(nextState));
            for (const robot of resourceKeys) {
                let blueprint = this[robot];
                if (hasResources(state, blueprint)) {
                    states.push(this.scoreState({
                        ...nextState,
                        resources: subResources(nextState.resources, blueprint),
                        robots: {
                            ...nextState.robots,
                            [robot]: (nextState[robot] ?? 0) + 1
                        }
                    }));
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
