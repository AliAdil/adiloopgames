import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    Search,
    X,
    Flame,
    Clock,
    Sparkles,
    ArrowUpRight,
    Gamepad2,
    Layers,
    AlertCircle,
    CheckCircle2,
} from 'lucide-react';

const TRENDING_SUGGESTIONS = [
    'GTA VI',
    'Switch 2',
    'PS5 Pro',
    'Xbox Handheld',
    'RTX 5090',
    'Elden Ring',
    'Deadlock',
    'Ghost of Yōtei',
    'Wolverine',
    'Unreal Engine 6',
];

const PLATFORM_CHIPS = [
    { id: 'all', label: 'All' },
    { id: 'playstation', label: 'PlayStation' },
    { id: 'xbox', label: 'Xbox' },
    { id: 'nintendo', label: 'Nintendo' },
    { id: 'pc', label: 'PC' },
    { id: 'esports', label: 'Esports' },
];

export default function SearchDialog({
    isOpen,
    onClose,
    articles = [],
    onSelectArticle,
}) {
    const [query, setQuery] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const inputRef = useRef(null);

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Filter results
    const results = useMemo(() => {
        if (!query.trim()) {
            return [];
        }
        const q = query.toLowerCase().trim();
        return articles.filter((article) => {
            if (selectedPlatform !== 'all' && article.platform !== selectedPlatform) {
                return false;
            }
            const matchTitle = article.title?.toLowerCase().includes(q);
            const matchExcerpt = article.excerpt?.toLowerCase().includes(q);
            const matchAuthor = article.author?.toLowerCase().includes(q);
            const matchPlatform = article.platform?.toLowerCase().includes(q);
            const matchCategory = article.category?.toLowerCase().includes(q);
            const matchSections = article.sections?.some((s) =>
                s.heading?.toLowerCase().includes(q) ||
                s.paragraphs?.some((p) => p.toLowerCase().includes(q))
            );
            return matchTitle || matchExcerpt || matchAuthor || matchPlatform || matchCategory || matchSections;
        });
    }, [query, selectedPlatform, articles]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 p-4 pt-16 backdrop-blur-md sm:pt-24"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Search articles"
        >
            <div className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-2xl shadow-primary/10">
                {/* Search Bar Input */}
                <div className="flex items-center gap-3 border-b border-border/80 px-4 py-3.5">
                    <Search className="h-5 w-5 text-primary shrink-0" strokeWidth={2.5} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search 90+ stories, platforms, games (e.g. GTA VI, Switch 2, RTX)..."
                        className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            aria-label="Clear search"
                            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-border bg-muted/50 px-2 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground"
                    >
                        ESC
                    </button>
                </div>

                {/* Filter chips bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto border-b border-border/60 bg-muted/20 px-4 py-2 scrollbar-none">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider shrink-0 mr-1">
                        Filter:
                    </span>
                    {PLATFORM_CHIPS.map((chip) => {
                        const active = selectedPlatform === chip.id;
                        return (
                            <button
                                key={chip.id}
                                type="button"
                                onClick={() => setSelectedPlatform(chip.id)}
                                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all shrink-0 ${
                                    active
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                {chip.label}
                            </button>
                        );
                    })}
                </div>

                {/* Results or Empty State */}
                <div className="max-h-[60vh] overflow-y-auto p-4">
                    {query.trim() === '' ? (
                        <div>
                            <div className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                <Flame className="h-3.5 w-3.5 text-primary" />
                                Trending Topics Right Now
                            </div>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {TRENDING_SUGGESTIONS.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => setQuery(tag)}
                                        className="rounded-xl border border-border/80 bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>

                            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Top Verified Stories
                            </div>
                            <div className="space-y-2">
                                {articles.slice(0, 3).map((art, idx) => (
                                    <div
                                        key={art.id || idx}
                                        onClick={() => {
                                            onSelectArticle(art);
                                            onClose();
                                        }}
                                        className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-transparent p-2.5 transition-all hover:border-primary/40 hover:bg-muted/40"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            {art.imageUrl && (
                                                <img
                                                    src={art.imageUrl}
                                                    alt={art.title}
                                                    className="h-11 w-11 rounded-lg object-cover shrink-0"
                                                />
                                            )}
                                            <div className="min-w-0">
                                                <p className="truncate text-xs font-semibold text-foreground group-hover:text-primary">
                                                    {art.title}
                                                </p>
                                                <p className="text-[11px] text-muted-foreground flex items-center gap-2">
                                                    <span className="capitalize">{art.platform}</span>
                                                    <span>•</span>
                                                    <span>{art.readTime || '5 min read'}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="space-y-2">
                            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                                <span>Found <strong className="text-foreground">{results.length}</strong> {results.length === 1 ? 'story' : 'stories'} matching "{query}"</span>
                                {selectedPlatform !== 'all' && (
                                    <span className="capitalize">in {selectedPlatform}</span>
                                )}
                            </div>
                            {results.map((art, idx) => (
                                <div
                                    key={art.id || idx}
                                    onClick={() => {
                                        onSelectArticle(art);
                                        onClose();
                                    }}
                                    className="group flex cursor-pointer items-start gap-3 rounded-xl border border-border/60 bg-card/60 p-3 transition-all hover:border-primary/50 hover:bg-muted/40"
                                >
                                    {art.imageUrl && (
                                        <img
                                            src={art.imageUrl}
                                            alt={art.title}
                                            className="h-16 w-16 rounded-xl object-cover shrink-0 border border-border/80"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                                                {art.platform}
                                            </span>
                                            {art.category && (
                                                <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                                                    {art.category}
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="text-xs font-bold leading-snug text-foreground group-hover:text-primary line-clamp-2">
                                            {art.title}
                                        </h4>
                                        {art.excerpt && (
                                            <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">
                                                {art.excerpt}
                                            </p>
                                        )}
                                        <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                                            <span>By {art.author || 'Editorial Desk'}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {art.readTime || '5 min read'}
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary mt-1" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                            <p className="text-sm font-semibold text-foreground">No matching stories found</p>
                            <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
                                No articles matched "{query}" in {selectedPlatform === 'all' ? 'any category' : selectedPlatform}. Try searching for "GTA", "Switch", "RTX", or change the filter.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer instructions */}
                <div className="flex items-center justify-between border-t border-border/80 bg-muted/30 px-4 py-2.5 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">ESC</kbd>
                        to close
                    </span>
                    <span className="flex items-center gap-1.5">
                        <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">↵</kbd>
                        to read story
                    </span>
                </div>
            </div>
        </div>
    );
}
