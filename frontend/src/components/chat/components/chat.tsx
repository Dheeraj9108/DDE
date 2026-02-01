import { useParams } from "react-router-dom";
import { Header } from "../../shared/header";
import { ChatInterface } from "./chat-interface";
import { useEffect, useState } from "react";
import { CRUDService } from "../service/crud-service";
import { IFlow } from "../interfaces/flow-interfaces";

export function Chat() {
  const { id } = useParams();
  const [response, setResponse] = useState<{flow:IFlow, question:any}>({flow:{} as IFlow, question:null});

  useEffect(() => {
    startDiagnosis();
  }, [id]);

  const startDiagnosis = async () => {
    try {
      const payload = {
        flowId: id,
      };
      const res = await CRUDService.startDiagnosis(payload);
      setResponse(res);
    } catch (error) {}
  };

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
      <div className="flex flex-col h-[calc(100vh-20px)]">
        <Header breadcrumbs={breadcrumbItems} />
        <div className="flex flex-col flex-1 px-5 overflow-auto">
          <h1 className="mb-4">{response?.flow?.name}</h1>
          <ChatInterface flowId={id} firstQuestion={response.question}/>
        </div>
      </div>
    </>
  );
}
