import { PageTopBar } from "../../../components/PageTopBar"
import { PageBaseUi } from "@repo/ui/PageBaseUi"
import { AmountCards } from "../../../components/BalanceComp/AmountCard/AmountCards"
import { getUserOrThrow } from "../../../lib/auth/utils"
import { getMoneyReceived, getMoneySpent } from "../../actions/user/action"
import { Suspense } from "react"
import TransactionTableWrapper from "../../../components/BalanceComp/TransactionTableWrapper"


type SearchParams = {
    searchParams
    : {
        txnType: string
    };
}
export default async function page({ searchParams }: SearchParams) {
    const userSession = await getUserOrThrow();
    const userId = userSession.id;

    const { txnType = "wallet" } = await searchParams;

    const [spending, receivedMoney] = await Promise.all([
        getMoneySpent(),
        getMoneyReceived()
    ])
    return (
        <PageBaseUi>
            <PageTopBar title="Balance" />
            <div className="flex h-full px-5 flex-col gap-3 ">
                <AmountCards moneyReceived={receivedMoney} moneySpent={spending} />
                <Suspense fallback={<div>Loading table...</div>}>
                    <TransactionTableWrapper txn_type={txnType} userId={userId} />
                </Suspense>
            </div>
        </PageBaseUi>
    )
}