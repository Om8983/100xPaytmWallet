import { PageTopBar } from "../../../components/PageTopBar"
import { getServerSession } from "next-auth"
import { AuthOptions } from "../../api/auth/[...nextauth]/route"
import { PageBaseUi } from "@repo/ui/PageBaseUi"
import { prisma } from "@repo/db"
import { TransactionTable } from "../../../components/BalanceComp/TransactionTable"
import { AmountCards } from "../../../components/BalanceComp/AmountCard/AmountCards"

export default async function page() {
    const session = await getServerSession(AuthOptions)
    const user_Balance_Txn = await prisma.user.findFirst({
        where: { email: session?.user?.email || "" },
        select: {
            Balance: { select: { balance: true, locked: true } },
            OnRamping: {
                select: {
                    amount: true,
                    provider: true,
                    startTime: true,
                    endTime: true,
                    status: true,
                    token: true,
                }
            },
            Sender: true,
            Receiver: true,
        }
    })
    const tableColumns = [
        { key: "txn_id", label: "Transaction Id" },
        { key: "amount", label: "Amount" },
        { key: "txn_status", label: "Status" },
        { key: "provider", label: "Provider" },
        { key: "start_time", label: "Created At" },
        { key: "end_time", label: "Completed At" },
    ]

    return (
        <PageBaseUi>
            <PageTopBar title="Balance" />
            <div className="flex h-full px-5 flex-col gap-3 ">
                <AmountCards totalBalance={user_Balance_Txn?.Balance?.balance} />
                <div className="">
                    <p className="text-3xl mb-2">Transactions</p>
                    <TransactionTable columns={tableColumns} user_txnData={user_Balance_Txn?.OnRamping || []} />
                </div>
            </div>
        </PageBaseUi>
    )
}
