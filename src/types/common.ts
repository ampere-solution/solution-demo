import {
  WEBSITE_MIGRATION,
  WHISPER,
  YOLOV8,
  OLLAMA_CHAT,
  NAMESPACE_WEB_MIGRATION_X86,
  NAMESPACE_WORDPRESS, MEDIAWIKI, WORDPRESS, X86, ARM
} from "@/constants/common";

type Stat = {
  icon: string;
  value: string;
  description: string;
};

type Benefits = {
  convincing: string[];
  how: string[];
};

export type TWebsiteInfo = {
  title: string;
  subtitle: string;
  stats: Stat[];
  note: string;
  benefits: Benefits;
};

export type TApps = typeof WHISPER | typeof YOLOV8 | typeof OLLAMA_CHAT | typeof WEBSITE_MIGRATION;

export type TNamespaces = typeof NAMESPACE_WEB_MIGRATION_X86 | typeof  NAMESPACE_WORDPRESS;

export type TWebMigrationApps = typeof MEDIAWIKI | typeof  WORDPRESS;

export type TWebMigrationAppsDBs = TWebMigrationApps;

export type TArchTypes = typeof X86 | typeof ARM;
