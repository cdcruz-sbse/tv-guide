/* ============================================
   BROADCAST OPERATIONS WIDGET — VANILLA JS
   ============================================ */

// ---------- DATE UTILITIES ----------
const TODAY = new Date(2026, 3, 22); // Apr 22, 2026
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_NAMES_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_NAMES_FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatShortDate(d) { return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`; }
function formatDayNumber(d) { return d.getDate(); }
function formatDayName(d) { return DAY_NAMES[d.getDay()]; }
function formatFullDate(d) {
  return `${DAY_NAMES_FULL[d.getDay()]}, ${MONTH_NAMES_FULL[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const DATE_RANGE = Array.from({ length: 14 }, (_, i) => addDays(TODAY, i));

// ---------- DATA ----------
const CHANNELS = [
  { id: "main", label: "Main", color: "#1e3a8a" },
  { id: "kids", label: "Kids", color: "#d97706" },
  { id: "create", label: "Create", color: "#059669" },
  { id: "world", label: "World", color: "#7c2d12" },
  { id: "explore", label: "Explore", color: "#6d28d9" },
  { id: "livingroom", label: "Living Room", color: "#be123c" },
  { id: "encore", label: "Encore", color: "#0e7490" },
];

const PROGRAMS = [
  { show: "Newshour", channel: "main", duration: 60, preferredHours: [7, 18] },
  { show: "Antiques Roadshow", channel: "main", duration: 60, preferredHours: [8, 20] },
  { show: "Nature", channel: "explore", duration: 60, preferredHours: [10, 20] },
  { show: "Masterpiece", channel: "main", duration: 90, preferredHours: [14, 21] },
  { show: "Amanpour & Company", channel: "world", duration: 60, preferredHours: [19, 23] },
  { show: "Frontline", channel: "main", duration: 120, preferredHours: [21] },
  { show: "The Count of Monte Cristo", channel: "main", duration: 90, preferredHours: [20] },
  { show: "Daniel Tiger", channel: "kids", duration: 30, preferredHours: [9, 14] },
  { show: "Sesame Street", channel: "kids", duration: 60, preferredHours: [8, 11] },
  { show: "Odd Squad", channel: "kids", duration: 30, preferredHours: [10, 15] },
  { show: "America's Test Kitchen", channel: "create", duration: 30, preferredHours: [11, 16] },
  { show: "Rick Steves' Europe", channel: "create", duration: 30, preferredHours: [12, 17] },
  { show: "Ken Burns: The American Buffalo", channel: "main", duration: 120, preferredHours: [21] },
  { show: "Independent Lens", channel: "world", duration: 90, preferredHours: [22] },
  { show: "NOVA", channel: "explore", duration: 60, preferredHours: [20, 22] },
  { show: "Finding Your Roots", channel: "main", duration: 60, preferredHours: [20] },
  { show: "This Old House", channel: "livingroom", duration: 30, preferredHours: [13, 18] },
  { show: "The Great British Baking Show", channel: "livingroom", duration: 60, preferredHours: [19, 21] },
  { show: "Austin City Limits", channel: "encore", duration: 60, preferredHours: [22] },
  { show: "Call the Midwife", channel: "main", duration: 60, preferredHours: [21] },
  { show: "Arthur", channel: "kids", duration: 30, preferredHours: [9, 15] },
  { show: "Wild Kratts", channel: "kids", duration: 30, preferredHours: [8, 14] },
];

function getDaypart(hour) {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "daytime";
  if (hour >= 17 && hour < 23) return "primetime";
  return "overnight";
}

function generateEpisode(show) {
  const map = {
    "Newshour": `Season 51 · E${Math.floor(Math.random() * 200) + 1}`,
    "Antiques Roadshow": `Season 28 · E${Math.floor(Math.random() * 26) + 1}`,
    "Nature": `Season 42 · E${Math.floor(Math.random() * 12) + 1}`,
    "Masterpiece": `Season 53 · E${Math.floor(Math.random() * 8) + 1}`,
    "Amanpour & Company": `Season 2026 · E${Math.floor(Math.random() * 250) + 1}`,
    "Frontline": `Season 44 · E${Math.floor(Math.random() * 24) + 1}`,
    "The Count of Monte Cristo": `Limited Series · E${Math.floor(Math.random() * 8) + 1}`,
    "Daniel Tiger": `Season 6 · E${Math.floor(Math.random() * 20) + 1}`,
    "Sesame Street": `Season 56 · E${Math.floor(Math.random() * 35) + 1}`,
    "Odd Squad": `Season 4 · E${Math.floor(Math.random() * 20) + 1}`,
    "America's Test Kitchen": `Season 25 · E${Math.floor(Math.random() * 26) + 1}`,
    "Rick Steves' Europe": `Season 12 · E${Math.floor(Math.random() * 13) + 1}`,
    "Ken Burns: The American Buffalo": `Limited · E${Math.floor(Math.random() * 2) + 1}`,
    "Independent Lens": `Season 27 · E${Math.floor(Math.random() * 20) + 1}`,
    "NOVA": `Season 52 · E${Math.floor(Math.random() * 20) + 1}`,
    "Finding Your Roots": `Season 11 · E${Math.floor(Math.random() * 10) + 1}`,
    "This Old House": `Season 46 · E${Math.floor(Math.random() * 26) + 1}`,
    "The Great British Baking Show": `Season 14 · E${Math.floor(Math.random() * 10) + 1}`,
    "Austin City Limits": `Season 51 · E${Math.floor(Math.random() * 13) + 1}`,
    "Call the Midwife": `Season 15 · E${Math.floor(Math.random() * 8) + 1}`,
    "Arthur": `Season 25 · E${Math.floor(Math.random() * 20) + 1}`,
    "Wild Kratts": `Season 7 · E${Math.floor(Math.random() * 26) + 1}`,
  };
  return map[show] || "New Episode";
}

function generateSchedule() {
  const items = [];
  let counter = 1;
  DATE_RANGE.forEach((d) => {
    const dk = dateKey(d);
    const blocks = [
      { range: [7, 12], threshold: 0.35 },
      { range: [12, 17], threshold: 0.40 },
      { range: [17, 23], threshold: 0.25 },
    ];
    blocks.forEach((b) => {
      PROGRAMS.filter((p) => p.preferredHours.some((h) => h >= b.range[0] && h < b.range[1])).forEach((p) => {
        const h = p.preferredHours.find((x) => x >= b.range[0] && x < b.range[1]);
        if (h !== undefined && Math.random() > b.threshold) {
          items.push({
            id: `s${counter++}`,
            show: p.show,
            channel: p.channel,
            time: `${String(h).padStart(2, "0")}:00`,
            hour: h,
            dateKey: dk,
            date: formatShortDate(d),
            daypart: getDaypart(h),
            episode: generateEpisode(p.show),
            duration: p.duration,
          });
        }
      });
    });
  });
  items.sort((a, b) => {
    if (a.dateKey !== b.dateKey) return a.dateKey.localeCompare(b.dateKey);
    if (a.hour !== b.hour) return a.hour - b.hour;
    return a.channel.localeCompare(b.channel);
  });
  return items;
}

const SCHEDULE = generateSchedule();

const SHOW_DETAILS = {
  "Amanpour & Company": {
    title: "Amanpour & Company",
    tagline: "Wide-ranging, in-depth interviews with global newsmakers",
    season: "Season 2026", episodes: 220, genre: "News & Public Affairs",
    rights: { window: "Feb 1, 2026 – Jan 31, 2027", territory: "US, all platforms", clearances: "Cleared for VOD + Streaming" },
    funding: ["Rosalind P. Walter", "Mutual of America", "Viewer Support"],
    contributors: [
      { name: "Maria Chen", role: "Scheduling Lead", note: "Confirmed 60-min cutdowns available for weekend slots." },
      { name: "Jordan Fields", role: "Rights Coordinator", note: "Streaming extension approved through FY27." },
    ],
    flags: [],
  },
  "The Count of Monte Cristo": {
    title: "The Count of Monte Cristo",
    tagline: "A sweeping new adaptation of the Dumas classic",
    season: "Limited Series", episodes: 8, genre: "Drama",
    rights: { window: "Jan 15, 2026 – Jan 14, 2028", territory: "US + Puerto Rico", clearances: "Broadcast + Streaming" },
    funding: ["Public Broadcasting Fund", "Anonymous Donor"],
    contributors: [{ name: "Priya Rao", role: "Programming", note: "Recommend primetime block. Avoid family hour." }],
    flags: [
      { kind: "Violence", level: "Moderate" },
      { kind: "Mature Themes", level: "Some" },
      { kind: "Brief Nudity", level: "Minimal" },
      { kind: "Medical Content", level: "Low" },
    ],
  },
  "Frontline": {
    title: "Frontline", tagline: "Investigative journalism that exposes injustice",
    season: "Season 44", episodes: 24, genre: "Documentary",
    rights: { window: "Ongoing", territory: "US, all platforms", clearances: "Broadcast + Digital" },
    funding: ["Public Broadcasting Fund", "Ford Foundation", "Park Foundation"],
    contributors: [{ name: "Alex Rivera", role: "Series Producer", note: "E08 contains archival footage — pre-cleared." }],
    flags: [
      { kind: "Mature Themes", level: "Strong" },
      { kind: "Disturbing Content", level: "Moderate" },
    ],
  },
  "Antiques Roadshow": {
    title: "Antiques Roadshow", tagline: "Treasure-hunting appraisals from across the country",
    season: "Season 28", episodes: 26, genre: "Reality / Lifestyle",
    rights: { window: "Feb 1, 2026 – Jan 31, 2029", territory: "US, all platforms", clearances: "Full clearance" },
    funding: ["Ancestry", "Consumer Cellular", "Public Broadcasting Fund"],
    contributors: [{ name: "Sam Washington", role: "Digital Lead", note: "Streaming window drops 14 days after broadcast." }],
    flags: [],
  },
  "Nature": {
    title: "Nature", tagline: "Breathtaking wildlife documentaries from across the globe",
    season: "Season 42", episodes: 12, genre: "Documentary",
    rights: { window: "Jan 1, 2026 – Dec 31, 2028", territory: "US, all platforms", clearances: "Broadcast + Streaming" },
    funding: ["Arnhold Foundation", "Sue and Edgar Wachenheim III", "Viewer Support"],
    contributors: [{ name: "Lin Park", role: "Series Producer", note: "4K masters available for all episodes this season." }],
    flags: [],
  },
  "Masterpiece": {
    title: "Masterpiece", tagline: "Award-winning drama from the UK and beyond",
    season: "Season 53", episodes: 8, genre: "Drama",
    rights: { window: "Mar 1, 2026 – Feb 28, 2028", territory: "US, all platforms", clearances: "Broadcast + Streaming" },
    funding: ["Viking", "Raymond James", "Public Broadcasting Fund"],
    contributors: [{ name: "Elena Voss", role: "Acquisitions", note: "BBC delivered masters two weeks ahead of schedule." }],
    flags: [{ kind: "Mature Themes", level: "Some" }],
  },
  "NOVA": {
    title: "NOVA", tagline: "Science and technology documentaries",
    season: "Season 52", episodes: 20, genre: "Science",
    rights: { window: "Ongoing", territory: "US, all platforms", clearances: "Broadcast + Digital + Education" },
    funding: ["David H. Koch Fund for Science", "Public Broadcasting Fund", "Viewer Support"],
    contributors: [{ name: "Devon Carter", role: "Digital Producer", note: "Classroom resources published with each episode." }],
    flags: [],
  },
  "Ken Burns: The American Buffalo": {
    title: "Ken Burns: The American Buffalo", tagline: "The epic story of the American West's most iconic animal",
    season: "Limited", episodes: 2, genre: "Documentary",
    rights: { window: "Apr 1, 2026 – Mar 31, 2029", territory: "US + Canada", clearances: "Broadcast + Streaming" },
    funding: ["Bank of America", "Public Broadcasting Fund", "Park Foundation"],
    contributors: [{ name: "Marcus Reed", role: "Programming", note: "Pair with companion podcast series in Media Manager." }],
    flags: [],
  },
};

const ACTIVITY_TOPICS = [
  { id: "bugs", label: "Media Issues", iconKey: "alert-circle", desc: "Station-reported media file problems" },
  { id: "guide", label: "Schedule Updates", iconKey: "calendar", desc: "Changes to the programming guide" },
  { id: "rights", label: "Rights & Clearances", iconKey: "flag", desc: "New windows, expirations, territory changes" },
  { id: "shows", label: "Show Metadata", iconKey: "film", desc: "New contributor notes and advisories" },
];

// ---------- ICONS (inline SVG paths) ----------
const ICONS = {
  "tv": '<rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/>',
  "search": '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  "bell": '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  "bell-ring": '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/><path d="M22 8c0-2.3-.8-4.3-2-6"/>',
  "alert-circle": '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  "alert-triangle": '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  "layers": '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  "calendar": '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  "calendar-days": '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>',
  "clock": '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  "send": '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  "message-square": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  "check": '<circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>',
  "chevron-right": '<polyline points="9 18 15 12 9 6"/>',
  "chevron-left": '<polyline points="15 18 9 12 15 6"/>',
  "user": '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  "users": '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  "radio": '<circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>',
  "film": '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>',
  "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
  "heart": '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  "eye": '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  "sparkles": '<path d="M12 3l1.88 5.76a1 1 0 0 0 .95.69h6.06a1 1 0 0 1 .59 1.81l-4.9 3.56a1 1 0 0 0-.36 1.12L18.1 21.7a1 1 0 0 1-1.54 1.12L12 19.27l-4.56 3.55a1 1 0 0 1-1.54-1.12l1.88-5.76a1 1 0 0 0-.36-1.12L2.52 11.26a1 1 0 0 1 .59-1.81h6.06a1 1 0 0 0 .95-.69L12 3z"/>',
  "mail": '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  "x": '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  "plus": '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  "arrow-up-right": '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
  "hash": '<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>',
  "flag": '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
  "layout-grid": '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
};

function icon(key, size = 16, opts = {}) {
  const stroke = opts.stroke || "currentColor";
  const sw = opts.strokeWidth || 2;
  const cls = opts.className || "";
  const style = opts.style ? ` style="${opts.style}"` : "";
  const paths = ICONS[key] || "";
  return `<svg class="${cls}" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${style}>${paths}</svg>`;
}

// ---------- HELPERS ----------
function escape(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatHour(h) {
  if (h === 0) return "12 AM";
  if (h === 12) return "12 PM";
  if (h < 12) return `${h} AM`;
  return `${h - 12} PM`;
}

// ---------- STATE ----------
const state = {
  role: "station",
  activeTab: "guide",
  weekStartIndex: 0,
  viewMode: "week",
  selectedDateKey: dateKey(TODAY),
  selectedChannels: CHANNELS.map((c) => c.id),
  searchQuery: "",
  issues: [
    {
      id: "i1", show: "Antiques Roadshow", episode: "Season 28 · E11",
      station: "New Mexico Station", author: "K. Ortiz", type: "Accessibility",
      tags: ["No closed captioning", "Visual description missing"],
      description: "Episode arrived without closed captioning track. Visual description audio also not present on the SAP channel.",
      status: "Open", timestamp: "2 hours ago", replies: [],
    },
    {
      id: "i2", show: "Nature", episode: "Season 42 · E06",
      station: "Boston Station", author: "T. Nguyen", type: "Video",
      tags: ["Flicker", "Visual discrepancy"],
      description: "Visible flicker around the 14:32 mark, approximately 3 seconds. Appears to be a compression artifact.",
      status: "In Review", timestamp: "Yesterday",
      replies: [{ author: "Operations Team", text: "Confirmed on master. Re-encoding now — new file ETA 6 hours.", timestamp: "45 min ago" }],
    },
    {
      id: "i3", show: "Masterpiece", episode: "Season 53 · E03",
      station: "Chicago Station", author: "R. Patel", type: "Audio",
      tags: ["Sync issue"],
      description: "Audio drifts out of sync by ~200ms starting at 22:15. Happens through the end of the episode.",
      status: "Open", timestamp: "4 hours ago", replies: [],
    },
  ],
  selectedShow360: "Amanpour & Company",
  subscriptions: ["bugs", "rights"],
  notifDelivery: { email: true, inApp: true },
  notifPanelOpen: false,
  // modal state: null, or { type: 'details'|'report', payload: ... }
  modal: null,
  // local UI state for issue replies
  replyDrafts: {},
  expandedReplyIssue: null,
};

// ---------- DERIVED ----------
function currentWeek() { return DATE_RANGE.slice(state.weekStartIndex, state.weekStartIndex + 4); }
function selectedDate() { return DATE_RANGE.find((d) => dateKey(d) === state.selectedDateKey) || TODAY; }
function weekSchedule() {
  const keys = currentWeek().map(dateKey);
  return SCHEDULE.filter((s) => keys.includes(s.dateKey) && state.selectedChannels.includes(s.channel));
}
function daySchedule() {
  return SCHEDULE.filter((s) => s.dateKey === state.selectedDateKey && state.selectedChannels.includes(s.channel));
}
function searchResults() {
  if (!state.searchQuery.trim()) return [];
  const q = state.searchQuery.toLowerCase();
  const seen = new Set();
  return SCHEDULE.filter((s) => {
    if (s.show.toLowerCase().includes(q) || s.episode.toLowerCase().includes(q) || s.channel.toLowerCase().includes(q)) {
      if (seen.has(s.show)) return false;
      seen.add(s.show);
      return true;
    }
    return false;
  });
}
function openIssuesCount() { return state.issues.filter((i) => i.status === "Open").length; }
function unreadNotifCount() { return state.subscriptions.length * 2; }

// ============================================
// RENDERING
// ============================================
function render() {
  // Update topbar / role
  document.querySelectorAll(".role-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.role === state.role);
  });
  document.getElementById("footer-role").textContent =
    `Signed in as ${state.role === "station" ? "Station User" : "HQ Operations"}`;

  // Update tabs
  document.querySelectorAll(".tab").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === state.activeTab);
  });

  // Update badges
  const issuesBadge = document.getElementById("issues-badge");
  const openCount = openIssuesCount();
  if (openCount > 0) {
    issuesBadge.textContent = openCount;
    issuesBadge.classList.add("visible");
  } else {
    issuesBadge.classList.remove("visible");
  }
  const activityBadge = document.getElementById("activity-badge");
  if (state.subscriptions.length > 0) {
    activityBadge.textContent = state.subscriptions.length;
    activityBadge.classList.add("visible");
  } else {
    activityBadge.classList.remove("visible");
  }

  // Bell badge
  const bellBadge = document.getElementById("bell-badge");
  const ucount = unreadNotifCount();
  if (ucount > 0) {
    bellBadge.textContent = ucount;
    bellBadge.classList.add("visible");
  } else {
    bellBadge.classList.remove("visible");
  }
  document.getElementById("bell-btn").classList.toggle("active", state.notifPanelOpen);

  // Show / hide views
  ["guide", "issues", "search", "show360", "activity"].forEach((id) => {
    const el = document.getElementById(`view-${id}`);
    if (id === state.activeTab) {
      el.hidden = false;
      el.innerHTML = renderView(id);
    } else {
      el.hidden = true;
      el.innerHTML = "";
    }
  });

  // Notification panel
  const panel = document.getElementById("notif-panel");
  if (state.notifPanelOpen) {
    panel.hidden = false;
    panel.innerHTML = renderNotifPanel();
  } else {
    panel.hidden = true;
    panel.innerHTML = "";
  }

  // Modal
  const overlay = document.getElementById("modal-overlay");
  const shell = document.getElementById("modal-shell");
  if (state.modal) {
    overlay.hidden = false;
    if (state.modal.type === "details") {
      shell.className = "modal size-lg";
      shell.innerHTML = renderShow360Modal(state.modal.payload);
    } else if (state.modal.type === "report") {
      shell.className = "modal size-md";
      shell.innerHTML = renderReportModal(state.modal.payload);
    }
  } else {
    overlay.hidden = true;
    shell.innerHTML = "";
  }
}

function renderView(id) {
  if (id === "guide") return renderGuide();
  if (id === "issues") return renderIssues();
  if (id === "search") return renderSearch();
  if (id === "show360") return renderShow360Browser();
  if (id === "activity") return renderActivity();
  return "";
}

// ---------- TV GUIDE ----------
function renderGuide() {
  const week = currentWeek();
  const sched = weekSchedule();
  const day = selectedDate();
  const dSched = daySchedule();

  const weekLabel = `${formatShortDate(week[0])} – ${formatShortDate(week[week.length - 1])}`;
  const canPrev = state.weekStartIndex > 0;
  const canNext = state.weekStartIndex + 4 < 14;

  let body;
  if (state.viewMode === "week") {
    body = renderWeekGrid(week, sched);
  } else {
    body = renderDayTimeline(day, dSched);
  }

  return `
    <div class="section-header">
      <div class="eyebrow">Programming</div>
      <h1 class="section-title">Schedule Calendar</h1>
      <p class="section-subtitle">Two-week rolling window shown in 4-day blocks. Click any day to drill into an hourly timeline.</p>
    </div>

    <div class="toolbar">
      <div class="toolbar-left">
        <div class="view-mode">
          <button class="view-mode-btn ${state.viewMode === "week" ? "active" : ""}" data-action="set-view" data-view="week">
            ${icon("layout-grid", 14)} 4-Day
          </button>
          <button class="view-mode-btn ${state.viewMode === "day" ? "active" : ""}" data-action="set-view" data-view="day">
            ${icon("calendar-days", 14)} Day
          </button>
        </div>
        ${state.viewMode === "week" ? `
          <div class="nav-arrows">
            <button class="nav-arrow" data-action="week-prev" ${!canPrev ? "disabled" : ""}>${icon("chevron-left", 16)}</button>
            <div class="nav-label">${escape(weekLabel)}</div>
            <button class="nav-arrow" data-action="week-next" ${!canNext ? "disabled" : ""}>${icon("chevron-right", 16)}</button>
          </div>
        ` : `
          <div class="nav-arrows">
            <button class="nav-arrow" data-action="day-prev">${icon("chevron-left", 16)}</button>
            <div class="nav-label">${escape(formatFullDate(day))}</div>
            <button class="nav-arrow" data-action="day-next">${icon("chevron-right", 16)}</button>
          </div>
        `}
      </div>
      <button class="today-btn" data-action="today">Today</button>
    </div>

    <div class="filter-row">
      <div class="filter-label">${icon("tv", 14)} Channels (${state.selectedChannels.length}/${CHANNELS.length})</div>
      <div class="filter-chips">
        ${CHANNELS.map((c) => {
          const on = state.selectedChannels.includes(c.id);
          return `<button class="chip ${on ? "active" : ""}" data-action="toggle-channel" data-channel="${c.id}"
            style="${on ? `background:${c.color};border-color:${c.color};` : ""}">
            <span class="chip-dot" style="background:${on ? "white" : c.color};"></span>
            ${escape(c.label)}
          </button>`;
        }).join("")}
      </div>
    </div>

    ${body}
  `;
}

function renderWeekGrid(week, sched) {
  const byDay = {};
  week.forEach((d) => (byDay[dateKey(d)] = []));
  sched.forEach((s) => { if (byDay[s.dateKey]) byDay[s.dateKey].push(s); });

  return `<div class="week-grid">
    ${week.map((d) => {
      const isT = isSameDay(d, TODAY);
      const isW = d.getDay() === 0 || d.getDay() === 6;
      const items = byDay[dateKey(d)] || [];
      const cls = ["day-cell"];
      if (isT) cls.push("today");
      else if (isW) cls.push("weekend");
      return `
        <button class="${cls.join(" ")}" data-action="open-day" data-date="${dateKey(d)}">
          <div class="day-head">
            <div>
              <div class="day-name">${formatDayName(d)}</div>
              <div class="day-num">${formatDayNumber(d)}</div>
            </div>
            ${isT ? `<span class="today-pill">Today</span>` : ""}
          </div>
          <div class="day-shows">
            ${items.length === 0 ? `<div class="day-empty">No programming</div>` : ""}
            ${items.slice(0, 9).map((s) => {
              const channel = CHANNELS.find((c) => c.id === s.channel);
              return `<div class="show-pill" style="background:${channel.color}12;border-left-color:${channel.color};">
                <div class="show-pill-title">${escape(s.time)} · ${escape(s.show)}</div>
                <div class="show-pill-meta">${escape(channel.label)} · ${s.duration}m</div>
              </div>`;
            }).join("")}
            ${items.length > 9 ? `<div class="day-more">+${items.length - 9} more</div>` : ""}
          </div>
          <div class="day-foot">${icon("calendar-days", 12)} View day timeline</div>
        </button>
      `;
    }).join("")}
  </div>`;
}

function renderDayTimeline(day, items) {
  const isT = isSameDay(day, TODAY);
  const byHour = {};
  items.forEach((s) => {
    if (!byHour[s.hour]) byHour[s.hour] = [];
    byHour[s.hour].push(s);
  });
  const hours = Array.from({ length: 19 }, (_, i) => i + 5);

  return `<div class="timeline-card">
    <div class="timeline-header ${isT ? "today" : ""}">
      <div class="timeline-header-date">
        <div class="timeline-header-day">${formatDayName(day)}</div>
        <div class="timeline-header-num">${formatDayNumber(day)}</div>
      </div>
      <div>
        <div class="timeline-header-title">${escape(formatFullDate(day))}</div>
        <div class="timeline-header-sub">${items.length} program${items.length === 1 ? "" : "s"} scheduled</div>
      </div>
    </div>
    ${hours.map((h) => {
      const slot = byHour[h] || [];
      return `<div class="timeline-row">
        <div class="timeline-hour">${formatHour(h)}</div>
        <div class="timeline-shows">
          ${slot.length === 0 ? `<div class="timeline-empty">—</div>` : slot.map((s) => {
            const channel = CHANNELS.find((c) => c.id === s.channel);
            const hasD = !!SHOW_DETAILS[s.show];
            return `<div class="timeline-show" style="background:${channel.color}08;border-left-color:${channel.color};border-color:${channel.color}30;">
              <div style="flex:1; min-width:0;">
                <div class="timeline-show-meta">
                  <span class="channel-badge" style="background:${channel.color};">${escape(channel.label)}</span>
                  <span class="timeline-show-time">${escape(s.time)}</span>
                  <span class="timeline-show-duration">· ${s.duration} min</span>
                </div>
                <div class="timeline-show-title">${escape(s.show)}</div>
                <div class="timeline-show-episode">${escape(s.episode)}</div>
              </div>
              <div class="timeline-show-actions">
                <button class="btn btn-secondary white ${!hasD ? "btn-disabled" : ""}"
                  ${hasD ? `data-action="open-details" data-show="${escape(s.show)}"` : "disabled"}>
                  Details ${icon("chevron-right", 12)}
                </button>
                ${state.role === "station" ? `<button class="btn btn-warn" data-action="open-report" data-schedule-id="${s.id}">
                  ${icon("flag", 12)} Report
                </button>` : ""}
              </div>
            </div>`;
          }).join("")}
        </div>
      </div>`;
    }).join("")}
  </div>`;
}

// ---------- ISSUES ----------
function renderIssues() {
  return `
    <div class="section-header">
      <div class="eyebrow">Operations</div>
      <h1 class="section-title">Media Delivery Issues</h1>
      <p class="section-subtitle">${state.role === "station"
        ? "Reports you or other stations have submitted. Go to the TV Guide and click Report on any show to file a new issue."
        : "Review and respond to issues reported by stations."}</p>
    </div>
    ${state.issues.map((issue, i) => renderIssueCard(issue, i)).join("")}
  `;
}

function renderIssueCard(issue, idx) {
  const statusClass = {
    "Open": "status-open",
    "In Review": "status-review",
    "Resolved": "status-resolved",
  }[issue.status] || "status-open";
  const hasD = !!SHOW_DETAILS[issue.show];
  const isExpanded = state.expandedReplyIssue === issue.id;
  const draft = state.replyDrafts[issue.id] || "";

  return `<div class="issue-card" style="animation-delay:${idx * 40}ms">
    <div class="issue-head">
      <div style="flex:1; min-width:0;">
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:4px;">
          ${hasD
            ? `<button class="issue-show" data-action="open-details" data-show="${escape(issue.show)}">${escape(issue.show)}</button>`
            : `<span class="issue-show no-link">${escape(issue.show)}</span>`}
          <span class="issue-episode">· ${escape(issue.episode)}</span>
        </div>
        <div class="issue-meta">
          <span>${icon("user", 12)} ${escape(issue.author)} · ${escape(issue.station)}</span>
          <span>${escape(issue.timestamp)}</span>
        </div>
      </div>
      <span class="status-pill ${statusClass}">${escape(issue.status)}</span>
    </div>
    <div class="issue-tags">
      <span class="tag-type">${escape(issue.type)}</span>
      ${issue.tags.map((t) => `<span class="tag-soft">${escape(t)}</span>`).join("")}
    </div>
    <p class="issue-desc">${escape(issue.description)}</p>
    ${issue.replies.length > 0 ? `
      <div class="issue-replies">
        ${issue.replies.map((r) => `
          <div>
            <div class="reply-head">
              <span class="reply-author">${escape(r.author)}</span>
              <span class="reply-badge">HQ</span>
              <span class="reply-time">${escape(r.timestamp)}</span>
            </div>
            <p class="reply-body">${escape(r.text)}</p>
          </div>
        `).join("")}
      </div>
    ` : ""}
    ${state.role === "hq" ? `
      <div class="issue-reply-form">
        ${!isExpanded ? `
          <button class="btn-link dark" data-action="expand-reply" data-issue-id="${issue.id}">
            ${icon("message-square", 14)} Reply to station
          </button>
        ` : `
          <textarea class="reply-textarea" data-action="reply-input" data-issue-id="${issue.id}" placeholder="Respond to the station...">${escape(draft)}</textarea>
          <div class="reply-actions">
            <button class="btn-link dark" data-action="cancel-reply">Cancel</button>
            <button class="btn ${draft.trim() ? "btn-dark" : "btn-disabled"}" data-action="submit-reply" data-issue-id="${issue.id}" ${!draft.trim() ? "disabled" : ""}>
              ${icon("send", 12, { stroke: draft.trim() ? "white" : "currentColor" })} Send
            </button>
          </div>
        `}
      </div>
    ` : ""}
  </div>`;
}

// ---------- SEARCH ----------
function renderSearch() {
  const results = searchResults();
  const suggestions = ["Amanpour", "Antiques Roadshow", "Frontline", "Nature", "Masterpiece", "NOVA", "Ken Burns"];

  return `
    <div class="section-header">
      <div class="eyebrow">Discovery</div>
      <h1 class="section-title">Search the Catalog</h1>
      <p class="section-subtitle">Find any show, episode, or channel in the programming database.</p>
    </div>
    <div class="search-box">
      ${icon("search", 20, { stroke: "#1a2744" })}
      <input class="search-input" id="search-input" placeholder="Search shows, episodes, or channels..." value="${escape(state.searchQuery)}" />
      ${state.searchQuery ? `<button data-action="clear-search">${icon("x", 16, { stroke: "#6b6a63" })}</button>` : ""}
    </div>
    ${!state.searchQuery ? `
      <div>
        <div class="filter-label" style="margin-bottom:12px;">Suggested searches</div>
        <div class="search-suggestions">
          ${suggestions.map((s) => `<button class="show-tab" data-action="set-search" data-q="${escape(s)}">${escape(s)}</button>`).join("")}
        </div>
      </div>
    ` : ""}
    ${state.searchQuery && results.length === 0 ? `
      <div class="empty-state">
        ${icon("search", 40, { stroke: "#cbc9c0" })}
        <div>No results for "${escape(state.searchQuery)}". Try another term.</div>
      </div>
    ` : ""}
    ${results.length > 0 ? `
      <div class="filter-label" style="margin-bottom:12px;">${results.length} result${results.length === 1 ? "" : "s"}</div>
      ${results.map((r, i) => {
        const channel = CHANNELS.find((c) => c.id === r.channel);
        const has360 = !!SHOW_DETAILS[r.show];
        return `<div class="search-result" style="animation-delay:${i * 30}ms">
          <div class="search-result-thumb" style="background:${channel.color};">${icon("film", 20, { stroke: "white" })}</div>
          <div class="search-result-info">
            <div class="search-result-title">${escape(r.show)}</div>
            <div class="search-result-meta">${escape(r.episode)} · ${escape(channel.label)} · Next airs ${escape(r.time)} ${escape(r.date)}</div>
          </div>
          <button class="btn ${has360 ? "btn-dark" : "btn-disabled"}" ${has360 ? `data-action="open-details" data-show="${escape(r.show)}"` : "disabled"}>
            ${has360 ? "View 360°" : "No details"} ${icon("arrow-up-right", 12)}
          </button>
        </div>`;
      }).join("")}
    ` : ""}
  `;
}

// ---------- SHOW 360 BROWSER ----------
function renderShow360Browser() {
  const sel = state.selectedShow360;
  const d = SHOW_DETAILS[sel];
  if (!d) return "";

  return `
    <div class="section-header">
      <div class="eyebrow">Consolidated View</div>
      <h1 class="section-title">Show 360°</h1>
      <p class="section-subtitle">A single pane aggregating scheduling, rights, funding, and contributor notes across all upstream systems.</p>
    </div>
    <div class="show-tabs">
      ${Object.keys(SHOW_DETAILS).map((s) => `
        <button class="show-tab ${state.selectedShow360 === s ? "active" : ""}" data-action="set-show360" data-show="${escape(s)}">${escape(s)}</button>
      `).join("")}
    </div>
    <div class="show-hero">
      <div class="show-hero-glow"></div>
      <div style="position:relative;">
        <div class="show-hero-eyebrow">${escape(d.genre)} · ${escape(d.season)}</div>
        <h2 class="show-hero-title">${escape(d.title)}</h2>
        <p class="show-hero-tag">${escape(d.tagline)}</p>
        <div class="show-hero-stats">
          <div><div class="show-hero-stat-label">Episodes</div><div class="show-hero-stat-value">${d.episodes}</div></div>
          <div><div class="show-hero-stat-label">Season</div><div class="show-hero-stat-value">${escape(d.season)}</div></div>
          <div><div class="show-hero-stat-label">Genre</div><div class="show-hero-stat-value">${escape(d.genre)}</div></div>
        </div>
      </div>
    </div>
    ${renderShowDetailCards(d)}
  `;
}

function renderShowDetailCards(d) {
  const flagIcons = {
    "Violence": "alert-triangle", "Mature Themes": "eye", "Brief Nudity": "eye",
    "Medical Content": "heart", "Disturbing Content": "alert-triangle",
  };
  let html = "";

  if (d.flags && d.flags.length > 0) {
    html += renderCard("Auto-synced from data lake", "Content Advisories", "alert-triangle", "#d97706", `
      <div class="advisory-grid">
        ${d.flags.map((f) => `
          <div class="advisory">
            <div class="advisory-icon">${icon(flagIcons[f.kind] || "alert-circle", 16, { stroke: "#92400e" })}</div>
            <div class="advisory-kind">${escape(f.kind)}</div>
            <div class="advisory-level">${escape(f.level)}</div>
          </div>
        `).join("")}
      </div>
      <p style="font-size:12px; margin-top:12px; font-style:italic; color:var(--text-soft);">
        Advisories automatically generated by upstream scheduling + screening systems.
      </p>
    `);
  }

  html += renderCard("Rights management system", "Rights & Clearances", "flag", "#7c2d12", `
    <div class="info-grid">
      <div><div class="info-block-label">Window</div><div class="info-block-value">${escape(d.rights.window)}</div></div>
      <div><div class="info-block-label">Territory</div><div class="info-block-value">${escape(d.rights.territory)}</div></div>
      <div><div class="info-block-label">Clearances</div><div class="info-block-value">${escape(d.rights.clearances)}</div></div>
    </div>
  `);

  html += renderCard("Rights management system", "Funding Credits", "sparkles", "#059669", `
    <div class="funding-list">${d.funding.map((f) => `<span class="funding-pill">${escape(f)}</span>`).join("")}</div>
  `);

  html += renderCard("Custom annotations", "Contributor Notes", "file-text", "#1a2744", `
    <div class="contributor-list">
      ${d.contributors.map((c) => `
        <div class="contributor">
          <div class="contributor-head">
            <div class="contributor-avatar">${escape(c.name.split(" ").map((n) => n[0]).join(""))}</div>
            <div>
              <div class="contributor-name">${escape(c.name)}</div>
              <div class="contributor-role">${escape(c.role)}</div>
            </div>
          </div>
          <p class="contributor-note">${escape(c.note)}</p>
        </div>
      `).join("")}
      ${state.role === "hq" ? `<button class="btn-link dark">${icon("plus", 14)} Add contributor note</button>` : ""}
    </div>
  `);

  return html;
}

function renderCard(eyebrow, title, iconKey, color, body) {
  return `<div class="card" style="margin-bottom:16px;">
    <div class="card-header">
      <div class="card-icon" style="background:${color}15;">${icon(iconKey, 16, { stroke: color })}</div>
      <div>
        <div class="card-eyebrow">${escape(eyebrow)}</div>
        <div class="card-title">${escape(title)}</div>
      </div>
    </div>
    ${body}
  </div>`;
}

// ---------- ACTIVITY STREAM ----------
function renderActivity() {
  return `
    <div class="section-header">
      <div class="eyebrow">Stay Informed</div>
      <h1 class="section-title">Activity Stream</h1>
      <p class="section-subtitle">Subscribe to topics to receive updates by email and in-app when something changes.</p>
    </div>
    ${renderCard("How you want to hear about it", "Delivery Preferences", "bell", "#1a2744", `
      <div class="delivery-toggle">
        <button class="delivery-btn ${state.notifDelivery.email ? "active" : ""}" data-action="toggle-delivery" data-channel="email">
          ${icon("mail", 16)} Email ${state.notifDelivery.email ? icon("check", 16) : ""}
        </button>
        <button class="delivery-btn ${state.notifDelivery.inApp ? "active" : ""}" data-action="toggle-delivery" data-channel="inApp">
          ${icon("bell-ring", 16)} In-app ${state.notifDelivery.inApp ? icon("check", 16) : ""}
        </button>
      </div>
    `)}
    <div style="margin-top:16px;">
      <div class="filter-label" style="margin-bottom:12px;">Topics — ${state.subscriptions.length} subscribed</div>
      <div class="topic-grid">
        ${ACTIVITY_TOPICS.map((t) => {
          const sub = state.subscriptions.includes(t.id);
          return `<button class="topic-card ${sub ? "active" : ""}" data-action="toggle-subscription" data-topic="${t.id}">
            <div class="topic-card-inner">
              <div class="topic-icon">${icon(t.iconKey, 20, { stroke: "#1a2744" })}</div>
              <div style="flex:1;">
                <div style="display:flex; align-items:center;">
                  <div class="topic-name">${escape(t.label)}</div>
                  ${sub ? `<span class="subscribed-badge">Subscribed</span>` : ""}
                </div>
                <p class="topic-desc">${escape(t.desc)}</p>
              </div>
            </div>
          </button>`;
        }).join("")}
      </div>
    </div>
    <div style="margin-top:16px;">
      ${renderCard("From your subscriptions", "Recent Activity", "hash", "#1a2744", `
        ${state.subscriptions.length === 0 ? `
          <div style="text-align:center; padding:24px 0; font-size:14px; color:var(--text-soft);">
            Subscribe to a topic above to see activity here.
          </div>
        ` : `
          <div class="activity-feed">
            ${renderActivityItem("Media Issues", "New issue reported", "Antiques Roadshow · S28·E11 flagged for accessibility", "2h ago")}
            ${renderActivityItem("Rights & Clearances", "Window extended", "Amanpour & Company streaming approved through FY27", "5h ago")}
            ${renderActivityItem("Schedule Updates", "Programming change", "Masterpiece moved to Saturday 2pm slot", "Yesterday")}
            ${renderActivityItem("Show Metadata", "Advisories published", "Count of Monte Cristo content flags now available", "2 days ago")}
          </div>
        `}
      `)}
    </div>
  `;
}

function renderActivityItem(topic, title, detail, time) {
  return `<div class="activity-item">
    <div class="activity-dot"></div>
    <div class="activity-content">
      <div class="activity-head">
        <span class="activity-topic-pill">${escape(topic)}</span>
        <span class="activity-title">${escape(title)}</span>
      </div>
      <p class="activity-detail">${escape(detail)}</p>
    </div>
    <span class="activity-time">${escape(time)}</span>
  </div>`;
}

// ---------- NOTIFICATION PANEL ----------
function renderNotifPanel() {
  const items = [
    { topic: "Media Issues", title: "New media issue reported", detail: "K. Ortiz flagged Antiques Roadshow S28·E11", time: "2h ago" },
    { topic: "Rights & Clearances", title: "Rights window extended", detail: "Amanpour & Company streaming approved through FY27", time: "5h ago" },
    { topic: "Schedule Updates", title: "Schedule change", detail: "Masterpiece moved to 2pm Saturday block", time: "Yesterday" },
    { topic: "Show Metadata", title: "New contributor note", detail: "Count of Monte Cristo advisories published", time: "2 days ago" },
  ];
  return `
    <div class="notif-header">
      <div class="card-title">Recent Activity</div>
      <button data-action="close-notif">${icon("x", 16, { stroke: "#6b6a63" })}</button>
    </div>
    <div class="notif-list">
      ${items.map((n) => `
        <div class="notif-item">
          <div class="notif-dot"></div>
          <div style="flex:1; min-width:0;">
            <div style="display:flex; justify-content:space-between; gap:8px;">
              <span class="notif-topic">${escape(n.topic)}</span>
              <span class="notif-time">${escape(n.time)}</span>
            </div>
            <div class="notif-title">${escape(n.title)}</div>
            <div class="notif-detail">${escape(n.detail)}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// ---------- MODALS ----------
function renderShow360Modal(showName) {
  const d = SHOW_DETAILS[showName];
  if (!d) return "";
  const sched = SCHEDULE.find((s) => s.show === showName);

  return `
    <div class="modal-header show360">
      <div class="modal-header-glow"></div>
      <div class="modal-header-content">
        <div class="modal-eyebrow">${icon("layers", 12, { stroke: "#f5a623" })} Show 360° · ${escape(d.genre)}</div>
        <h2 class="modal-title lg">${escape(d.title)}</h2>
        <p class="modal-tagline">${escape(d.tagline)}</p>
        <div class="modal-stats">
          <div><div class="modal-stat-label">Episodes</div><div class="modal-stat-value">${d.episodes}</div></div>
          <div><div class="modal-stat-label">Season</div><div class="modal-stat-value">${escape(d.season)}</div></div>
          ${sched ? `<div><div class="modal-stat-label">Next Airing</div><div class="modal-stat-value">${escape(sched.time)} ${escape(sched.date.split(",")[0])}</div></div>` : ""}
        </div>
      </div>
      <button class="modal-close" data-action="close-modal">${icon("x", 20, { stroke: "white" })}</button>
    </div>
    <div class="modal-body">
      ${renderShowDetailCards(d)}
    </div>
    <div class="modal-footer">
      <div class="modal-footer-text">Data aggregated from scheduling, rights, and CMS systems.</div>
      <div class="modal-footer-actions">
        <button class="btn-link dark" data-action="close-modal" style="padding:8px 16px;">Close</button>
        ${state.role === "station" && sched ? `
          <button class="btn-primary" data-action="modal-to-report" data-show="${escape(showName)}">${icon("flag", 14)} Report Issue</button>
        ` : ""}
      </div>
    </div>
  `;
}

function renderReportModal(payload) {
  const sched = SCHEDULE.find((s) => s.id === payload.scheduleId);
  if (!sched) return "";
  const channel = CHANNELS.find((c) => c.id === sched.channel);
  const hasD = !!SHOW_DETAILS[sched.show];
  const draft = payload.draft || { type: "Video", tags: [], description: "" };

  const types = [
    { id: "Video", iconKey: "film", desc: "Picture quality, artifacts" },
    { id: "Audio", iconKey: "radio", desc: "Sound issues, levels" },
    { id: "Accessibility", iconKey: "eye", desc: "Captions, descriptions" },
    { id: "Metadata", iconKey: "file-text", desc: "Wrong info, titles" },
    { id: "Rights", iconKey: "flag", desc: "Clearance problems" },
  ];
  const tagsByType = {
    Video: ["Flicker", "Visual discrepancy", "Frame drop", "Color shift", "Wrong aspect ratio"],
    Audio: ["Audio dropout", "Levels too low", "Sync issue", "Distortion"],
    Accessibility: ["No closed captioning", "Missing audio description", "Caption sync off"],
    Metadata: ["Wrong title", "Wrong episode", "Missing info"],
    Rights: ["Wrong territory", "Window expired", "Missing clearance"],
  };
  const canSubmit = draft.description.trim().length > 0;

  return `
    <div class="modal-header">
      <div class="modal-header-content">
        <div class="modal-eyebrow">${icon("flag", 12, { stroke: "#f5a623" })} Report Media Issue</div>
        <h2 class="modal-title md">${escape(sched.show)}</h2>
        <div class="modal-subtitle">
          <span class="channel-badge" style="background:${channel.color};">${escape(channel.label)}</span>
          <span>${escape(sched.episode)}</span>
          <span>·</span>
          <span>${escape(sched.time)} ${escape(sched.date)}</span>
          <span>·</span>
          <span>${sched.duration} min</span>
        </div>
        ${hasD ? `<button class="modal-link" data-action="report-to-details" data-show="${escape(sched.show)}">View show 360° ${icon("arrow-up-right", 12)}</button>` : ""}
      </div>
      <button class="modal-close" data-action="close-modal">${icon("x", 20, { stroke: "white" })}</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <div class="form-label">Issue Type</div>
        <div class="type-grid">
          ${types.map((t) => `
            <button class="type-card ${draft.type === t.id ? "active" : ""}" data-action="set-issue-type" data-type="${t.id}">
              <span class="type-card-icon">${icon(t.iconKey, 16)}</span>
              <div class="type-card-name">${escape(t.id)}</div>
              <div class="type-card-desc">${escape(t.desc)}</div>
            </button>
          `).join("")}
        </div>
      </div>
      <div class="form-group">
        <div class="form-label">Common Tags <span style="color:var(--text-faint); font-weight:400; text-transform:none; letter-spacing:0;">· ${draft.tags.length} selected</span></div>
        <div class="tag-list">
          ${(tagsByType[draft.type] || []).map((t) => `
            <button class="form-tag ${draft.tags.includes(t) ? "active" : ""}" data-action="toggle-issue-tag" data-tag="${escape(t)}">
              ${draft.tags.includes(t) ? icon("check", 12) : icon("plus", 12)} ${escape(t)}
            </button>
          `).join("")}
        </div>
      </div>
      <div class="form-group">
        <div class="form-label">Description <span class="required">*</span></div>
        <textarea class="form-textarea" id="report-description" placeholder="Describe what you're seeing or hearing. Include timecodes when possible.">${escape(draft.description)}</textarea>
        <div class="form-helper">${icon("alert-circle", 12)} Your report will route to the Operations team and appear in the Media Issues queue.</div>
      </div>
    </div>
    <div class="modal-footer">
      <div class="modal-footer-text">Reporting as <strong style="color:var(--text);">Your Station</strong></div>
      <div class="modal-footer-actions">
        <button class="btn-link dark" data-action="close-modal" style="padding:8px 16px;">Cancel</button>
        <button class="btn-primary ${!canSubmit ? "btn-disabled" : ""}" data-action="submit-report" ${!canSubmit ? "disabled" : ""}>
          ${icon("send", 14, { stroke: canSubmit ? "var(--navy)" : "currentColor" })} Submit Issue
        </button>
      </div>
    </div>
  `;
}

// ============================================
// EVENT HANDLING (delegated)
// ============================================
function handleClick(e) {
  const t = e.target.closest("[data-action]");
  if (!t) return;
  const action = t.dataset.action;

  switch (action) {
    case "set-view":
      state.viewMode = t.dataset.view;
      render();
      break;
    case "week-prev":
      state.weekStartIndex = Math.max(0, state.weekStartIndex - 4);
      render();
      break;
    case "week-next":
      state.weekStartIndex = Math.min(10, state.weekStartIndex + 4);
      render();
      break;
    case "day-prev": {
      const idx = DATE_RANGE.findIndex((d) => dateKey(d) === state.selectedDateKey);
      if (idx > 0) {
        state.selectedDateKey = dateKey(DATE_RANGE[idx - 1]);
        render();
      }
      break;
    }
    case "day-next": {
      const idx = DATE_RANGE.findIndex((d) => dateKey(d) === state.selectedDateKey);
      if (idx < DATE_RANGE.length - 1) {
        state.selectedDateKey = dateKey(DATE_RANGE[idx + 1]);
        render();
      }
      break;
    }
    case "today":
      state.selectedDateKey = dateKey(TODAY);
      state.weekStartIndex = 0;
      render();
      break;
    case "toggle-channel": {
      const c = t.dataset.channel;
      if (state.selectedChannels.includes(c)) {
        state.selectedChannels = state.selectedChannels.filter((x) => x !== c);
      } else {
        state.selectedChannels = [...state.selectedChannels, c];
      }
      render();
      break;
    }
    case "open-day": {
      state.selectedDateKey = t.dataset.date;
      state.viewMode = "day";
      render();
      break;
    }
    case "open-details": {
      state.modal = { type: "details", payload: t.dataset.show };
      render();
      break;
    }
    case "open-report": {
      state.modal = { type: "report", payload: { scheduleId: t.dataset.scheduleId, draft: { type: "Video", tags: [], description: "" } } };
      render();
      break;
    }
    case "close-modal":
      state.modal = null;
      render();
      break;
    case "modal-to-report": {
      const showName = t.dataset.show;
      const sched = SCHEDULE.find((s) => s.show === showName);
      if (sched) {
        state.modal = null;
        render();
        setTimeout(() => {
          state.modal = { type: "report", payload: { scheduleId: sched.id, draft: { type: "Video", tags: [], description: "" } } };
          render();
        }, 200);
      }
      break;
    }
    case "report-to-details": {
      const showName = t.dataset.show;
      state.modal = null;
      render();
      setTimeout(() => {
        state.modal = { type: "details", payload: showName };
        render();
      }, 200);
      break;
    }
    case "set-issue-type":
      if (state.modal && state.modal.type === "report") {
        state.modal.payload.draft.type = t.dataset.type;
        state.modal.payload.draft.tags = [];
        render();
      }
      break;
    case "toggle-issue-tag":
      if (state.modal && state.modal.type === "report") {
        const tag = t.dataset.tag;
        const tags = state.modal.payload.draft.tags;
        if (tags.includes(tag)) {
          state.modal.payload.draft.tags = tags.filter((x) => x !== tag);
        } else {
          state.modal.payload.draft.tags = [...tags, tag];
        }
        render();
      }
      break;
    case "submit-report":
      if (state.modal && state.modal.type === "report") {
        const sched = SCHEDULE.find((s) => s.id === state.modal.payload.scheduleId);
        const draft = state.modal.payload.draft;
        if (sched && draft.description.trim()) {
          state.issues = [{
            id: `i${Date.now()}`,
            show: sched.show,
            episode: sched.episode,
            station: "Your Station",
            author: "You",
            type: draft.type,
            tags: draft.tags,
            description: draft.description,
            status: "Open",
            timestamp: "Just now",
            replies: [],
          }, ...state.issues];
          state.modal = null;
          state.activeTab = "issues";
          render();
        }
      }
      break;
    case "set-show360":
      state.selectedShow360 = t.dataset.show;
      render();
      break;
    case "expand-reply":
      state.expandedReplyIssue = t.dataset.issueId;
      render();
      // Focus the textarea
      setTimeout(() => {
        const ta = document.querySelector(`[data-action="reply-input"][data-issue-id="${t.dataset.issueId}"]`);
        if (ta) ta.focus();
      }, 50);
      break;
    case "cancel-reply":
      state.expandedReplyIssue = null;
      render();
      break;
    case "submit-reply": {
      const id = t.dataset.issueId;
      const text = state.replyDrafts[id];
      if (text && text.trim()) {
        state.issues = state.issues.map((i) =>
          i.id === id
            ? { ...i, status: "In Review", replies: [...i.replies, { author: "Operations Team", text, timestamp: "Just now" }] }
            : i
        );
        state.replyDrafts[id] = "";
        state.expandedReplyIssue = null;
        render();
      }
      break;
    }
    case "set-search":
      state.searchQuery = t.dataset.q;
      render();
      // Re-focus the search input
      setTimeout(() => {
        const inp = document.getElementById("search-input");
        if (inp) inp.focus();
      }, 50);
      break;
    case "clear-search":
      state.searchQuery = "";
      render();
      break;
    case "toggle-subscription": {
      const id = t.dataset.topic;
      if (state.subscriptions.includes(id)) {
        state.subscriptions = state.subscriptions.filter((x) => x !== id);
      } else {
        state.subscriptions = [...state.subscriptions, id];
      }
      render();
      break;
    }
    case "toggle-delivery":
      state.notifDelivery[t.dataset.channel] = !state.notifDelivery[t.dataset.channel];
      render();
      break;
    case "close-notif":
      state.notifPanelOpen = false;
      render();
      break;
  }
}

function handleInput(e) {
  const t = e.target;
  if (t.id === "search-input") {
    state.searchQuery = t.value;
    // Lightweight re-render — only the search view, but we re-render whole thing for simplicity
    // We need to preserve the input focus + cursor position
    const cursorPos = t.selectionStart;
    render();
    const newInp = document.getElementById("search-input");
    if (newInp) {
      newInp.focus();
      newInp.setSelectionRange(cursorPos, cursorPos);
    }
  } else if (t.id === "report-description") {
    if (state.modal && state.modal.type === "report") {
      state.modal.payload.draft.description = t.value;
      // Don't re-render on every keystroke — would lose focus.
      // Just update the submit button enabled state inline.
      const submitBtn = document.querySelector('[data-action="submit-report"]');
      if (submitBtn) {
        if (t.value.trim()) {
          submitBtn.classList.remove("btn-disabled");
          submitBtn.removeAttribute("disabled");
        } else {
          submitBtn.classList.add("btn-disabled");
          submitBtn.setAttribute("disabled", "");
        }
      }
    }
  } else if (t.dataset && t.dataset.action === "reply-input") {
    const id = t.dataset.issueId;
    state.replyDrafts[id] = t.value;
    // Just update the send button state
    const sendBtn = document.querySelector(`[data-action="submit-reply"][data-issue-id="${id}"]`);
    if (sendBtn) {
      if (t.value.trim()) {
        sendBtn.classList.remove("btn-disabled");
        sendBtn.classList.add("btn-dark");
        sendBtn.removeAttribute("disabled");
      } else {
        sendBtn.classList.add("btn-disabled");
        sendBtn.classList.remove("btn-dark");
        sendBtn.setAttribute("disabled", "");
      }
    }
  }
}

// Tab clicks
document.getElementById("tabs").addEventListener("click", (e) => {
  const t = e.target.closest(".tab");
  if (!t) return;
  state.activeTab = t.dataset.tab;
  render();
});

// Role toggle clicks
document.getElementById("role-toggle").addEventListener("click", (e) => {
  const t = e.target.closest(".role-btn");
  if (!t) return;
  state.role = t.dataset.role;
  render();
});

// Bell toggle
document.getElementById("bell-btn").addEventListener("click", () => {
  state.notifPanelOpen = !state.notifPanelOpen;
  render();
});

// Modal overlay click-outside to close
document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target.id === "modal-overlay") {
    state.modal = null;
    render();
  }
});

// ESC key to close modal/notif panel
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (state.modal) {
      state.modal = null;
      render();
    } else if (state.notifPanelOpen) {
      state.notifPanelOpen = false;
      render();
    }
  }
});

// Delegated click + input handlers
document.addEventListener("click", handleClick);
document.addEventListener("input", handleInput);

// Initial render
render();
