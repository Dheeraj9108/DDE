import { columns, TicketItem } from "./columns";
import { DataTable } from "../shared/data-table/data-table";
import { Header } from "../shared/header";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as URL_CONST from "../shared/constants/urlConstants";
import { TicketDialog } from "./ticket-dialog";
import { IActionItem } from "../shared/interfaces/interfaces";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CRUDService } from "./services/crud-service";

export function TicketList() {

  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const res = await CRUDService.getAllTickets("e056d755-eddd-4e9f-a85a-a33f66c8feab");
    console.log(res);
    setTickets(res);
  }

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
  const data: TicketItem[] = [
    {
      id: "728ed52f",
      status: "Pending",
      priority: "High",
      type: "Review",
      title: "Review: Test Diagnostic Flow",
      createdBy: "Dheeraj",
      lastModified: "Updated 2h ago By Dheeraj"
    },
  ];

  const handleEdit = (row: TicketItem) => {

  }

  const handleView = (row: TicketItem) => {
    navigate(`/tickets/${row.id}/View`);
  }

  const handleDelete = async (row: TicketItem) => {

  };

  const actions: IActionItem[] = [
    {
      label: "Edit",
      icon: <IconEdit />,
      onClick: handleEdit
    },
    {
      label: "View",
      icon: <IconEye />,
      onClick: handleView
    },
    {
      label: "Delete",
      icon: <IconTrash />,
      onClick: handleDelete
    }
  ];

  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className="container mx-auto max-w-6xl p-2 mt-4 space-y-4 ">
        <div className="flex justify-between">
          <div className="text-2xl font-bold ">All Tickets</div>
          <Button size="sm" className="text-xs" onClick={() => setOpen(true)}><Plus />Create Ticket</Button>
        </div>
        <DataTable
          columns={columns(actions)}
          data={tickets}
          showCreate={false}
          filterKey="name"
        >
          <div className="flex space-x-2">
            <Select>
              <SelectTrigger className="ml-2">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Staus" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="hold">Hold</SelectItem>
                  <SelectItem value="Inprogress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Assigned To" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Dheeraj">Dheeraj</SelectItem>
                  <SelectItem value="John">John</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </DataTable>
        <TicketDialog open={open} onOpenChange={() => setOpen(false)} />
      </div>
    </>
  );
}
