import { int, max } from './lib/util';

type Valve = { index: number, label: string, rate: number, tunnels: string[] };

type State = { valve: Valve, opened: string[], pressureReleased: number, timeRemaining: number };

// https://www.tutorialspoint.com/all-pairs-shortest-paths
function shortestPaths(valves: Valve[]) {
    let n = valves.length;
    const cost = new Array(n).fill([])
        .map(() => new Array(n).fill(Infinity));

    // Populate adjacent nodes
    valves.forEach(({ tunnels }, index) => {
        for (const tunnel of tunnels) {
            const tunnelIndex = valves.findIndex(valve => valve.label === tunnel);
            cost[index][tunnelIndex] = 1;
            cost[tunnelIndex][index] = 1;
        }
    })

    for (let k = 0; k < n; k += 1) {
        for (let i = 0; i < n; i += 1) {
            for (let j = 0; j < n; j += 1) {
                if (cost[i][k] + cost[k][j] < cost[i][j]) {
                    cost[i][j] = cost[i][k] + cost[k][j]
                }
            }
        }
    }

    return cost;
}

export function day16(input: string) {
    const valves: Valve[] = input.trim().split('\n')
        .map(line => line.match(/Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.+)+/))
        .map((matches, index) => ({
            index,
            label: matches[1],
            rate: int(matches[2]),
            tunnels: matches[3].split(', ')
        }));

    // Identify shortest distances between valves
    const valveDistances = shortestPaths(valves);

    const ratedValves = valves
        .filter(valve => valve.rate > 0)
        .sort((a, b) => b.rate - a.rate);

    function solve(workers: number, minutes: number) {
        const states: State[][] = [
            new Array(workers).fill({
                valve: valves.find(valve => valve.label === 'AA'),
                opened: [],
                pressureReleased: 0,
                timeRemaining: minutes
            })
        ];

        // Part 1
        let maxPressureReleased = 0;
        let count = 0;
        while (states.length > 0) {
            const workerStates = states.shift();
            maxPressureReleased = max([maxPressureReleased, ...workerStates.map(state => state.pressureReleased)]);

            if (count % 10_000 === 0) {
                console.log({
                    count,
                    workers,
                    states: states.length,
                    maxPressureReleased,
                    timeRemaining: workerStates.map(state => state.timeRemaining)
                });
            }
            count += 1;
            const state1 = workerStates[0];
            for (const valve of ratedValves) {
                if (state1.opened.indexOf(valve.label) < 0) {
                    const distance = valveDistances[state1.valve.index][valve.index];
                    const timeRemaining = state1.timeRemaining - 1 - distance;

                    const opened = [valve.label, ...state1.opened];
                    const nextState = {
                        valve,
                        opened,
                        pressureReleased: state1.pressureReleased + timeRemaining * valve.rate,
                        timeRemaining
                    };

                    if (workers == 1) {
                        if (timeRemaining <= 0) {
                            continue
                        }
                        states.push([nextState]);
                    } else {
                        const state2 = workerStates[1];
                        for (const valve of ratedValves) {
                            if (opened.indexOf(valve.label) < 0) {
                                const distance = valveDistances[state2.valve.index][valve.index];
                                const timeRemaining = state2.timeRemaining - 1 - distance;

                                const opened2 = [valve.label, ...opened];
                                const nextState2 = {
                                    valve,
                                    opened: opened2,
                                    pressureReleased: state2.pressureReleased + timeRemaining * valve.rate,
                                    timeRemaining
                                };

                                states.push([
                                    { ...nextState, opened: opened2 },
                                    nextState2
                                ]);
                            }
                        }
                    }
                }
            }
        }

        return maxPressureReleased;
    }

    const part1 = solve(1, 30);
    const part2 = solve(2, 26);

    return [part1, part2];
}
