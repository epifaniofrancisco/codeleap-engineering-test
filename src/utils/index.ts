export function formatTimeAgo(date: string): string {
    const now = new Date();
    const past = new Date(date);
    const diffInMinutes = Math.floor(
        (now.getTime() - past.getTime()) / (1000 * 60),
    );
    return `${diffInMinutes} minutes ago`;
}
