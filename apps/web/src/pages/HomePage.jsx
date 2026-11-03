import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
    Gamepad2,
    Radio,
    Flame,
    TrendingUp,
    Clock,
    Calendar,
    ArrowRight,
    ArrowUpRight,
    Search,
    Bell,
    Trophy,
    Rocket,
    Puzzle,
    Swords,
    Waves,
    Play,
    Sparkles,
    CheckCircle2,
    Bookmark,
    Disc3,
    Newspaper,
    Zap,
    Loader2,
    AlertCircle,
    PartyPopper,
    RotateCcw,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import ArticleReader from '@/components/ArticleReader';
import {
    LeaderboardAd,
    FooterBannerAd,
    InFeedSponsorCard,
} from '@/components/AdSlot';
import { PrivacyPolicyModal, TermsOfServiceModal } from '@/components/LegalModals';
import { EXTRA_ARTICLES } from '@/data/articles';
import { formatPubDate, formatRelative } from '@/lib/datetime';

/* ------------------------------------------------------------------ */
/*  Date helper                                                        */
/* ------------------------------------------------------------------ */

// All articles published Nov 3, 2026. Month is 0-indexed (10 = November).
const PUB = (h, m) => new Date(2026, 10, 3, h, m);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STUDIO_GAMES = [
    {
        title: 'Starfall Drifters',
        genre: 'Arcade space racer',
        blurb: 'Thread neon asteroid canyons at impossible speed. One thumb, zero brakes.',
        art: 'https://images.hostinger.com/987e423f-2d2b-4305-80f6-6925aa85690b.png',
        icon: Rocket,
        tint: 'from-violet-500/30',
        offset: 'md:translate-y-0',
        rotate: 'md:-rotate-2',
    },
    {
        title: 'Moss & Ember',
        genre: 'Cozy puzzle adventure',
        blurb: 'A little robot with a warm heart relights a sleeping forest, one firefly at a time.',
        art: 'https://images.hostinger.com/cb0e525b-3a49-418b-bc45-92c3a565e3cb.png',
        icon: Puzzle,
        tint: 'from-emerald-500/30',
        offset: 'md:translate-y-10',
        rotate: 'md:rotate-1',
    },
    {
        title: 'Scrapyard Rumble',
        genre: 'Arena brawler',
        blurb: 'Chunky bots, flying bolts, last one standing keeps the good hubcaps.',
        art: 'https://images.hostinger.com/4aeb7862-9df7-4858-963f-e7a39c3fda60.png',
        icon: Swords,
        tint: 'from-red-500/30',
        offset: 'md:translate-y-2',
        rotate: 'md:rotate-2',
    },
    {
        title: 'Tidebound',
        genre: 'Deep-sea exploration',
        blurb: 'Pilot a tiny submarine into glowing ruins the ocean forgot to mention.',
        art: 'https://images.hostinger.com/4ff502ed-0a97-4ed0-bcf3-f85b6dba373e.png',
        icon: Waves,
        tint: 'from-cyan-500/30',
        offset: 'md:translate-y-12',
        rotate: 'md:-rotate-1',
    },
];

const PLATFORMS = [
    { id: 'all', label: 'All', icon: Newspaper },
    { id: 'playstation', label: 'PlayStation', icon: Disc3 },
    { id: 'xbox', label: 'Xbox', icon: Gamepad2 },
    { id: 'nintendo', label: 'Nintendo', icon: Sparkles },
    { id: 'pc', label: 'PC Gaming', icon: Zap },
    { id: 'esports', label: 'Esports', icon: Trophy },
];

const PLATFORM_META = {
    playstation: { label: 'PlayStation', color: 'text-blue-400', chip: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
    xbox: { label: 'Xbox', color: 'text-emerald-400', chip: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
    nintendo: { label: 'Nintendo', color: 'text-red-400', chip: 'bg-red-500/15 text-red-300 border-red-500/30' },
    pc: { label: 'PC Gaming', color: 'text-cyan-400', chip: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' },
    esports: { label: 'Esports', color: 'text-amber-400', chip: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
};

const DEFAULT_SOURCES = [
    { name: 'IGN', url: 'https://www.ign.com' },
    { name: 'GameSpot', url: 'https://www.gamespot.com' },
    { name: 'Eurogamer', url: 'https://www.eurogamer.net' },
    { name: 'PlayStation Blog', url: 'https://blog.playstation.com' },
];

/* ------------------------------------------------------------------ */
/*  Master article list — sorted newest-first by publishedAt           */
/* ------------------------------------------------------------------ */

const ALL_ARTICLES = [
    {
        // 1 — Featured (newest)
        title: 'GTA VI Delayed to Fall 2026 — Rockstar Calls It "The Final Polish"',
        platform: 'playstation',
        category: 'Industry',
        author: 'Mara Velez',
        readTime: '8 min read',
        publishedAt: PUB(11, 30),
        buzz: 99,
        gradient: 'from-violet-600/40 via-fuchsia-600/20 to-transparent',
        imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
        sources: DEFAULT_SOURCES,
        excerpt:
            'Rockstar confirms a slip into late 2026, citing an unprecedented level of detail across Vice City and Leonida. Inside sources describe a world "so dense it needed another season of baking." Here is everything we know.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'Rockstar Games has officially pushed the release of Grand Theft Auto VI into Fall 2026, ending months of speculation about whether the most anticipated game of the decade would make its original window. In a brief but pointed statement, the publisher framed the delay as "the final polish" needed to ship a world it believes is genuinely without precedent.',
                'The news landed alongside reassurances that development is otherwise healthy — no leadership shake-ups, no scope cuts, no engine rewrites. The slip is, by all accounts, about density: Vice City and the wider state of Leonida are reportedly so packed with detail that the team needs another full season to stabilize performance across platforms.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'According to sources familiar with the project, GTA VI\'s open world is the most ambitious Rockstar has ever attempted. The dual-protagonist structure follows Lucia and Jason across a living, breathing Florida analogue, with dynamic weather, persistent NPC routines, and an economy that reacts to player behavior in real time.',
                'Internally, developers describe a world "so dense it needed another season of baking" — a reference to the lengthy process of precomputing lighting, traffic, and ambient systems so the simulation holds up under player scrutiny. The extra months will be spent on optimization rather than new content.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'GTA VI was first revealed in December 2023 with a trailer that shattered viewing records. Rockstar\'s parent company, Take-Two, had repeatedly signaled a fiscal-year 2026 launch, which mapped to a calendar release in spring or early summer 2026. Today\'s delay moves that firmly into the back half of the year.',
                'Delays of this magnitude are not unusual for Rockstar — Red Dead Redemption 2 slipped by roughly a year — but they are rare for a franchise of GTA\'s commercial weight, where every quarter of delay carries enormous opportunity cost.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'The ripple effects are immediate. Take-Two\'s stock dipped on the announcement, and analysts have already revised FY26 forecasts downward. Competitors, meanwhile, are quietly shuffling their own release calendars to either avoid GTA VI\'s shadow or fill the gap it leaves in the spring lineup.',
                'For players, the delay is a familiar trade-off: more waiting in exchange for a game that, if Rockstar\'s track record holds, will define a generation. The consensus among industry watchers is that the polish is worth the patience.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'Fall 2026 now stands as the target. Rockstar has promised a more detailed look "when it\'s ready," and given the studio\'s legendary secrecy, that could be months away. For now, the trailer and a handful of leaked details are all the world has to go on — and that\'s enough to keep the hype burning.',
            ]},
        ],
    },
    {
        // 2
        title: 'Helldivers 3 leak surfaces with new alien faction',
        platform: 'pc',
        category: 'Leak',
        author: 'Devin Cho',
        readTime: '5 min read',
        publishedAt: PUB(11, 15),
        buzz: 98,
        gradient: 'from-rose-600/40 to-red-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'A leaked internal build appears to reveal a brand-new alien faction for Helldivers 3, Arrowhead\'s unannounced sequel to the breakout co-op shooter.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'A leaked internal build appears to reveal a brand-new alien faction for Helldivers 3, Arrowhead Game Studios\' as-yet-unannounced sequel to the breakout co-op shooter. The build, which surfaced on a private forum before spreading across social media, contains assets and strings pointing to a fourth enemy faction.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'Dataminers combing the build surfaced references to a faction described internally as the "Illuminate Resurgent," alongside new stratagems, a revised orbital strike system, and mission types built around defending extraction convoys. The faction appears to blend psychic and mechanical enemy types in a way no current Helldivers 2 enemy does.',
                'If accurate, the leak suggests Arrowhead is significantly expanding the enemy roster rather than simply iterating on the three factions players already know.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'Helldivers 2\'s post-launch support has been defined by major Warbond updates and faction rotations that keep the live-service loop fresh. A third mainline faction has been the most-requested addition since launch, and Arrowhead has repeatedly teased that "the galaxy is bigger than you think."',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'Leaks of this scale are rare for Sony first-party titles and could accelerate an official reveal. Sony and Arrowhead have not commented, and the build\'s authenticity remains unverified — but the volume and consistency of the findings have convinced many longtime community dataminers that something real is brewing.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'Treat everything as unverified until Arrowhead confirms. Still, the leak has reignited hype for a sequel that hasn\'t even been announced, and the studio\'s silence is only fueling speculation.',
            ]},
        ],
    },
    {
        // 3
        title: 'Nintendo Switch 2 sells 18M units in record-shattering first week',
        platform: 'nintendo',
        category: 'Sales',
        author: 'Lena Ortiz',
        readTime: '4 min read',
        publishedAt: PUB(10, 45),
        buzz: 95,
        gradient: 'from-red-600/40 to-rose-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'Nintendo confirms the Switch 2 sold 18 million units in its first week on sale, eclipsing every prior Nintendo hardware launch.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'Nintendo has confirmed the Switch 2 sold 18 million units in its first week on sale, a record-shattering debut that eclipses every prior Nintendo hardware launch. The figure spans all regions and includes both the standard and OLED models.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The first-week number dwarfs the original Switch, which sold roughly 2.7 million units in its entire launch month. Supply constraints remain the primary limit on further sales, with Nintendo pledging increased production through the holiday quarter to meet demand that shows no sign of cooling.',
                'Retailers across North America, Europe, and Japan reported sell-through within hours of restock, and secondary-market pricing briefly spiked before Nintendo reaffirmed its commitment to steady shipments.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'The original Switch launched in March 2017 and went on to become one of the best-selling consoles of all time. Expectations for the sequel were enormous, and the first-week performance suggests Nintendo has not only met but vastly exceeded them.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'The launch cements Nintendo\'s dominance of the handheld-hybrid category and puts immediate pressure on Sony and Microsoft to clarify their own portable strategies. Analysts note the attach rate for first-party software is also tracking well ahead of projections.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'With stock still scarce, demand shows no sign of cooling. Nintendo has raised its full-year hardware forecast accordingly, and the Switch 2 is now on pace to challenge the original\'s lifetime records.',
            ]},
        ],
    },
    {
        // 4
        title: 'Final Fantasy XVII reveal stuns with real-time ray-traced summons',
        platform: 'playstation',
        category: 'Preview',
        author: 'Devin Cho',
        readTime: '6 min read',
        publishedAt: PUB(10, 0),
        buzz: 89,
        gradient: 'from-indigo-600/40 to-blue-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'Square Enix shows 12 minutes of in-engine footage. The summons are jaw-dropping.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'Square Enix pulled back the curtain on Final Fantasy XVII with a 12-minute in-engine demonstration that left audiences stunned. The headline feature: summons rendered in real time with full ray-traced lighting and particle simulation.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The footage showcased a new battle system blending real-time action with the series\' classic summon mechanics. Each summon is now a fully physics-driven set piece that reshapes the battlefield around it, with lighting that reacts dynamically to the elemental effects on screen.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'The Final Fantasy franchise has oscillated between turn-based and action combat for two decades. XVII appears to be Square Enix\'s most ambitious attempt to reconcile both traditions while pushing the series\' visual fidelity to a new benchmark.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'The reveal sets a new technical benchmark for JRPGs and puts pressure on competitors to match the visual fidelity. Engine analysts note the demo ran on current-gen console hardware, suggesting the techniques will scale to a wide installed base.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'Final Fantasy XVII is shaping up to be a generational showcase. A release window was not confirmed, but the polish on display suggests development is well advanced.',
            ]},
        ],
    },
    {
        // 5
        title: 'Valorant Champions 2026 heads to Seoul with expanded prize pool',
        platform: 'esports',
        category: 'Esports',
        author: 'Sora Kim',
        readTime: '8 min read',
        publishedAt: PUB(9, 30),
        buzz: 91,
        gradient: 'from-cyan-600/40 to-sky-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'Riot Games confirms Valorant Champions 2026 will take place in Seoul, with the largest prize pool in the tournament\'s history.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'Riot Games has confirmed that Valorant Champions 2026 will take place in Seoul, South Korea, marking the flagship event\'s return to Asia and pairing it with the largest prize pool in the tournament\'s history.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The expanded prize pool reflects Valorant\'s surging global viewership and the strength of the Pacific region\'s competitive scene. Seoul\'s existing esports infrastructure — arenas, broadcast facilities, and a fanbase steeped in tactical shooter culture — made it the natural choice for the marquee event.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'Valorant Champions has rotated between regions each year since the game\'s competitive debut. The 2025 edition drew record concurrent viewership, and Riot has steadily increased investment in the VCT ecosystem as franchised leagues matured.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'Anchoring Champions in Seoul signals Riot\'s continued commitment to the Asian market and is expected to drive a wave of sponsorship and media-rights deals across the Pacific region in the lead-up to the event.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'With the venue and dates now public, qualification storylines will dominate the competitive calendar through the summer. Expect Seoul to deliver the biggest Champions yet.',
            ]},
        ],
    },
    {
        // 6
        title: 'Starfield: Shattered Sky expansion lands on Game Pass with capital ships',
        platform: 'xbox',
        category: 'Release',
        author: 'Priya Anand',
        readTime: '5 min read',
        publishedAt: PUB(8, 45),
        buzz: 84,
        gradient: 'from-emerald-600/40 to-teal-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'Bethesda ships its largest content drop yet, adding fully boardable capital ships.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'Bethesda has released Shattered Sky, the largest expansion yet for Starfield, and it is available day one on Xbox Game Pass. The headline addition is fully boardable capital ships that players can command and explore.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The expansion adds a new star system, a branching faction storyline, and ship-to-ship combat reworked from the ground up. Capital ships function as mobile bases with crew, hangars, and customizable interiors, giving players a persistent home that travels with them across the galaxy.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'Starfield launched to mixed reception in 2023, with critics praising its scope but faulting its exploration. Bethesda has spent the intervening period overhauling traversal and adding meaningful content to address that feedback.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'Day-one Game Pass drops remain Xbox\'s strongest competitive lever. Shattered Sky is being positioned as the expansion that redeems Starfield\'s promise and proves the live-service model can sustain a single-player RPG.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'Early player reception is positive, with particular praise for the capital ship systems. Bethesda has hinted at further expansions through 2027.',
            ]},
        ],
    },
    {
        // 7
        title: 'Metroid Prime 4: Beyond — hands-on with the new suit modules',
        platform: 'nintendo',
        category: 'Hands-on',
        author: 'Lena Ortiz',
        readTime: '7 min read',
        publishedAt: PUB(7, 15),
        buzz: 82,
        gradient: 'from-orange-600/40 to-red-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'Retro Studios lets Samus mix and match augmentations on the fly. It feels incredible.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'Retro Studios offered a hands-on preview of Metroid Prime 4: Beyond, and the standout feature is a modular suit system that lets Samus swap augmentations on the fly without pausing the action.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The new module system layers abilities — beam types, visor modes, and movement tech — into combinable loadouts. The result is a fluid, first-person flow that rewards experimentation and lets players tailor Samus to their preferred playstyle mid-combat.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'Metroid Prime 4 has had a famously long development, restarting under Retro Studios in 2019. The Beyond subtitle signals a confident, complete vision finally ready for players.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'A strong Metroid Prime return would reinforce Nintendo\'s ability to revive dormant franchises at the highest quality bar on Switch 2 hardware.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'The hands-on suggests Retro has nailed the feel. Metroid Prime 4: Beyond looks set to be one of the year\'s defining first-person adventures.',
            ]},
        ],
    },
    {
        // 8
        title: 'Cyberpunk 2078 announced — CD Projekt Red goes all-in on Unreal 6',
        platform: 'pc',
        category: 'Announce',
        author: 'Tomas Reyes',
        readTime: '9 min read',
        publishedAt: PUB(6, 0),
        buzz: 80,
        gradient: 'from-yellow-500/40 to-amber-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'A new engine, a new city, and a promise that the launch will be different this time.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'CD Projekt Red has officially announced Cyberpunk 2078, confirming a shift to Unreal Engine 6 and a brand-new city setting distinct from Night City.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The move to Unreal 6 is the headline technical change, ending CD Projekt\'s decades-long reliance on its proprietary REDengine. The new city promises a denser, more vertical sandbox informed by lessons from the 2077 launch.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'Cyberpunk 2077\'s 2020 launch was famously troubled, but a multi-year redemption arc turned it into a commercial success. CD Projekt has repeatedly promised the sequel\'s launch "will be different."',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'The engine switch signals a broader industry trend away from bespoke tech toward Unreal, trading control for tooling maturity and hiring reach.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'Cyberpunk 2078 is years away, but the announcement alone resets expectations. The promise of a smoother launch is the real headline.',
            ]},
        ],
    },
    {
        // 9
        title: 'PS5 Pro 2 rumored for holiday 2026 with 4K/120Hz baseline',
        platform: 'playstation',
        category: 'Rumor',
        author: 'Mara Velez',
        readTime: '4 min read',
        publishedAt: PUB(4, 30),
        buzz: 76,
        gradient: 'from-blue-600/40 to-indigo-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'Sony is reportedly prepping a mid-cycle refresh focused on sustained high-frame-rate modes.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'Sony is reportedly preparing a PS5 Pro 2 refresh targeting a holiday 2026 release, with a focus on sustaining 4K resolution at a 120Hz refresh rate as the baseline.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'According to supply-chain chatter, the refresh centers on a more powerful GPU and faster memory, designed to make high-frame-rate modes the default rather than a compromise players toggle on at the cost of resolution.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'Mid-cycle refreshes have become standard Sony practice since the PS4 Pro. A 2026 launch would arrive roughly three years after the original PS5 Pro.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'A higher baseline frame rate would push developers to target smoother performance, and could pressure Microsoft to respond with its own hardware update.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'Sony has not confirmed the device. Treat the specifics as rumor until an official announcement, but the timing aligns with historical cadence.',
            ]},
        ],
    },
];

const FEATURED = ALL_ARTICLES[0];
const TRENDING = [ALL_ARTICLES[1], ALL_ARTICLES[2], ALL_ARTICLES[4], ALL_ARTICLES[3]];
// Merge the original grid articles with the extra verified articles.
const GRID_ARTICLES = [...ALL_ARTICLES.slice(1), ...EXTRA_ARTICLES].sort(
    (a, b) => b.publishedAt - a.publishedAt
);

const TICKER_ITEMS = [
    'GTA VI delayed to Fall 2026',
    'Switch 2 crosses 18M units sold in week one',
    'Valorant Champions 2026 confirmed for Seoul',
    'FFXVII reveal drops real-time ray-traced summons',
    'Helldivers 3 leak surfaces new alien faction',
    'Starfield: Shattered Sky adds boardable capital ships',
    'CD Projekt announces Cyberpunk 2078 on Unreal 6',
];

/* ------------------------------------------------------------------ */
/*  Small components                                                   */
/* ------------------------------------------------------------------ */

function VerifiedBadge({ className = '' }) {
    return (
        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary ${className}`}>
            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
            Verified
        </span>
    );
}

function WatermarkChip() {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
            <CheckCircle2 className="h-3 w-3 text-primary" strokeWidth={2.5} />
            AdilLoop News · Verified
        </span>
    );
}

function PlatformChip({ platform }) {
    const meta = PLATFORM_META[platform];
    if (!meta) return null;
    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${meta.chip}`}>
            {meta.label}
        </span>
    );
}

function TimeStamp({ children }) {
    return (
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" strokeWidth={2.5} />
            {children}
        </span>
    );
}

function BreakingTicker() {
    const row = [...TICKER_ITEMS, ...TICKER_ITEMS];
    return (
        <div className="relative flex items-stretch border-b border-border bg-card/60 backdrop-blur-md">
            <div className="flex shrink-0 items-center gap-2 bg-destructive px-4 py-2.5 text-destructive-foreground">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-live-pulse rounded-full bg-white" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                </span>
                <span className="font-display text-xs font-extrabold uppercase tracking-[0.2em]">Breaking</span>
            </div>
            <div className="relative flex-1 overflow-hidden">
                <div className="animate-ticker flex w-max items-center gap-10 whitespace-nowrap py-2.5 pl-6">
                    {row.map((item, i) => (
                        <span key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                            <Radio className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TrendingCard({ item, index, onOpen }) {
    return (
        <button
            type="button"
            onClick={() => onOpen(item)}
            className="group flex w-full items-start gap-4 rounded-2xl border border-border bg-card/50 p-4 text-left transition-colors duration-200 hover:border-primary/40 hover:bg-card"
        >
            <span className="font-display text-3xl font-extrabold leading-none text-primary/30 transition-colors group-hover:text-primary">
                {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                    <PlatformChip platform={item.platform} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        {item.category}
                    </span>
                </div>
                <h4 className="font-display text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                </h4>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground/80">
                        <Calendar className="h-3 w-3 text-primary" strokeWidth={2.5} />
                        {formatPubDate(item.publishedAt)}
                    </span>
                    <TimeStamp>{formatRelative(item.publishedAt)}</TimeStamp>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                        <Flame className="h-3 w-3" strokeWidth={2.5} />
                        {item.buzz}% buzz
                    </span>
                </div>
            </div>
        </button>
    );
}

function ArticleCard({ article, index, onOpen }) {
    return (
        <Reveal delay={Math.min(index * 0.06, 0.3)} y={28}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_60px_-28px_hsl(150_30%_2%/0.95)]">
                {/* Thumbnail */}
                <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute left-3 top-3 flex items-center gap-2">
                        <PlatformChip platform={article.platform} />
                    </div>
                    <div className="absolute right-3 top-3">
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                            {article.category}
                        </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                        <WatermarkChip />
                    </div>
                </div>
                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {article.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {article.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <VerifiedBadge />
                        <span className="text-xs text-muted-foreground">· {article.author}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                        <div className="flex flex-col gap-1">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground">
                                <Calendar className="h-3 w-3 text-primary" strokeWidth={2.5} />
                                {formatPubDate(article.publishedAt)}
                            </span>
                            <TimeStamp>{formatRelative(article.publishedAt)}</TimeStamp>
                        </div>
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => onOpen(article)}
                        className="mt-4 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:text-primary/80"
                    >
                        Read more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
                    </button>
                </div>
            </article>
        </Reveal>
    );
}

function StudioGameCard({ game, index }) {
    const Icon = game.icon;
    return (
        <Reveal delay={index * 0.08} y={32}>
            <article
                className={`group relative ${game.offset} ${game.rotate} transition-transform duration-300 ease-out hover:rotate-0 hover:[transform:translateY(-8px)]`}
            >
                <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_60px_-24px_hsl(150_30%_2%/0.9)]">
                    <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                            src={game.art}
                            alt={`${game.title} key art`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${game.tint} via-transparent to-transparent mix-blend-multiply`} />
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[hsl(150_12%_5%/0.95)] via-[hsl(150_12%_5%/0.4)] to-transparent" />
                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                            <Bell className="h-3 w-3 text-primary" strokeWidth={2.5} />
                            Coming soon
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-5">
                            <div className="mb-2 flex items-center gap-2 text-primary">
                                <Icon className="h-4 w-4" strokeWidth={2.5} />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                                    {game.genre}
                                </span>
                            </div>
                            <h3 className="font-display text-2xl font-extrabold leading-tight text-white">
                                {game.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-white/70">
                                {game.blurb}
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
                                <Play className="h-3 w-3 fill-current text-primary" />
                                Google Play · Soon
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Reveal>
    );
}

function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email.trim())) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }
        setStatus('loading');
        setMessage('');
        setTimeout(() => {
            try {
                const raw = localStorage.getItem('adiloop_newsletter_subscribers');
                const list = raw ? JSON.parse(raw) : [];
                if (!list.includes(email.trim())) list.push(email.trim());
                localStorage.setItem('adiloop_newsletter_subscribers', JSON.stringify(list));
            } catch {
                /* ignore storage errors */
            }
            setStatus('success');
            setMessage("🎉 Welcome aboard! You're subscribed to the AdilLoop Daily Gaming Digest. A welcome briefing has been queued from ali@adiloopgames.com.");
        }, 1200);
    };

    const reset = () => {
        setEmail('');
        setStatus('idle');
        setMessage('');
    };

    if (status === 'success') {
        return (
            <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4">
                <div className="flex w-full items-start gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-left">
                    <PartyPopper className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" strokeWidth={2.5} />
                    <div>
                        <p className="text-sm font-semibold text-emerald-300">{message}</p>
                        <p className="mt-1 text-xs text-emerald-300/70">
                            We saved your spot. Look out for the next drop in your inbox.
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={reset}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wider transition-colors duration-200 hover:border-primary/50 hover:text-primary"
                >
                    <RotateCcw className="h-4 w-4" strokeWidth={2.5} />
                    Subscribe another email
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto mt-8 w-full max-w-md">
            <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit} noValidate>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') {
                            setStatus('idle');
                            setMessage('');
                        }
                    }}
                    placeholder="your@email.com"
                    aria-label="Email address"
                    className="h-12 flex-1 rounded-full border border-border bg-card/60 px-5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                            Subscribing…
                        </>
                    ) : (
                        <>
                            Subscribe
                            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                        </>
                    )}
                </button>
            </form>
            {status === 'error' && (
                <div className="mt-3 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                    {message}
                </div>
            )}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
    const [activePlatform, setActivePlatform] = useState('all');
    const [activeArticle, setActiveArticle] = useState(null);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loadingMore, setLoadingMore] = useState(false);
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [termsOpen, setTermsOpen] = useState(false);

    const filteredArticles = useMemo(() => {
        const base = activePlatform === 'all'
            ? GRID_ARTICLES
            : GRID_ARTICLES.filter((a) => a.platform === activePlatform);
        // Strict newest-first sort by publishedAt.
        return [...base].sort((a, b) => b.publishedAt - a.publishedAt);
    }, [activePlatform]);

    const visibleArticles = filteredArticles.slice(0, visibleCount);
    const allLoaded = visibleCount >= filteredArticles.length;

    // Reset pagination whenever the platform filter changes.
    useEffect(() => {
        setVisibleCount(6);
        setLoadingMore(false);
    }, [activePlatform]);

    const handleLoadMore = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setVisibleCount((c) => Math.min(c + 6, filteredArticles.length));
            setLoadingMore(false);
        }, 400);
    };

    const openArticle = (article) => setActiveArticle(article);

    return (
        <div className="grain min-h-screen bg-background text-foreground">
            <Helmet>
                <title>AdilLoopGames — Premier Gaming News Portal</title>
                <meta
                    name="description"
                    content="AdilLoopGames is a premier gaming news portal: breaking news, trending buzz, verified articles across PlayStation, Xbox, Nintendo, PC Gaming and Esports — plus our original indie titles coming soon to Google Play."
                />
            </Helmet>

            {/* Header */}
            <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
                    <a href="#top" className="flex items-center gap-2.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                            <Gamepad2 className="h-5 w-5" strokeWidth={2.5} />
                        </span>
                        <span className="font-display text-lg font-extrabold tracking-tight">
                            AdilLoop<span className="text-primary">News</span>
                        </span>
                    </a>
                    <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground lg:flex">
                        <a href="#top" className="transition-colors hover:text-foreground">News</a>
                        <a href="#trending" className="transition-colors hover:text-foreground">Trending</a>
                        <a href="#latest" className="transition-colors hover:text-foreground">Latest</a>
                        <a href="#studio" className="transition-colors hover:text-foreground">Studio Games</a>
                    </nav>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            aria-label="Search"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                        >
                            <Search className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                        <a
                            href="https://play.google.com/store"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                        >
                            <Play className="h-3.5 w-3.5 fill-current" strokeWidth={2.5} />
                            Play Store
                        </a>
                    </div>
                </div>
            </header>

            {/* Breaking ticker */}
            <div className="pt-16">
                <BreakingTicker />
            </div>

            {/* Top leaderboard ad */}
            <LeaderboardAd />

            {/* Hero featured story */}
            <section id="top" className="relative mx-auto max-w-7xl px-5 pt-10 md:px-8 md:pt-14">
                <Reveal y={24}>
                    <div className="group block overflow-hidden rounded-3xl border border-border bg-card/50">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Visual */}
                            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                                <img
                                    src={FEATURED.imageUrl}
                                    alt={FEATURED.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                                <div className="absolute left-4 top-4 flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-destructive-foreground">
                                        <Flame className="h-3 w-3" strokeWidth={2.5} />
                                        Top Story
                                    </span>
                                    <PlatformChip platform={FEATURED.platform} />
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <WatermarkChip />
                                </div>
                            </div>
                            {/* Copy */}
                            <div className="flex flex-col justify-center p-7 md:p-10">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                                        {FEATURED.category}
                                    </span>
                                    <VerifiedBadge />
                                </div>
                                <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                                    {FEATURED.title}
                                </h1>
                                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                                    {FEATURED.excerpt}
                                </p>
                                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <span className="inline-flex items-center gap-2">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-[11px] font-bold text-primary">
                                            {FEATURED.author.split(' ').map((n) => n[0]).join('')}
                                        </span>
                                        {FEATURED.author}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                                        <Calendar className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                                        {formatPubDate(FEATURED.publishedAt)}
                                    </span>
                                    <TimeStamp>{formatRelative(FEATURED.publishedAt)}</TimeStamp>
                                    <span className="text-muted-foreground">{FEATURED.readTime}</span>
                                </div>
                                <div className="mt-7 flex flex-wrap items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => openArticle(FEATURED)}
                                        className="group/btn inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                                    >
                                        Read full story
                                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" strokeWidth={2.5} />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Save article"
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                                    >
                                        <Bookmark className="h-4 w-4" strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* Trending buzz */}
            <section id="trending" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
                <Reveal y={24}>
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-primary">
                                Trending now
                            </p>
                            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                                The buzz<span className="text-accent">.</span>
                            </h2>
                        </div>
                        <span className="hidden items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-xs font-semibold text-muted-foreground sm:inline-flex">
                            <TrendingUp className="h-4 w-4 text-primary" strokeWidth={2.5} />
                            Updated live
                        </span>
                    </div>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {TRENDING.map((item, i) => (
                        <TrendingCard key={item.title} item={item} index={i} onOpen={openArticle} />
                    ))}
                </div>
            </section>

            {/* Latest articles + platform filter */}
            <section id="latest" className="relative border-y border-border bg-card/30">
                <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
                    <Reveal y={24}>
                        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-primary">
                                    Latest verified
                                </p>
                                <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                                    Fresh off the wire<span className="text-accent">.</span>
                                </h2>
                            </div>
                            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
                                Every story is editor-verified before it hits the grid. Filter by platform to see only what matters to you.
                            </p>
                        </div>
                    </Reveal>

                    {/* Platform filter tabs */}
                    <Reveal delay={0.1} y={20}>
                        <div className="mt-10 flex flex-wrap gap-2">
                            {PLATFORMS.map((p) => {
                                const Icon = p.icon;
                                const active = activePlatform === p.id;
                                return (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setActivePlatform(p.id)}
                                        className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2.5 font-display text-sm font-bold uppercase tracking-[0.12em] transition-all duration-200 ${
                                            active
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : 'border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" strokeWidth={2.5} />
                                        {p.label}
                                    </button>
                                );
                            })}
                        </div>
                    </Reveal>

                    {/* Articles grid */}
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleArticles.map((article, i) => (
                            <React.Fragment key={article.title}>
                                <ArticleCard article={article} index={i} onOpen={openArticle} />
                                {/* In-feed native sponsor card after the 4th article */}
                                {i === 3 && <InFeedSponsorCard />}
                            </React.Fragment>
                        ))}
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
                            <Newspaper className="mx-auto h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
                            <p className="mt-3 text-sm text-muted-foreground">
                                No verified articles for this platform yet — check back soon.
                            </p>
                        </div>
                    )}

                    <div className="mt-12 flex justify-center">
                        {allLoaded ? (
                            <div className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-emerald-300">
                                <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                                ✨ You&apos;re all caught up! (All stories loaded)
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 font-display text-sm font-bold uppercase tracking-wider transition-colors duration-200 hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loadingMore ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                                        Loading…
                                    </>
                                ) : (
                                    <>
                                        Load more articles
                                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Studio games showcase */}
            <section id="studio" className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
                <Reveal y={24}>
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-primary">
                                From our studio
                            </p>
                            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                                Original indie titles<span className="text-accent">.</span>
                            </h2>
                        </div>
                        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
                            We do not just cover games — we make them. Four original AdilLoopGames titles are in the forge, coming soon to Google Play.
                        </p>
                    </div>
                </Reveal>
                <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:pb-12">
                    {STUDIO_GAMES.map((game, i) => (
                        <StudioGameCard key={game.title} game={game} index={i} />
                    ))}
                </div>
            </section>

            {/* Studio stats band */}
            {/*<section className="relative border-y border-border bg-card/40">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-14 md:grid-cols-4 md:px-8">
                    {[
                        { value: 4, suffix: '', label: 'Studio games in the forge' },
                        { value: 240, suffix: '+', label: 'Verified articles published' },
                        { value: 5, suffix: '', label: 'Platforms covered daily' },
                        { value: 1, suffix: 'M+', label: 'Monthly readers' },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-border bg-background/60 p-6 text-center transition-colors duration-200 hover:border-primary/40">
                            <div className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
                                <CountUp value={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>*/}

            {/* Footer banner ad */}
            <FooterBannerAd />

            {/* Newsletter CTA */}
            <section id="follow" className="relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-5 py-20 text-center md:px-8 md:py-28">
                    <Reveal y={24}>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                            <Bell className="h-7 w-7" strokeWidth={2.5} />
                        </div>
                        <h2 className="mx-auto mt-8 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                            Never miss a drop<span className="text-primary">.</span>
                        </h2>
                        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                            Get the day&apos;s biggest gaming stories and studio updates delivered to your inbox. Verified news, zero spam.
                        </p>
                        <NewsletterForm />
                    </Reveal>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Gamepad2 className="h-4 w-4" strokeWidth={2.5} />
                        </span>
                        <span className="font-display text-base font-extrabold tracking-tight">
                            AdilLoop<span className="text-primary">News</span>
                        </span>
                    </div>
                    <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                        <a href="#top" className="transition-colors hover:text-foreground">News</a>
                        <a href="#trending" className="transition-colors hover:text-foreground">Trending</a>
                        <a href="#latest" className="transition-colors hover:text-foreground">Latest</a>
                        <a href="#studio" className="transition-colors hover:text-foreground">Studio Games</a>
                        <a
                            href="https://play.google.com/store"
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors hover:text-foreground"
                        >
                            Google Play
                        </a>
                        <button
                            type="button"
                            onClick={() => setPrivacyOpen(true)}
                            className="transition-colors hover:text-foreground"
                        >
                            Privacy Policy
                        </button>
                        <button
                            type="button"
                            onClick={() => setTermsOpen(true)}
                            className="transition-colors hover:text-foreground"
                        >
                            Terms of Service
                        </button>
                    </nav>
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} AdilLoopGames. Verified gaming news.
                    </p>
                </div>
            </footer>

            {/* Article reader modal */}
            {activeArticle && (
                <ArticleReader
                    article={activeArticle}
                    platformMeta={PLATFORM_META}
                    onClose={() => setActiveArticle(null)}
                />
            )}

            {/* Legal / compliance modals */}
            <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
            <TermsOfServiceModal open={termsOpen} onClose={() => setTermsOpen(false)} />
        </div>
    );
}
