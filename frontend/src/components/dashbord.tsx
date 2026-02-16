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
        <div className="text-4xl font-bold mb-5">IDAT Integrated Data Authoring</div>
        <div className="grid grid-cols-2 items-start space-x-3">
          <div className="bg-gray-50/75 p-3 rounded-sm border-1">
            <div className="font-bold pb-4">
              Overview
            </div>
            <div className="border-1 p-4 text-gray-500 text-sm flex flex-col space-y-2 rounded-sm">
              <div>
                Name : IDAT Production Rollout
              </div>
              <div>
                Name : IDAT Production Rollout
              </div>
              <div>
                Invite Link: 1s2-aj3b-kajs
              </div>
              <div>
                Description : IDAT is bla bla project for bla bla purpose.
              </div>
            </div>
          </div>
          <div className="bg-gray-50/75 p-3 rounded-sm border-1">
            <div className="font-bold pb-4">
              Members
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
