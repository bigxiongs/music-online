export * from './util.js';
export * from './area.js';
export * from './song.js';
export * from './countrycode.js';

export const wrap = fn => (...args) => {fn(...args)}

const composeReduce = (composed, fn) => (...args) => composed(fn(...args))
export const compose = (...fns) => fns.length === 1 ? fns[0] : fns.reduce(composeReduce)

export const chain = (...fns) => fns.length === 1 ? fns[0] : (args) => fns.forEach((fn, i) => fn(...args[i]))