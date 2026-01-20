import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

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

    const newMessage ={
      message: args.message,
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

    let numberOfDice = ''
    let diceSize = ''
    let placeTracker: number = 1
    if (args.message.includes("/r")) {
      let message = args.message

      for (let i = 0; i < message.length; i++) {
        if (placeTracker == 1) {
          if (message[i] == '/') {
            placeTracker++
          }
        } else if (placeTracker == 2) {
          if (message[i] == 'r' && message[i - 1] == '/') {
            placeTracker = 3
          }
        } else if (placeTracker == 3) {
          if (message[i] == 'd') {
            placeTracker = 4
          } else if (Number.isFinite(Number(message[i]))) {
            numberOfDice += message[i]
          }
        } else if (placeTracker == 4) {
          if (Number.isFinite(Number(message[i]))) {
            diceSize += message[i]
          }
        }
      }
      if (placeTracker >= 4) {
        let diceRoll = 0
        for (let i = 0; i < Number(numberOfDice); i++) {
          diceRoll += Math.floor(Math.random() * Number(diceSize)) + 1
        }

        console.log("diceRoll " + diceRoll)

        const preGroup = await ctx.db
          .query("rooms")
          .filter((q) => (q.eq(q.field("roomId"), args.roomId)))
          .first()

        if (!preGroup) {
          return
        } else if (!preGroup.users.includes(userId)) {
          return
        }

        const messageToSend = `${userName} rolled ${diceRoll}`
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
    }
  }
})