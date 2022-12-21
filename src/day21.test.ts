import * as fs from 'fs';
import { day21 } from './day21';

test('Example 1', () => {
    const result = day21(`
root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32
`);
    expect(result).toEqual([152, 301]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day21.txt');
    const result = day21(buffer.toString());

    expect(result).toEqual([158661812617812, 3352886133831]);
});
