"use client";

import { Card } from "@heroui/react";

export function StatsCards({
  stats = [],
  className = "",
  cardClassName = "",
}) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 ${className}`}
    >
      {stats.map((item, index) => (
        <StatsCard
          key={`${item.title}-${index}`}
          item={item}
          cardClassName={cardClassName}
        />
      ))}
    </div>
  );
}

function StatsCard({ item, cardClassName = "" }) {
  const Icon = item.icon;

  return (
    <Card
      shadow="none"
      className={`h-[138px] rounded-[10px] border border-neutral-800/80 bg-[#181818] px-4 py-4 transition-all duration-200 hover:border-neutral-700 hover:bg-[#1d1d1d] ${cardClassName}`}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-700/60 text-neutral-300">
          {Icon && <Icon className="h-4 w-4" />}
        </div>

        <div>
          <p className="mb-2 text-[11px] font-normal text-neutral-400">
            {item.title}
          </p>

          <h3 className="text-[20px] font-semibold leading-none tracking-tight text-white">
            {item.value}
          </h3>
        </div>
      </div>
    </Card>
  );
}