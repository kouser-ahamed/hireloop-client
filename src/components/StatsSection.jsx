"use client";

import Image from "next/image";
import { Card } from "@heroui/react";
import { Briefcase, Layers, PersonMagnifier, Star } from "@gravity-ui/icons";

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      icon: Briefcase,
      value: "50K",
      label: "Active Jobs",
    },
    {
      id: 2,
      icon: Layers,
      value: "12K",
      label: "Companies",
    },
    {
      id: 3,
      icon: PersonMagnifier,
      value: "2M",
      label: "Job Seekers",
    },
    {
      id: 4,
      icon: Star,
      value: "97%",
      label: "Satisfication Rate", // image_6c49b9.png er unique spelling accurate rakha holo
    },
  ];

  return (
    <section className="relative w-full bg-[#030303] text-white pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-205 flex flex-col justify-between items-center">
      
      {/* Background Globe Wrapper - Scale barano hoyeche boro dekhajabar jonno */}
        <div className="absolute inset-x-0 bottom-[-8%] w-full h-[150%] pointer-events-none select-none z-0 flex justify-center items-end">
          <div className="relative w-full h-full">
            <div className="relative w-full container mx-auto h-full translate-y-[12%] md:translate-y-[18%]">
              <div className="absolute inset-0 pointer-events-none select-none z-0">
                <Image
                  src="/assets/images/globe.png"
                  alt="Globe background graphic"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center opacity-95 scale-110 md:scale-125"
                />
              </div>
            </div>
          </div>
        {/* Strict Top and Bottom Mask - Jate uporer background full deep black blend hoye jay */}
        <div className="absolute inset-x-0 top-0 h-[40%] bg-linear-to-b from-[#030303] via-[#030303]/60 to-transparent z-1" />
        <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-transparent to-transparent opacity-80" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 container mx-auto w-full text-center flex flex-col items-center justify-between h-full flex-1 gap-24 md:gap-32">
        
        {/* Core Heading Line - Placed higher up just like the screenshot */}
        <h2 className="text-2xl md:text-4xl lg:text-[40px] font-medium tracking-tight text-neutral-200/90 max-w-3xl leading-[1.3] mt-25">
          Assisting over <span className="font-semibold text-white">15,000 job seekers</span> <br className="hidden sm:inline" />
          find their dream positions.
        </h2>

        {/* HeroUI Cards Layout - Sitting accurately over the lower horizon curve */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-auto">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={stat.id}
                className="bg-[#09090b]/85 backdrop-blur-xl border border-neutral-900/80 rounded-[22px] h-52 shadow-2xl transition-all duration-300 hover:border-neutral-800/80"
                shadow="none"
              >
                <div className="flex flex-col items-start justify-between p-6 h-full w-full">
                  {/* Top: Icon */}
                  <div className="text-neutral-400 p-0.5">
                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                  </div>

                  {/* Bottom: Stat Content */}
                  <div className="flex flex-col gap-2 text-left">
                    <span className="text-[44px] font-semibold tracking-tight text-white leading-none font-sans">
                      {stat.value}
                    </span>
                    <span className="text-neutral-500 text-xs md:text-[13px] font-normal tracking-wide pl-0.5">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}