import { v } from "convex/values";
import { mutation, QueryCtx } from "./_generated/server";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";
const populateReactions = async (ctx: QueryCtx, messageId: Id<"messages">) => {
  return await ctx.db.query
    ("reactions")
    .withIndex("by_message_id", (q) => q.eq("messageId", messageId)).collect()
}
const populateUser = async (ctx: QueryCtx, userId: Id<"users">) => {
  return await ctx.db.get(userId)
}
const populateMembers = async (ctx: QueryCtx, memberId: Id<"members">) => {
  return await ctx.db.get(memberId)
}
const getMember = async (
  ctx: QueryCtx,
  workspaceId: Id<"workspaces">,
  userId: Id<"users">
) => {
  return ctx.db.query("members")
    .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", workspaceId).eq("userId", userId))
    .unique()
}

const populateThread = async (ctx: QueryCtx, messageId: Id<"messages">) => {
  //this is the reply of the perticualr message
  const messages = await ctx.db.query("messages")
    .withIndex("by_parent_message_id", (q) => q.eq("parentMessageId", messageId)).collect();

    if(messages.length ===0){
      return {
        count:0,
        image:undefined,
        timestamp:0
      }
    }
    //find the last message and reply
    const lastMessage = messages[messages.length -1];
    const lastMessageMember = await populateMembers(ctx, lastMessage.memberId);
    if(!lastMessageMember){
      return {
        count:0,
        image:undefined,
        timestamp:0
      }
    }
    const lastMessageUser = await populateUser(ctx, lastMessageMember.userId);
    if(lastMessageUser){
      return{
        count:messages.length,
        image:lastMessageUser.image,
        timestamp:lastMessage._creationTime

      }
    }

}

export const create = mutation({
  args: {
    body: v.string(),
    image: v.optional(v.id("_storage")),
    workspaceId: v.id("workspaces"),
    channelId: v.optional(v.id("channels")),
    conversationId: v.optional(v.id("conversations")),
    parentMessageId: v.optional(v.id("messages"))
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized")
    }
    const member = await getMember(ctx, args.workspaceId, userId);
    if (!member) {
      throw new Error("Unauthorized")
    }
    let _conversationId = args.conversationId
    //let reply one to one conversations
    if (!args.conversationId && !args.channelId && args.parentMessageId) {
      const parentMessage = await ctx.db.get(args.parentMessageId)
    }
    //let add data into the messages table
    const messageId = await ctx.db.insert("messages", {
      memberId: member._id,
      body: args.body,
      updatedAt: Date.now(),
      workspaceId: args.workspaceId,
      channelId: args.channelId,
      parentMessageId: args.parentMessageId,
      conversationId: _conversationId,
      image: args.image
    });
    return messageId;


  }
})