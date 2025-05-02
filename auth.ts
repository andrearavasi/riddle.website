import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { object, string } from "zod"
import { db } from "~/server/db"
import { PrismaAdapter } from "@auth/prisma-adapter"

// import { saltAndHashPassword } from "@/utils/password"

const bcrypt = require('bcrypt');
const saltRounds = 10;

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                name: {},
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null

                const { name, email, password } = await object({
                    name: string({ required_error: "Nickname is required" })
                        .min(1, "Email is required"),
                    email: string({ required_error: "Email is required" })
                        .min(1, "Email is required")
                        .email("Invalid email"),
                    password: string({ required_error: "Password is required" })
                        .min(1, "Password is required")
                        .min(8, "Password must be more than 8 characters")
                        .max(32, "Password must be less than 32 characters"),
                }).parseAsync(credentials);

                // logic to salt and hash password
                //   const pwHash = saltAndHashPassword(credentials.password)
                const hash = bcrypt.hashSync(password, saltRounds);

                // logic to verify if the user exists
                //   user = await getUserFromDb(credentials.email, pwHash)
                user = { name: "Andrea", email: email, pswHash: hash }

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error("Invalid credentials.")
                }

                // return user object with their profile data
                return user
            },
        }),

    ],
})