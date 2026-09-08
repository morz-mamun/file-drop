'use client';

import { useAuthStore } from '@/store/authStore';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaEye, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { fetchUserFiles } from '@/utils/fetchUserFiles';
import { deleteFile } from '@/utils/deleteFile';
import UserSkeleton from './UserSkeleton';
import { UserFile } from '@/constants/type';
import { toast } from 'sonner';

const Dashboard = () => {
    const [files, setFiles] = useState<UserFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(true);
    const [deletingFileId, setDeletingFileId] = useState<string | null>(null);

    const { user } = useAuthStore();

    useEffect(() => {
        const loadFiles = async () => {
            setLoading(true);
            const fetchedFiles = await fetchUserFiles();
            setFiles(fetchedFiles);
            setLoading(false);
        };

        const delayProfile = () => {
            setProfileLoading(true);
            setTimeout(() => setProfileLoading(false), 700);
        };

        delayProfile();
        loadFiles();
    }, []);

    const username = user?.username || '';
    const email = user?.email || '';
    const profilepic = `https://placehold.co/600x400?text=${username[0]}`;
    const created_at = user?.created_at ? dayjs(user.created_at).format('MMMM D, YYYY') : null;

    const totalStorageMB =
        files.reduce((acc, file) => acc + parseInt(file.filesize || '0'), 0) / (1024 * 1024);

    const stats = [
        { label: 'Files Uploaded', value: files.length, bg: 'bg-brand-lavender' },
        { label: 'Storage Used', value: `${totalStorageMB.toFixed(2)} MB`, bg: 'bg-brand-peach' },
        { label: 'Plan', value: 'Free', bg: 'bg-brand-mint' },
    ];

    const handleDelete = (fileId: string) => {
        const deletedFile = files.find((file) => file.id === fileId);
        if (!deletedFile) return;

        toast('Are you sure you want to delete this file?', {
            action: {
                label: 'Yes, Delete',
                onClick: async () => {
                    try {
                        setDeletingFileId(fileId);

                        toast.promise(
                            deleteFile(fileId),
                            {
                                loading: 'Deleting file...',
                                success: 'File deleted successfully',
                                error: 'Failed to delete file',
                            }
                        );
                        setFiles((prev) => prev.filter((file) => file.id !== fileId));
                    } catch (err) {
                        console.error(err);
                    } finally {
                        setDeletingFileId(null);
                    }
                },
            },
        });
    };


    return (
        <div className="min-h-screen bg-canvas py-10 px-4 text-body">
            <div className="max-w-6xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2.5">
                        <Image src="/logo.png" alt="logo" width={36} height={36} />
                        <span className="text-xl font-display text-ink select-none">File-Drop</span>
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-primary text-on-primary font-semibold transition hover:opacity-90 active:scale-95 focus:outline-none"
                    >
                        <FiUpload className="w-4 h-4" />
                        Upload File
                    </Link>
                </div>

                {/* Profile */}
                <div className="relative bg-surface-card border border-hairline rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between min-h-[120px]">
                    {profileLoading ? (
                        <UserSkeleton />
                    ) : (
                        <>
                            <div className="flex items-center gap-5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={profilepic}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover border-2 border-canvas shadow-sm"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-ink">{username}</h2>
                                    <p className="text-sm text-muted">{email}</p>
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-0 text-sm text-body sm:text-right space-y-1">
                                {created_at && (
                                    <p className="flex items-center justify-start sm:justify-end gap-2">
                                        <FaCalendarAlt className="text-muted" />
                                        <span>Joined:</span>
                                        <span className="font-semibold text-ink">{created_at}</span>
                                    </p>
                                )}

                            </div>
                        </>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className={`rounded-xl ${stat.bg} p-6 text-center`}
                        >
                            <p className="text-sm text-ink/70 font-medium">{stat.label}</p>
                            <p className="text-2xl font-display text-ink mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Files Table */}
                <div className="border border-hairline rounded-xl overflow-x-auto bg-canvas">
                    {loading ? (
                        <div className="text-center py-10 text-muted">Loading files...</div>
                    ) : (
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-surface-soft text-body text-[12px] uppercase tracking-wide border-b border-hairline">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">File Name</th>
                                    <th className="px-6 py-4 font-semibold">Type</th>
                                    <th className="px-6 py-4 font-semibold">Size</th>
                                    <th className="px-6 py-4 font-semibold">Uploaded</th>
                                    <th className="px-6 py-4 font-semibold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-[15px]">
                                {files.map((file) => (
                                    <tr
                                        key={file?.id}
                                        className="border-t border-hairline hover:bg-surface-soft transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-ink whitespace-nowrap">
                                            {file?.filename}
                                        </td>
                                        <td className="px-6 py-4 text-body">{file?.filetype}</td>
                                        <td className="px-6 py-4 text-body">
                                            {(parseInt(file?.filesize) / (1024 * 1024)).toFixed(2)} MB
                                        </td>
                                        <td className="px-6 py-4 text-body">
                                            {dayjs(file?.created_at).format('MMMM D, YYYY')}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-2 justify-center">
                                                <a
                                                    href={file?.fileurl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-surface-card text-body hover:bg-surface-strong hover:text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-hairline"
                                                >
                                                    <FaEye className="w-4 h-4" />
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(file.id)}
                                                    aria-label="Delete file"
                                                    disabled={deletingFileId === file.id}
                                                    className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-error/10 text-error hover:bg-error/20 transition-colors focus:outline-none focus:ring-2 focus:ring-error/30"
                                                >
                                                    <FaTrash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {files.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-10 text-muted">
                                            No files uploaded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
