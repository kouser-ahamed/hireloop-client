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
      label: "Satisfication Rate", // image_6c49b9.png / image_6b7a24.png এর ইউনিক স্পেলিং বজায় রাখা হলো
    },
  ];

  return (
    <section className="relative w-full bg-[#030303] text-white pt-56 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-205 flex flex-col justify-between items-center">
      
      {/* Background Globe Wrapper - positioned between left/right cards */}
      <div className="absolute inset-x-0 bottom-[-6%] w-full h-[150%] pointer-events-none select-none z-0 flex justify-center items-end">
        <div className="relative w-full h-full">
          <div className="relative w-full container mx-auto h-full max-w-350 translate-y-[6%] md:translate-y-[12%]">
            <div className="absolute inset-0 pointer-events-none select-none z-0">
              <Image
                src="/assets/images/globe.png"
                alt="Globe background graphic"
                fill
                priority
                sizes="100vw"
                className="object-contain object-center opacity-95 scale-110 md:scale-125 lg:scale-135"
              />
            </div>
          </div>
        </div>
        {/* Top/Bottom Masks to blend with dark background */}
        <div className="absolute inset-x-0 top-0 h-[40%] bg-linear-to-b from-[#030303] via-[#030303]/60 to-transparent z-1" />
        <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-transparent to-transparent opacity-80" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 container mx-auto w-full text-center flex flex-col items-center justify-between min-h-150 my-auto gap-16">
        
        {/* Core Heading Line - ইমেজ অনুযায়ী গ্লোবের ঠিক সেন্টারে বসানো হয়েছে */}
        <h2 className="text-2xl md:text-zxl lg:text-4xl font-normal tracking-tight text-neutral-200/90 max-w-3xl leading-[1.3] mt-28 md:mt-36 lg:mt-[380px] mb-6 px-4">
          Assisting over <span className="font-semibold text-white">15,000 job seekers</span> <br className="hidden sm:inline" />
          find their dream positions.
        </h2>

        {/* HeroUI Cards Layout - নিচের দিক থেকে গ্লোবের কার্ভকে ওভারল্যাপ করে বসানো */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full  transform translate-y-6 md:translate-y-12">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={stat.id}
                className="bg-[#09090b]/85 backdrop-blur-xl border border-neutral-900/80 rounded-[22px] h-48 shadow-2xl transition-all duration-300 hover:border-neutral-800/80"
                shadow="none"
              >
                <div className="flex flex-col items-start justify-between p-7 h-full w-full">
                  {/* Top: Icon */}
                  <div className="text-neutral-400">
                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                  </div>

                  {/* Bottom: Stat Content */}
                  <div className="flex flex-col gap-2 text-left">
                    <span className="text-[42px] font-medium tracking-tight text-white leading-none font-sans">
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