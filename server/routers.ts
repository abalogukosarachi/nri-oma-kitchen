import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { storagePut } from "./storage";
import { saveFileMetadata, getUserFiles, deleteFile } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  files: router({
    upload: protectedProcedure
      .input(z.object({
        fileName: z.string(),
        fileData: z.string(),
        mimeType: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const buffer = Buffer.from(input.fileData, 'base64');
          const fileKey = `${ctx.user.id}-files/${Date.now()}-${input.fileName}`;
          
          const { url } = await storagePut(fileKey, buffer, input.mimeType);
          
          await saveFileMetadata({
            userId: ctx.user.id,
            fileName: input.fileName,
            fileKey,
            fileUrl: url,
            mimeType: input.mimeType,
            fileSize: buffer.length,
          });
          
          return { success: true, url, fileKey };
        } catch (error) {
          console.error("File upload failed:", error);
          throw error;
        }
      }),
    
    list: protectedProcedure.query(async ({ ctx }) => {
      return await getUserFiles(ctx.user.id);
    }),
    
    delete: protectedProcedure
      .input(z.object({ fileId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return await deleteFile(input.fileId, ctx.user.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
