import {
  first,
  drop,
} from 'lodash';
import {
  Error
} from '@gilly/common';

export const createErrorStore = () => {
  let errorQueue: Error[] = [];

  return {
    errorStore: { errorQueue },
    errorHooks: {
      pushError: (str: string) => errorQueue.push({ message: str }),
      nextError: () => {
        const e = first(errorQueue);
        errorQueue = drop(errorQueue);
        return e;
      }
    }
  };
};
