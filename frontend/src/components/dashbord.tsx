import { Header } from "./shared/header";

export function Dashboard() {
  let breadcrumbItems: any = [];
  const setBreadcrumb = () => {
    breadcrumbItems = [
      {
        item: "Home",
        url: "/",
      },
      {
        item: "Dashboard",
        url: "/",
      },
    ];
  };
  setBreadcrumb();
  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className="container mx-auto max-w-6xl p-2 mt-4">
        {/* <div className="flex flex-col">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" ></div>
        </div> */}
      </div>
    </>
  );
}
