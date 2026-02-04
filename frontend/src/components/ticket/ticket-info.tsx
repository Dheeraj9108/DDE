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

export function TicketInfo() {
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
      <Header breadcrumbs={breadcrumbItems} />
      <div className="container mx-auto max-w-6xl p-2 mt-4">
        {/* Title Section */}
        <div>Review: Test Diagnostic Flow</div>

        <div className="grid grid-cols-[70%_30%] items-start">
          <div className="grid gap-7">
            <div className="grid gap-3">
              <div>Details</div>
              <div className="pl-5 grid gap-3">
                <div className="grid grid-cols-2 gap-7">
                  <div className="grid grid-cols-12">
                    <div className="md:col-span-4">Type:</div>
                    <div className="md:col-span-8">Review</div>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="md:col-span-4">Status:</div>
                    <div className="md:col-span-7">
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Staus" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="hold">Hold</SelectItem>
                            <SelectItem value="Inprogress">
                              Inprogress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="md:col-span-4">Priority:</div>
                    <div className="md:col-span-8">Medium</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              <div>Description</div>
              <div className="pl-5 grid gap-3">
                <div>Review Ticket Description</div>
              </div>
            </div>
            <div className="grid gap-3">
              <div>Attachements</div>
              <div className="pl-5 grid gap-3">
                <div>No Attachments Found</div>
              </div>
            </div>
          </div>
          <div className="grid gap-7">
            <div className="grid gap-3">
              <div>People</div>
              <div className="pl-5 grid gap-3">
                <div className="grid grid-cols-12">
                  <div className="md:col-span-4">Asignee:</div>
                  <div className="md:col-span-8">Dheeraj</div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="md:col-span-4">Reporter:</div>
                  <div className="md:col-span-8">Dheeraj</div>
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              <div>Dates</div>
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
        <div className="grid gap-3">
          <div>Activity</div>
          <Tabs defaultValue="comments">
            <TabsList>
              <div className="pr-2">Show: </div>
              <TabsTrigger value="comments" className="mr-2">
                Comments
              </TabsTrigger>
              <TabsTrigger value="history" className="pr-2">
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="comments">
              <div className="py-8">
                {/* <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Comments</h2>
                  <div className="grid gap-2">
                    <Textarea
                      placeholder="Write your comment..."
                      className="resize-none rounded-md border border-input bg-background p-3 text-sm shadow-sm"
                    />
                    <Button className="justify-center">Submit</Button>
                  </div>
                </div> */}
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
                        Need more Information.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">User</div>
                        <div className="text-xs text-muted-foreground">
                          5 days ago
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        I need access.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">Dheeraj</div>
                        <div className="text-xs text-muted-foreground">
                          1 week ago
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Sorry without proper reason I cant provide you acces.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="history">
              <div className="py-8">
                {/* <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Comments</h2>
                  <div className="grid gap-2">
                    <Textarea
                      placeholder="Write your comment..."
                      className="resize-none rounded-md border border-input bg-background p-3 text-sm shadow-sm"
                    />
                    <Button className="justify-center">Submit</Button>
                  </div>
                </div> */}
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
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
