'use client';
import { navLinks } from '@/constants/data';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { isAuthenticated, logout } = useAuthStore();

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 1024) setIsOpen(false);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await logout();
        setIsLoggingOut(false);
    };

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        const id = href.replace(/^#/, '');
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header className="bg-canvas/90 backdrop-blur-sm sticky top-0 z-50 border-b border-hairline">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between relative">
                {/* Logo */}
                <Link href="/" aria-label="Homepage" className="flex items-center space-x-2.5">
                    <Image src="/logo.png" alt="logo" width={36} height={36} />
                    <span className="text-xl font-display text-ink select-none">File-Drop</span>
                </Link>

                {/* Center nav (desktop) */}
                <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
                    {navLinks.map(({ name, href }) => (
                        <a
                            key={name}
                            href={href}
                            onClick={(e) => handleNavClick(e, href)}
                            className="text-sm font-medium text-body hover:text-ink hover:bg-surface-card rounded-md px-3.5 py-2 transition-colors"
                        >
                            {name}
                        </a>
                    ))}
                </nav>

                {/* Desktop actions */}
                {isAuthenticated ? (
                    <div className="hidden lg:flex items-center gap-3">
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="text-sm font-medium text-body hover:text-ink hover:bg-surface-card rounded-md px-4 py-2 transition-colors disabled:opacity-50"
                        >
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </button>
                        <Link
                            href="/dashboard"
                            className="px-5 h-11 flex items-center bg-primary text-on-primary rounded-md text-sm font-semibold transition hover:opacity-90"
                        >
                            Dashboard
                        </Link>
                    </div>
                ) : (
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="/login"
                            className="text-sm font-medium text-body hover:text-ink hover:bg-surface-card rounded-md px-4 py-2 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="px-5 h-11 flex items-center bg-primary text-on-primary rounded-md text-sm font-semibold transition hover:opacity-90"
                        >
                            Sign up
                        </Link>
                    </div>
                )}

                {/* Mobile toggle */}
                <button
                    className="lg:hidden text-ink"
                    aria-label="Toggle menu"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                </button>
            </div>

            {/* Mobile menu */}
            <nav
                className={`lg:hidden bg-canvas border-t border-hairline overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                aria-label="Mobile Navigation"
            >
                <div className="flex flex-col px-6 py-4 gap-1">
                    {navLinks.map(({ name, href }) => (
                        <a
                            key={name}
                            href={href}
                            onClick={(e) => handleNavClick(e, href)}
                            className="text-sm font-medium text-body hover:bg-surface-card rounded-md px-3 py-2.5 transition-colors"
                        >
                            {name}
                        </a>
                    ))}
                    {isAuthenticated ? (
                        <>
                            <button
                                onClick={async () => {
                                    setIsOpen(false);
                                    await handleLogout();
                                }}
                                disabled={isLoggingOut}
                                className="text-left text-sm font-medium text-body hover:bg-surface-card rounded-md px-3 py-2.5 transition-colors disabled:opacity-50"
                            >
                                {isLoggingOut ? 'Logging out...' : 'Logout'}
                            </button>
                            <Link
                                href="/dashboard"
                                onClick={() => setIsOpen(false)}
                                className="mt-2 px-4 py-2.5 bg-primary text-on-primary rounded-md text-sm font-semibold text-center"
                            >
                                Dashboard
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-medium text-body hover:bg-surface-card rounded-md px-3 py-2.5 transition-colors text-center"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                onClick={() => setIsOpen(false)}
                                className="mt-2 px-4 py-2.5 bg-primary text-on-primary rounded-md text-sm font-semibold text-center"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
