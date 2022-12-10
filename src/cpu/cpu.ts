export const validOpcodes = ['noop', 'addx'] as const;
export type Opcode = typeof validOpcodes[number];

export type Instruction = {
    opcode: Opcode,
    operand?: number
}

export class CPU {

    public cycle = 0;
    public X = 1;
    private readonly cycleListener?: (State) => void;

    constructor({ cycleListener }: { cycleListener?: (state: CPU) => void } = {}) {
        this.cycleListener = cycleListener;
    }

    private nextCycle(n = 1) {
        for (let c = 0; c < n; c++) {
            this.cycle++;
            this.cycleListener && this.cycleListener(this);
        }
    }

    apply = (inst: Instruction) => {
        switch (inst.opcode) {
            case 'addx':
                this.nextCycle(2);
                this.X += inst.operand;
                break;
            case 'noop':
                this.nextCycle();
                break;
        }
    };

    execute(instructions: Instruction[]) {
        instructions.forEach(this.apply)
        this.cycleListener && this.cycleListener(this);
    }
}

export function parseInstruction(line: string): Instruction {
    const [opcode, operand] = line.split(' ');
    if (validOpcodes.includes(opcode as Opcode)) {
        return { opcode: opcode as Opcode, operand: operand && parseInt(operand) }
    } else {
        throw new Error(`Invalid opcode: ${opcode}`);
    }
}
