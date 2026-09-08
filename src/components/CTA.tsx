import React from 'react';
import Link from 'next/link';

const CTA = () => {
    return (
        <section className="py-20 bg-canvas">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-surface-soft rounded-xl px-8 py-16 md:py-20 text-center">
                    <h2 className="font-display text-4xl md:text-5xl text-ink mb-5">
                        Ready to start sharing?
                    </h2>
                    <p className="text-lg text-muted mb-10 max-w-xl mx-auto leading-relaxed">
                        Create an account to manage your uploads and access all features for free.
                    </p>
                    <div className="flex justify-center">
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center h-12 px-10 bg-primary text-on-primary font-semibold rounded-md transition-opacity hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-ink/15"
                        >
                            Create account
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
