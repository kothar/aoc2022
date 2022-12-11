import { clamp, int, product } from './lib/util';

class Monkey {
    id: number;
    items: number[];
    operation: '+' | '*';
    operand: string;
    testModulus: number;
    throwTo: [number, number];

    inspected = 0;

    inspectItems(monkeys: Monkey[], worryLimiter = worry => Math.floor(worry / 3)) {
        for (const item of this.items) {
            this.inspected += 1;
            let worry = item;

            const operand = this.operand === 'old' ? worry : int(this.operand);
            switch (this.operation) {
                case '+':
                    worry += operand;
                    break;
                case '*':
                    worry *= operand;
                    break;
            }

            worry = worryLimiter(worry);

            let mod = clamp(worry % this.testModulus, 0, 1);

            const throwTo = this.throwTo[mod];
            monkeys[throwTo].items.push(worry);
        }
        this.items = [];
    }
}

export function parseMonkey(input: string): Monkey {
    const monkey = new Monkey();
    const match = input.match(/Monkey (?<id>\d+):\n\s+Starting items: (?<items>[\d, ]+)\n\s+Operation: new = old (?<operation>[*+]) (?<operand>\d+|old)\n\s+Test: divisible by (?<testModulus>\d+)\n\s+If true: throw to monkey (?<trueMonkey>\d+)\n\s+If false: throw to monkey (?<falseMonkey>\d+)/);
    if (!match) {
        throw new Error('Unable to parse monkey');
    }

    monkey.id = int(match.groups.id);
    monkey.items = match.groups.items.split(', ').map(int);
    // @ts-ignore
    monkey.operation = match.groups.operation;
    monkey.operand = match.groups.operand;
    monkey.testModulus = int(match.groups.testModulus);
    // @ts-ignore
    monkey.throwTo = [match.groups.trueMonkey, match.groups.falseMonkey].map(int);
    return monkey;
}

function monkeyBusiness(monkeys: Monkey[]) {
    monkeys.sort((a, b) => b.inspected - a.inspected);
    return product(monkeys.slice(0, 2).map(monkey => monkey.inspected));
}

export function day11(input: string) {
    // Part 1
    const monkeys = input.trim().split('\n\n').map(parseMonkey);
    for (let round = 0; round < 20; round += 1) {
        for (const monkey of monkeys) {
            monkey.inspectItems(monkeys);
        }
    }
    console.log(monkeys.map(monkey => `Monkey ${monkey.id}: ${monkey.items}`));
    let part1 = monkeyBusiness(monkeys);

    // Part 2
    const monkeys2 = input.trim().split('\n\n').map(parseMonkey);
    const testProduct = product(monkeys2.map(monkey => monkey.testModulus));
    for (let round = 0; round < 10000; round += 1) {
        for (const monkey of monkeys2) {
            monkey.inspectItems(monkeys2, worry => worry % testProduct);
        }
        if ((round + 1) % 1000 == 0 || round == 19 || round == 0) {
            console.log(`Round ${round + 1}\n`, monkeys2.map(monkey => `Monkey ${monkey.id}: ${monkey.inspected}`).join('\n'));
        }
    }
    console.log(monkeys2.map(monkey => `Monkey ${monkey.id}: ${monkey.items}`));
    let part2 = monkeyBusiness(monkeys2);

    return [part1, part2];
}
