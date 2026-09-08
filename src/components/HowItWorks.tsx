import { steps } from "@/constants/data";
import React from "react";

const cardStyles = [
    { bg: "bg-brand-peach", text: "text-ink" },
    { bg: "bg-brand-ochre", text: "text-ink" },
    { bg: "bg-surface-card", text: "text-ink" },
];

const HowItWorks = () => {
    return (
        <section
            id="how-it-works"
            className="py-24 bg-surface-soft scroll-mt-20"
        >
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="font-display text-4xl md:text-5xl text-center text-ink mb-14">
                    How it works
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {steps.map(({ icon: Icon, title, description }, idx) => {
                        const style = cardStyles[idx % cardStyles.length];
                        return (
                            <div
                                key={title}
                                className={`relative ${style.bg} ${style.text} p-8 rounded-xl transition-transform duration-300 hover:-translate-y-1 text-center`}
                            >
                                <span className="absolute top-5 right-5 font-display text-2xl text-ink/20 select-none">
                                    0{idx + 1}
                                </span>

                                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-white/60 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-ink" />
                                </div>

                                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                                <p className="text-sm leading-relaxed text-ink/70">
                                    {description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
