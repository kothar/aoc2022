import { sum } from './day1';

const shapeScores = {
    X: 1,
    Y: 2,
    Z: 3
}

const outcomeScores = {
    X: 0,
    Y: 3,
    Z: 6
}

const part1Strategy = {
    'A X': 3,
    'A Y': 6,
    'A Z': 0,
    'B X': 0,
    'B Y': 3,
    'B Z': 6,
    'C X': 6,
    'C Y': 0,
    'C Z': 3
}

const part2Strategy = {
    'A X': 3,
    'A Y': 1,
    'A Z': 2,
    'B X': 1,
    'B Y': 2,
    'B Z': 3,
    'C X': 2,
    'C Y': 3,
    'C Z': 1
}

export function day2(input) {
    const lines = input.trim().split('\n');
    const part1Scores = lines.map(line => {
        const actions = line.split(' ');
        return part1Strategy[line] + shapeScores[actions[1]];
    });
    const part1 = sum(part1Scores);

    const part2Scores = lines.map(line => {
        const actions = line.split(' ');
        return part2Strategy[line] + outcomeScores[actions[1]];
    });
    const part2 = sum(part2Scores);

    return [part1, part2];
}