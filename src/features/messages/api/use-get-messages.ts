import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const BATCH_SIZE=10;
interface UseGetMessageProps{
    channelId?:Id<"channels">;
    conversationId?:Id<"conversations">;
    parentMessageId?:Id<"messages">
}
export type GetMessageReturnType = typeof api.messages.get._returnType["page"];
export const useGetMessages = ({conversationId,parentMessageId,channelId}:UseGetMessageProps) =>{
     const {isLoading,loadMore,results,status} = usePaginatedQuery(
        api.messages.get,
        {channelId,conversationId,parentMessageId},
        {initialNumItems:BATCH_SIZE}
     )
     return{
        results,
        status,
        loadMore: () => loadMore(BATCH_SIZE),

     }
}