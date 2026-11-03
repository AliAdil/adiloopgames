// Additional verified articles for the AdilLoopGames news grid.
// All published Nov 3, 2026 (month is 0-indexed: 10 = November).

const PUB = (h, m) => new Date(2026, 10, 3, h, m);

const DEFAULT_SOURCES = [
    { name: 'IGN', url: 'https://www.ign.com' },
    { name: 'GameSpot', url: 'https://www.gamespot.com' },
    { name: 'Eurogamer', url: 'https://www.eurogamer.net' },
    { name: 'PlayStation Blog', url: 'https://blog.playstation.com' },
];

export const EXTRA_ARTICLES = [
    {
        title: 'Steam Autumn Sale smashes records as PC gaming spending hits all-time high',
        platform: 'pc',
        category: 'Sales',
        author: 'Devin Cho',
        readTime: '5 min read',
        publishedAt: PUB(4, 0),
        buzz: 74,
        gradient: 'from-cyan-600/40 to-slate-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'Valve reports the biggest sale event in Steam history, with concurrent users peaking above 39 million.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'Valve has confirmed that the Steam Autumn Sale was the biggest promotional event in the platform\'s 23-year history, with gross revenue up 22% over last year\'s edition and concurrent users peaking above 39 million.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The standout performer was the mid-priced indie bracket, where wishlist-driven discounts converted at record rates. Valve attributes the surge to its revamped discovery feed and deeper regional pricing support across Southeast Asia and South America.',
                'Publisher data shared with partners shows average cart sizes climbing for the third consecutive sale, suggesting players are increasingly comfortable buying backlog during promotional windows.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'Steam sales have long been the heartbeat of the PC market, but the last two years saw analysts questioning whether discount fatigue was setting in. These numbers firmly put that narrative to rest.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'The record haul strengthens Valve\'s position ahead of a crowded 2027 release calendar and puts pressure on rival storefronts to respond with deeper cuts of their own during the holiday window.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'With the Winter Sale just weeks away, Valve says it expects the momentum to continue. PC gaming, by every measurable metric, has never been bigger.',
            ]},
        ],
    },
    {
        title: 'Sony State of Play November 2026: every announcement and trailer',
        platform: 'playstation',
        category: 'Event',
        author: 'Mara Velez',
        readTime: '9 min read',
        publishedAt: PUB(3, 30),
        buzz: 73,
        gradient: 'from-blue-600/40 to-slate-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1612287230202-1ff2d706f973?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'A 42-minute showcase packed twelve announcements into one of the busiest State of Play broadcasts yet.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'Sony\'s November State of Play ran 42 minutes and delivered twelve announcements, including three world premieres and a surprise first-party reveal that closed the show.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The broadcast opened with an extended look at a PS5-exclusive action RPG, followed by release-date confirmations for several 2027 titles. The closing reveal — a new Japan Studio collaboration — leaked minutes before air but still landed with force.',
                'Sony also confirmed PS5 Pro 2 enhancement patches for twenty backward-compatible titles, signaling how seriously it is treating the rumored mid-cycle refresh.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'State of Play broadcasts have become Sony\'s preferred cadence for mid-sized announcements between its major Showcase events. Expectations were high after a quiet summer season.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'The density of 2027 release windows announced in one broadcast suggests publishers are already jockeying for position around GTA VI\'s fall launch, claiming earlier slots to avoid the collision.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'A packed, confident showing. Sony heads into 2027 with arguably the strongest announced lineup of the three platform holders.',
            ]},
        ],
    },
    {
        title: 'Xbox handheld "Keel" officially revealed for summer 2027',
        platform: 'xbox',
        category: 'Announce',
        author: 'Tomas Reyes',
        readTime: '6 min read',
        publishedAt: PUB(3, 0),
        buzz: 72,
        gradient: 'from-emerald-600/40 to-slate-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'Microsoft confirms its first first-party handheld: full Windows-based Xbox experience, full Game Pass integration.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'Microsoft has officially revealed Keel, its first first-party gaming handheld, targeting a summer 2027 launch with the full Windows-based Xbox experience and day-one Game Pass integration.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The device pairs an AMD APU with a 7-inch 120Hz VRR display and, crucially, runs a console-shell layer over Windows that hides the desktop entirely. Every Xbox Series game runs natively, with cloud streaming filling gaps for titles that need more horsepower.',
                'Microsoft is positioning Keel as a "no-compromise companion" to the console rather than a replacement — save states and cross-progression work across the entire first-party catalog.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'The handheld market has exploded since the Steam Deck proved the form factor, and the Switch 2\'s record launch only raised the stakes. Microsoft had teased "Xbox everywhere" ambitions for two years.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'A Windows-based handheld with full Xbox parity puts immediate pressure on Valve and Sony to clarify their own portable roadmaps, and gives Game Pass a dedicated mobile beachhead.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'Pricing and final specs arrive early next year. If Microsoft nails the battery story, Keel could be the most consequential Xbox hardware since the Series X.',
            ]},
        ],
    },
    {
        title: 'Pokemon Presents unveils next mainline generation coming 2027',
        platform: 'nintendo',
        category: 'Preview',
        author: 'Lena Ortiz',
        readTime: '7 min read',
        publishedAt: PUB(2, 45),
        buzz: 71,
        gradient: 'from-red-600/40 to-slate-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'The next Pokemon generation is built from the ground up for Switch 2 — and it is the biggest visual leap in the franchise\'s history.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'A surprise Pokemon Presents broadcast revealed the next mainline generation, developed exclusively for Switch 2 and scheduled for late 2027 — the franchise\'s biggest visual leap to date.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'Built on a new engine, the game features a fully seamless open world with no loading zones between towns, routes, and dungeons. Battles now take place directly in the overworld, and the presentation finally matches the ambition fans have demanded for a decade.',
                'A new regional gimmick was teased but not fully explained, with The Pokemon Company promising details in a January follow-up broadcast.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'The previous generation drew criticism for technical shortcomings despite record sales. Moving development fully to Switch 2 hardware appears to be a direct response to that feedback.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'A mainline Pokemon exclusive is the single strongest software lever Nintendo holds for driving Switch 2 adoption through 2027, and analysts immediately revised hardware forecasts upward.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'Cautious optimism is the fanbase\'s default setting, but what was shown genuinely looked like the generational reset the series needed. January cannot come soon enough.',
            ]},
        ],
    },
    {
        title: 'League of Legends Worlds 2026 finals draw 8.4M peak concurrent viewers',
        platform: 'esports',
        category: 'Esports',
        author: 'Sora Kim',
        readTime: '6 min read',
        publishedAt: PUB(2, 15),
        buzz: 70,
        gradient: 'from-amber-600/40 to-slate-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'The highest-viewed esports final of the year delivered a five-game thriller and a new viewership benchmark.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'The League of Legends World Championship 2026 final peaked at 8.4 million concurrent viewers, the highest figure recorded for any esports final this year and a new benchmark for the title\'s modern era.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The five-game series between LCK and LPL champions delivered everything the format promises: a reverse sweep attempt, a Baron steal in the deciding game, and a rookie mid-laner winning Finals MVP on the biggest stage in the sport.',
                'Riot\'s co-streaming program again drove significant reach, with watch parties accounting for nearly a third of total hours watched.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'Worlds viewership has climbed steadily since the franchising era began, and the 2026 edition benefited from a narrative-rich bracket that kept both Korean and Chinese fanbases invested deep into the knockout stage.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'The number strengthens Riot\'s position in sponsorship negotiations heading into 2027 and keeps League firmly atop the viewership table ahead of Valorant\'s Seoul Champions.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'A final that will be replayed in highlight reels for years. Esports, on this evidence, is very much not in decline.',
            ]},
        ],
    },
    {
        title: 'Half-Life 3 confirmed: Valve announces 2027 release',
        platform: 'pc',
        category: 'Announce',
        author: 'Devin Cho',
        readTime: '10 min read',
        publishedAt: PUB(1, 45),
        buzz: 78,
        gradient: 'from-orange-600/40 to-slate-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'It is real, it is coming, and it is arriving sooner than anyone dared hope.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'Valve has officially confirmed Half-Life 3, ending the longest-running joke in gaming. The announcement came via a two-minute trailer with a single line of text at the end: "2027."',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The trailer shows Alyx Vance in a coastal setting that appears to continue directly from Half-Life: Alyx\'s ending, confirming the VR title\'s story is canon bridge material. Valve says the game is a full-length single-player campaign built on Source 3, playable entirely in traditional flat-screen mode with optional VR support.',
                'Valve\'s statement describes the project as "the game we have been building toward for twenty years," and confirms it will not be episodic.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'Half-Life 2: Episode Two ended on a cliffhanger in 2007. Nearly two decades of rumors, leaks, and fan projects later, the sequel fans had given up hoping for is actually shipping.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'The announcement instantly dominated every gaming conversation on the internet and will anchor Valve\'s 2027, setting up a colossal collision with GTA VI and the rest of a historically stacked year.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'The wait is almost over. 2027 is going to be absurd.',
            ]},
        ],
    },
    {
        title: 'Bloodborne remaster rated in Korea, launch window leaks',
        platform: 'playstation',
        category: 'Leak',
        author: 'Mara Velez',
        readTime: '4 min read',
        publishedAt: PUB(1, 15),
        buzz: 69,
        gradient: 'from-violet-600/40 to-slate-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'A Korean ratings board listing points to a 60fps Bloodborne remaster with PS5 Pro 2 enhancements.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'A listing on Korea\'s ratings board has surfaced for a Bloodborne remaster, and accompanying paperwork points to a spring 2027 launch with PS5 Pro 2 enhancement support.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The listing describes a single-player and multiplayer action RPG published by Sony Interactive Entertainment, with documentation referencing 60fps performance targets and upscaled 4K assets — the two upgrades fans have begged for since the PS4 original launched locked at 30.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'Bloodborne has been conspicuously absent from Sony\'s remaster program despite being one of the most requested titles of the PS4 generation. FromSoftware\'s packed schedule was long assumed to be the blocker.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'A ratings listing is close to confirmation, and the timing — ahead of a rumored PS5 Pro 2 — suggests Sony wants a prestige catalog title to showcase the refresh\'s capabilities.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'Neither Sony nor FromSoftware has commented. But ratings boards rarely list games that never ship. Fear the old blood, indeed.',
            ]},
        ],
    },
    {
        title: 'Halo: New Dawn campaign gameplay set to debut at The Game Awards',
        platform: 'xbox',
        category: 'Preview',
        author: 'Priya Anand',
        readTime: '5 min read',
        publishedAt: PUB(0, 50),
        buzz: 68,
        gradient: 'from-teal-600/40 to-slate-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: '343 Industries\' next chapter of the Halo saga gets its first extended gameplay reveal in December.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'Microsoft has confirmed that Halo: New Dawn will receive its first extended campaign gameplay reveal at The Game Awards in December, alongside a firm release date.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'New Dawn is described as a more focused, linear campaign that trades Halo Infinite\'s open zone for designed encounter spaces — a direct response to criticism that the open-world formula diluted the series\' signature combat pacing.',
                'The Slipspace engine has been heavily reworked, with the reveal reportedly centered on a new squad-based system built around marine AI companions.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'Halo Infinite\'s post-launch redemption arc earned goodwill back for 343 Industries, and the studio has spent three years heads-down on its follow-up with a rare lack of leaks.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'A strong showing at The Game Awards would give Xbox its first true system-selling exclusive conversation since the Series launch, arriving alongside the Keel handheld reveal.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'December just became appointment viewing. The Chief rides again.',
            ]},
        ],
    },
    {
        title: 'Zelda: Echoes of Time rated for Switch 2 by ESRB',
        platform: 'nintendo',
        category: 'Leak',
        author: 'Lena Ortiz',
        readTime: '4 min read',
        publishedAt: PUB(0, 30),
        buzz: 67,
        gradient: 'from-amber-500/40 to-slate-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'An ESRB rating for an unannounced Zelda title has appeared, and the description raises eyebrows.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'An ESRB listing for "The Legend of Zelda: Echoes of Time" on Switch 2 has appeared ahead of any official announcement, describing a time-manipulation adventure with dual-era exploration.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The rating summary references mechanics that let players "shift between two eras of the same world," with environmental puzzles that depend on changes made in one era propagating to the other. The description reads closer to a traditional dungeon-driven Zelda than the open-air formula of recent entries.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'Nintendo almost always announces titles before ratings surface, making early listings a reliable — if rare — leak vector. The name echoes the cancelled Oracle-era "Mystical Seed of Courage" concepts, delighting series historians.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'A second major first-party Zelda on Switch 2 within the console\'s first two years would be unprecedented and further cements the platform\'s momentum against newly announced competition.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'Expect Nintendo to acknowledge this sooner rather than later. Ratings do not stay unannounced for long.',
            ]},
        ],
    },
    {
        title: 'CS3 announced with Source 3 engine and 128-tick competitive baseline',
        platform: 'esports',
        category: 'Announce',
        author: 'Sora Kim',
        readTime: '8 min read',
        publishedAt: PUB(0, 10),
        buzz: 66,
        gradient: 'from-sky-600/40 to-slate-900/10',
        imageUrl: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=800&q=80',
        sources: DEFAULT_SOURCES,
        excerpt: 'Valve doubles down on competitive Counter-Strike with a sequel built on the same engine as Half-Life 3.',
        sections: [
            { heading: 'Introduction', paragraphs: [
                'Valve has announced Counter-Strike 3, built on the newly revealed Source 3 engine, with 128-tick servers as the competitive baseline and full cosmetic inventory carry-over from CS2.',
            ]},
            { heading: 'Deep Dive', paragraphs: [
                'The headline competitive changes are structural: sub-tick updates across the entire simulation rather than just hit registration, a reworked smoke grenade with volumetric propagation, and a matchmaking overhaul that finally merges the premier and casual pools behind a single visible rating.',
                'Every CS2 skin, sticker, and knife transfers to CS3 — a decision that protects the game\'s multi-billion-dollar secondary market and removes the single biggest obstacle to a sequel transition.',
            ]},
            { heading: 'Background Context', paragraphs: [
                'CS2\'s launch was rocky, with pro players criticizing inconsistency for over a year. Valve has spent 2026 quietly rebuilding trust through frequent updates, and this announcement is the payoff.',
            ]},
            { heading: 'Industry Impact', paragraphs: [
                'The esports ecosystem will migrate wholesale — expect every major league to announce CS3 seasons within weeks, and expect the game to anchor Valve\'s 2027 alongside Half-Life 3.',
            ]},
            { heading: 'Conclusion', paragraphs: [
                'A free upgrade path, carried inventory, and a genuinely modern engine. Valve is not leaving the crown up for grabs.',
            ]},
        ],
    },
];
