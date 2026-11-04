import React, { useState, useEffect } from 'react';
import {
    Clock,
    Flame,
    Lock,
    Unlock,
    Radio,
    ChevronDown,
    ChevronUp,
    Sparkles,
    Calendar,
    ArrowUpRight,
    Zap,
} from 'lucide-react';

export default function ScheduledQueueTracker({
    scheduledArticles = [],
    onSelectArticle,
}) {
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [isExpanded, setIsExpanded] = useState(false);

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Split into live and upcoming
    const liveStories = scheduledArticles.filter((art) => {
        return new Date(art.publishedAt || art.scheduledFor).getTime() <= currentTime;
    });

    const upcomingStories = scheduledArticles.filter((art) => {
        return new Date(art.publishedAt || art.scheduledFor).getTime() > currentTime;
    }).sort((a, b) => new Date(a.publishedAt || a.scheduledFor) - new Date(b.publishedAt || b.scheduledFor));

    const nextStory = upcomingStories[0] || null;

    // Calculate countdown to nextStory
    let countdownText = 'All 50 stories live!';
    let countdownSeconds = 0;
    if (nextStory) {
        const diffMs = Math.max(0, new Date(nextStory.publishedAt || nextStory.scheduledFor).getTime() - currentTime);
        countdownSeconds = Math.floor(diffMs / 1000);
        const mins = Math.floor(countdownSeconds / 60);
        const secs = countdownSeconds % 60;
        countdownText = `${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
    }

    return (
        <div className="relative mx-auto max-w-7xl px-5 pt-4 md:px-8">
            <div className="overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-card/90 via-card to-card/90 p-4 shadow-lg backdrop-blur-md">
                {/* Main banner row */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {/* Status beacon */}
                    <div className="flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
                        </span>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-display text-xs font-black uppercase tracking-wider text-primary">
                                    1-Hour Scheduled Publishing Wire
                                </span>
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary border border-primary/20">
                                    50 Trending Posts
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {nextStory ? (
                                    <>
                                        Next breaking story drops in{' '}
                                        <span className="font-mono font-bold text-foreground">
                                            {countdownText}
                                        </span>
                                        {' '}: <span className="text-foreground/90 italic">"{nextStory.title.slice(0, 42)}…"</span>
                                    </>
                                ) : (
                                    'All 50 scheduled trending stories are live and verified!'
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Stats & expand toggle */}
                    <div className="flex items-center gap-2.5">
                        <div className="flex items-center gap-1.5 rounded-xl border border-border bg-muted/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                            <Zap className="h-3.5 w-3.5 text-primary" />
                            <span><strong className="text-foreground">{liveStories.length}</strong> Live</span>
                            <span>•</span>
                            <span><strong className="text-foreground">{upcomingStories.length}</strong> In Queue</span>
                        </div>
                        {upcomingStories.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="inline-flex items-center gap-1 rounded-xl border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-all hover:bg-primary/20 active:scale-95"
                            >
                                {isExpanded ? (
                                    <>
                                        <span>Hide Wire</span>
                                        <ChevronUp className="h-3.5 w-3.5" />
                                    </>
                                ) : (
                                    <>
                                        <span>Preview Queue</span>
                                        <ChevronDown className="h-3.5 w-3.5" />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Expanded Queue Drawer */}
                {isExpanded && upcomingStories.length > 0 && (
                    <div className="mt-4 border-t border-border/60 pt-4">
                        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                            <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-primary" />
                                Upcoming 1-Hour Release Schedule ({upcomingStories.length} stories remaining)
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                                Auto-unlocks hourly • No reload needed
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 max-h-72 overflow-y-auto p-1">
                            {upcomingStories.map((story, idx) => {
                                const targetDate = new Date(story.publishedAt || story.scheduledFor);
                                const diffHours = Math.round((targetDate.getTime() - currentTime) / (1000 * 60 * 60));
                                const timeLabel = diffHours <= 1 ? 'Drops in < 1h' : `Drops in ~${diffHours}h`;

                                return (
                                    <div
                                        key={story.id || idx}
                                        className="group relative flex flex-col justify-between rounded-xl border border-border/60 bg-muted/20 p-3 transition-all hover:border-primary/40 hover:bg-muted/40"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-1.5">
                                                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                                                    {story.platform}
                                                </span>
                                                <span className="flex items-center gap-1 text-[10px] font-mono font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                                                    <Lock className="h-2.5 w-2.5" />
                                                    {timeLabel}
                                                </span>
                                            </div>
                                            <h5 className="text-xs font-bold leading-snug text-foreground line-clamp-2">
                                                {story.title}
                                            </h5>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                                            <span>By {story.author}</span>
                                            <span>{targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
