import { GalleryVerticalEnd } from "lucide-react";
import * as CONST from "../shared/constants/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
    Field,
    FieldDescription,
    FieldGroup,
} from "@/components/ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { IGroup } from "./interfaces/interfaces";
import { CRUDService } from "./services/crud-service";
import { useState } from "react";
import { useAuth } from "@/AuthProvider";
import { toast } from "sonner";

export function Join() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const { user } = useAuth();

    const createGroup = async () => {
        if (!user) {
            toast.error('Please Login');
            return;
        }
        try {
            const payload: IGroup = {
                id: "",
                name,
                owner: {
                    id: user.id
                }
            }
            const group = await CRUDService.createGroup(payload);
            navigate(`/group/${group?.id}/dashboard`);
        } catch (error) {

        }
    }

    const joiGroup = async () => {
        if (!user) {
            toast.error('Please Login');
            return;
        }
        try {
            const payload = {
                code,
            }
            const group = await CRUDService.joinGroup(payload);
            navigate(`/group/${group?.id}/dashboard`);
        } catch (error) {

        }
    }

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col items-center gap-2 text-center">
                    <a
                        href="#"
                        className="flex flex-col items-center gap-2 font-medium"
                    >
                        <div className="flex size-8 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-6" />
                        </div>
                        <span className="sr-only">{CONST.DDE}</span>
                    </a>
                    <h1 className="text-xl font-bold">{CONST.HEADER}</h1>

                    <FieldDescription>
                        You’re not part of any group yet.
                    </FieldDescription>
                    <Tabs defaultValue="createGroup" className="w-xs my-5">
                        <div className="w-full flex justify-center">
                            <TabsList variant="line">
                                <TabsTrigger value="createGroup" className="">Create Group</TabsTrigger>
                                <TabsTrigger value="joinGroup" className="">Join Group</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="createGroup" className="my-5">
                            <FieldGroup>
                                <Field >
                                    {/* <FieldLabel htmlFor="username">Name</FieldLabel> */}
                                    <Input
                                        id="username"
                                        type="text"
                                        required
                                        placeholder="Name"
                                        onChange={(e) => setName(e?.target?.value)}
                                    />
                                </Field>
                                <Field>
                                    <Button onClick={createGroup}>Create</Button>
                                </Field>
                            </FieldGroup>
                        </TabsContent>
                        <TabsContent value="joinGroup" className="my-5">
                            <FieldGroup>
                                <Field >
                                    {/* <FieldLabel htmlFor="username">Group Code</FieldLabel> */}
                                    <Input
                                        id="username"
                                        type="text"
                                        required
                                        placeholder="Code"
                                        onChange={(e) => setCode(e?.target?.value)}
                                    />
                                </Field>
                                <Field>
                                    <Button onClick={joiGroup}>Join</Button>
                                </Field>
                            </FieldGroup>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
