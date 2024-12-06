import { title } from "process";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const poemRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const volumes = await ctx.db.poem.findMany();
    return volumes ?? null;
  }),
});
