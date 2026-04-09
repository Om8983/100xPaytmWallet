import { PageTopBar } from "../../../components/PageTopBar"
import { PageBaseUi } from "@repo/ui/PageBaseUi"
import { TransactionTable } from "../../../components/BalanceComp/TransactionTable"
import { AmountCards } from "../../../components/BalanceComp/AmountCard/AmountCards"
import { getBalanceTxnData, getP2PtxnData } from "../../actions/transaction/action"
// import { getCachedData } from "../../../lib/auth/utils"
import { revalidatePath, unstable_cache } from "next/cache"
import { getUserOrThrow } from "../../../lib/auth/utils"


type SearchParams = {
    searchParams
    : {
        txnType: string
    };
}
export default async function page({ searchParams }: SearchParams) {
    const userSession = await getUserOrThrow();
    const userId = userSession.id;

    const { txnType = "wallet" } = searchParams;
    let txnData = []
    const walletTransactionCols = [
        { key: "txn_id", label: "Transaction Id" },
        { key: "amount", label: "Amount" },
        { key: "txn_status", label: "Status" },
        { key: "provider", label: "Provider" },
        { key: "start_time", label: "Created At" },
        { key: "end_time", label: "Completed At" },
    ]

    const p2pTxnCols = [
        { key: "txn_id", label: "Transaction Id" },
        { key: "amount", label: "Amount" },
        { key: "txn_status", label: "Status" },
        // { key: "provider", label: "Provider" },
        { key: "sender", label: "Created At" },
        { key: "receiver", label: "Completed At" },
    ]

    if (txnType === "p2p") {
        const p2pCachedFn = unstable_cache(() => getP2PtxnData(userId), ['p2p-txn', userId], {
            tags: ['p2pTxnData'],
            revalidate: 10
        });
        txnData = await p2pCachedFn()
    } else {
        // txnData = await getCachedData({ funcToExecute: getBalanceTxnData, key: ['balance-txn'] })
        const balanceTxnCacheFn = unstable_cache(() => getBalanceTxnData(userId), ['balance-txn', userId], {
            tags: ['balanceTxnData'],
            revalidate: 10
        });

        txnData = await balanceTxnCacheFn();
    }
    return (
        <PageBaseUi>
            <PageTopBar title="Balance" />
            <div className="flex h-full px-5 flex-col gap-3 ">
                <AmountCards />
                <TransactionTable p2pTxnCols={p2pTxnCols} walletTransactionCols={walletTransactionCols} user_txnData={txnData} />
            </div>
        </PageBaseUi>
    )
}
