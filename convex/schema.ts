import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  creatures: defineTable({
    // creatureId: v.number(),
    userId: v.string(),
    creatureType: v.string(),
    creatureName: v.string(),
    creatureInfo: v.any()
  }),
  messages: defineTable({
    roomId: v.number(),
    messages: v.array(
      v.object({
        message: v.string(),
        userName: v.string(),
        userId: v.string(),
        timeSent: v.number()
      })
    )
  }),
  rooms: defineTable({
    roomId: v.number(),
    users: v.array(v.string()),
    owner: v.string(),
    name: v.string(),
    usePassword: v.boolean(),
    password: v.optional(v.number()),
    storageId: v.optional(v.id("_storage"))
  }),
  maps: defineTable({
    roomId: v.number(),
    userId: v.string(),
    mapName: v.string(),
    storageId: v.id("_storage")
  })
})
