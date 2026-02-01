import { Header } from "../../shared/header";
import "@xyflow/react/dist/style.css";
import { FlowBuilder } from "./flow-builder";

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
      <Header breadcrumbs={breadcrumbItems} />
      <div className="flex flex-1 flex-col gap-4 w-full h-full bg-gray-900">
        <FlowBuilder />
      </div>
    </>
  );
}