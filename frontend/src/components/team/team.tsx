import { Header } from "../shared/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DataTable } from "../shared/data-table/data-table";
import { columns } from "./columns";

export function Teams() {
  let breadcrumbItems: any = [];
  const setBreadcrumb = () => {
    breadcrumbItems = [
      {
        item: "Home",
        url: "/",
      },
      {
        item: "Team",
        url: "/team",
      },
    ];
  };
  setBreadcrumb();
  let data: any = [
    {
      name: "Dheeraj",
      role: "viewer",
    },
    {
      name: "Joe",
      role: "viewer",
    },
    {
      name: "Alice",
      role: "viewer",
    },
    {
      name: "Bob",
      role: "viewer",
    },
  ];
  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className="container mx-auto max-w-7xl px-5 mt-2">
        <div className="text-2xl font-bold mb-1 ">Team Members</div>
        <div className="text-sm text-gray-500 mb-2">
          Invite your team members to collaborate.
        </div>
        <DataTable columns={columns} data={data} showCreate={false} filterKey={""} />
      </div>
      {/* <Card className="gap-0">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Invite your team members to collaborate.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-0">
          </CardContent> 
        </Card>*/}
    </>
  );
}
