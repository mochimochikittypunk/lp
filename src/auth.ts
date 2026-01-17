import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    providers: [
        Credentials({
            credentials: {
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const adminPassword = process.env.ADMIN_PASSWORD
                if (!adminPassword) {
                    console.error("ADMIN_PASSWORD not set")
                    return null
                }
                if (credentials.password === adminPassword) {
                    return { id: "1", name: "Admin", email: "admin@example.com" }
                }
                return null
            },
        }),
    ],
})
