import { v } from "convex/values"
import { query, mutation } from "./_generated/server"

export const addCreature = mutation({
  args: {
    creatureType: v.string(),
    creatureName: v.string(),
    creatureInfo: v.any()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    await ctx.db.insert("creatures", {
      userId: userId,
      creatureType: args.creatureType,
      creatureName: args.creatureName,
      creatureInfo: args.creatureInfo
    })
  }
})

export const getUserCreatureList = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    const list = await ctx.db
      .query("creatures")
      .filter((q) => q.eq(q.field("userId"), userId))
      .take(1000)

    return list
  }
})

export const deleteUserCreature = mutation({
  args: {
    _id: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    const creature = await ctx.db
      .query("creatures")
      .filter((q) => q.eq(q.field("_id"), args._id))
      .filter((q) => q.eq(q.field("userId"), userId))
      .first()
    if (!creature || creature.userId !== userId) {
      throw new Error("creature not found or userId mismatch")
    }
    await ctx.db.delete(creature._id)
  }
})

export const getUserCreature = query({
  args: {
    _id: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    const creature = await ctx.db
      .query("creatures")
      .filter((q) => q.eq(q.field("_id"), args._id))
      .filter((q) => q.eq(q.field("userId"), userId))
      .first()
    return creature
  }
})

export const updateUserCreature = mutation({
  args: {
     _id: v.string(), 
     creatureName: v.string(), 
     creatureInfo: v.any()
  },
  handler: async ( ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    const creature = await ctx.db
      .query("creatures")
      .filter((q) => q.eq(q.field("_id"), args._id))
      .filter((q) => q.eq(q.field("userId"), userId))
      .first()
    if (!creature) {
      throw new Error("creature not found")
    }
    if (creature.userId != userId) {
      throw new Error("userId no matched")
    }
    await ctx.db
      .patch(creature._id, {
        creatureName: args.creatureName,
        creatureInfo: args.creatureInfo
      })     
  }
})