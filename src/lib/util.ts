export const sum = (values: number[]): number =>
    values.reduce((a, b) => a + b);
export const product = (values: number[]): number =>
    values.reduce((a, b) => a * b);

export const max = (values: number[]): number =>
    values.reduce((prev, current) => Math.max(prev, current), 0);

export const min = (values: number[]): number =>
    values.reduce((prev, current) => Math.min(prev, current), values[0]);

export const compareDesc = (a: number, b: number) => b - a

export const int = s => parseInt(s.trim());

export const clamp = (x, min = -1, max = 1) =>
    Math.min(Math.max(x, min), max);

export function chunk<T>(array: T[], chunkSize: number): T[][] {
    return array.reduce((chunks, element) => {
        let chunk = chunks.pop();
        if (chunk.length >= chunkSize) {
            chunks.push(chunk);
            chunk = [];
        }
        chunk.push(element);
        chunks.push(chunk);
        return chunks;
    }, [[]]);
}
