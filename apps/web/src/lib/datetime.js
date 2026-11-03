// Shared date formatting helpers for AdilLoopGames news portal.

export function formatPubDate(date) {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    const datePart = d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    const timePart = d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
    return `${datePart} · ${timePart}`;
}

export function formatRelative(date) {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    const diff = Math.max(0, Date.now() - d.getTime());
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hr ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
}

export function formatDateline(date) {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    const datePart = d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    return `Published: ${datePart} · Updated ${formatRelative(d)}`;
}
