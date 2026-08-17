import type { ReactElement } from "react";
import type { ScreenId } from "../../types";

interface BottomNavProps {
  active: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const navConfig: { id: ScreenId; label: string; icon: ReactElement }[] = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg {...iconProps}>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </svg>
    ),
  },
  {
    id: "deals",
    label: "Deals",
    icon: (
      <svg {...iconProps}>
        <path d="M6 2l1.5 4h9L18 2" />
        <path d="M3.5 6h17l-1.2 12.5A2 2 0 0117.3 20H6.7a2 2 0 01-2-1.5L3.5 6z" />
        <path d="M9 10a3 3 0 006 0" />
      </svg>
    ),
  },
  {
    id: "quests",
    label: "Quests",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    ),
  },
  {
    id: "rewards",
    label: "Rewards",
    icon: (
      <svg {...iconProps}>
        <path d="M12 8a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M12 8v13" />
        <path d="M5 12l7-4 7 4" />
        <path d="M5 21h14" />
      </svg>
    ),
  },
  {
    id: "funds",
    label: "Funds",
    icon: (
      <svg {...iconProps}>
        <path d="M17 20h5v-2a4 4 0 00-3-3.87" />
        <path d="M9 20H4v-2a4 4 0 013-3.87" />
        <circle cx="9" cy="7" r="4" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="flex shrink-0 border-t border-mtn-grey bg-white px-1.5 pb-3.5 pt-2.5">
      {navConfig.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`flex flex-1 flex-col items-center gap-1 py-1 font-body text-[10px] font-semibold transition-colors ${
              isActive ? "text-mtn-black" : "text-mtn-grey-mid"
            }`}
          >
            <span className={isActive ? "stroke-mtn-black" : "stroke-mtn-grey-mid"}>{item.icon}</span>
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
