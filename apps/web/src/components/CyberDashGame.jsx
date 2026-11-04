import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Trophy, Zap, Shield, Sparkles, Flame } from 'lucide-react';

export default function CyberDashGame() {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        try {
            return parseInt(localStorage.getItem('adiloop_cyberdash_highscore') || '0', 10);
        } catch {
            return 0;
        }
    });
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [multiplier, setMultiplier] = useState(1);
    const [isOverdrive, setIsOverdrive] = useState(false);

    // Audio Context Synthesizer (Zero external dependencies)
    const audioCtxRef = useRef(null);

    const initAudio = () => {
        if (!audioCtxRef.current) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                audioCtxRef.current = new AudioCtx();
            }
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
    };

    const playTone = (freqStart, freqEnd, type, duration, vol = 0.15) => {
        if (!soundEnabled) return;
        try {
            initAudio();
            const ctx = audioCtxRef.current;
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), ctx.currentTime + duration);

            gain.gain.setValueAtTime(vol, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch {}
    };

    const playSound = (kind) => {
        if (!soundEnabled) return;
        if (kind === 'jump') playTone(220, 600, 'sine', 0.15, 0.2);
        else if (kind === 'doublejump') playTone(450, 950, 'triangle', 0.2, 0.25);
        else if (kind === 'slide') playTone(180, 80, 'sawtooth', 0.18, 0.15);
        else if (kind === 'coin') {
            playTone(987, 1318, 'sine', 0.12, 0.2);
            setTimeout(() => playTone(1318, 1760, 'sine', 0.15, 0.15), 50);
        } else if (kind === 'overdrive') {
            [440, 554, 659, 880].forEach((f, i) => {
                setTimeout(() => playTone(f, f * 1.5, 'triangle', 0.15, 0.2), i * 60);
            });
        } else if (kind === 'crash') {
            playTone(150, 40, 'sawtooth', 0.4, 0.35);
        }
    };

    // Game Loop References
    const gameRef = useRef({
        running: false,
        player: {
            x: 80,
            y: 200,
            width: 38,
            height: 48,
            vy: 0,
            isJumping: false,
            jumpCount: 0,
            isSliding: false,
            slideTimer: 0,
            trail: []
        },
        obstacles: [],
        collectibles: [],
        particles: [],
        bgStars: [],
        speed: 6.5,
        distance: 0,
        score: 0,
        coins: 0,
        overdriveTimer: 0,
        lastSpawn: 0,
        nextSpawnDist: 70
    });

    const startGame = () => {
        initAudio();
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Reset stars
        const stars = [];
        for (let i = 0; i < 40; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * (canvas.height - 80),
                size: Math.random() * 2 + 1,
                speed: Math.random() * 1.5 + 0.5,
                color: Math.random() > 0.5 ? '#a3e635' : '#06b6d4'
            });
        }

        gameRef.current = {
            running: true,
            player: {
                x: 90,
                y: canvas.height - 80 - 48,
                width: 38,
                height: 48,
                vy: 0,
                isJumping: false,
                jumpCount: 0,
                isSliding: false,
                slideTimer: 0,
                trail: []
            },
            obstacles: [],
            collectibles: [],
            particles: [],
            bgStars: stars,
            speed: 6.5,
            distance: 0,
            score: 0,
            coins: 0,
            overdriveTimer: 0,
            lastSpawn: 0,
            nextSpawnDist: 60
        };

        setScore(0);
        setMultiplier(1);
        setIsOverdrive(false);
        setGameState('playing');
        playSound('overdrive');
    };

    const jump = () => {
        if (gameState !== 'playing') {
            startGame();
            return;
        }
        const p = gameRef.current.player;
        if (p.jumpCount < 2) {
            p.vy = p.jumpCount === 0 ? -13.5 : -12;
            p.jumpCount += 1;
            p.isJumping = true;
            p.isSliding = false;
            playSound(p.jumpCount === 1 ? 'jump' : 'doublejump');

            // Burst particles
            for (let i = 0; i < 8; i++) {
                gameRef.current.particles.push({
                    x: p.x + p.width / 2,
                    y: p.y + p.height,
                    vx: (Math.random() - 0.5) * 4,
                    vy: Math.random() * 3 + 1,
                    life: 20,
                    maxLife: 20,
                    color: p.jumpCount === 1 ? '#a3e635' : '#38bdf8',
                    size: 3
                });
            }
        }
    };

    const slide = () => {
        if (gameState !== 'playing') return;
        const p = gameRef.current.player;
        if (!p.isJumping) {
            p.isSliding = true;
            p.slideTimer = 35; // Frames of slide
            playSound('slide');

            for (let i = 0; i < 6; i++) {
                gameRef.current.particles.push({
                    x: p.x,
                    y: p.y + 40,
                    vx: -Math.random() * 5 - 2,
                    vy: (Math.random() - 0.5) * 2,
                    life: 15,
                    maxLife: 15,
                    color: '#f43f5e',
                    size: 2.5
                });
            }
        }
    };

    // Keyboard bindings
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
                e.preventDefault();
                jump();
            } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
                e.preventDefault();
                slide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState]);

    // Main 60FPS Game Loop
    useEffect(() => {
        let animId;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const groundY = canvas.height - 60;

        const updateAndRender = () => {
            const g = gameRef.current;
            const p = g.player;

            // Clear frame
            ctx.fillStyle = '#08090f';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 1. Draw Starfield
            g.bgStars.forEach((star) => {
                if (g.running) {
                    star.x -= star.speed * (g.overdriveTimer > 0 ? 1.8 : 1);
                    if (star.x < 0) star.x = canvas.width;
                }
                ctx.fillStyle = star.color;
                ctx.globalAlpha = 0.6;
                ctx.fillRect(star.x, star.y, star.size, star.size);
            });
            ctx.globalAlpha = 1;

            // 2. Draw Cyber Horizon Skyline
            ctx.fillStyle = '#0f1423';
            const skylineY = groundY - 70;
            ctx.fillRect(0, skylineY + 30, canvas.width, 40);

            // Parallax Grid Ground
            ctx.strokeStyle = g.overdriveTimer > 0 ? '#ec4899' : '#1e293b';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, groundY);
            ctx.lineTo(canvas.width, groundY);
            ctx.stroke();

            // Ground glow grid
            const gridOffset = (g.distance * 2) % 30;
            ctx.strokeStyle = g.overdriveTimer > 0 ? 'rgba(236,72,153,0.3)' : 'rgba(163,230,53,0.15)';
            for (let gx = -gridOffset; gx < canvas.width; gx += 30) {
                ctx.beginPath();
                ctx.moveTo(gx, groundY);
                ctx.lineTo(gx - 40, canvas.height);
                ctx.stroke();
            }
            ctx.fillStyle = '#05070d';
            ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

            if (g.running) {
                g.distance += 1;
                g.speed = Math.min(12, 6.5 + Math.floor(g.distance / 350) * 0.4);

                // Overdrive logic
                if (g.overdriveTimer > 0) {
                    g.overdriveTimer -= 1;
                    if (g.overdriveTimer === 0) {
                        setIsOverdrive(false);
                        setMultiplier(1);
                    }
                }

                // Physics: Gravity & Jump
                p.y += p.vy;
                p.vy += 0.68; // Gravity

                const currentHeight = p.isSliding ? 24 : 48;
                const normalY = groundY - currentHeight;

                if (p.y >= normalY) {
                    p.y = normalY;
                    p.vy = 0;
                    p.isJumping = false;
                    p.jumpCount = 0;
                }

                // Slide Timer
                if (p.isSliding) {
                    p.slideTimer -= 1;
                    if (p.slideTimer <= 0) {
                        p.isSliding = false;
                        p.y = groundY - 48;
                    }
                }

                // Player Trail
                p.trail.unshift({ x: p.x, y: p.y, width: p.width, height: currentHeight, alpha: 0.5 });
                if (p.trail.length > 5) p.trail.pop();

                // Spawn Obstacles & Collectibles
                g.lastSpawn += 1;
                if (g.lastSpawn >= g.nextSpawnDist) {
                    g.lastSpawn = 0;
                    g.nextSpawnDist = Math.floor(Math.random() * 40) + 55;

                    const rand = Math.random();
                    if (rand < 0.45) {
                        // Ground Spike Pylon
                        g.obstacles.push({
                            type: 'spike',
                            x: canvas.width,
                            y: groundY - 36,
                            width: 24,
                            height: 36,
                            color: '#ef4444'
                        });
                    } else if (rand < 0.75) {
                        // Flying Drone Laser Barrier (Must Slide Under!)
                        g.obstacles.push({
                            type: 'drone',
                            x: canvas.width,
                            y: groundY - 68,
                            width: 34,
                            height: 34,
                            color: '#ec4899'
                        });
                    } else {
                        // Tall Pylon (Must Double Jump!)
                        g.obstacles.push({
                            type: 'tall_pylon',
                            x: canvas.width,
                            y: groundY - 50,
                            width: 22,
                            height: 50,
                            color: '#f97316'
                        });
                    }

                    // Chance to spawn coin or powerup
                    if (Math.random() < 0.6) {
                        const coinY = Math.random() > 0.5 ? groundY - 40 : groundY - 90;
                        g.collectibles.push({
                            type: Math.random() < 0.12 ? 'overdrive' : 'gem',
                            x: canvas.width + 60,
                            y: coinY,
                            size: 14
                        });
                    }
                }

                // Update & Check Obstacles
                for (let i = g.obstacles.length - 1; i >= 0; i--) {
                    const ob = g.obstacles[i];
                    ob.x -= g.speed;

                    // Collision Box
                    const pBox = {
                        x: p.x + 4,
                        y: p.y + 4,
                        w: p.width - 8,
                        h: currentHeight - 6
                    };

                    const hit = (
                        pBox.x < ob.x + ob.width &&
                        pBox.x + pBox.w > ob.x &&
                        pBox.y < ob.y + ob.height &&
                        pBox.y + pBox.h > ob.y
                    );

                    if (hit) {
                        if (g.overdriveTimer > 0) {
                            // Invincible! Destroy obstacle with explosion
                            g.obstacles.splice(i, 1);
                            playSound('coin');
                            for (let k = 0; k < 12; k++) {
                                g.particles.push({
                                    x: ob.x + 10,
                                    y: ob.y + 10,
                                    vx: (Math.random() - 0.5) * 8,
                                    vy: (Math.random() - 0.5) * 8,
                                    life: 25,
                                    maxLife: 25,
                                    color: '#ec4899',
                                    size: 4
                                });
                            }
                            continue;
                        } else {
                            // Game Over!
                            g.running = false;
                            playSound('crash');
                            setGameState('gameover');

                            // High score check
                            const finalScore = g.score;
                            if (finalScore > highScore) {
                                setHighScore(finalScore);
                                try {
                                    localStorage.setItem('adiloop_cyberdash_highscore', finalScore.toString());
                                } catch {}
                            }
                            break;
                        }
                    }

                    if (ob.x + ob.width < -10) {
                        g.obstacles.splice(i, 1);
                        g.score += 5 * (g.overdriveTimer > 0 ? 2 : 1);
                        setScore(g.score);
                    }
                }

                // Update & Check Collectibles
                for (let i = g.collectibles.length - 1; i >= 0; i--) {
                    const c = g.collectibles[i];
                    c.x -= g.speed;

                    // Collect check
                    const dist = Math.hypot(p.x + p.width / 2 - c.x, p.y + currentHeight / 2 - c.y);
                    if (dist < 32) {
                        if (c.type === 'overdrive') {
                            g.overdriveTimer = 320; // ~5.5s
                            setIsOverdrive(true);
                            setMultiplier(2);
                            g.score += 50;
                            playSound('overdrive');
                        } else {
                            g.score += 25 * (g.overdriveTimer > 0 ? 2 : 1);
                            playSound('coin');
                        }
                        g.coins += 1;
                        setScore(g.score);

                        // Particle chime
                        for (let k = 0; k < 8; k++) {
                            g.particles.push({
                                x: c.x,
                                y: c.y,
                                vx: (Math.random() - 0.5) * 6,
                                vy: (Math.random() - 0.5) * 6,
                                life: 20,
                                maxLife: 20,
                                color: c.type === 'overdrive' ? '#ec4899' : '#eab308',
                                size: 3
                            });
                        }
                        g.collectibles.splice(i, 1);
                    } else if (c.x < -20) {
                        g.collectibles.splice(i, 1);
                    }
                }
            }

            // Draw Obstacles
            g.obstacles.forEach((ob) => {
                ctx.fillStyle = ob.color;
                ctx.shadowColor = ob.color;
                ctx.shadowBlur = 10;

                if (ob.type === 'spike') {
                    // Triangle spike
                    ctx.beginPath();
                    ctx.moveTo(ob.x, groundY);
                    ctx.lineTo(ob.x + ob.width / 2, ob.y);
                    ctx.lineTo(ob.x + ob.width, groundY);
                    ctx.closePath();
                    ctx.fill();
                } else if (ob.type === 'drone') {
                    // Laser Drone
                    ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
                    // Glowing bottom laser
                    ctx.fillStyle = '#f43f5e';
                    ctx.fillRect(ob.x - 4, ob.y + ob.height, ob.width + 8, 4);
                } else {
                    // Rounded Pylon
                    ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
                }
            });
            ctx.shadowBlur = 0;

            // Draw Collectibles
            g.collectibles.forEach((c) => {
                if (c.type === 'overdrive') {
                    ctx.fillStyle = '#ec4899';
                    ctx.shadowColor = '#ec4899';
                    ctx.shadowBlur = 12;
                    ctx.beginPath();
                    ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
                    ctx.fill();
                    // Pulse ring
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                } else {
                    // Golden Adil Gem Diamond
                    ctx.fillStyle = '#eab308';
                    ctx.shadowColor = '#facc15';
                    ctx.shadowBlur = 8;
                    ctx.beginPath();
                    ctx.moveTo(c.x, c.y - c.size);
                    ctx.lineTo(c.x + c.size, c.y);
                    ctx.lineTo(c.x, c.y + c.size);
                    ctx.lineTo(c.x - c.size, c.y);
                    ctx.closePath();
                    ctx.fill();
                }
            });
            ctx.shadowBlur = 0;

            // Draw Particles
            for (let i = g.particles.length - 1; i >= 0; i--) {
                const part = g.particles[i];
                part.x += part.vx;
                part.y += part.vy;
                part.life -= 1;
                ctx.fillStyle = part.color;
                ctx.globalAlpha = part.life / part.maxLife;
                ctx.beginPath();
                ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
                ctx.fill();

                if (part.life <= 0) g.particles.splice(i, 1);
            }
            ctx.globalAlpha = 1;

            // Draw Player Trail (Motion Blur)
            p.trail.forEach((t, index) => {
                ctx.fillStyle = g.overdriveTimer > 0 ? `rgba(236,72,153,${0.3 - index * 0.05})` : `rgba(163,230,53,${0.25 - index * 0.04})`;
                ctx.fillRect(t.x - index * 6, t.y, t.width, t.height);
            });

            // Draw Player Avatar
            const curH = p.isSliding ? 24 : 48;
            ctx.fillStyle = g.overdriveTimer > 0 ? '#ec4899' : '#a3e635';
            ctx.shadowColor = g.overdriveTimer > 0 ? '#ec4899' : '#a3e635';
            ctx.shadowBlur = 12;

            // Cyber Hover Hero shape
            ctx.beginPath();
            ctx.roundRect(p.x, p.y, p.width, curH, [8, 12, 4, 4]);
            ctx.fill();

            // Eye Visor
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(p.x + (p.isSliding ? 14 : 18), p.y + (p.isSliding ? 6 : 10), 14, 6);
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(p.x + (p.isSliding ? 20 : 24), p.y + (p.isSliding ? 7 : 11), 6, 4);

            // Jet Thruster flame
            if (g.running) {
                ctx.fillStyle = g.overdriveTimer > 0 ? '#38bdf8' : '#f97316';
                ctx.beginPath();
                ctx.moveTo(p.x - 2, p.y + curH - 12);
                ctx.lineTo(p.x - 12 - Math.random() * 8, p.y + curH - 8);
                ctx.lineTo(p.x - 2, p.y + curH - 4);
                ctx.closePath();
                ctx.fill();
            }
            ctx.shadowBlur = 0;

            animId = requestAnimationFrame(updateAndRender);
        };

        animId = requestAnimationFrame(updateAndRender);
        return () => cancelAnimationFrame(animId);
    }, [gameState]);

    const getRank = (pts) => {
        if (pts >= 1500) return '⚡ Mythic Speedrunner';
        if (pts >= 800) return '🔥 Overdrive Master';
        if (pts >= 400) return '✨ Cyber Mercenary';
        if (pts >= 150) return '🎮 Neon Drifter';
        return '🕹️ Rookie Runner';
    };

    return (
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-b from-[#0e1222] to-[#08090f] p-4 shadow-2xl shadow-primary/10 sm:p-6">
            {/* Header / HUD */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-black font-extrabold shadow-lg shadow-primary/30">
                        <Flame className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-display text-xl font-black uppercase tracking-wider text-white">
                                Cyber Dash <span className="text-primary">Neon Overdrive</span>
                            </h3>
                            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                                HYPER-CASUAL
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Jump, double-jump & slide across neon rooftops</p>
                    </div>
                </div>

                {/* Score & Audio Controls */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 rounded-xl border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                        <span className="text-muted-foreground">Best:</span>
                        <span className="font-mono text-yellow-400">{highScore}</span>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-bold">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="font-mono text-lg text-primary">{score}</span>
                        {multiplier > 1 && (
                            <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] text-black font-extrabold animate-pulse">
                                {multiplier}x
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-white transition"
                        title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
                    >
                        {soundEnabled ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4 text-rose-400" />}
                    </button>
                </div>
            </div>

            {/* Game Canvas Container */}
            <div className="relative aspect-[16/9] w-full max-h-[380px] overflow-hidden rounded-2xl border border-border/80 bg-black shadow-inner">
                <canvas
                    ref={canvasRef}
                    width={760}
                    height={380}
                    onClick={jump}
                    className="h-full w-full cursor-pointer touch-none select-none"
                />

                {/* Overdrive Overlay Banner */}
                {isOverdrive && (
                    <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-pink-500 bg-pink-500/20 px-4 py-1 text-xs font-extrabold text-pink-300 backdrop-blur-md animate-bounce">
                        <Shield className="h-3.5 w-3.5 text-pink-400" />
                        HYPER OVERDRIVE: 2X MULTIPLIER & INVINCIBLE!
                    </div>
                )}

                {/* Start / Idle Screen */}
                {gameState === 'idle' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 p-6 backdrop-blur-sm text-center">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                            <Sparkles className="h-3.5 w-3.5" /> ADDICTIVE ADILLOOP ARCADE
                        </div>
                        <h2 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                            Ready to Run?
                        </h2>
                        <p className="mt-2 max-w-md text-xs text-muted-foreground sm:text-sm">
                            Press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-white">Space</kbd> or tap to <span className="text-primary font-bold">Jump</span> (press twice for <span className="text-sky-400 font-bold">Double Jump</span>). Press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-white">Down</kbd> to <span className="text-rose-400 font-bold">Slide</span> under drone lasers!
                        </p>

                        <button
                            type="button"
                            onClick={startGame}
                            className="mt-6 flex items-center gap-2 rounded-2xl bg-primary px-7 py-3 font-display text-sm font-black uppercase tracking-wider text-black shadow-xl shadow-primary/30 transition-all duration-200 hover:scale-105 hover:bg-primary/90"
                        >
                            <Play className="h-5 w-5 fill-current" />
                            Start Running
                        </button>
                    </div>
                )}

                {/* Game Over Screen */}
                {gameState === 'gameover' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 p-6 backdrop-blur-md text-center">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-rose-500">
                            SYSTEM COLLISION DETECTED
                        </span>
                        <h2 className="mt-1 font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
                            Game Over
                        </h2>

                        <div className="mt-4 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-background/60 p-4 min-w-[240px]">
                            <div>
                                <p className="text-[11px] font-semibold text-muted-foreground uppercase">Score</p>
                                <p className="font-mono text-2xl font-black text-primary">{score}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold text-muted-foreground uppercase">High Score</p>
                                <p className="font-mono text-2xl font-black text-yellow-400">{highScore}</p>
                            </div>
                        </div>

                        <p className="mt-3 text-xs font-bold text-accent">
                            Rank: {getRank(score)}
                        </p>

                        <button
                            type="button"
                            onClick={startGame}
                            className="mt-5 flex items-center gap-2 rounded-2xl bg-primary px-8 py-3.5 font-display text-sm font-black uppercase tracking-wider text-black shadow-xl shadow-primary/30 transition-all duration-200 hover:scale-105 hover:bg-primary/90"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Play Again (Space)
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Touch Controls & Instructions */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
                <div className="hidden sm:flex items-center gap-3">
                    <span><kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 text-white">Space</kbd> / <kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 text-white">↑</kbd> Jump</span>
                    <span><kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 text-white">Space × 2</kbd> Double Jump</span>
                    <span><kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 text-white">↓</kbd> Slide</span>
                </div>

                {/* On-screen touch buttons for mobile / tablet */}
                <div className="flex w-full sm:w-auto items-center justify-center gap-3">
                    <button
                        type="button"
                        onPointerDown={(e) => { e.preventDefault(); jump(); }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-primary/50 bg-primary/20 px-6 py-2.5 font-display text-xs font-black uppercase tracking-wider text-primary active:scale-95 transition"
                    >
                        ⬆ JUMP
                    </button>
                    <button
                        type="button"
                        onPointerDown={(e) => { e.preventDefault(); slide(); }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-rose-500/50 bg-rose-500/20 px-6 py-2.5 font-display text-xs font-black uppercase tracking-wider text-rose-300 active:scale-95 transition"
                    >
                        ⬇ SLIDE
                    </button>
                </div>
            </div>
        </div>
    );
}
