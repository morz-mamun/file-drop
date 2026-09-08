import { featuresData } from "@/constants/data";

const cardStyles = [
    { bg: "bg-brand-pink", text: "text-white", iconBg: "bg-white/20" },
    { bg: "bg-brand-teal", text: "text-white", iconBg: "bg-white/15" },
    { bg: "bg-brand-lavender", text: "text-ink", iconBg: "bg-white/40" },
];

const Features = () => {
    return (
        <section id="features" className="py-24 bg-canvas scroll-mt-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <span className="block text-center text-xs font-semibold tracking-widest uppercase text-muted mb-3">
                    Why File-Drop
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-center text-ink mb-14">
                    Everything you need to share files
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {featuresData.map(({ icon: Icon, title, description }, idx) => {
                        const style = cardStyles[idx % cardStyles.length];
                        return (
                            <div
                                key={title}
                                className={`${style.bg} ${style.text} p-8 rounded-xl transition-transform duration-300 hover:-translate-y-1`}
                            >
                                <div className={`w-11 h-11 ${style.iconBg} rounded-md flex items-center justify-center mb-6`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                                <p className={`text-sm leading-relaxed ${style.text === 'text-white' ? 'text-white/80' : 'text-ink/70'}`}>
                                    {description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
