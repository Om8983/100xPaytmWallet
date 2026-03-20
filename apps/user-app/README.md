This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


<!-- async function fetchUserBalance({ email }: { email: string }) {
    try {
        const userBalance = await prisma.user.findFirst({
            where: {
                email: email || ""
            },
            select: {
                token: true,
                email: true,
                Balance: {
                    select: {
                        balance: true,
                        locked: true
                    }
                },
                OnRamping: {
                    select: {
                        amount: true,
                        provider: true,
                        startTime: true,
                        status: true,
                        token: true,
                    }
                },
            }
        })
        return userBalance
    } catch (e) {
        return false
    }
} -->



things to take care of::::::
1. pagination for fetching the onramp transactions and p2p txns.
2. Updating or creating a new api/server action for fetching the pagination data.
3. creating common table for whole website.



to have synced rounded corners just like you see on the balances page top cards you need to ensure that the inner div's radius should be its (currentRadius - the padding given by outer ) or just do some trial and error