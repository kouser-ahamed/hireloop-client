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
      label: "Satisfication Rate",
    },
  ];

  return (
    <section className="relative w-full bg-[#030303] text-white pt-24 sm:pt-36 lg:pt-56 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[720px] flex flex-col justify-between items-center">
      
      {/* Large Device Background Globe - আপনার আগের কোড অনুযায়ী লকড রাখা হয়েছে */}
      <div className="hidden md:absolute md:inset-x-0 md:bottom-[-6%] md:w-full md:h-[150%] pointer-events-none select-none z-0 md:flex md:justify-center md:items-end">
        <div className="relative w-full h-full">
          <div className="relative w-full container mx-auto h-full max-w-[1400px] translate-y-[6%] md:translate-y-[12%]">
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
        <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-[#030303] via-[#030303]/60 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 container mx-auto w-full text-center flex flex-col items-center justify-between min-h-[500px] my-auto gap-10 sm:gap-16">
        
        {/* Core Heading Line */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight text-neutral-200/90 max-w-3xl leading-[1.3] mt-6 md:mt-36 lg:mt-[380px] mb-4 px-2 sm:px-4">
          Assisting over <span className="font-semibold text-white">15,000 job seekers</span> <br className="hidden sm:inline" />
          find their dream positions.
        </h2>

        {/* 
          Small Device Background Globe - ADJUSTED HEIGHT & SCALE
          - হাইট বাড়িয়ে h-56 করা হয়েছে যাতে ওপর থেকে ইমেজের কার্ভ কেটে না যায়।
          - translate-y-[18%] এবং object-top দিয়ে গ্লোবের মাথা ও গ্লো লাইনটি স্পষ্ট ফুটিয়ে তোলা হয়েছে।
        */}
        <div className="relative w-full h-56 sm:h-64 md:hidden pointer-events-none select-none flex justify-center items-start -mb-16 sm:-mb-20">
          <div className="relative w-full h-full">
            <div className="relative w-full h-full translate-y-[18%]">
              <div className="absolute inset-0 pointer-events-none select-none z-0">
                <Image
                  src="/assets/images/globe.png"
                  alt="Globe background graphic"
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain object-top opacity-100 scale-[2.2] sm:scale-[1.6]"
                />
              </div>
              {/* নিচের অংশ পিওর ব্ল্যাকের সাথে ব্লেন্ড করার জন্য স্মুথ মাস্ক */}
              <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#030303] via-[#030303]/50 to-transparent z-1" />
            </div>
          </div>
        </div>

        {/* Responsive Grid Layout (Mobile 2 Columns - image_5cf2a1.png style) */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full transform translate-y-0 sm:-translate-y-6 md:translate-y-12">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={stat.id}
                className="bg-[#09090b]/85 backdrop-blur-xl border border-neutral-900/80 rounded-[18px] sm:rounded-[22px] h-[155px] sm:h-48 shadow-2xl transition-all duration-300 hover:border-neutral-800/80"
                shadow="none"
              >
                <div className="flex flex-col items-center text-center md:items-start md:text-left justify-between p-4 sm:p-7 h-full w-full">
                  <div className="text-neutral-400 mt-1 md:mt-0">
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
                  </div>

                  <div className="flex flex-col gap-0.5 sm:gap-1 mb-1 md:mb-0 md:translate-y-2">
                    <span className="text-2xl sm:text-[42px] font-medium tracking-tight text-white leading-none font-sans">
                      {stat.value}
                    </span>
                    <span className="text-neutral-500 text-[10px] sm:text-xs md:text-[13px] font-normal tracking-wide uppercase md:normal-case md:pl-0.5">
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