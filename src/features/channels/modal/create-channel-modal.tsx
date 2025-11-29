"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { useChannelStore } from "../store/use-channel-store";
import { createChannelSchema } from "../schema";
import { useState } from "react";
export const ChannelModal = () => {
 const[name, setName] = useState("");
 const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
  const value = e.target.value.replace(/\s+/g,"-").toLowerCase();
  setName(value)
 }
  const router = useRouter()
  const { isOpen, onClose, type } = useChannelStore();
  const isModalOpen = isOpen && type === "createChannel";
  const form = useForm<z.infer<typeof createChannelSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createChannelSchema),
  });

  const handleCloseModal = () => {
    onClose();
    form.reset()
  };
  const handleWorkspaceForm = (
    values: z.infer<typeof createChannelSchema>
  ) => {
    // mutate({name:values.name},{
    //   onSuccess(data) {
    //    router.push(`/workspace/${data}`);
    //   handleCloseModal();
    //   toast.success("Workspace Created!")
        
    //   },
    //   onError:(error:Error) =>{
    //     console.log("error",error); 
    //    toast.error("Something went wrong on creating workspace")
    //   }
    // })
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="space-y-2">Add a Channel</DialogTitle>
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
                      <Input placeholder="Channel name e.g. 'Plan' 'Budget'" {...field} 
                       value={name}
                       onChange={handleNameChange}
                      disabled={false}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button disabled={false}>Create</Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
