import { fileTypes } from "@/constants/data";

const FileType = () => {
    return (
        <section className="py-20 bg-canvas">
            <div className="container mx-auto px-5 max-w-3xl">
                <h2 className="font-display text-3xl md:text-4xl text-center text-ink mb-4">
                    Supported file types
                </h2>
                <p className="text-center text-muted mb-12 text-base max-w-xl mx-auto leading-relaxed">
                    File-Drop supports a wide range of file formats to meet all your sharing needs.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                    {fileTypes.map(({ type, label }) => (
                        <div
                            key={type}
                            className="flex items-center gap-2.5 bg-surface-card border border-hairline rounded-pill px-5 py-2.5 hover:bg-surface-strong transition-colors"
                        >
                            <span className="font-mono font-bold text-sm tracking-wide text-ink">
                                {type}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-muted-soft" />
                            <span className="text-xs text-muted">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FileType;
