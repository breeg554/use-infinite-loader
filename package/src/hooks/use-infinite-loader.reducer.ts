export type PageParam = string | number;
export type PageData<T> = Map<PageParam, T>;
export type LastPage<T> = T | undefined;

type Action<T> = {
  type: 'SET_PAGE_DATA';
  payload: {
    data: T;
    nextPageParam: PageParam | undefined;
  };
};

export type InfiniteLoaderReducerState<T = {}> = {
  data: PageData<T>;
  lastPage: LastPage<T>;
  hasNextPage: boolean;
  nextPageParam: PageParam | undefined;
};

export const infiniteLoaderReducer = <T>(
  state: InfiniteLoaderReducerState<T>,
  action: Action<T>,
): InfiniteLoaderReducerState<T> => {
  switch (action.type) {
    case 'SET_PAGE_DATA':
      return {
        ...state,
        lastPage: action.payload.data,
        data: new Map([
          ...state.data,
          [state.nextPageParam, action.payload.data],
        ]),
        nextPageParam: action.payload.nextPageParam,
        hasNextPage: action.payload.nextPageParam !== undefined,
      };
    default:
      throw new Error('Unsupported action type');
  }
};

export function setPageData<T>(data: T, nextPageParam: PageParam | undefined) {
  return {
    type: 'SET_PAGE_DATA',
    payload: {
      data,
      nextPageParam,
    },
  } as const;
}
