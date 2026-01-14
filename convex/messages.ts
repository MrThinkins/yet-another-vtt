import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

export const get = query({
  args: { roomId: v.number(), userId: v.string() },
  handler: async (ctx, args) => {
    const preGroup = await ctx.db 
      .query("rooms")
      .filter((q) => (q.eq(q.field("roomId"), args.roomId)))
      .first()

    if (!preGroup) {
      return
    } else if (!preGroup.users.includes(args.userId)) {
      return
    }
    const group = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .first()
    return group ? group.messages : []
  },
})

export const send = mutation({
  args: {
    roomId: v.number(),
    message: v.string(),
    userName: v.string(),
    userId: v.string(),
    timeSent: v.number() 
  },
  handler: async (ctx, args) => {
    const preGroup = await ctx.db 
      .query("rooms")
      .filter((q) => (q.eq(q.field("roomId"), args.roomId)))
      .first()

    if (!preGroup) {
      return
    } else if (!preGroup.users.includes(args.userId)) {
      return
    }
    const group = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .first()

    const newMessage ={
      message: args.message,
      userName: args.userName,
      userId: args.userId,
      timeSent: args.timeSent
    }

    if (!group) {
      await ctx.db.insert("messages", {
        roomId: args.roomId,
        messages: [newMessage]
      })
      return
    }

    await ctx.db.patch(group._id, {
      messages: [...group.messages, newMessage]
    })
  }
})
