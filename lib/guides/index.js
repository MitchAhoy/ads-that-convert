import { guideName, guidePath, guideSeo } from "@/lib/guides/saasCacLtv";

// Every guide, for /llms.txt. Add new guides here (the sitemap finds them on
// its own; /llms.txt still lists an unregistered guide, but only by its URL).
export const guides = [{ name: guideName, path: guidePath, description: guideSeo.description }];
