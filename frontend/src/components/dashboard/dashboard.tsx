import { useParams } from "react-router-dom";
import { Header } from "../shared/header";
import { useEffect, useState } from "react";
import { apiService } from "./api-service";
import { IGroup } from "./interfaces";

export function Dashboard() {

  const {groupId} = useParams();
  const [group,setGroup] = useState<IGroup>();

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

  useEffect( ()=>{
    getGroupById();
  },[]);

  const getGroupById=async()=>{
    try {
      const res = await apiService.getById(groupId ??'');
      setGroup(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className="container mx-auto max-w-6xl p-2 mt-4">
        <div className="text-4xl font-bold mb-5">{group?.name}</div>
        <div className="grid grid-cols-2 items-start space-x-3">
          <div className="bg-gray-50/75 p-3 rounded-sm border-1">
            <div className="font-bold pb-4">
              Overview
            </div>
            <div className="border-1 p-4 text-gray-500 text-sm flex flex-col space-y-2 rounded-sm">
              <div>
                Name : {group?.name}
              </div>
              <div>
                Invite Link: {group?.inviteCode}
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
            <div className="border-1 p-4 text-gray-500 text-sm flex flex-col space-y-2 rounded-sm">
              <div>
                Owner : {group?.owner?.username}
              </div>
              <div>
                Members : {group?.members.map(member=>member?.username).join(", ")}
              </div>
              <div>
                Description : IDAT is bla bla project for bla bla purpose.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
