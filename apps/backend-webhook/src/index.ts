import { prisma } from "@repo/db";
import express from "express";
import { paymentInfoValidation } from "./zodValidation";

const app = express();

type PaymentInformation = {
  token: string;
  amount: number;
  userId: number;
};
app.post("/hdfcWebhook", (req, res) => {
  const response = paymentInfoValidation.safeParse(req.body);
  if (!response.success) {
    res.status(409).json({ msg: "Invalid Credentials" });
    return;
  }
  const { token, amount, userId } = response.data;
  const paymentInfo: PaymentInformation = {
    token,
    amount,
    userId,
  };
  try {
    prisma.$transaction(async (tsx) => {
      // user balance update
      await tsx.balance.update({
        where: {
          userId: paymentInfo.userId,
        },
        data: {
          balance: {
            increment: Number(paymentInfo.amount),
          },
        },
      });
      // onramp update
      await tsx.onRamping.update({
        where: {
          token: paymentInfo.token,
        },
        data: {
          status: "Success",
        },
      });
      res.status(200).json({ msg: "Updated Successfully!" });
    });
  } catch (error) {
    res.status(411).json({ msg: "Update Failed" });
  }
});
// on the nextjs backend the failed status would prolly mean that the updates were not successful and i don't need to makke any change and rather inform the user that "Payment failed". Also along with this a message would be send that will say that your payment would be refunded within some specific time. (maybe bank server would assign the time)
