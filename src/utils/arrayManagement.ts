export const getRandom = <T>(array: T[]): T => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
};

export const range = (from: number, to: number, step = 1): number[] => {
    const range = [];
    let i = from;

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};
