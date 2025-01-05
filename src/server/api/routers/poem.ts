import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const poemRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const volumes = await ctx.db.poem.findMany();
    return volumes ?? null;
  }),

  getCheck: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const poem = await ctx.db.poem.findFirst({
        where: { title: input.text }
      });

      return poem ?? null;
    }),

  getCheck123: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.poem.findFirst({
      orderBy: { createdAt: "asc" },
    });

    return post ?? null;
  }),
});
