import { min, sum } from './lib/util';

type Packet = Array<number | Packet>;

export function comparePacket(a: Packet, b: Packet) {
    for (let index = 0; index < Math.min(a.length, b.length); index += 1) {
        let aElement = a[index];
        let bElement = b[index];
        if (typeof aElement === 'number' && typeof bElement === 'number') {
            if (aElement != bElement) {
                return aElement - bElement;
            }
        } else {
            if (typeof aElement === 'number') {
                aElement = [aElement];
            }
            if (typeof bElement === 'number') {
                bElement = [bElement];
            }
            const comparison = comparePacket(aElement, bElement);
            if (comparison != 0) {
                return comparison;
            }
        }
    }
    return a.length - b.length
}

// Equivalent to JSON.parse for these packets so unused
export function parsePacket(input: string[]): Packet {
    function consume(c: string) {
        console.assert(input.shift() === c);
    }

    const packet: Packet = [];
    let digits = '';

    consume('[');
    while (input.length > 0) {
        const nextChar = input.shift();
        switch (nextChar) {
            case '[':
                input.unshift(nextChar);
                packet.push(parsePacket(input));
                break;
            default:
                digits += nextChar;
                break;
            case ',':
                if (digits.length > 0) {
                    packet.push(parseInt(digits));
                    digits = '';
                }
                break;
            case ']':
                if (digits.length > 0) {
                    packet.push(parseInt(digits));
                    digits = '';
                }
                return packet;
        }
    }
}

export function day13(input: string) {
    const packetPairs = input.trim().split('\n\n')
        .map(group => group.split('\n').map(row => JSON.parse(row)));

    // Part 1
    const inOrder = packetPairs
        .map(([a, b], index) => [index + 1, comparePacket(a, b)])
        .filter(([, comparison]) => comparison <= 0)
        .map(([index]) => index);
    console.log('In-order pairs:', inOrder);
    const part1 = sum(inOrder);

    // Part 2
    let divider1 = [[2]];
    let divider2 = [[6]];
    const dividers = [divider1, divider2];
    const allPackets = [...dividers, ...packetPairs.flat()];
    allPackets.sort(comparePacket);

    const part2 = (allPackets.indexOf(divider1) + 1) * (allPackets.indexOf(divider2) + 1)

    return [part1, part2];
}
