import { authOptions } from "@/auth"
import NextAuth from "next-auth"

authOptions.events = {
    signIn: async ({ user }) => {
        if (user.email !== process.env.ADMIN_EMAIL) {
            throw new Error('Unauthorized');
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }