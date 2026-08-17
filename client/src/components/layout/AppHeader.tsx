interface AppHeaderProps {
  location: string;
  points: number;
}

export default function AppHeader({ location, points }: AppHeaderProps) {
  return (
    <header className="shrink-0 border-b border-mtn-grey bg-white px-5 pb-4 pt-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-mtn-grey-mid">
          <span className="text-mtn-yellow-dark">📍</span>
          {location}
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-mtn-black px-3 py-[7px] text-[13px] font-bold text-mtn-yellow">
          ⭐ {points} pts
        </div>
      </div>
      <h1 className="mt-2 font-display text-[22px] font-bold tracking-tight text-mtn-black">
        What's <span className="text-mtn-yellow-dark">around you</span> today?
      </h1>
    </header>
  );
}
