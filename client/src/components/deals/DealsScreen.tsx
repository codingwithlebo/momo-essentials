import type { Deal } from "../../types";
import DealDetailCard from "./DealDetailCard";

interface DealsScreenProps {
  deals: Deal[];
}

export default function DealsScreen({ deals }: DealsScreenProps) {
  return (
    <section className="px-5 pb-24 pt-[18px]">
      <h2 className="mb-3 text-[15px] font-bold">All deals near you</h2>
      {deals.map((deal) => (
        <DealDetailCard key={deal.id} deal={deal} />
      ))}
    </section>
  );
}
