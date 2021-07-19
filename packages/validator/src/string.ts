const notNull = (val: string) => !!val;

const wordOnly = (val?: string) => val?.match(/\W/gi);

export { notNull, wordOnly };
