import { useEffect, useState } from "react";
import { CRUDService } from "../service/crud-service";
import { Header } from "@/components/shared/header";
import { Input } from "@/components/ui/input";
import { InfiniteScroll } from "./infinite-scroll";
import Search from "./Search";

export function FlowList() {
  const [nextCursor, setNextCursor] = useState<string>("");
  const [flowList, setFlowList] = useState<any>([]);
  const [curCursor, setCurCursor] = useState<string>("");
  const [showSearch, setShowSearch] = useState<string>("");

  useEffect(() => {
    const getFlows = async () => {
      const response = await CRUDService.getFlows(nextCursor);
      setFlowList((prev: any) => [...prev, ...(response?.flows ?? [])]);
      setNextCursor(response?.next || null);
    };
    if (curCursor !== null) {
      getFlows();
    }
  }, [curCursor]);

  let breadcrumbItems: any = [];
  const setBreadcrumb = () => {
    breadcrumbItems = [
      {
        item: "Home",
        url: "/",
      },
      {
        item: "Projects",
        url: "/projects",
      },
      {
        item: "Flows",
        url: "/flows",
      },
    ];
  };

  setBreadcrumb();

  const search=()=>{

  }

  return (
    <>
      <Header breadcrumbs={breadcrumbItems} onSearch={search}/>
      <div className="container mx-auto max-w-6xl p-2 mt-2">
        <div className="flex items-center gap-2 pt-2">
          <Input placeholder={`Search...`} className="max-w-sm" />
        </div>
        <InfiniteScroll
          flowList={flowList}
          setCurCursor={setCurCursor}
          nextCursor={nextCursor}
        />
      </div>
    </>
  );
}
