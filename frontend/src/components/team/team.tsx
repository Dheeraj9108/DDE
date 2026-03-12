import { Header } from "../shared/header";
import { DataTable } from "../shared/data-table/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { apiService } from "./apiService";
import { useParams } from "react-router-dom";
import { IUser } from "./interface";
import { IActionItem } from "../shared/interfaces/interfaces";
import { IconTrash } from "@tabler/icons-react";
import { Button } from "../ui/button";

export function Teams() {
  let breadcrumbItems: any = [];

  const [users, setUsers] = useState<IUser[]>([]);
  const [updatedUsers, setUpdatedUsers] = useState<Record<string,IUser>>({});
  const {groupId} = useParams();
  
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

  const handleDelete=()=>{

  }

  const actions: IActionItem[] = [
    {
      label: "Delete",
      icon: <IconTrash />,
      onClick: handleDelete
    }
  ];

  useEffect(()=>{
    getAllUsers();
  },[]);

  const getAllUsers=async()=>{
    const res = await apiService.getAllUserByGroupId(groupId!);
    setUsers(res);
  }

  const onUserUpdate=(user:IUser)=>{
    setUpdatedUsers((prev)=>({
        ...prev,
        [user.id]:{
          ...user
        }
    }));
  }

  const handleSave=async()=>{
    const res = await apiService.updateRolesAndPermission(Object.values(updatedUsers),groupId!);
  }
  
  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className="container mx-auto max-w-7xl px-5 mt-2">
        <div className="text-2xl font-bold mb-1 ">Team Members</div>
        <div className="text-sm text-gray-500 mb-2">
          Invite your team members to collaborate.
        </div>
        <DataTable columns={columns(actions, onUserUpdate)} data={users} showCreate={false} filterKey={""} >
          <Button className="mx-2" onClick={handleSave}>Save</Button>
        </DataTable>
      </div>
    </>
  );
}
