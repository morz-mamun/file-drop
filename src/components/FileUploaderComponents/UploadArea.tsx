'use client';
import { FiUploadCloud } from "react-icons/fi";
import FilePreview from "./FilePreview";
import { useEffect, useRef, useState } from "react";
import { UploadAreaProps } from "@/constants/type";

const UploadArea = ({ files, setFiles, errorMessage, setErrorMessage }: UploadAreaProps) => {
    const [dragActive, setDragActive] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Validate files
    function validateFiles(newFiles: File[]): boolean {
        setErrorMessage('');

        if (newFiles.length > 3) {
            setErrorMessage('You can upload a maximum of 3 files at a time.');
            return false;
        }

        const allImages = newFiles.every((file) => file.type.startsWith('image/'));
        const allPDFs = newFiles.every((file) => file.type === 'application/pdf');

        if (!(allImages || allPDFs)) {
            setErrorMessage('Please upload only images or only PDF files at one time.');
            return false;
        }

        return true;
    }

    // Generate image previews
    useEffect(() => {
        if (files.length === 0) {
            setPreviews([]);
            return;
        }

        if (files[0].type.startsWith('image/')) {
            const urls = files.map((file) => URL.createObjectURL(file));
            setPreviews(urls);

            return () => urls.forEach((url) => URL.revokeObjectURL(url));
        } else {
            setPreviews([]);
        }
    }, [files]);

    // Drag handlers
    function onDragEnter(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }

    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        if (validateFiles(droppedFiles)) {
            setFiles(droppedFiles);
        }
    }

    // File dialog open
    function openFileDialog() {
        inputRef.current?.click();
    }

    // Handle input change
    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);
        if (validateFiles(selectedFiles)) {
            setFiles(selectedFiles);
        }
    }

    // Remove file
    function removeFile(index: number) {
        const updated = [...files];
        updated.splice(index, 1);
        setFiles(updated);
    }

    const uploadBoxClass = dragActive
        ? 'border-ink/40 bg-white/50'
        : 'border-white/60 bg-white/25 hover:bg-white/35 hover:border-white/80';

    return (
        <>
            <div
                className={`w-full max-w-xl mx-auto mb-6 p-5 border-2 border-dashed rounded-xl cursor-pointer backdrop-blur-xl shadow-[0_8px_32px_rgba(31,20,10,0.08)] transition-colors duration-300 ease-in-out ${uploadBoxClass}`}
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={openFileDialog}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') openFileDialog();
                }}
            >
                <input
                    type="file"
                    multiple
                    ref={inputRef}
                    onChange={onFileChange}
                    className="hidden"
                    accept="image/*,application/pdf"
                />

                {files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-12">
                        <div className="w-14 h-14 rounded-full bg-white/50 backdrop-blur-sm border border-white/60 flex items-center justify-center">
                            <FiUploadCloud className="h-7 w-7 text-body-strong" />
                        </div>
                        <p className="text-lg font-semibold text-ink">Drag and drop files here</p>
                        <p className="text-sm text-muted">or click to browse</p>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                openFileDialog();
                            }}
                            className="px-5 h-11 bg-primary text-on-primary rounded-md font-semibold transition-opacity cursor-pointer hover:opacity-90"
                        >
                            Select Files
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center items-center gap-6 py-4 max-h-[240px] overflow-y-auto">
                        {files.map((file, index) => (
                            <FilePreview
                                key={index}
                                file={file}
                                previewUrl={previews[index]}
                                onRemove={() => removeFile(index)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {errorMessage && <p className="text-error mb-4 text-sm font-medium">{errorMessage}</p>}
        </>
    );
};

export default UploadArea;
