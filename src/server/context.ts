import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'

// export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
//     return { auth: getAuth(opts.req) }
// }

export const createContext = async () => {
    return { auth: await auth(), Prisma }
}

export type Context = Awaited<ReturnType<typeof createContext>>