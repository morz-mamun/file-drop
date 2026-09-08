'use client';
import { faqData } from '@/constants/data';
import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (idx: number) => {
        setOpenIndex(prev => (prev === idx ? -1 : idx));
    };

    return (
        <section id="faq" className="py-24 bg-surface-soft scroll-mt-20">
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="font-display text-4xl md:text-5xl text-center text-ink mb-12">
                    Frequently asked questions
                </h2>

                <div className="space-y-3">
                    {faqData.map((item, idx) => {
                        const isOpen = idx === openIndex;
                        return (
                            <div
                                key={idx}
                                className="bg-canvas border border-hairline rounded-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full flex items-center justify-between p-5 cursor-pointer focus:outline-none"
                                >
                                    <span className="text-base font-semibold text-ink text-left">
                                        {item.question}
                                    </span>
                                    <span className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-ink text-white' : 'bg-surface-card text-muted'}`}>
                                        {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
                                    </span>
                                </button>

                                <div
                                    className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5' : 'max-h-0'
                                        }`}
                                >
                                    <p className="text-body leading-relaxed whitespace-pre-line">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
