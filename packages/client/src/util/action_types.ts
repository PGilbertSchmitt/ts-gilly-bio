/* This file adds utility for creating action creators and typing them without having
 * to deal with a lot of repetition. I originally used discriminated unions, and switched to type guards.
 *
 * Almost all of this code is from here:
 * https://github.com/quicksnap/redux-guards/blob/master/src/index.ts
 *
 * Information on the how-what-why of technique can be found here:
 * https://medium.com/@danschuman/redux-guards-for-typescript-1b2dc2ed4790
 *
 * Thank you, Dan Schuman.
 */

import { Action } from 'redux';

// Monkey patching the Dispatch interface
declare module 'redux' {
  export interface Dispatch<A extends Action = AnyAction> {
    <A extends { payload: any }>(action: A): A & { type: string };
    <A extends {}>(action: A): A & { type: string };
  }
}

type IActionType<X> = X & { __actionType: string };
type IAction = { payload: string } | {};

const _devSet: { [key: string]: boolean } = {};

const _makeActionInternal = <Z extends {}>(type: string, typePrefix = '') => {
  if (process.env.NODE_ENV !== 'production') {
    if (_devSet[type]) {
      throw new Error('Attempted creating an action with an existing type key. This is almost cetainly an error.');
    }
    _devSet[type] = true;
  }

  return <X extends (...args: any[]) => Z>(fn: X) => {
    const returnFn: IActionType<X> = (
      (...args: any[]) => ({ ...(fn as any)(...args), type })
    ) as any;
    returnFn.__actionType = typePrefix + type;
    return returnFn;
  };
};

// Normal FSA actions
export const makeAction = <Z>(type: string) => {
  return _makeActionInternal<{ payload: Z }>(type);
};

// Any object with only a type associated with it
export const makeEmptyAction = (type: string) => {
  return _makeActionInternal(type)(() => ({}));
};

export const isAction = <T extends IAction>(
  action: Action,
  actionCreator: IActionType<(...args: any[]) => T>,
): action is T & Action => {
  return actionCreator.__actionType === action.type;
};
