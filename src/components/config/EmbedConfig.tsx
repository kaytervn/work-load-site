import {
  CookieIcon,
  FilesIcon,
  GoalIcon,
  PaletteIcon,
  RocketIcon,
  StickyNoteIcon,
  VideoIcon,
} from "lucide-react";

const BASE_EMBED_URL = "https://kaytervn.github.io/kaytervn/";

const EMBED_LIST = [
  {
    label: "Color",
    path: "/color",
    icon: PaletteIcon,
    color: "#4DB6AC",
    url: BASE_EMBED_URL + "color",
  },
  {
    label: "COOKIEDU Demo",
    path: "/cookiedu",
    icon: CookieIcon,
    color: "#FB8C00",
    url: BASE_EMBED_URL + "cookiedu",
  },
  {
    label: "My CV",
    path: "/my-cv",
    icon: StickyNoteIcon,
    color: "#81C784",
    url: BASE_EMBED_URL + "cv",
  },
  {
    label: "Dev Notes",
    path: "/dev-notes",
    icon: FilesIcon,
    color: "#64B5F6",
    url: BASE_EMBED_URL + "dev-notes",
  },
  {
    label: "FPS Game Demo",
    path: "/fps-game",
    icon: GoalIcon,
    color: "#E57373",
    url: BASE_EMBED_URL + "fps-game",
  },
  {
    label: "Socket Client",
    path: "/socket-client",
    icon: RocketIcon,
    color: "#BA68C8",
    url: BASE_EMBED_URL + "socket-client",
  },
  {
    label: "Web RTC Demo",
    path: "/web-rtc",
    icon: VideoIcon,
    color: "#FBC02D",
    url: BASE_EMBED_URL + "web-rtc",
  },
];

export { EMBED_LIST };
