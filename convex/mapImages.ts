import { mutation } from "./_generated/server"

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  }
})

// not needed for now?
// export const uploadImage = mutation({
//   args: {
//     storageId: v.id("_storage")
//   },
//   handler: async (ctx, args) => {
//     await ctx.db.insert()
//   }
// })