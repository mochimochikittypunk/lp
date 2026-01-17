import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Simple hardcoded check for demo purposes
                // In production, use environment variables or DB user table
                if (credentials.password === "admin123") {
                    return { id: "1", name: "Admin", email: "admin@example.com" }
                }
                return null
            },
        }),
    ],
    pages: {
        signIn: "/api/auth/signin", // Use default or custom
    },
})
