import { mutation } from "./_generated/server"
import { v } from "convex/values"

export const addTokenToList = mutation({
  args: {
    storageId: v.id("_storage"),
    roomId: v.number(),
    tokenName: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    await ctx.db.insert("tokens", {
      roomId: args.roomId,
      userId: userId,
      tokenName: args.tokenName,
      storageId: args.storageId
    })
  }
})