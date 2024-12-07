import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useFetcher } from '@remix-run/react';
import {
  infiniteLoaderReducer,
  LastPage,
  PageParam,
  setPageData,
} from './use-infinite-loader.reducer.ts';

export interface UseInfiniteFetchArgs<T> {
  queryFn: (fetchFn: (href: string) => void, pageParam: PageParam) => void;
  initialPageParam: PageParam;
  initialData?: T;
  getNextPageParam: (lastPage: LastPage<T>) => PageParam | undefined;
}

export const useInfiniteLoader = <T,>(args: UseInfiniteFetchArgs<T>) => {
  const nextPageFetcher = useFetcher<T>();
  const [state, dispatch] = useReducer(infiniteLoaderReducer<T>, {
    data: args.initialData
      ? new Map([[args.initialPageParam, args.initialData]])
      : new Map(),
    hasNextPage: args.initialData
      ? args.getNextPageParam(args.initialData) !== undefined
      : true,
    nextPageParam: args.initialData
      ? args.getNextPageParam(args.initialData)
      : args.initialPageParam,
    lastPage: args.initialData,
  });

  const fetchNext = useCallback(() => {
    if (!state.hasNextPage || state.nextPageParam === undefined) return;

    args.queryFn(nextPageFetcher.load, state.nextPageParam);
  }, [state.nextPageParam, state.hasNextPage]);

  useEffect(() => {
    if (!nextPageFetcher.data || nextPageFetcher.state !== 'idle') return;

    const nextPageParam = args.getNextPageParam(nextPageFetcher.data);

    dispatch(setPageData(nextPageFetcher.data, nextPageParam));
  }, [nextPageFetcher.state]);

  return useMemo(
    () => ({
      data: [...state.data.values()],
      pages: Object.fromEntries(state.data.entries()),
      hasNextPage: state.hasNextPage,
      isFetchingNextPage: nextPageFetcher.state !== 'idle',
      fetchNext,
    }),
    [state.data, state.hasNextPage, fetchNext, nextPageFetcher.state],
  );
};
