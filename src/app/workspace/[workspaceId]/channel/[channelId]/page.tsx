  "use client";
import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { useChannelId } from "@/hooks/use-channel-id";
import { Loader, TriangleAlert } from "lucide-react";
import Header from "../components/header";
import ChatInput from "../components/chat-input";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import MessageList from "@/features/messages/components/message-list";

const ChannelIdPage = () => {
  const channelId = useChannelId();
  const {results,loadMore,status} = useGetMessages({channelId});
  const {data:channel, isLoading:channelLoading} =  useGetChannel({id:channelId});
    if(channelLoading || status === "LoadingFirstPage"){
    return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-2">
          <Loader className="size-6 animate-spin text-muted-foreground"/>
        </div>
    )
  }

  if(!channel){
    return (
        <div className="min-h-screen flex flex-1 items-center justify-center flex-col gap-2">
          <TriangleAlert className="size-6  text-muted-foreground"/>
          <span className="text-sm text-muted-foreground">
            Channel not found
          </span>
        </div>
    )
  }
    return (
        <div className="flex flex-col h-full">
          <Header title={channel.name}/>
          <MessageList
           channelName={channel.name}
           channelCreationTime={channel._creationTime}
           data={results}
           loadMore={loadMore }
           canLoadMore={status === "CanLoadMore"}
           isLoadingMore = {status === "LoadingMore"}
          />

           <ChatInput placeholder={`Message to ${channel.name}`}/>
        </div>
      );
}
 
export default ChannelIdPage;