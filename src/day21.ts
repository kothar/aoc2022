import { int } from './lib/util';

type Monkey = {
    id: string,
    equation?: { a: string, op: string, b: string },
    value?: number,
    humn?: boolean
}

export function day21(input: string) {
    let monkeys: Monkey[] = input.trim().split('\n')
        .map(line => line.match(/(.{4}): (?:((.{4}) ([*/+-]) (.{4}))|(\d+))/))
        .map(match => ({
            id: match[1],
            equation: match[2] && { a: match[3], op: match[4], b: match[5] },
            value: match[6] && parseInt(match[6])
        }));

    function findMonkey(id: string) {
        return monkeys.find(monkey => monkey.id === id);
    }

    function evaluate(id: string): { value: number, humn: boolean } {
        const monkey = findMonkey(id);
        if (monkey.value === undefined) {
            const { a, op, b } = monkey.equation;
            const resultA = evaluate(a);
            const resultB = evaluate(b);
            const humn = resultA.humn || resultB.humn;
            let result;
            switch (op) {
                case '+':
                    result = resultA.value + resultB.value;
                    break;
                case '-':
                    result = resultA.value - resultB.value;
                    break;
                case '*':
                    result = resultA.value * resultB.value;
                    break;
                case '/':
                    result = resultA.value / resultB.value;
                    break;
                default:
                    throw new Error();
            }
            monkey.value = result;
            monkey.humn = humn;
            return { value: result, humn }
        }
        if (monkey.id === 'humn') {
            monkey.humn = true;
        }
        return { value: monkey.value, humn: monkey.humn }
    }

    let root = evaluate('root');
    const part1 = root.value;

    function printTree(id: string, indent = '') {
        const monkey = findMonkey(id);
        let str = `${indent}${JSON.stringify(monkey)}`;
        if (monkey.equation) {
            str += '\n' + printTree(monkey.equation.a, indent + '  ');
            str += '\n' + printTree(monkey.equation.b, indent + '  ');
        }
        return str;
    }

    // Part 2
    function propagate(id: string, value = 0): number {

        console.log({ id, value }, printTree(id));
        const monkey = findMonkey(id);
        if (id === 'humn') {
            monkey.value = value;
            return;
        }
        if (!monkey.equation) {
            return;
        }

        const { a, op, b } = monkey.equation;
        const monkeyA = findMonkey(a);
        const monkeyB = findMonkey(b);
        if (id === 'root') {
            monkeyA.humn && propagate(a, monkeyB.value);
            monkeyB.humn && propagate(b, monkeyA.value);
            return;
        }

        monkey.value = undefined;
        switch (op) {
            case '+':
                monkeyA.humn && propagate(a, value - monkeyB.value);
                monkeyB.humn && propagate(b, value - monkeyA.value);
                break;
            case '-':
                // v = a - b
                monkeyA.humn && propagate(a, value + monkeyB.value); // a = v + b
                monkeyB.humn && propagate(b, monkeyA.value - value); // b = a - v
                break;
            case '*':
                // v = a * b
                monkeyA.humn && propagate(a, value / monkeyB.value); // a = v / b
                monkeyB.humn && propagate(b, value / monkeyA.value); // b = v / a
                break;
            case '/':
                // v = a / b
                monkeyA.humn && propagate(a, value * monkeyB.value); // a = v * b
                monkeyB.humn && propagate(b, monkeyA.value / value); // b = a / v
                break;
            default:
                throw new Error();
        }
    }

    propagate('root');
    const part2 = findMonkey('humn').value;
    console.log(evaluate('root'));

    return [part1, part2];
}
