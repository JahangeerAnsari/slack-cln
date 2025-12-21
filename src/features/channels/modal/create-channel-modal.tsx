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
import { toast } from "sonner";
import { useChannelStore } from "../store/use-channel-store";
import { createChannelSchema } from "../schema";
import { useCreateChannel } from "../api/use-create-channel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
export const ChannelModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type } = useChannelStore();
   const workspaceId = useWorkspaceId();
  const isModalOpen = isOpen && type === "createChannel";
  const { isPending, mutate } = useCreateChannel();
 

  const form = useForm<z.infer<typeof createChannelSchema>>({
    resolver: zodResolver(createChannelSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleCloseModal = () => {
    onClose();
    form.reset();
  };

  const handleWorkspaceForm = (values: z.infer<typeof createChannelSchema>) => {
    mutate(
      { name: values.name, workspaceId },
      {
        onSuccess: (id) => {
          //once channel created redirect to the new channel
         router.push(`/workspace/${workspaceId}/channel/${id}`)
          handleCloseModal();
          toast.success("Channel Created!");
          form.reset();
        },
        onError: () => {
          toast.error("Something went wrong while creating channel");
        },
      }
    );
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
