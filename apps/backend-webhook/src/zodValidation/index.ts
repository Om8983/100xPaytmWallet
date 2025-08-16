import { z } from "zod";

export const paymentInfoValidation = z.object({
  token: z.string(),
  amount: z.number(),
  userId: z.number(),
});
