import { Button } from "@repo/ui/button";
import Link from "next/link";

export default function App() {

  return (
    <div className="flex gap-2 mt-5">
      Dashboard
      <Link href={"/user/balance"}>
        <Button text="Balances"
          className="w-[100px] h-auto"
          loading={false} />
      </Link>
      <Link href={"/user/transaction"}>
        <Button text="Transaction"
          className="w-[100px] h-auto"
          loading={false} />
      </Link>
      {/* <Button text="P2P" handleClick={() => router.push("/user/balances")} /> */}
    </div>
  )
};
