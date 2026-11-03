import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
    Shield,
    Newspaper,
    Sparkles,
    Send,
    ToggleLeft,
    ToggleRight,
    Terminal,
    ArrowLeft,
    Activity,
    Database,
    Cpu,
    Globe,
    Zap,
    CheckCircle2,
    Clock,
    Rocket,
    Lock,
    LogOut,
    AlertCircle,
    Eye,
    EyeOff,
    Mail,
    Users,
    Download,
    Megaphone,
    FileText,
    TrendingUp,
    DollarSign,
    MousePointerClick,
    Copy,
    Check,
} from 'lucide-react';
import { ADSENSE_ID_KEY, AD_CONFIG_KEY, readAdConfig } from '@/components/AdSlot';

const SUBSCRIBERS_KEY = 'adiloop_newsletter_subscribers';
const SENDER_EMAIL = 'ali@adiloopgames.com';

const SOURCES = [
    'IGN', 'GameSpot', 'PC Gamer', 'Eurogamer', 'GamesRadar+', 'Polygon',
    'Kotaku', 'VGC', 'The Gamer', 'Rock Paper Shotgun', 'Gematsu',
    'PlayStation Blog', 'Xbox Wire', 'Nintendo News',
];

const DISCOVERED = [
    { title: 'Bethesda teases new IP at internal showcase', source: 'IGN', time: '4 min ago' },
    { title: 'Capcom confirms Monster Hunter Wilds expansion', source: 'GameSpot', time: '12 min ago' },
    { title: 'Valve patches Steam Deck OLED firmware', source: 'PC Gamer', time: '21 min ago' },
    { title: 'FromSoft hints at Elden Ring DLC roadmap', source: 'Eurogamer', time: '38 min ago' },
    { title: 'Square Enix registers new Final Fantasy trademark', source: 'Gematsu', time: '52 min ago' },
];

const LOG_SEED = [
    '[crawler] sync started — 14 sources',
    '[cluster] grouping 265 discovered stories',
    '[gemini] generating article: "GTA VI Fall 2026 delay"',
    '[publish] article #0042 live → /latest',
    '[crawler] IGN → 3 new stories',
    '[crawler] GameSpot → 2 new stories',
    '[cluster] dedupe match: 0.94 → merged',
    '[gemini] draft ready for review',
    '[crawler] Eurogamer → 1 new story',
    '[publish] article #0043 live → /latest',
];

const AUTH_KEY = 'adiloop_admin_auth';
const MASTER_KEY = 'adiloop2026!';

function StatCard({ icon: Icon, value, label, accent }) {
    return (
        <div className="rounded-2xl border border-border bg-card/50 p-6">
            <div className="flex items-center justify-between">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
                    <Icon className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <Activity className="h-4 w-4 text-primary/40" strokeWidth={2.5} />
            </div>
            <div className="mt-4 font-display text-4xl font-extrabold text-foreground">
                {value}
            </div>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {label}
            </p>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Staff login screen                                                 */
/* ------------------------------------------------------------------ */

function StaffLogin({ onUnlock }) {
    const [key, setKey] = useState('');
    const [error, setError] = useState(false);
    const [showKey, setShowKey] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (key === MASTER_KEY) {
            try {
                localStorage.setItem(AUTH_KEY, 'true');
            } catch {
                /* ignore storage errors */
            }
            setError(false);
            onUnlock();
        } else {
            setError(true);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative w-full max-w-md">
                <div className="mb-8 flex flex-col items-center text-center">
                    <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_0_40px_-8px_hsl(74_85%_58%/0.6)]">
                        <Shield className="h-8 w-8" strokeWidth={2.5} />
                    </span>
                    <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                        AdilLoop Games Newsroom · Staff Access
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Enter your admin master key to access newsroom automation controls.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl border border-border bg-card/50 p-7 backdrop-blur-xl"
                >
                    <label
                        htmlFor="master-key"
                        className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                    >
                        Admin Master Key
                    </label>
                    <div className="relative mt-2">
                        <input
                            id="master-key"
                            type={showKey ? 'text' : 'password'}
                            value={key}
                            onChange={(e) => {
                                setKey(e.target.value);
                                if (error) setError(false);
                            }}
                            placeholder="Enter admin master key..."
                            autoFocus
                            className="h-12 w-full rounded-xl border border-border bg-background/60 px-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <button
                            type="button"
                            onClick={() => setShowKey((s) => !s)}
                            aria-label={showKey ? 'Hide key' : 'Show key'}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-primary"
                        >
                            {showKey ? (
                                <EyeOff className="h-4 w-4" strokeWidth={2.5} />
                            ) : (
                                <Eye className="h-4 w-4" strokeWidth={2.5} />
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300">
                            <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                            Invalid access key. Access denied.
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                        <Lock className="h-4 w-4" strokeWidth={2.5} />
                        Unlock Dashboard
                    </button>

                    <Link
                        to="/"
                        className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Back to Public Site
                    </Link>
                </form>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Newsletter & Subscribers Hub                                       */
/* ------------------------------------------------------------------ */

function readSubscribers() {
    try {
        const raw = localStorage.getItem(SUBSCRIBERS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function NewsletterHub() {
    const [subscribers, setSubscribers] = useState(() => readSubscribers());
    const [dispatching, setDispatching] = useState(false);
    const [dispatched, setDispatched] = useState(false);

    const refresh = () => setSubscribers(readSubscribers());

    useEffect(() => {
        const sync = () => refresh();
        window.addEventListener('storage', sync);
        window.addEventListener('focus', sync);
        return () => {
            window.removeEventListener('storage', sync);
            window.removeEventListener('focus', sync);
        };
    }, []);

    const handleDispatch = () => {
        if (subscribers.length === 0) return;
        setDispatching(true);
        setDispatched(false);
        setTimeout(() => {
            setDispatching(false);
            setDispatched(true);
            setTimeout(() => setDispatched(false), 4000);
        }, 1600);
    };

    const handleExport = () => {
        const header = 'email,subscribed_at\n';
        const rows = subscribers
            .map((email) => `${email},${new Date().toISOString()}`)
            .join('\n');
        const csv = header + rows;
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'adiloop_subscribers.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <section className="mt-12 rounded-2xl border border-border bg-card/40 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                        <Mail className="h-5 w-5 text-primary" strokeWidth={2.5} />
                        Newsletter &amp; Subscribers Hub
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Active sender:{' '}
                        <span className="font-semibold text-foreground">{SENDER_EMAIL}</span>{' '}
                        <span className="text-muted-foreground/70">(Hostinger Business Mail)</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                        <Users className="h-4 w-4" strokeWidth={2.5} />
                        {subscribers.length} subscribers
                    </span>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={handleDispatch}
                    disabled={dispatching || subscribers.length === 0}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {dispatching ? (
                        <>
                            <Zap className="h-4 w-4 animate-pulse" strokeWidth={2.5} />
                            Dispatching…
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4" strokeWidth={2.5} />
                            Dispatch Today&apos;s Digest
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={handleExport}
                    disabled={subscribers.length === 0}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-colors hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Download className="h-4 w-4" strokeWidth={2.5} />
                    Export Subscribers (CSV)
                </button>
            </div>

            {dispatched && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300">
                    <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                    Today&apos;s gaming digest queued from {SENDER_EMAIL} to {subscribers.length} subscriber{subscribers.length === 1 ? '' : 's'}.
                </div>
            )}

            <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Subscribed emails
                </h3>
                {subscribers.length === 0 ? (
                    <p className="mt-3 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                        No subscribers yet. Sign-ups from the public newsletter form will appear here.
                    </p>
                ) : (
                    <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
                        {subscribers.map((email) => (
                            <li
                                key={email}
                                className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm"
                            >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                                    {email[0]?.toUpperCase()}
                                </span>
                                <span className="truncate text-foreground">{email}</span>
                                <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-primary/70" strokeWidth={2.5} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Monetization & AdSense Manager                                     */
/* ------------------------------------------------------------------ */

function MonetizationManager() {
    const [adsenseId, setAdsenseId] = useState('');
    const [toggles, setToggles] = useState({ leaderboard: true, inFeed: true, modal: true });
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const { adsenseId: id, toggles: t } = readAdConfig();
        setAdsenseId(id);
        setToggles(t);
    }, []);

    const broadcast = () => {
        window.dispatchEvent(new Event('adiloop-ad-config-changed'));
    };

    const handleSave = (e) => {
        e.preventDefault();
        try {
            if (adsenseId.trim()) {
                localStorage.setItem(ADSENSE_ID_KEY, adsenseId.trim());
            } else {
                localStorage.removeItem(ADSENSE_ID_KEY);
            }
            localStorage.setItem(AD_CONFIG_KEY, JSON.stringify(toggles));
            broadcast();
        } catch {
            /* ignore storage errors */
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const toggle = (key) => {
        setToggles((prev) => {
            const next = { ...prev, [key]: !prev[key] };
            try {
                localStorage.setItem(AD_CONFIG_KEY, JSON.stringify(next));
                broadcast();
            } catch {
                /* ignore */
            }
            return next;
        });
    };

    const pubId = adsenseId.replace(/^ca-pub-/, '');
    const adsTxt = pubId
        ? `google.com, pub-${pubId}, DIRECT, f08c47fec0942fa0`
        : 'google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0';

    const handleCopyAdsTxt = async () => {
        try {
            await navigator.clipboard.writeText(adsTxt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    // Estimator: simple model based on toggles + a nominal monthly traffic figure.
    const activeSlots = Object.values(toggles).filter(Boolean).length;
    const monthlyImpressions = activeSlots * 240000; // 240k per active slot/month
    const estimatedRevenue = (monthlyImpressions / 1000) * 2.4; // $2.40 RPM

    const toggleRows = [
        { key: 'leaderboard', label: 'Leaderboard Ads', desc: 'Top + footer banner units' },
        { key: 'inFeed', label: 'In-Feed Ads', desc: 'Native sponsor card in the grid' },
        { key: 'modal', label: 'Modal Ads', desc: 'In-article sponsor unit in the reader' },
    ];

    return (
        <section className="mt-8 rounded-2xl border border-border bg-card/40 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                    <Megaphone className="h-5 w-5 text-primary" strokeWidth={2.5} />
                    Monetization &amp; AdSense Manager
                </h2>
                {adsenseId ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-live-pulse rounded-full bg-emerald-400" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        </span>
                        AdSense Active
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        AdSense Inactive
                    </span>
                )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
                Configure Google AdSense and gaming affiliate sponsorships across adiloopgames.com.
            </p>

            <form onSubmit={handleSave} className="mt-5 space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Google AdSense Publisher ID
                </label>
                <input
                    type="text"
                    value={adsenseId}
                    onChange={(e) => setAdsenseId(e.target.value)}
                    placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                    className="h-11 w-full rounded-xl border border-border bg-background/60 px-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                    Save Publisher ID
                </button>
                {saved && (
                    <p className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                        <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Saved — AdSense units will render live on the public site.
                    </p>
                )}
            </form>

            {/* Ad slot toggles */}
            <div className="mt-6 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Ad slot controls
                </h3>
                {toggleRows.map((row) => {
                    const on = toggles[row.key];
                    return (
                        <button
                            key={row.key}
                            type="button"
                            onClick={() => toggle(row.key)}
                            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                                on
                                    ? 'border-primary/40 bg-primary/10 text-foreground'
                                    : 'border-border bg-background/60 text-muted-foreground'
                            }`}
                        >
                            <span>
                                <span className="block text-sm font-semibold">{row.label}</span>
                                <span className="block text-xs text-muted-foreground">{row.desc}</span>
                            </span>
                            {on ? (
                                <ToggleRight className="h-6 w-6 text-primary" strokeWidth={2.5} />
                            ) : (
                                <ToggleLeft className="h-6 w-6 text-muted-foreground" strokeWidth={2.5} />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Revenue & impression estimator */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-background/60 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MousePointerClick className="h-4 w-4 text-primary" strokeWidth={2.5} />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">Est. Monthly Impressions</span>
                    </div>
                    <p className="mt-2 font-display text-2xl font-extrabold text-foreground">
                        {monthlyImpressions.toLocaleString()}
                    </p>
                </div>
                <div className="rounded-xl border border-border bg-background/60 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-4 w-4 text-primary" strokeWidth={2.5} />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">Active Slots</span>
                    </div>
                    <p className="mt-2 font-display text-2xl font-extrabold text-foreground">
                        {activeSlots} / 3
                    </p>
                </div>
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4 text-primary" strokeWidth={2.5} />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">Est. Monthly Revenue</span>
                    </div>
                    <p className="mt-2 font-display text-2xl font-extrabold text-primary">
                        ${estimatedRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                </div>
            </div>

            {/* ads.txt generator */}
            <div className="mt-6">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <FileText className="h-3.5 w-3.5" strokeWidth={2.5} />
                    ads.txt snippet
                </h3>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <code className="flex-1 truncate rounded-xl border border-border bg-black/60 px-4 py-3 font-mono text-xs text-emerald-300">
                        {adsTxt}
                    </code>
                    <button
                        type="button"
                        onClick={handleCopyAdsTxt}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-5 py-3 font-display text-xs font-bold uppercase tracking-wider transition-colors hover:border-primary/50 hover:text-primary"
                    >
                        {copied ? (
                            <>
                                <Check className="h-4 w-4 text-primary" strokeWidth={2.5} />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4" strokeWidth={2.5} />
                                Generate ads.txt
                            </>
                        )}
                    </button>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                    Place this line in a file named <span className="font-mono text-foreground">ads.txt</span> at the root of adiloopgames.com for AdSense approval.
                </p>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Admin dashboard                                                    */
/* ------------------------------------------------------------------ */

function AdminDashboard({ onSignOut }) {
    const [sourceState, setSourceState] = useState(() =>
        Object.fromEntries(SOURCES.map((s) => [s, true]))
    );
    const [logs, setLogs] = useState(LOG_SEED);
    const [headline, setHeadline] = useState('');
    const [generating, setGenerating] = useState(false);
    const [generated, setGenerated] = useState(null);
    const [queue, setQueue] = useState(DISCOVERED);
    const logRef = useRef(null);

    const activeCount = Object.values(sourceState).filter(Boolean).length;

    useEffect(() => {
        const id = setInterval(() => {
            const pick = LOG_SEED[Math.floor(Math.random() * LOG_SEED.length)];
            const ts = new Date().toLocaleTimeString();
            setLogs((prev) => [...prev.slice(-40), `[${ts}] ${pick}`]);
        }, 3500);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, [logs]);

    const toggleSource = (s) =>
        setSourceState((prev) => ({ ...prev, [s]: !prev[s] }));

    const handleGenerate = (e) => {
        e.preventDefault();
        if (!headline.trim()) return;
        setGenerating(true);
        setGenerated(null);
        setTimeout(() => {
            setGenerating(false);
            setGenerated({
                title: headline,
                body: `AdilLoop News AI has synthesized a verified draft from the headline "${headline}". The article draws on active sources and clusters related coverage into a single editor-ready piece. Review the generated copy below, then publish to push it live to the news grid.`,
            });
        }, 1600);
    };

    const handlePublish = (item) => {
        setQueue((prev) => prev.filter((q) => q.title !== item.title));
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Helmet>
                <title>Admin Dashboard — AdilLoopGames Newsroom</title>
                <meta name="description" content="AdilLoopGames newsroom admin dashboard: discovered articles, source manager, AI article creator, and live system logs." />
            </Helmet>

            {/* Top bar */}
            <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
                    <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                            <Shield className="h-5 w-5" strokeWidth={2.5} />
                        </span>
                        <div>
                            <p className="font-display text-sm font-extrabold tracking-tight">
                                AdilLoop Newsroom
                            </p>
                            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                                Admin Dashboard
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-colors hover:border-primary/50 hover:text-primary"
                        >
                            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                            <span className="hidden sm:inline">Back to Public Site</span>
                        </Link>
                        <button
                            type="button"
                            onClick={onSignOut}
                            className="inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-destructive-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                        >
                            <LogOut className="h-4 w-4" strokeWidth={2.5} />
                            <span className="hidden sm:inline">Lock &amp; Sign Out</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
                {/* Overview */}
                <section>
                    <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                        System Overview
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Real-time snapshot of the AdilLoopGames discovery &amp; publishing pipeline.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <StatCard icon={Newspaper} value="265" label="Discovered Articles" accent="bg-blue-500/15 text-blue-400" />
                        <StatCard icon={Sparkles} value="12" label="Generated" accent="bg-violet-500/15 text-violet-400" />
                        <StatCard icon={Rocket} value="5" label="Published Live" accent="bg-emerald-500/15 text-emerald-400" />
                        <StatCard icon={Globe} value={`${activeCount}/14`} label="Sources Active" accent="bg-amber-500/15 text-amber-400" />
                    </div>
                </section>

                <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left column: source manager + queue */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Source manager */}
                        <section className="rounded-2xl border border-border bg-card/40 p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                                    <Database className="h-5 w-5 text-primary" strokeWidth={2.5} />
                                    Source Manager
                                </h2>
                                <span className="text-xs font-semibold text-muted-foreground">
                                    {activeCount} of 14 active
                                </span>
                            </div>
                            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {SOURCES.map((s) => {
                                    const on = sourceState[s];
                                    return (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => toggleSource(s)}
                                            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                                                on
                                                    ? 'border-primary/40 bg-primary/10 text-foreground'
                                                    : 'border-border bg-background/60 text-muted-foreground'
                                            }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <span className={`h-2 w-2 rounded-full ${on ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                                                {s}
                                            </span>
                                            {on ? (
                                                <ToggleRight className="h-5 w-5 text-primary" strokeWidth={2.5} />
                                            ) : (
                                                <ToggleLeft className="h-5 w-5 text-muted-foreground" strokeWidth={2.5} />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Discovered queue */}
                        <section className="rounded-2xl border border-border bg-card/40 p-6">
                            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                                <Clock className="h-5 w-5 text-primary" strokeWidth={2.5} />
                                Discovered Queue
                            </h2>
                            <div className="mt-5 space-y-3">
                                {queue.length === 0 && (
                                    <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                                        Queue cleared — all discovered stories processed.
                                    </p>
                                )}
                                {queue.map((item) => (
                                    <div
                                        key={item.title}
                                        className="flex flex-col gap-3 rounded-xl border border-border bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-foreground">{item.title}</p>
                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                {item.source} · {item.time}
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-2">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-violet-300 transition-colors hover:bg-violet-500/20"
                                            >
                                                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
                                                Generate
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handlePublish(item)}
                                                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                                            >
                                                <Send className="h-3.5 w-3.5" strokeWidth={2.5} />
                                                Publish
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right column: AI creator + logs */}
                    <div className="space-y-8">
                        {/* AI Article Creator */}
                        <section className="rounded-2xl border border-border bg-card/40 p-6">
                            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                                <Cpu className="h-5 w-5 text-primary" strokeWidth={2.5} />
                                AI Article Creator
                            </h2>
                            <form onSubmit={handleGenerate} className="mt-5 space-y-3">
                                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                                    Headline
                                </label>
                                <input
                                    type="text"
                                    value={headline}
                                    onChange={(e) => setHeadline(e.target.value)}
                                    placeholder="Enter a headline…"
                                    className="h-11 w-full rounded-xl border border-border bg-background/60 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                                />
                                <button
                                    type="submit"
                                    disabled={generating || !headline.trim()}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {generating ? (
                                        <>
                                            <Zap className="h-4 w-4 animate-pulse" strokeWidth={2.5} />
                                            Generating…
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-4 w-4" strokeWidth={2.5} />
                                            Generate with Gemini
                                        </>
                                    )}
                                </button>
                            </form>
                            {generated && (
                                <div className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-4">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" strokeWidth={2.5} />
                                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                                            Draft generated
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm font-semibold text-foreground">{generated.title}</p>
                                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{generated.body}</p>
                                </div>
                            )}
                        </section>

                        {/* Live system logs */}
                        <section className="rounded-2xl border border-border bg-black/60 p-6">
                            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                                <Terminal className="h-5 w-5 text-emerald-400" strokeWidth={2.5} />
                                Live System Logs
                            </h2>
                            <div
                                ref={logRef}
                                className="mt-4 h-64 overflow-y-auto rounded-xl bg-black/80 p-4 font-mono text-[11px] leading-relaxed text-emerald-300/90"
                            >
                                {logs.map((line, i) => (
                                    <div key={i} className="whitespace-pre-wrap">
                                        <span className="text-emerald-500/60">$</span> {line}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Newsletter & Subscribers Hub */}
                <NewsletterHub />

                {/* Monetization & AdSense Manager */}
                <MonetizationManager />
            </main>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Page (auth gate)                                                   */
/* ------------------------------------------------------------------ */

export default function AdminPage() {
    const [authed, setAuthed] = useState(() => {
        try {
            return localStorage.getItem(AUTH_KEY) === 'true';
        } catch {
            return false;
        }
    });

    const handleSignOut = () => {
        try {
            localStorage.removeItem(AUTH_KEY);
        } catch {
            /* ignore storage errors */
        }
        setAuthed(false);
    };

    if (!authed) {
        return (
            <>
                <Helmet>
                    <title>Staff Access — AdilLoopGames Newsroom</title>
                    <meta name="description" content="AdilLoopGames newsroom staff access portal." />
                </Helmet>
                <StaffLogin onUnlock={() => setAuthed(true)} />
            </>
        );
    }

    return <AdminDashboard onSignOut={handleSignOut} />;
}
