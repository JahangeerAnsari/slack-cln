"use client";
import { useWorkspaceStore } from "../../store/use-workspace-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { createWorkspaceSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../../api/use-create-workspace";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
export const CreateWorkspaceModal = () => {
  const router = useRouter()
  const { isOpen, onClose, type } = useWorkspaceStore();
  const {mutate,isPending} = useCreateWorkspace()
  const isModalOpen = isOpen && type === "createWorkspace";
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createWorkspaceSchema),
  });

  const handleCloseModal = () => {
    onClose();
    form.reset()
  };
  const handleWorkspaceForm = (
    values: z.infer<typeof createWorkspaceSchema>
  ) => {
    mutate({name:values.name},{
      onSuccess(data) {
       router.push(`/workspace/${data}`);
      handleCloseModal();
      toast.success("Workspace Created!")
       
      },
      onError:(error:Error) =>{
        console.log("error",error); 
       toast.error("Something went wrong on creating workspace")
      }
    })
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="space-y-2">Add a Workspace</DialogTitle>
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
                      <Input placeholder="Workspace name e.g. 'Personal' 'Home'" {...field}  disabled={isPending}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button disabled={isPending}>Create</Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
