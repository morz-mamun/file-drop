'use client';
import { features } from "@/constants/data";
import UploadArea from "./UploadArea";
import { FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
import { uploadFilesToServer } from "@/utils/uploadFilesToServer";
import { toast } from "sonner";
import UploadSuccessModal from "./UploadSuccessModal";

const Hero = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedUrls, setUploadedUrls] = useState<string[] | null>(null);

    const handleUpload = async () => {
        setIsUploading(true);
        const result = await uploadFilesToServer(files);
        setIsUploading(false);

        if (result.success && result.urls) {
            toast.success('Uploaded successfully');
            setFiles([]);
            setUploadedUrls(result.urls);
        } else {
            toast.error('Upload failed: ' + result.error);
        }
    };

    return (
        <section className="relative overflow-hidden bg-canvas py-20 md:py-28">
            <div className="pointer-events-none absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-brand-lavender/70 via-brand-lavender/35 to-transparent blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-brand-peach/70 via-brand-peach/35 to-transparent blur-3xl" />

            <div className="container mx-auto px-4 relative">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="inline-flex items-center gap-2 rounded-pill bg-surface-card px-4 py-1.5 text-xs font-semibold tracking-wide text-body-strong uppercase mb-6">
                        Free forever &middot; No signup required
                    </span>

                    <h1 className="font-display text-5xl md:text-6xl text-ink mb-6">
                        Upload and share files <span className="text-brand-coral">instantly</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted mb-10 max-w-xl mx-auto leading-relaxed">
                        A simple and fast way to upload PDFs and images, and get shareable URLs in seconds.
                    </p>

                    {/* Upload box + previews */}
                    <UploadArea
                        files={files}
                        setFiles={setFiles}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                    />

                    {/* Upload button */}
                    {files.length > 0 && (
                        <button
                            onClick={handleUpload}
                            type="button"
                            disabled={isUploading}
                            className="px-7 h-12 bg-primary text-on-primary rounded-md font-semibold transition-opacity cursor-pointer hover:opacity-90 disabled:opacity-50"
                        >
                            {isUploading ? 'Uploading...' : 'Upload Files'}
                        </button>
                    )}

                    {/* Feature list */}
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-body mt-12">
                        {features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                                <FiCheckCircle className="h-5 w-5 text-brand-mint" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Upload Success Modal */}
            {uploadedUrls && (
                <UploadSuccessModal
                    urls={uploadedUrls}
                    onClose={() => setUploadedUrls(null)}
                />
            )}
        </section>
    );
};

export default Hero;
