import { query, mutation } from "./_generated/server"
import { v } from "convex/values"
import rollDice from "./seversideFunctions/diceRoll"
import checkMessage from "./seversideFunctions/checkMessage"

export const getMessage = query({
  args: { 
    roomId: v.number()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    const preGroup = await ctx.db 
      .query("rooms")
      .filter((q) => (q.eq(q.field("roomId"), args.roomId)))
      .first()

    if (!preGroup) {
      return
    } else if (!preGroup.users.includes(userId)) {
      return
    }
    const group = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .first()
    return group ? group.messages : []
  },
})

export const sendMessage = mutation({
  args: {
    roomId: v.number(),
    message: v.string(),
    timeSent: v.number() 
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    const preGroup = await ctx.db 
      .query("rooms")
      .filter((q) => (q.eq(q.field("roomId"), args.roomId)))
      .first()

    if (!preGroup) {
      return
    } else if (!preGroup.users.includes(userId)) {
      return
    }
    const group = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .first()

    const checkedMessage = checkMessage(args.message)

    const newMessage ={
      message: checkedMessage,
      userName: String(identity.nickname),
      userId: userId,
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

export const deleteMessage = mutation({
  args: {
    index: v.number(),
    roomId: v.number()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userId = identity.subject

    const preGroup = await ctx.db
      .query("rooms")
      .filter((q) => (q.eq(q.field("roomId"), args.roomId)))
      .first()
    
    if (!preGroup || !preGroup.users.includes(userId)) {
      return
    }
    const group = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .first()

    if (!group) {
      return
    }

    const messages = [...group.messages]
    messages.splice(args.index, 1)

    await ctx.db.patch(group._id, {
      messages: messages
    })
  }
})

export const checkAndSendCommand = mutation({
  args: {
    message: v.string(),
    roomId: v.number(),
    timeSent: v.number()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const userName = identity.nickname
    const userId = identity.subject


    const preGroup = await ctx.db
      .query("rooms")
      .filter((q) => (q.eq(q.field("roomId"), args.roomId)))
      .first()

    if (!preGroup) {
      return
    } else if (!preGroup.users.includes(userId)) {
      return
    }
    const checkedMessage = checkMessage(args.message)
    const diceRollInfo = rollDice(checkedMessage)

    if (diceRollInfo == false || null) {
      return
    }

    const messageToSend = `${userName} rolled ${diceRollInfo.diceRoll} \n ${diceRollInfo.diceRolls}`
    const newMessage = {
      message: messageToSend,
      userName: "Bot",
      userId: userId,
      timeSent: args.timeSent
    }

    const group = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .first()

    if (!group) {
      return
    }

    await ctx.db.patch(group._id, {
      messages: [...group.messages, newMessage]
    })

  }
})