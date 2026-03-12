import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "../shared/header";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { apiService } from "./apiService";
import { IGroup } from "./interfaces";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthProvider";

export default function Group(){
    
    const navigate = useNavigate();
    const { setUserDetails } = useAuth();
    const [groups, setGroups] = useState<IGroup[]>();

    useEffect(()=>{
        fetchGroups();
    },[]);

    const fetchGroups=async()=>{
        const groups = await apiService.getAllUsers();
        setGroups(groups);
    }

    const navigateToGroup= async (group:IGroup)=>{
        const user = await apiService.getUserDetails(group?.id);
        setUserDetails(user);
        navigate(`/group/${group.id}/dashboard`);
    }

    return (
         <>
            <Header />
            <div className="container mx-auto max-w-7xl px-5 my-4">
                <div className="text-2xl font-bold mb-3">Groups</div>
                {
                    groups?.map(group=>(    
                        <Card className="w-[350px]" key={group?.id}>
                            <CardHeader>
                                <CardTitle>{group?.name}</CardTitle>
                                <CardDescription>{group?.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>This is the card content area where you can place any content.</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button className="cursor-pointer" onClick={()=>navigateToGroup(group)}>Enter <ArrowRight/></Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}