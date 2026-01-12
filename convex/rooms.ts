import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

export const getRoom = query({
  args: { roomId: v.number(), userId: v.string() },
  handler: async (ctx, args) => {
    const group = await ctx.db
      .query("rooms")
      .filter((q) => (q.eq(q.field("roomId"), args.roomId)))
      .first()
    if (!group) return false
    return group.users.includes(args.userId)
  }
})

export const createRoom = mutation({
  args: {
    userId: v.string()
  },
  handler: async (ctx, args) => {
    const lastRoomId = await ctx.db
      .query("rooms")
      .order("desc")
      .first()

    const nextRoomId = lastRoomId ? (lastRoomId.roomId + 1) : 1

    await ctx.db.insert("rooms", {
      roomId: nextRoomId,
      owner: args.userId,
      users: [args.userId]
    })
  }
})

