'use client';
import { productLinks, socialLinks, supportLinks } from '@/constants/data';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-surface-soft text-body mt-auto pt-16 pb-10">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Logo & About */}
                    <div className="lg:col-span-1">
                        <Link href="/" aria-label="Homepage" className="flex items-center space-x-2.5 mb-4">
                            <Image src="/logo.png" alt="logo" width={36} height={36} />
                            <span className="text-xl font-display text-ink select-none">File-Drop</span>
                        </Link>
                        <p className="text-sm text-muted leading-relaxed mb-6">
                            A simple and fast way to upload and share files instantly. Completely free, forever.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }, idx) => (
                                <a
                                    key={idx}
                                    href={href}
                                    aria-label={label}
                                    className="group w-10 h-10 flex items-center justify-center rounded-full border border-hairline transition-colors hover:bg-ink"
                                >
                                    <Icon className="w-4 h-4 text-body transition-colors group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-ink mb-4">Product</h3>
                        <ul className="space-y-3 text-sm text-muted">
                            {productLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="hover:text-ink transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-ink mb-4">Support</h3>
                        <ul className="space-y-3 text-sm text-muted">
                            {supportLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="hover:text-ink transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold text-ink mb-4">Stay updated</h3>
                        <p className="text-sm text-muted mb-5 leading-relaxed">
                            Subscribe to our newsletter for updates and new features.
                        </p>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex"
                        >
                            <input
                                type="email"
                                placeholder="Your email"
                                aria-label="Email address"
                                className="flex-1 min-w-0 px-4 py-2.5 rounded-l-md bg-canvas text-ink placeholder-muted-soft transition focus:outline-none border border-hairline border-r-0"
                                required
                            />
                            <button
                                type="submit"
                                className="px-5 py-2.5 rounded-r-md bg-primary text-on-primary text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-hairline pt-6 text-center text-sm text-muted-soft select-none">
                    &copy; {new Date().getFullYear()} File-Drop. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
