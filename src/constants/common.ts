import {TApps, TWebsiteInfo} from "@/types/common";
import WebsiteMigration from "@/components/Demo/WebsiteMigration";
import React from "react";

export const WHISPER = "whisper";
export const YOLOV8 = "yolov8";
export const OLLAMA_CHAT = "ollamaChat";
export const WEBSITE_MIGRATION = "websiteMigration";
export const CICD = "cicd";
export const WORDPRESS = "wordpress";
export const MEDIAWIKI = "mediawiki";
export const X86 = "x86";
export const ARM = "arm";


export const TABS_TO_DISPLAY: {
  id: string;
  title: string;
  iframeUrl: string | null,
  component?: React.ComponentType,
  shouldShowLogs: boolean
}[] = [
  {id: WHISPER, title: "WHISPER", iframeUrl: "http://whisper.apps.amperedemo.site/", shouldShowLogs: true},
  {id: OLLAMA_CHAT, title: "OLLAMA CHAT", iframeUrl: "http://open-webui.apps.amperedemo.site/", shouldShowLogs: true},
  {id: YOLOV8, title: "YOLOV11", iframeUrl: "http://yolov8.apps.amperedemo.site/", shouldShowLogs: true},
  {
    id: WEBSITE_MIGRATION,
    title: "WEBSITE MIGRATION",
    iframeUrl: null,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    component: WebsiteMigration,
    shouldShowLogs: true
  },
  {id: CICD, title: "GITHUB ACTION", iframeUrl: "http://10.76.130.199:30080/ampere-solution/llvm-project/actions", shouldShowLogs: false}
];

export const WEBSITE_INFO: Record<string, TWebsiteInfo> = {
  [WHISPER]: {
    title: "Eco-Friendly Server Rack – Whisper",
    subtitle: "Less power is the new power",
    stats: [
      {
        icon: "🔋",
        value: "Saving 63 Tons kWh/year",
        description: "Saving energy compared to AMD Bergamo 9754 to achieve maximum performance"
      },
      {
        icon: "🌍",
        value: "Saving 44 Tons CO2 emission",
        description: "CO2 emissions avoid annually compared to AMD Bergamo 9754 to achieve maximum performace"
      },
      {icon: "🌳", value: "2,033 Trees", description: "Equals to planting 2,033 Trees"},
      {icon: "🚗", value: "16 cars", description: "Energy saved could drive 16 EVs per year"}
    ],
    note: "Note: Per 20 of 2U servers in 42U rack. Assume 12.5kW rack power.",
    benefits: {
      convincing: [
        "Better performance, power and TCO vs. competition on AI inference using the whisper/transcription workload as an example",
      ],
      how: [
        "OpenAI Whisper model to show live transcription and translation of spoken language into text",
        "Run up to 32% better perf/watt than AMD Bergamo 9754"

      ]
    }
  },
  [YOLOV8]: {
    title: "Eco-Friendly Server Rack – YOLOv8",
    subtitle: "See more, consume less",
    stats: [
      {
        icon: "🔋",
        value: "Saving 66 Tons kWh/year",
        description: "Saving energy compared to AMD Bergamo 9754 to achieve maximum performance"
      },
      {
        icon: "🌍",
        value: "Saving 47 Tons CO2 emissions",
        description: "CO2 emissions avoid annually compared to AMD Bergamo 9754 to achieve maximum performance"
      },
      {icon: "🌳", value: " 2,153 Trees", description: "Equals to planting 2,153 Trees"},
      {icon: "🚗", value: "17 cars", description: "Energy saved could drive 17 EVs per year"}
    ],
    note: "Note: Per 20 of 2U servers in 42U rack. Assume 12.5kW rack power",
    benefits: {
      convincing: [

        "Better performance, power and TCO vs. competition",
        "Improved scalability vs. competition by allowing more cameras from a single server"
      ],
      how: [
        "YOLOv8 model in-video object detection and classification with a pre-trained model",
        "Run up to 34% better perf/watt than AMD Bergamo 9754"

      ]
    }
  },
  [OLLAMA_CHAT]: {
    title: "Eco-Friendly Server Rack – LLAMA3",
    subtitle: "Share knowledge, save energy",
    stats: [
      {icon: "🔋", value: "Utilize 28 Ton kWh/year", description: "Energy consumption per rack annually"},
      {icon: "🌍", value: "Utilize 20 Tons CO2 emissions", description: "CO2 emissions per rack annually"},
    ],
    note: "Note: Per 20 of 2U servers in 42U rack. Assume 12.5kW rack power",
    benefits: {
      convincing: [
        "Better inference/watt vs. competition",
        "Best solution in terms of unit economics for large-scale deployment of optimized small-size large language models (LLMs)",
        "Allow to deploy more serge-chat instances vs. competition due to high core density without noise neighbor effects"
      ],
      how: [
        "A generative AI chatbot deployment. It processes incoming real-time input in the form of a user prompt and generates the output per user’s instructions",
        "Better price/performance, power, and TCO as measured by price per million tokens without compromising quality."
      ]
    }
  },
  [WEBSITE_MIGRATION]: {
    title: "Web Migration",
    subtitle: "",
    stats: [
      {icon: "", value: "", description: ""}
    ],
    note: "",
    benefits: {
      convincing: [""],
      how: [""]
    }
  },
  videoportal: {
    title: "Eco-Friendly Server Rack – VideoPortal",
    subtitle: "Streaming video green",
    stats: [
      {icon: "🔋", value: "22% Less", description: "Energy compared to AMD 9754 platform"},
      {
        icon: "🌍",
        value: "1.4 Tons Less CO2 emissions",
        description: "CO2 emissions avoid annually compared to AMD 9754 platform"
      },
      {icon: "🌳", value: "602 Trees", description: "Equals to planting 602 Trees"},
      {icon: "🚗", value: "7 cars", description: "Energy saved could drive 7 EVs per year"}
    ],
    note: "Note: Per 42U rack. Assume sufficient rack power to support 40 servers",
    benefits: {
      convincing: [
        "Better predictability & lower latency vs. competition",
        "Linear scalability to maximize heavily loaded server performance",
        "Better performance / watt vs. competition and translate this to TCO"
      ],
      how: [
        "A full stack demo using Kubernetes (Canonical MicroK8s) showing the capability to efficiently handle video processing, audio transcribing for subtitle, and video-on-demand streaming",
        "Providing a seamless viewing experience with adaptive bitrate streaming across various network conditions"
      ]
    }
  },
  [CICD]: {
    title: "Eco-Friendly Server Rack – CICD",
    subtitle: "Ease of Use & Functionality",
    stats: [
      {icon: "🔋", value: "TBD", description: " "},
      {icon: "🌍", value: "TBD", description: " "},
      {icon: "🌳", value: "TBD", description: " "},
      {icon: "🚗", value: "TBD", description: " "}
    ],
    note: " ",
    benefits: {
      convincing: [
        "Show design, build, and migration to different compute pools",
        "Reference architecture for virtualization & containers",
        "Ease of use , consistency in production environments, and build benefits"
      ],
      how: [
        "It complements Oracle's A1 credits and fills out our story for running Arm64 builds on GitHub ARC + Kubernetes cluster, hosted Arm64 runners",
        "Build a simple build process with LLVM, the compiler suite builds the same stuff on x86 and amr64"
      ]
    }
  }
};

export const SCALABILITY_IMAGES: Record<string, string> = {
  [WHISPER]: '/assets/whisper_110124.png',
  [OLLAMA_CHAT]: '/assets/llama3_110124.png',
  [YOLOV8]: '/assets/yolov8_110124.png',
  // [CICD]: '/assets/cicd.png'
}

export const WEBSITE_TITLES = {
  [WHISPER]: {
    title: "Whisper Model - AmpereOne Processor",
    subtitle: ""
  },
  [YOLOV8]: {
    title: "YOLOv8 Model - AmpereOne Processor",
    subtitle: ""
  },
  [OLLAMA_CHAT]: {
    title: "LLAMA3 Model - AmpereOne Processor",
    subtitle: ""
  },
  // [SERGE_CHAT]: {
  //   title: "CICD - AmpereOne Processor",
  //   subtitle: ""
  // }
};

export const APP_WITH_NAMESPACES: Record<TApps, string | null> = {
  [WHISPER]: "whisper",
  [YOLOV8]: "yolov8",
  [OLLAMA_CHAT]: "ollama-chat",
  [WEBSITE_MIGRATION]: null, //TODO yet to build a pod
}

export const GRAFANA_IFRAME_LINKS = {
  [WHISPER]: ["http://grafana.apps.amperedemo.site/d-solo/whisper_update/whisper-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=whisper&refresh=5s&theme=dark&panelId=5&__feature.dashboardSceneSolo", "http://grafana.apps.amperedemo.site/d-solo/whisper_update/whisper-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=whisper&refresh=5s&theme=dark&panelId=7&__feature.dashboardSceneSolo", "http://grafana.apps.amperedemo.site/d-solo/whisper_update/whisper-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=whisper&refresh=5s&theme=dark&panelId=19&__feature.dashboardSceneSolo"],
  [YOLOV8]: ["http://grafana.apps.amperedemo.site/d-solo/yolov8_update/yolov8-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=yolov8&refresh=5s&theme=dark&panelId=5&__feature.dashboardSceneSolo", "http://grafana.apps.amperedemo.site/d-solo/yolov8_update/yolov8-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=yolov8&refresh=5s&theme=dark&panelId=7&__feature.dashboardSceneSolo", "http://grafana.apps.amperedemo.site/d-solo/yolov8_update/yolov8-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=yolov8&refresh=5s&panelId=19&__feature.dashboardSceneSolo"],
  [OLLAMA_CHAT]: ["http://grafana.apps.amperedemo.site/d-solo/ollama_update/ollama-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=ollama-chat&refresh=5s&panelId=5&__feature.dashboardSceneSolo", "http://grafana.apps.amperedemo.site/d-solo/ollama_update/ollama-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=ollama-chat&refresh=5s&theme=dark&panelId=7&__feature.dashboardSceneSolo", "http://grafana.apps.amperedemo.site/d-solo/ollama_update/ollama-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=ollama-chat&refresh=5s&theme=dark&panelId=19&__feature.dashboardSceneSolo"],
  [WEBSITE_MIGRATION]: ["http://grafana.apps.amperedemo.site/d-solo/web_migration_update/webmigration-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=web-migration-arm&refresh=5s&theme=dark&panelId=5&__feature.dashboardSceneSolo", "http://grafana.apps.amperedemo.site/d-solo/web_migration_update/webmigration-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=web-migration-arm&refresh=5s&theme=dark&panelId=7&__feature.dashboardSceneSolo", "http://grafana.apps.amperedemo.site/d-solo/web_migration_update/webmigration-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=web-migration-arm&refresh=5s&theme=dark&panelId=19&__feature.dashboardSceneSolo"],
  [CICD]: ["http://grafana.apps.amperedemo.site/d-solo/llvm_update/llvm-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=actions-runner-system&refresh=5s&theme=dark&panelId=5&__feature.dashboardSceneSolo", "http://grafana.apps.amperedemo.site/d-solo/llvm_update/llvm-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=actions-runner-system&refresh=5s&panelId=7&__feature.dashboardSceneSolo", "http://grafana.apps.amperedemo.site/d-solo/llvm_update/llvm-update?orgId=1&from=now-10m&to=now&timezone=utc&var-datasource=default&var-cluster=&var-namespace=actions-runner-system&refresh=5s&theme=dark&panelId=19&__feature.dashboardSceneSolo"],
  DEFAULT: null
};


// export const GRAFANA_IFRAME_LINKS = {
//   [WHISPER]: [],
//   [YOLOV8]: [],
//   [OLLAMA_CHAT]: [],
//   [WEBSITE_MIGRATION]: [],
//   [CICD]: [],
//   DEFAULT: null
// };

export const NAMESPACE_WEB_MIGRATION_X86 = "web-migration-x86";
export const NAMESPACE_WEB_MIGRATION_ARM = "web-migration-arm";

export const WEB_MIGRATION_APPS = {
  [WORDPRESS]: {
    [X86]: {host:`http://${process.env.NEXT_PUBLIC_X86_NODE_IP}:30002/`, namespace: NAMESPACE_WEB_MIGRATION_X86},
    [ARM]: {host:`http://${process.env.NEXT_PUBLIC_ARM_NODE_IP}:30000/`, namespace: NAMESPACE_WEB_MIGRATION_ARM},
  },
  [MEDIAWIKI]: {
    [X86]: {host:`http://${process.env.NEXT_PUBLIC_X86_NODE_IP}:30003/`, namespace: NAMESPACE_WEB_MIGRATION_X86},
    [ARM]: {host:`http://${process.env.NEXT_PUBLIC_ARM_NODE_IP}:30001/`, namespace: NAMESPACE_WEB_MIGRATION_ARM}
  }
}
export const DEFAULT_ARCH_WEB_MIGRATION = X86;
export const OTHER_ARCH_WEB_MIGRATION = ARM;
export const DEFAULT_APP_WEB_MIGRATION = WORDPRESS;
export const OTHER_APP_WEB_MIGRATION = MEDIAWIKI;

export const POD_STATES = {
  RUNNING: "running"
}

export const POD_NAMES = {
  MYSQL: "mysql-app",
  WORDPRESS: "wordpress-app"
}
