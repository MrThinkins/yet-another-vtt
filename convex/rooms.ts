import { query, mutation } from "./_generated/server"
import { v } from "convex/values"


export const getRoom = query({
  args: { roomId: v.number()},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    const group = await ctx.db
      .query("rooms")
      .filter((q) => (q.eq(q.field("roomId"), args.roomId)))
      .first()
    if (!group) return false

    const locked = group.usePassword

    if (locked) {
      return group.users.includes(userId)
    } else {
      return true
    }
  }
})

export const createRoom = mutation({
  args: {
    name: v.string(),
    usePassword: v.boolean()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    if (args.name == "null") {
      args.name = identity.nickname + " room"
    } 

    let password = undefined
    if (args.usePassword) {
      password = Math.floor(Math.random() * 899999) + 100000
    }

    const lastRoomId = await ctx.db
      .query("rooms")
      .order("desc")
      .first()

    const nextRoomId = lastRoomId ? (lastRoomId.roomId + 1) : 1

    await ctx.db.insert("rooms", {
      roomId: nextRoomId,
      owner: userId,
      users: [userId],
      name: args.name,
      usePassword: args.usePassword,
      password: password
    })
  }
})


// THIS WILL NOT SCALE PAST A FEW HUNDRED ROOMS, FIX IN FUTURE


export const getUserRoomList = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }
    console.log(identity)

    const userId = identity.subject

    const allRooms = await ctx.db.query("rooms").collect()
    const userRooms = allRooms.filter((room) =>
      room.users.includes(userId)
    )

    return userRooms.slice(0, 100)
  },
});

export const getRoomPasswordInfo = query({
  args: {
    roomId: v.number()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    const roomInfo = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .filter((q) => q.eq(q.field("owner"), userId))
      .first()

    if (roomInfo) {
      const passwordInfo = {
        usePassword: roomInfo.usePassword,
        passWord: roomInfo.password
      }
      return passwordInfo
    } else {
      return
    }
  }
})

export const toggleUsePassword = mutation({
  args: {
    roomId: v.number()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    const room = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .filter((q) => q.eq(q.field("owner"), userId))
      .first()

    if (room) {
      if (room.usePassword) {
        await ctx.db.patch(room._id, {
          usePassword: false,
          password: undefined
        })
      } else {
        const password = Math.floor(Math.random() * 899999) + 100000
        await ctx.db.patch(room._id, {
          usePassword: true,
          password: password
        })
      }
    }
  }
})

export const deleteRoom = mutation({
  args: {
    roomId: v.number()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    const room = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .filter((q) => q.eq(q.field("owner"), userId))
      .first()

    if (!room || room.owner !== userId) {
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

export const submitRoomPassword = mutation({
  args: {
    roomId: v.number(),
    roomPassword: v.number()
  }, 
  handler: async (ctx, args) => {
    const room = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .first()

    if (room?.password == args.roomPassword) {
      const identity = await ctx.auth.getUserIdentity()
      if (!identity) {
        throw new Error("Not Authenticated")
      }
      const userId = identity.subject

      await ctx.db.patch(room._id, {
        users: [...room.users, userId]
      })
    }
  }
})

export const getIsOwner = query({
  args: {
    roomId: v.number()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    const roomInfo = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .first() 
    
    if (roomInfo?.owner == userId) {
      return true
    } else {
      return false
    }
  },
})