import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateChannel } from "@/features/channels/api/use-update-channel";
import { updateChannelSchema } from "@/features/channels/schema";
import { useChannelId } from "@/hooks/use-channel-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const channelId = useChannelId()
  const {mutate, isPending} = useUpdateChannel()
  const form = useForm<z.infer<typeof updateChannelSchema>>({
    resolver: zodResolver(updateChannelSchema),
    defaultValues: {
      name: title,
    },
  });
  const handleWorkspaceForm = (values: any) => {
     mutate({id:channelId, name:values.name },{
      onSuccess:() =>{
        toast.success('Channel update');
        setIsOpen(false)
      },
      onError:() =>{
        console.log("Failed to update channel");
        
      }
     })
  };
  return (
    <div className="bg-white border-b h-[49px] items-center p-4 overflow-hidden ">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="text-lg font-semibold px-2 overflow-hidden w-auto"
          >
            <span className="truncate"> # {title}</span>
            <ChevronDown />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle># {title}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Channel Name</p>
                    <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                      Edit
                    </p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="p-4 border-b bg-white">
                  <DialogTitle>Rename the Channel</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleWorkspaceForm)}
                    className="space-y-4"
                  >
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Channel name e.g. 'plan' 'budget'"
                              {...field}
                              onChange={(e) => {
                                const formatted = e.target.value
                                  .replace(/\s+/g, "-")
                                  .toLowerCase();
                                field.onChange(formatted); // update RHF state
                              }}
                              value={field.value}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button>Close</Button>
                      </DialogClose>
                      <div className="flex justify-end">
                        <Button disabled={false}>Save</Button>
                      </div>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <button
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border
             hover:bg-gray-50 text-rose-600"
            >
              <TrashIcon className="size-5" />
              <p className="text-sm font-semibold">Delete channel</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
