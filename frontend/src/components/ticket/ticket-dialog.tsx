import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FlowDialog from "./flow-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { CRUDService } from "./services/crud-service";
import { ITicketDialog } from "./interfaces/ticket-interface";
import { useEffect } from "react";

export function TicketDialog({ open, onOpenChange, ticket }: ITicketDialog) {

  const priorities = ["High", "Medium", "Low"];
  const types = ["Permission Request", "Project Access Request", "Flow Review Request"];

  useEffect(() => {
  if (ticket) {
    form.reset({
      title: ticket.title ?? "",
      description: ticket.description ?? "",
      priority: ticket.priority ?? "Medium",
      type: ticket.type ?? "Permission Request",
      assignTo: ticket.assignedTo?.name ?? "",
      projectId: "",
      flowId: "",
      roleId: "",
    });
  }
}, [ticket]);

  const formSchema = z.object({
    title: z.string().min(1, "Title is Required"),
    description: z.string(),
    priority: z.enum(priorities),
    type: z.enum(types),
    assignTo: z.string().min(1, "Assign To is Required"),
    roleId: z.string().optional(),
    projectId: z.string().optional(),
    flowId: z.string().optional()
  }).superRefine((data, ctx) => {
    if (data.type === "Permission Request" && !data.roleId) {
      ctx.addIssue({
        path: ["roleId"],
        message: "Permission Type is Required",
        code: "custom",
      })
    }

    if (data.type === "Project Access Request" && !data.projectId) {
      ctx.addIssue({
        path: ["projectId"],
        message: "Project is Required",
        code: "custom",
      });
    }

    if (data.type === "Flow Review Request" && !data.flowId) {
      ctx.addIssue({
        path: ["flowId"],
        message: "Flow is Required",
        code: "custom",
      });
    }
  });

  type FormSchema = z.infer<typeof formSchema>;
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ticket?.title ?? "",
      description: ticket?.description ?? "",
      priority: ticket?.priority ?? "Medium",
      type: ticket?.type ?? "Permission Request",
      assignTo: ticket?.assignedTo.name ?? "",
      projectId: "",
      flowId: "",
      roleId: ""
    }
  });

  const handleSubmit = async (data: FormSchema) => {
    form.reset();
    onOpenChange();
    const payload = {
      type: data.type,
      title: data.title,
      description: data.description,
      priority: data.priority,
      createdBy: {
        id: "e056d755-eddd-4e9f-a85a-a33f66c8feab",
        name: "Dheeraj"
      },
      assignedTo: {
        id: "e056d755-eddd-4e9f-a85a-a33f66c8feab",
        name: "Dheeraj"
      },
      details: {
        type: data.type,
        projectId: data.projectId,
        flowId: data.flowId,
        roleId: data.roleId,
      }
    }
    await CRUDService.createTicket(payload);
  };

  const dynamicContent = () => {
    switch (form.watch("type")) {
      case "Permission Request":
        return (
          <Controller
            name="roleId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Permission Type</FieldLabel>
                <Select value={field.value}
                  onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">Flow Creator</SelectItem>
                      <SelectItem value="2">Flow Executor</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        );
      case "Project Access Request":
        return (
          <Controller
            name="projectId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Project</FieldLabel>
                <FlowDialog />
                {fieldState.invalid && <FieldError errors={[fieldState.error]}></FieldError>}
              </Field>
            )}
          />
        );
      case "Flow Review Request":
        return (
          <Controller
            name="projectId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Flow</FieldLabel>
                <FlowDialog />
                {fieldState.invalid && <FieldError errors={[fieldState.error]}></FieldError>}
              </Field>
            )}
          />
        );
      default:
        break;
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Ticket</DialogTitle>
          <DialogDescription>
            Fill ticket details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Title</FieldLabel>
                <Input {...field} placeholder="Title..." aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea {...field} placeholder="Description..."></Textarea>
              </Field>
            )}
          />
          <Controller
            name="priority"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Priority</FieldLabel>
                <Select {...field} value={field.value}
                  onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Type</FieldLabel>
                <Select {...field} value={field.value}
                  onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Project Access Request">Project Access Request</SelectItem>
                      <SelectItem value="Permission Request">Permission Request</SelectItem>
                      <SelectItem value="Flow Review Request">Flow Review Request</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          {dynamicContent()}
          <Controller
            name="assignTo"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Assign To</FieldLabel>
                <Select {...field} value={field.value}
                  onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="dheeraj">Dheeraj</SelectItem>
                      <SelectItem value="john">John</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" >Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}