import { PricingData } from "@/constants/data";
import Link from "next/link";
import React from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const Pricing = () => {
    return (
        <section id="pricing" className="py-24 bg-canvas scroll-mt-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="font-display text-4xl md:text-5xl text-center text-ink mb-4">Always free</h2>
                <p className="text-center text-muted mb-14 text-lg max-w-xl mx-auto leading-relaxed">
                    File-Drop is completely free to use. No premium plans, no hidden fees, no credit card required.
                </p>

                <div className="bg-brand-teal text-white rounded-xl p-8 md:p-12 max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
                        <div>
                            <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/15 rounded-pill px-3 py-1 mb-3">
                                Featured
                            </span>
                            <h3 className="font-display text-3xl">Free forever</h3>
                            <p className="text-white/70 mt-1 text-sm font-medium">All features included</p>
                        </div>
                        <p className="font-display text-5xl">$0</p>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {PricingData.map(({ title, subtitle }) => (
                            <li key={title} className="flex gap-3 items-start">
                                <FaCheckCircle className="text-brand-mint mt-1 flex-shrink-0 w-5 h-5" />
                                <div>
                                    <p className="font-semibold text-white text-base">{title}</p>
                                    <p className="text-white/60 text-sm leading-relaxed">{subtitle}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <Link
                        href='/signup'
                        className="w-full h-12 bg-white text-ink font-semibold rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        <span>Get started — it&apos;s free</span>
                        <FaArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
