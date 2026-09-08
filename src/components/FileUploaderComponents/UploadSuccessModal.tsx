'use client';
import { useState } from "react";
import { toast } from "sonner";
import { FiClipboard, FiCheck } from "react-icons/fi";
import { UploadSuccessModalProps } from "@/constants/type";

const UploadSuccessModal: React.FC<UploadSuccessModalProps> = ({ urls, onClose }) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    const copyToClipboard = (url: string, index: number) => {
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 800);
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300); // match animation duration
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm px-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-canvas w-full max-w-md p-7 rounded-xl shadow-xl text-center transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="w-12 h-12 rounded-full bg-brand-mint/30 flex items-center justify-center mx-auto mb-4">
                    <FiCheck className="w-6 h-6 text-body-strong" />
                </div>
                <h2 className="font-display text-2xl text-ink mb-2">Upload successful</h2>
                <p className="text-muted mb-5">
                    Here {urls.length > 1 ? "are your links" : "is your link"}:
                </p>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                    {urls.map((url, index) => (
                        <div key={index} className="flex items-center gap-2 border border-hairline bg-surface-soft rounded-md px-3 py-2">
                            <input
                                value={url}
                                readOnly
                                className="flex-1 text-sm bg-transparent outline-none text-body"
                            />
                            <button
                                onClick={() => copyToClipboard(url, index)}
                                className="p-2 rounded-md border border-hairline bg-canvas hover:bg-surface-card transition-colors"
                                title="Copy link"
                            >
                                {copiedIndex === index ? (
                                    <FiCheck size={18} className="text-success transition-all duration-300" />
                                ) : (
                                    <FiClipboard size={18} className="text-ink transition-all duration-300" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleClose}
                    className="mt-6 w-full h-11 rounded-md bg-primary text-on-primary hover:opacity-90 transition-opacity font-semibold"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default UploadSuccessModal;
