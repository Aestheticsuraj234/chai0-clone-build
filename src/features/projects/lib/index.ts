export function getProjectThumbnailUrl(seed: string) {
    return `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(seed)}`;
}
