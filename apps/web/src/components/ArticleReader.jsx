import React, { useEffect, useState } from 'react';
import {
    X,
    Clock,
    Calendar,
    Link2,
    Check,
    CheckCircle2,
    ExternalLink,
    Copy,
    ShieldCheck,
} from 'lucide-react';
import { ModalSponsorUnit } from '@/components/AdSlot';
import { formatDateline, formatRelative } from '@/lib/datetime';

const DEFAULT_SOURCES = [
    { name: 'IGN', url: 'https://www.ign.com' },
    { name: 'GameSpot', url: 'https://www.gamespot.com' },
    { name: 'Eurogamer', url: 'https://www.eurogamer.net' },
    { name: 'PlayStation Blog', url: 'https://blog.playstation.com' },
];

function PlatformChip({ platform, meta }) {
    if (!meta) return null;
    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${meta.chip}`}>
            {meta.label}
        </span>
    );
}

export default function ArticleReader({ article, platformMeta, onClose }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    if (!article) return null;

    const meta = platformMeta ? platformMeta[article.platform] : null;
    const sources = article.sources || DEFAULT_SOURCES;
    const sections = article.sections || [
        { heading: 'Introduction', paragraphs: [article.excerpt || ''] },
    ];

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative my-6 w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    type="button"
                    aria-label="Close article"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70"
                >
                    <X className="h-5 w-5" strokeWidth={2.5} />
                </button>

                {/* Banner image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                    {article.imageUrl ? (
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient || 'from-violet-600/40 to-transparent'}`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    {/* Watermark badge */}
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                        <ShieldCheck className="h-3 w-3 text-primary" strokeWidth={2.5} />
                        AdilLoop News · Verified
                    </div>
                </div>

                {/* Body */}
                <div className="px-6 pb-10 pt-6 md:px-10">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3">
                        {meta && <PlatformChip platform={article.platform} meta={meta} />}
                        <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                            {article.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" strokeWidth={2.5} />
                            {article.readTime || ''}
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
                        {article.title}
                    </h1>

                    {/* Dateline */}
                    {article.publishedAt && (
                        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                            <Calendar className="h-3.5 w-3.5" strokeWidth={2.5} />
                            {formatDateline(article.publishedAt)}
                        </p>
                    )}

                    {/* Author / timestamp */}
                    <div className="mt-5 flex flex-wrap items-center gap-4 border-b border-border pb-5 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-[11px] font-bold text-primary">
                                {(article.author || 'AL').split(' ').map((n) => n[0]).join('')}
                            </span>
                            <span className="font-semibold text-foreground">{article.author || 'AdilLoop News'}</span>
                        </span>
                        {article.publishedAt && (
                            <span className="inline-flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" strokeWidth={2.5} />
                                {formatRelative(article.publishedAt)}
                            </span>
                        )}
                        <CheckCircle2 className="h-4 w-4 text-primary" strokeWidth={2.5} />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Verified</span>
                    </div>

                    {/* Article sections */}
                    <div className="mt-8 space-y-8">
                        {sections.map((sec, i) => (
                            <section key={i}>
                                <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                                    {sec.heading}
                                </h2>
                                {sec.paragraphs.map((p, j) => (
                                    <p key={j} className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                                        {p}
                                    </p>
                                ))}
                            </section>
                        ))}
                    </div>

                    {/* In-article sponsor unit */}
                    <ModalSponsorUnit />

                    {/* Sources & references */}
                    <div className="mt-10 rounded-2xl border border-border bg-card/50 p-6">
                        <h3 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.16em] text-foreground">
                            <Link2 className="h-4 w-4 text-primary" strokeWidth={2.5} />
                            Sources &amp; References
                        </h3>
                        <ul className="mt-4 space-y-2">
                            {sources.map((src) => (
                                <li key={src.url}>
                                    <a
                                        href={src.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5 text-primary/70 transition-colors group-hover:text-primary" strokeWidth={2.5} />
                                        {src.name}
                                        <span className="text-xs text-muted-foreground/60">{src.url.replace('https://www.', '').replace('https://', '')}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-5 border-t border-border pt-4 text-xs italic leading-relaxed text-muted-foreground">
                            This article is independently written using information from the sources listed above. All original reporting and trademarks belong to their respective owners.
                        </p>
                    </div>

                    {/* Footer actions */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wider transition-colors hover:border-primary/50 hover:text-primary"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4 text-primary" strokeWidth={2.5} />
                                    Link copied
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4" strokeWidth={2.5} />
                                    Copy link
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                        >
                            <X className="h-4 w-4" strokeWidth={2.5} />
                            Close Article
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
