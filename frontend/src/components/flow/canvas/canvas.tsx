import "@xyflow/react/dist/style.css";
import { FlowBuilder } from "./flow-builder";
import { Header } from "@/components/shared/header";

export function Canvas() {
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
      {
        item: "Canvas",
        url: "/canvas",
      },
    ];
  };
   setBreadcrumb();

  return (
    <>
        {/* <Header breadcrumbs={breadcrumbItems} /> */}
        <FlowBuilder />
    </>
  );
}