import { FilePreviewProps } from '@/constants/type';
import { FiFile, FiX } from 'react-icons/fi';

const FilePreview = ({ file, previewUrl, onRemove }: FilePreviewProps) => {
    return (
        <div className="relative w-36 h-44 flex flex-col items-center justify-start" onClick={(e) => e.stopPropagation()}>
            {file.type.startsWith('image/') && previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt={file.name} className="h-32 w-32 object-cover rounded-xl border border-hairline" />
            ) : file.type === 'application/pdf' ? (
                <div className="h-32 w-32 rounded-xl bg-surface-card flex items-center justify-center">
                    <FiFile className="h-12 w-12 text-muted" />
                </div>
            ) : null}

            <p className="text-xs text-center mt-2 truncate max-w-[8rem] text-body">{file.name}</p>

            <button
                type="button"
                onClick={onRemove}
                className="absolute -top-1 right-1 p-1 rounded-full bg-canvas text-muted border border-hairline hover:bg-error hover:text-white hover:border-error transition-colors shadow-sm"
                aria-label={`Remove ${file.name}`}
            >
                <FiX size={16} />
            </button>
        </div>
    )
};

export default FilePreview;
