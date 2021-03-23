export const getRandom = <T>(array: T[]): T => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
};
