import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { Id } from "./_generated/dataModel"

export const addImageToList = mutation({
  args: {
    storageId: v.id("_storage"),
    roomId: v.number()
  }, 
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    await ctx.db.insert("maps", {
      roomId: args.roomId,
      userId: userId,
      mapName: "tempName",
      storageId: args.storageId
    })
  }
})

export const getImageList = query({
  args: {
    roomId: v.number()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    const list = await ctx.db
      .query("maps")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .take(100)

    return list
  }
})

export const getImage = query({
  args: {
    storageId:  v.id("_storage"),
  }, 
  handler: async (ctx, args) => {
    const imageUrl = await ctx.storage.getUrl(args.storageId)
    return imageUrl
  }
})

export const getMap = query({
  args: {
    _id: v.string()
  },
  handler: async (ctx, args) => {
    const map = ctx.db
      .query("maps")
      .filter((q) => q.eq(q.field("_id"), args._id))
      .first()

    return map
  }
})