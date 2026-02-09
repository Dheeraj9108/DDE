import { DataTable } from "../shared/data-table/data-table";
import { Header } from "../shared/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CRUDService } from "./services/crud-service";
import { ITicket } from "./interfaces/ticket-interface";
import { IconPencil } from "@tabler/icons-react";
import { TicketDialog } from "./ticket-dialog";

export function TicketInfo() {  

  const [open, setOpen] = useState<boolean>(false);
  const [ticket, setTicket] = useState<ITicket>();
  const [comments, setComments] = useState([
    {
      id: "1",
      comment: "Test Comment",
      user: {
        id: "1",
        username: "Dheeraj",
        letter: "D"
      },
      createdAt: "2026-02-08 18:42:28.63564",
      updatedAt: "2026-02-08 18:42:28.63564"
    }
  ]);
  const [newComment, setNewComment] = useState<string>("");
  const { id } = useParams();

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

  useEffect(() => {
    getTicketById()
  }, [id]);

  const getTicketById = async () => {
    if (!id) return;
    const res = await CRUDService.getTicketById(id);
    setTicket(res);
  }

  const postComment = () => {
    const curComment = {
      id: "",
      comment: newComment.trim(),
      user: {
        id: "1",
        username: "Dheeraj",
        letter: "D"
      },
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString()
    }
    setComments((prev) => [curComment, ...prev]);
    setNewComment("");
  }

  const timeAlgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 }
    ];

    for (let interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }

    return "just now";
  }

  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className="container mx-auto max-w-6xl p-2 mt-4">
        {/* Title Section */}
        <div className="text-2xl font-bold mb-1">{ticket?.type}: {ticket?.title}</div>
        <div className="grid grid-cols-[70%_30%] items-start">
          <div className="grid gap-7">
            <div className="border-r-1 space-y-7 pr-5">
              <div className="grid gap-3">
                <div className="text-sm text-gray-500 mb-1 font-bold flex justify-between">
                  Details
                  <span className="text-xs flex gap-1 hover:text-primary cursor-pointer" onClick={()=>setOpen(true)}>
                    <IconPencil size={15} />Edit
                  </span>
                </div>
                <div className="pl-5 grid gap-3">
                  <div className="grid grid-cols-2 gap-7 text-sm">
                    <div className="grid grid-cols-12">
                      <div className="md:col-span-4">Type:</div>
                      <div className="md:col-span-8">{ticket?.type}</div>
                    </div>
                    <div className="grid grid-cols-12">
                      <div className="md:col-span-5">Status:</div>
                      <div className="md:col-span-7">{ticket?.status}</div>
                    </div>
                    <div className="grid grid-cols-12">
                      <div className="md:col-span-4">Priority:</div>
                      <div className="md:col-span-8">{ticket?.priority}</div>
                    </div>
                    <div className="grid grid-cols-12">
                      <div className="md:col-span-5">Permission Type:</div>
                      <div className="md:col-span-7">Flow Creator</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="text-sm text-gray-500 mb-1 font-bold">Description</div>
                <div className="pl-5 grid gap-3 text-sm">
                  <div>{ticket?.description}</div>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="text-sm text-gray-500 font-bold">Attachements</div>
                <div className="pl-5 grid gap-3">
                  <div className="border-2 border-dashed rounded-md p-3 text-center text-sm">No Attachments Found</div>
                </div>
              </div>
            </div>
            <div className="grid gap-3 pr-5 text-sm">
              <div className="text-sm text-gray-500 font-bold">Activity</div>
              <Tabs defaultValue="comments" className="pl-5">
                <TabsList className="!bg-transparent rounded-none">
                  <TabsTrigger value="comments" className="!bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary rounded-none">
                    Comments
                  </TabsTrigger>
                  <TabsTrigger value="history" className="!bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary rounded-none">
                    History
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="comments" className="space-y-3">
                  <div className="flex space-x-3">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your comment..."
                      className="resize-none rounded-md border border-input bg-background p-3 text-sm shadow-sm"
                    />
                    <Button className="text-xs" disabled={!newComment.trim()} onClick={postComment}>Comment</Button>
                  </div>
                  {comments.map((comment, idx) => (
                    <div className="space-y-3" key={idx}>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 border">
                          <AvatarFallback>{comment?.user?.letter}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1.5">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{comment?.user?.username}</div>
                            <div className="text-xs text-muted-foreground">
                              {timeAlgo(comment.updatedAt)}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {comment.comment}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="history">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                        <AvatarFallback>D</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1.5">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">Dheeraj</div>
                          <div className="text-xs text-muted-foreground">
                            2 days ago
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Sorry without proper reason I cant provide you acces
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1.5">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">Noah Williams</div>
                          <div className="text-xs text-muted-foreground">
                            5 days ago
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          I'm really impressed with the quality and performance of
                          this product. Highly recommended!
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1.5">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">Emma Brown</div>
                          <div className="text-xs text-muted-foreground">
                            1 week ago
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          I've been using this product for a while and it's been
                          consistently reliable. Definitely worth the investment.
                        </div>
                      </div>
                    </div>
                  </div>

                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="grid gap-7 ml-3">
            <div className="grid gap-3">
              <div className="text-sm text-gray-500 mb-1 font-bold">People</div>
              <div className="pl-5 grid gap-3 text-sm">
                <div className="grid grid-cols-12">
                  <div className="md:col-span-4">Asignee:</div>
                  <div className="md:col-span-8">{ticket?.assignedTo.name}</div>
                </div>
                <div className="grid grid-cols-12 text-sm">
                  <div className="md:col-span-4">Reporter:</div>
                  <div className="md:col-span-8">{ticket?.createdBy.name}</div>
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="text-sm text-gray-500 mb-1 font-bold">Dates</div>
              <div className="pl-5 grid gap-3">
                <div className="grid grid-cols-12">
                  <div className="md:col-span-4">Created:</div>
                  <div className="md:col-span-8">29-12-2025</div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="md:col-span-4">Updated:</div>
                  <div className="md:col-span-8">29-12-2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TicketDialog open={open} onOpenChange={() => setOpen(false)} ticket={ticket}/>
    </>
  );
}
