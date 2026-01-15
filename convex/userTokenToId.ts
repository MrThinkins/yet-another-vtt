import { verifyToken } from "@clerk/backend"

const CLERK_JWT_KEY = process.env.CLERK_JWT_KEY

export default async function userTokenToId (token: string) {
  try {
        const result = await verifyToken(token, {
          jwtKey: CLERK_JWT_KEY
        })
        // console.log(result)
        const userId = result.sub
        // console.log("userId second: " + userId)
        if (!userId) {
          throw new Error("Problem with auth user token")
        }
        return userId
  } catch (error) {
    console.error("auth error: TRY REFRESHING PAGE")
    throw new Error("Auth failed, please refresh page: " + error)
  }
}