import React, { useEffect, useState } from 'react';
import { Megaphone, BadgePercent } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Ad configuration (shared with the Admin Monetization Manager)     */
/* ------------------------------------------------------------------ */

export const ADSENSE_ID_KEY = 'adiloop_adsense_id';
export const AD_CONFIG_KEY = 'adiloop_ads_config';

// Default Google AdSense Publisher ID for adiloopgames.com
export const DEFAULT_ADSENSE_ID = 'ca-pub-4484948144401065';

export function readAdConfig() {
    let adsenseId = DEFAULT_ADSENSE_ID;
    let toggles = { leaderboard: true, inFeed: true, modal: true };
    try {
        const stored = localStorage.getItem(ADSENSE_ID_KEY);
        if (stored) {
            adsenseId = stored;
        }
        const raw = localStorage.getItem(AD_CONFIG_KEY);
        if (raw) toggles = { ...toggles, ...JSON.parse(raw) };
    } catch {
        /* ignore storage errors */
    }
    return { adsenseId, toggles };
}

/* ------------------------------------------------------------------ */
/*  AdSense ins tag (rendered only when a publisher ID is configured) */
/* ------------------------------------------------------------------ */

function ensureAdSenseScript(adsenseId) {
    if (!adsenseId) return;
    const scriptId = 'adiloop-adsense-script';
    if (document.getElementById(scriptId)) return;
    // The official AdSense loader is already injected globally in index.html
    // (ca-pub-4484948144401065). Detect any existing adsbygoogle loader to
    // avoid injecting a duplicate script.
    const existing = Array.from(document.querySelectorAll('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'));
    if (existing.length > 0) return;
    const s = document.createElement('script');
    s.id = scriptId;
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
}

function AdSenseUnit({ adsenseId, adSlot, format = 'auto' }) {
    useEffect(() => {
        ensureAdSenseScript(adsenseId);
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {
            /* adsbygoogle script not loaded yet — harmless */
        }
    }, [adsenseId, adSlot]);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={adsenseId}
            data-ad-slot={adSlot}
            data-ad-format={format}
            data-full-width-responsive="true"
        />
    );
}

/* ------------------------------------------------------------------ */
/*  Generic ad container with SPONSORED label                          */
/* ------------------------------------------------------------------ */

function AdFrame({ label = 'Sponsored · Advertisement', children, className = '' }) {
    return (
        <div className={`w-full ${className}`}>
            <p className="mb-1.5 text-center text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground/70">
                {label}
            </p>
            <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-card/40">
                {children}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Top leaderboard ad — 728x90 desktop / 320x50 mobile                */
/* ------------------------------------------------------------------ */

export function LeaderboardAd() {
    const [config, setConfig] = useState(() => readAdConfig());

    useEffect(() => {
        const sync = () => setConfig(readAdConfig());
        window.addEventListener('storage', sync);
        window.addEventListener('adiloop-ad-config-changed', sync);
        return () => {
            window.removeEventListener('storage', sync);
            window.removeEventListener('adiloop-ad-config-changed', sync);
        };
    }, []);

    if (!config.toggles.leaderboard) return null;

    return (
        <div className="mx-auto max-w-7xl px-5 pt-6 md:px-8">
            <AdFrame>
                <div className="flex h-[50px] w-full items-center justify-center sm:h-[90px]">
                    {config.adsenseId ? (
                        <AdSenseUnit adsenseId={config.adsenseId} adSlot="1000000001" />
                    ) : (
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">
                            <Megaphone className="h-4 w-4" strokeWidth={2.5} />
                            Leaderboard Ad · 728×90 / 320×50
                        </div>
                    )}
                </div>
            </AdFrame>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Footer banner ad — above the newsletter section                    */
/* ------------------------------------------------------------------ */

export function FooterBannerAd() {
    const [config, setConfig] = useState(() => readAdConfig());

    useEffect(() => {
        const sync = () => setConfig(readAdConfig());
        window.addEventListener('storage', sync);
        window.addEventListener('adiloop-ad-config-changed', sync);
        return () => {
            window.removeEventListener('storage', sync);
            window.removeEventListener('adiloop-ad-config-changed', sync);
        };
    }, []);

    if (!config.toggles.leaderboard) return null;

    return (
        <div className="mx-auto max-w-7xl px-5 pb-4 md:px-8">
            <AdFrame>
                <div className="flex h-[90px] w-full items-center justify-center sm:h-[110px]">
                    {config.adsenseId ? (
                        <AdSenseUnit adsenseId={config.adsenseId} adSlot="1000000002" />
                    ) : (
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">
                            <Megaphone className="h-4 w-4" strokeWidth={2.5} />
                            Footer Banner Ad · Responsive
                        </div>
                    )}
                </div>
            </AdFrame>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  In-feed native sponsor card — gaming hardware / deal spotlight     */
/* ------------------------------------------------------------------ */

export function InFeedSponsorCard() {
    const [config, setConfig] = useState(() => readAdConfig());

    useEffect(() => {
        const sync = () => setConfig(readAdConfig());
        window.addEventListener('storage', sync);
        window.addEventListener('adiloop-ad-config-changed', sync);
        return () => {
            window.removeEventListener('storage', sync);
            window.removeEventListener('adiloop-ad-config-changed', sync);
        };
    }, []);

    if (!config.toggles.inFeed) return null;

    return (
        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/10 via-card/60 to-card/50 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60">
            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
                        <BadgePercent className="h-3 w-3" strokeWidth={2.5} />
                        Featured Partner Deal
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
                        Ad · Affiliate
                    </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug text-foreground">
                    PS5 DualSense Edge &amp; Game Pass Ultimate — Up to 40% Off
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Level up your loadout this season. Pro-grade back paddles, replaceable stick modules, and
                    months of Game Pass Ultimate bundled at the lowest price we&apos;ve tracked all year.
                </p>
                <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <Megaphone className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                    Sponsored placement
                </div>
                <a
                    href="https://www.playstation.com/accessories/controllers/dualsense-edge/"
                    target="_blank"
                    rel="noreferrer sponsored"
                    className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-accent-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                    View Partner Offer
                </a>
                <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground/70">
                    Affiliate Partner Link — AdilLoopGames may earn a commission on qualifying purchases.
                </p>
            </div>
        </article>
    );
}

/* ------------------------------------------------------------------ */
/*  In-article sponsor unit — inside the Article Reader modal          */
/* ------------------------------------------------------------------ */

export function ModalSponsorUnit() {
    const [config, setConfig] = useState(() => readAdConfig());

    useEffect(() => {
        const sync = () => setConfig(readAdConfig());
        window.addEventListener('storage', sync);
        window.addEventListener('adiloop-ad-config-changed', sync);
        return () => {
            window.removeEventListener('storage', sync);
            window.removeEventListener('adiloop-ad-config-changed', sync);
        };
    }, []);

    if (!config.toggles.modal) return null;

    return (
        <div className="mt-10">
            <AdFrame label="Sponsored · Advertisement">
                <div className="flex min-h-[110px] w-full items-center justify-center p-4">
                    {config.adsenseId ? (
                        <AdSenseUnit adsenseId={config.adsenseId} adSlot="1000000003" />
                    ) : (
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">
                            <Megaphone className="h-4 w-4" strokeWidth={2.5} />
                            In-Article Sponsor Unit · Responsive
                        </div>
                    )}
                </div>
            </AdFrame>
        </div>
    );
}
