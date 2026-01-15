import { query, mutation } from "./_generated/server"
import { v } from "convex/values"
import { verifyToken } from "@clerk/backend"

const CLERK_JWT_KEY = process.env.CLERK_JWT_KEY

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
    userId: v.string(),
    name: v.string()
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
      users: [args.userId],
      name: args.name
    })
  }
})


// THIS WILL NOT SCALE PAST A FEW HUNDRED ROOMS, FIX IN FUTURE
export const getUserRoomList = query({
  args: {
    userToken: v.string()
  },
  handler: async (ctx, args) => {
    // console.log("userToken: " + args.userToken)
    try {
      const result = await verifyToken(args.userToken, {
        jwtKey: CLERK_JWT_KEY
      })
      // console.log(result)
      const userId = result.sub
      // console.log("userId second: " + userId)
      if (!userId) {
        throw new Error("Problem with auth user token")
      }

      const allRooms = await ctx.db.query("rooms").collect()

      const userRooms = allRooms.filter((room) =>
        room.users.includes(userId)
      )
      return userRooms.slice(0, 100)
     
    } catch (error) {
      console.error("auth error: TRY REFRESHING PAGE")
      throw new Error("Auth failed, please refresh page")
    }
  } 
})

export const deleteRoom = mutation({
  args: {
    userId: v.string(),
    roomId: v.number()
  },
  handler: async (ctx, args) => {
    const room = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .filter((q) => q.eq(q.field("owner"), args.userId))
      .first()

    if (!room || room.owner !== args.userId) {
      throw new Error("room not found or userId not matched with owner ID")
    }

    await ctx.db.delete(room._id)
    
    const roomMessages = await ctx.db
      .query("messages")
      .filter((q) => (q.eq(q.field("roomId"), args.roomId)))
      .collect()

    if (!roomMessages) {
      throw new Error("room messages not found")
    }
    for (const message of roomMessages) {
      await ctx.db.delete(message._id)
    }
  }
})