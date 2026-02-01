import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TiFlowMerge } from "react-icons/ti";
import { FaPlay } from "react-icons/fa";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";

export function Flow({ flow }: { flow: any }) {
  const navigate = useNavigate();
  const startDiagnosis = () => {
    navigate(`/flows/${flow.id}/diagnose`);
  };
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex">
            <TiFlowMerge />
            <CardTitle>{flow.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p>{flow.description}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={startDiagnosis}>
            <FaPlay />
            <CardAction>Start Diagnosis</CardAction>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
