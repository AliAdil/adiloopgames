import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

function LegalModal({ open, onClose, title, icon: Icon, children }) {
    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative my-6 w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    aria-label="Close"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70"
                >
                    <X className="h-5 w-5" strokeWidth={2.5} />
                </button>
                <div className="px-6 pb-10 pt-8 md:px-10">
                    <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                            <Icon className="h-5 w-5" strokeWidth={2.5} />
                        </span>
                        <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                            {title}
                        </h2>
                    </div>
                    <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-foreground [&_li]:ml-4 [&_li]:list-disc [&_ul]:space-y-1.5">
                        {children}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                        <X className="h-4 w-4" strokeWidth={2.5} />
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export function PrivacyPolicyModal({ open, onClose }) {
    return (
        <LegalModal open={open} onClose={onClose} title="Privacy Policy" icon={ShieldCheck}>
            <p><strong className="text-foreground">Last updated: November 3, 2026.</strong> AdilLoopGames ("we", "us") operates adiloopgames.com. This policy explains what data we collect, why, and the rights you have under the GDPR and other privacy laws.</p>

            <h3>1. Data We Collect</h3>
            <ul>
                <li><strong className="text-foreground">Newsletter subscriptions:</strong> your email address, stored to send the AdilLoop Daily Gaming Digest. You can unsubscribe at any time.</li>
                <li><strong className="text-foreground">Usage data:</strong> anonymous analytics such as pages visited, time on page, and approximate location (country/city level) to understand what content readers value.</li>
                <li><strong className="text-foreground">Cookies &amp; similar technologies:</strong> see the Cookie section below.</li>
            </ul>

            <h3>2. Cookies &amp; Local Storage</h3>
            <p>We use strictly necessary storage (for example, to remember your cookie choices and subscription state) and — only with your consent — analytics and advertising cookies set by us and by third-party vendors. You can withdraw consent at any time via the cookie settings link in our footer.</p>

            <h3>3. Google AdSense &amp; Third-Party Advertising Disclosures</h3>
            <ul>
                <li>We use Google AdSense and other third-party vendor partners to display advertising on this site.</li>
                <li>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites.</li>
                <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the internet.</li>
                <li>You may opt out of personalized advertising by visiting <span className="text-foreground">Google Ads Settings</span>, and opt out of third-party vendor cookies for many other providers via <span className="text-foreground">aboutads.info/choices</span> or <span className="text-foreground">youronlinechoices.eu</span>.</li>
                <li>Where required by law, we request your consent before setting non-essential advertising cookies, in line with the GDPR and the ePrivacy Directive.</li>
            </ul>

            <h3>4. Affiliate Sponsorships</h3>
            <p>Some content is sponsored or contains affiliate partner links. We may earn a commission on qualifying purchases. Sponsored content is always labeled. Commissions never influence our editorial coverage.</p>

            <h3>5. Your GDPR Rights</h3>
            <ul>
                <li>Access — request a copy of the personal data we hold about you.</li>
                <li>Rectification — correct inaccurate data.</li>
                <li>Erasure — request deletion of your data, including newsletter unsubscribe.</li>
                <li>Restriction and objection — including objection to processing for personalized advertising.</li>
                <li>Data portability — receive your data in a portable format.</li>
                <li>Lodge a complaint with your local data protection authority.</li>
            </ul>

            <h3>6. Contact</h3>
            <p>For any privacy request, email <span className="text-foreground">ali@adiloopgames.com</span>. We respond within 30 days.</p>
        </LegalModal>
    );
}

export function TermsOfServiceModal({ open, onClose }) {
    return (
        <LegalModal open={open} onClose={onClose} title="Terms of Service" icon={FileText}>
            <p><strong className="text-foreground">Last updated: November 3, 2026.</strong> These terms govern your use of adiloopgames.com. By using the site you agree to them.</p>

            <h3>1. Use of Content</h3>
            <p>All articles, artwork, and original game content are the property of AdilLoopGames or their respective owners. You may share links freely; republishing full articles requires written permission from <span className="text-foreground">ali@adiloopgames.com</span>.</p>

            <h3>2. Editorial Independence</h3>
            <p>Our news coverage is independently written. Sponsored placements and affiliate partner links are always labeled and never affect editorial judgment.</p>

            <h3>3. Advertising &amp; Third-Party Links</h3>
            <ul>
                <li>The site displays advertising, including Google AdSense units and affiliate sponsorships.</li>
                <li>Ads and linked third-party sites are governed by their own terms and privacy policies; we are not responsible for their content or practices.</li>
                <li>Purchases made through affiliate partner links are transactions between you and the seller.</li>
            </ul>

            <h3>4. Newsletter</h3>
            <p>Subscribing to the AdilLoop Daily Gaming Digest means you consent to receive email from <span className="text-foreground">ali@adiloopgames.com</span>. Every email includes an unsubscribe link, honored promptly.</p>

            <h3>5. Acceptable Use</h3>
            <p>Do not scrape, overload, or attempt to gain unauthorized access to the site or its administrative areas. Unauthorized access attempts may be reported to the relevant authorities.</p>

            <h3>6. Limitation of Liability</h3>
            <p>The site is provided "as is". To the maximum extent permitted by law, AdilLoopGames is not liable for indirect or consequential damages arising from use of the site or reliance on its content.</p>

            <h3>7. Contact</h3>
            <p>Questions about these terms: <span className="text-foreground">ali@adiloopgames.com</span>.</p>
        </LegalModal>
    );
}
