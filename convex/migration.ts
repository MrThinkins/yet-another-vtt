import { internalMutation } from "./_generated/server"

// already ran, shouldn't be needed again
export const setDefaultUsePassword = internalMutation(async ({ db }) => {
  const rooms = await db.query("rooms").collect()
  for (const room of rooms) {
    if (room.usePassword == undefined) {
      await db.patch(room._id, { usePassword: false })
    }
  }
})