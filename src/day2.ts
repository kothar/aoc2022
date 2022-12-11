import { sum } from './lib/util';

const shapeScores = {
    Rock: 1,
    Paper: 2,
    Scissors: 3
}

const outcomeScores = {
    Lose: 0,
    Draw: 3,
    Win: 6
}

const outcome: Record<string, Record<string, string>> = {
    'Rock': { 'Rock': 'Draw', 'Paper': 'Win', 'Scissors': 'Lose' },
    'Paper': { 'Rock': 'Lose', 'Paper': 'Draw', 'Scissors': 'Win' },
    'Scissors': { 'Rock': 'Win', 'Paper': 'Lose', 'Scissors': 'Draw' }
}

const playMapping = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors',
}

const part1Mapping = {
    X: 'Rock',
    Y: 'Paper',
    Z: 'Scissors'
}

const part2Mapping = {
    X: 'Lose',
    Y: 'Draw',
    Z: 'Win'
}

export function day2(input) {
    const lines = input.trim().split('\n');
    const part1Scores = lines.map(line => {
        const actions = line.split(' ');
        const theirShape = playMapping[actions[0]];
        const yourShape = part1Mapping[actions[1]];
        return outcomeScores[outcome[theirShape][yourShape]] + shapeScores[yourShape];
    });
    const part1 = sum(part1Scores);

    const part2Scores = lines.map(line => {
        const actions = line.split(' ');
        const theirShape = playMapping[actions[0]];
        const desiredOutcome = part2Mapping[actions[1]];
        const outcomes = outcome[theirShape];
        let yourShape: string;
        for (const shape in outcomes) {
            if (outcomes[shape] === desiredOutcome) {
                yourShape = shape;
            }
        }
        return outcomeScores[outcome[theirShape][yourShape]] + shapeScores[yourShape];
    });
    const part2 = sum(part2Scores);

    return [part1, part2];
}
