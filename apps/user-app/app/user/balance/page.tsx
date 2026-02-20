import { prisma } from "@repo/db"
import { getServerSession } from "next-auth"
import { AuthOptions } from "../../api/auth/[...nextauth]/route"
import { Button } from "@repo/ui/button"
import Link from "next/link"
import { AmountCard } from "@repo/ui/AmountCard"
export default async function page() {
    const session = await getServerSession(AuthOptions)
    const userBalance = await prisma.user.findFirst({
        where: {
            email: session.user.email
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
    return (
        <div className="p-5">
            {/* <Link href="/" className="mt-10">
                <Button text="Dashboard" loading={false} ></Button>
            </Link > */}
            <AmountCard title="Total Income" className="svg-masking" amount={userBalance?.Balance?.balance as number} />
        </div>
    )
}
