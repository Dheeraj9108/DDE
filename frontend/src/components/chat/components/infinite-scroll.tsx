import { useEffect } from "react";
import { Flow } from "./flow";

export function InfiniteScroll({
  flowList,
  setCurCursor,
  nextCursor,
}: {
  flowList: any;
  setCurCursor: (nextCursor: string) => void;
  nextCursor: string;
}) {
  useEffect(() => {
    const observer = new IntersectionObserver((param) => {
      if (param[0].isIntersecting && lastFlow) {
        observer.unobserve(lastFlow);
        setCurCursor(nextCursor);
      }
    });

    const lastFlow = document.querySelector(".flow:last-child");
    if (!lastFlow) {
      return;
    }
    observer.observe(lastFlow);

    return () => {
      observer.unobserve(lastFlow);
      observer.disconnect();
    };
  }, [flowList]);

  return (
    <>
      <div className="py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {flowList.map((flow: any, idx: number) => (
          <div className="flow">
            <Flow flow={flow} key={idx} />
          </div>
        ))}
      </div>
    </>
  );
}
