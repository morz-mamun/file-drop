'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { AuthFormProps, FormValues } from '@/constants/type';
import PasswordErrors from './PasswordErrors';
import { toast } from 'sonner';

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
    const isLogin = type === 'login';
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const router = useRouter();

    const { login, signup } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        setFormError('');

        try {
            if (isLogin) {
                await login(data.email, data.password);
                toast.success('Logged in successfully');
            } else {
                await signup(data.email, data.password);
                toast.success('Account created successfully');
            }
            router.push('/');
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message || 'Something went wrong');
                setFormError(err.message);
            } else {
                setFormError('Something went wrong.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-soft px-4 py-12">
            <div className="w-full max-w-md bg-canvas border border-hairline rounded-xl p-8 sm:p-10">
                <Link href="/" className="flex justify-center items-center gap-2.5 mb-6">
                    <Image src="/logo.png" alt="File-Drop Logo" width={36} height={36} />
                    <span className="text-lg font-display text-ink select-none">File-Drop</span>
                </Link>

                <h2 className="font-display text-2xl text-center text-ink mb-6">
                    {isLogin ? 'Welcome back' : 'Create an account'}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email', { required: 'Email is required' })}
                            className={`w-full h-11 px-4 border ${errors.email ? 'border-error' : 'border-hairline'
                                } rounded-md text-sm bg-surface-soft placeholder-muted-soft focus:outline-none focus:ring-2 focus:ring-ink/20 transition`}
                        />
                        {errors.email && (
                            <p className="text-xs text-error mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                {...register('password', {
                                    required: 'Password is required',
                                    validate: (value) => {
                                        const errs = [];
                                        if (value.length < 8)
                                            errs.push('Password must be at least 8 characters');
                                        if (!/[A-Za-z]/.test(value))
                                            errs.push('Password must contain at least one letter');
                                        if (!/\d/.test(value))
                                            errs.push('Password must contain at least one number');
                                        return errs.length > 0 ? errs.join(', ') : true;
                                    },
                                })}
                                className={`w-full h-11 px-4 pr-10 border ${errors.password ? 'border-error' : 'border-hairline'
                                    } rounded-md text-sm bg-surface-soft placeholder-muted-soft focus:outline-none focus:ring-2 focus:ring-ink/20 transition`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-muted hover:text-ink"
                                tabIndex={-1}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="w-4 h-4" />
                                ) : (
                                    <FaEye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        <PasswordErrors error={errors.password} />
                    </div>

                    {/* Form error */}
                    {formError && (
                        <p className="text-sm text-error text-center">{formError}</p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full h-11 text-sm font-semibold rounded-md transition active:scale-[0.98] cursor-pointer ${isLoading
                            ? 'bg-muted-soft cursor-not-allowed text-white'
                            : 'bg-primary text-on-primary hover:opacity-90'
                            }`}
                    >
                        {isLoading
                            ? isLogin
                                ? 'Logging in...'
                                : 'Signing up...'
                            : isLogin
                                ? 'Log In'
                                : 'Sign Up'}
                    </button>
                </form>

                {/* Switch */}
                <p className="text-sm text-muted text-center mt-6">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <Link
                        href={isLogin ? '/signup' : '/login'}
                        className="text-ink font-semibold hover:underline underline-offset-2"
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
