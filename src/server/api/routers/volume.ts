import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const volumeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.volume.create({
        data: {
          name: input.name,
          path: "/volumes/",
          description: ''
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const volumes = await ctx.db.volume.findMany({ select: { id: true, name: true, path: true, description: true } });
    return volumes ?? null;
  }),
});
