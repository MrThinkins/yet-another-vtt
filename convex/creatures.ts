import { v } from "convex/values"
import { query, mutation, action } from "./_generated/server"
import { api } from "./_generated/api"


export const addCreature = mutation({
  args: {
    userId: v.string(),
    creatureType: v.string(),
    creatureName: v.string(),
    creatureInfo: v.any()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("creatures", {
      userId: args.userId,
      creatureType: args.creatureType,
      creatureName: args.creatureName,
      creatureInfo: args.creatureInfo
    })
  }
})

export const getUserCreatureList = query({
  args: {
    userId: v.string()
  },
  handler: async (ctx, args) => {
    const list = await ctx.db
      .query("creatures")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .take(1000)

    return list
  }
})

export const deleteUserCreature = mutation({
  args: {
    userId: v.string(),
    _id: v.string()
  },
  handler: async (ctx, args) => {
    const creature = await ctx.db
      .query("creatures")
      .filter((q) => q.eq(q.field("_id"), args._id))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first()
    if (!creature || creature.userId !== args.userId) {
      throw new Error("creature not found or userId mismatch")
    }
    await ctx.db.delete(creature._id)
  }
})

export const getUserCreature = query({
  args: {
    userId: v.string(),
    _id: v.string()
  },
  handler: async (ctx, args) => {
    const creature = await ctx.db
      .query("creatures")
      .filter((q) => q.eq(q.field("_id"), args._id))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first()
    return creature
  }
})

export const updateUserCreature = mutation({
  args: {
     _id: v.string(), 
     creatureName: v.string(), 
     userId: v.string(),
     creatureInfo: v.any()
  },
  handler: async ( ctx, args) => {
    const creature = await ctx.db
      .query("creatures")
      .filter((q) => q.eq(q.field("_id"), args._id))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first()
    if (!creature) {
      throw new Error("creature not found")
    }
    if (creature.userId != args.userId) {
      throw new Error("userId no matched")
    }
    await ctx.db
      .patch(creature._id, {
        creatureName: args.creatureName,
        creatureInfo: args.creatureInfo
      })     
  }
})