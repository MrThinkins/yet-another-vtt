import { mutation } from "./_generated/server"
import { v } from "convex/values"

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