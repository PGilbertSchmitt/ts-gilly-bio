// Couldn't find a place to put these, but they might come in handy

// Given array of strings, returns the save array of strings but typed such that it
// can only contain those arrays
// eg: stringLiteralArray(['foo', 'bar']) would have the type of ('foo' | 'bar')[]
export const stringLiteralArray = <T extends string>(a: T[]) => a;