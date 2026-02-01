import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CRUDService } from "../service/crud-service";
import { Header } from "@/components/shared/header";
import { Input } from "@/components/ui/input";
import { InfiniteScroll } from "./infinite-scroll";

export function FlowList() {
  const [nextCursor, setNextCursor] = useState<string>("");
  const [flowList, setFlowList] = useState<any>([]);
  const [curCursor, setCurCursor] = useState<string>("");

  useEffect(() => {
    const getFlows = async () => {
      const response = await CRUDService.getFlows(nextCursor);
      setFlowList((prev: any) => [...prev, ...(response?.flows ?? [])]);
      setNextCursor(response?.next || null);
    };
    if(curCursor !== null){
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

  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className=" flex items-center px-5 gap-2">
        <Search size={18} />
        <Input placeholder={`Search...`} className="max-w-sm" />
      </div>
      <InfiniteScroll
        flowList={flowList}
        setCurCursor={setCurCursor}
        nextCursor={nextCursor}
      />
    </>
  );
}
