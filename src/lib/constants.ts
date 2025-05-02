export const STORAGE_KEYWORDS_KEY = 'spoilerKeywords'
export const STORAGE_SPOILERS_COUNT_KEY = 'spoilerHiddenCount'
export const THUMBNAIL_SELECTORS: string[] = ['#thumbnail img', 'yt-image img']
export const VIDEO_SELECTORS: string[] = [
  'ytd-rich-item-renderer', // Home feed, search results
  'ytd-video-renderer', // Search results, related videos
  'ytd-grid-video-renderer', // Subscriptions grid
  'ytd-compact-video-renderer', // Related videos sidebar
  'ytm-video-with-context-renderer', // Mobile web view
  'ytm-compact-video-renderer', // Mobile web view related videos
  'ytd-reel-item-renderer', // Shorts
  'ytd-playlist-renderer', // Playlists
]
export const PLAYER_TITLE_SELECTOR = 'h1.ytd-watch-metadata yt-formatted-string'
export const TITLE_SELECTORS: string[] = [
  '#video-title', // Video title
  PLAYER_TITLE_SELECTOR,
]

// Regex to detect scores like "2-1", "3 - 0", "1:0"
export const SCORE_REGEX = /\b\d+\s*[-:]\s*\d+\b/
// Keywords to check for hiding thumbnails
export const SCORE_KEYWORDS = [
  'score',
  'resumen',
  'highlights',
  'replay',
  'win',
  'lose',
  'victory',
  'defeat',
  'match',
  'completo',
  'full',
  'game',
]
