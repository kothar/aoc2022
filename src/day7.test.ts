import * as fs from 'fs';
import { day7 } from './day7';

test('Example 1', () => {
    const result = day7(`
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`);
    expect(result).toEqual([95437, 24933642]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day7.txt');
    const result = day7(buffer.toString());

    expect(result).toEqual([1642503, 6999588]);
})
