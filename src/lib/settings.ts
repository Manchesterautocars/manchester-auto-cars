import fs from "fs";
import path from "path";
import type { SiteSettings } from "@/types";

const SETTINGS_PATH = path.join(
  process.cwd(),
  "content",
  "settings",
  "general.json"
);

export function getSiteSettings(): SiteSettings {
  const raw = fs.readFileSync(SETTINGS_PATH, "utf8");
  return JSON.parse(raw) as SiteSettings;
}
