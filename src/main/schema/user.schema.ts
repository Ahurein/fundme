import z from "zod";

export const userSchema = z.object({
  body: z.object(
    {
      userId: z.string().min(4),
      firstName: z.string().min(2).optional(),
      lastName: z.string().min(2).optional(),
      email: z.string().email().optional(),
      picture: z.string().optional(),
    },
    {}
  ),
});
