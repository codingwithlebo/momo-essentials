import type { Fund } from "../../types";
import Button from "../common/Button";
import FundCard from "./FundCard";

interface FundsScreenProps {
  funds: Fund[];
  onCreateFund?: () => void;
  onContribute?: (fundId: string, amount: number, payerPhone: string) => void;
}

export default function FundsScreen({ funds, onCreateFund, onContribute }: FundsScreenProps) {
  return (
    <section className="px-5 pb-24 pt-[18px]">
      <h2 className="mb-3 text-[15px] font-bold">Your funds</h2>
      {funds.map((fund) => (
        <FundCard key={fund.id} fund={fund} onContribute={onContribute} />
      ))}
      <Button variant="outline" onClick={onCreateFund}>
        + Start a new fund
      </Button>
    </section>
  );
}