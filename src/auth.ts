// in auth.ts
import GoogleProvider from "next-auth/providers/google"

import { AuthOptions, getServerSession } from "next-auth"

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET!,
    callbacks: {
        async signIn({ user }) {
          return user.email === process.env.ADMIN_EMAIL;
        },
      },
}

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }