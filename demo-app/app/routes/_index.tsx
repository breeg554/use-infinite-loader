import { useInfiniteLoader } from "../../../package/src/index";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useRouteLoaderData } from "@remix-run/react";
import { loader } from "~/root";

type Data = {
  data: number[];
  meta: { page: number; totalPages: number; totalItems: number };
};

export default function Index() {
  const initialData = useRouteLoaderData<typeof loader>("root");
  console.log(initialData);
  const { ref, inView } = useInView();
  const { data, hasNextPage, fetchNext, isFetchingNextPage } =
    useInfiniteLoader<Data>({
      initialPageParam: 0,
      queryFn: (loadFn, pageParam) => {
        loadFn(`/?page=${pageParam}`);
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.meta.page === lastPage.meta.totalPages)
          return;

        return lastPage.meta.page + 1;
      },
    });

  console.log(isFetchingNextPage, hasNextPage);

  useEffect(() => {
    if (!inView || !hasNextPage) return;
    fetchNext();
  }, [inView, hasNextPage]);

  return (
    <div>
      <button
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={fetchNext}
        className="disabled:bg-black"
      >
        Click
      </button>

      <div className="flex flex-col gap-10">
        {data
          .reduce((acc, curr) => {
            return [...acc, ...curr.data];
          }, [])
          .map((item) => (
            <div key={item} className="w-[500px] h-[500px] bg-red-600">
              {item}
            </div>
          ))}
      </div>

      <div ref={ref} className="w-10 h-10 bg-indigo-500" />
    </div>
  );
}
