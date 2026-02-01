import { columns, FlowItem } from "./columns";
import { DataTable } from "../shared/data-table/data-table";
import { Header } from "../shared/header";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as URL_CONST from "../shared/constants/urlConstants";
import { DialogDemo } from "../dialog";
import { CreateTicketDialog } from "./createTicketDialog";

export function TicketList() {
  useEffect(() => {
    // fetchFlows();
  }, []);

  let breadcrumbItems: any = [];
  const setBreadcrumb = () => {
    breadcrumbItems = [
      {
        item: "Home",
        url: URL_CONST.HOME,
      },
      {
        item: "Projects",
        url: URL_CONST.PROJECTS,
      },
      {
        item: "Flows",
        url: URL_CONST.FLOWS,
      },
    ];
  };
  setBreadcrumb();
  const data: FlowItem[] = [
    {
      id: "728ed52f",
      status: "Pending",
      priority: "High",
      type: "Review",
      title: "Review: Test Diagnostic Flow",
      context: "Project Alpha › Blood Test Flow",
      createdBy: "Dheeraj",
      lastModified: "Updated 2h ago By Dheeraj"
    },
  ];

  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Tabs defaultValue="raisedByMe">
          <TabsList>
            <TabsTrigger value="raisedByMe">Raised By Me</TabsTrigger>
            <TabsTrigger value="assignedToMe">Assigned To Me</TabsTrigger>
          </TabsList>
          <TabsContent value="raisedByMe">
            <DataTable
              columns={columns()}
              data={data}
              showCreate={false}
              filterKey="name"
            >
              <CreateTicketDialog onCreate={()=>{}}/>
            </DataTable>
          </TabsContent>
          <TabsContent value="assignedToMe">
            <DataTable
              columns={columns()}
              data={data}
              showCreate={false}
              filterKey="name"
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
