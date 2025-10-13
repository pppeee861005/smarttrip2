import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "查詢航班資訊",
    prompt: "請幫我查詢從台北到東京的航班資訊",
  },
  {
    label: "規劃旅行行程",
    prompt: "請幫我規劃一個日本東京三天的旅行行程",
  },
  {
    label: "你能幫我做什麼？",
    prompt: "你能幫我做什麼？",
  },
];

export const PLACEHOLDER_INPUT = "輸入您的旅行問題...";

export const GREETING = "歡迎使用智慧旅行助手！我可以幫您查詢航班資訊並規劃旅行行程。";

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  color: {
    grayscale: {
      hue: 220,
      tint: 6,
      shade: theme === "dark" ? -1 : -4,
    },
    accent: {
      primary: theme === "dark" ? "#f1f5f9" : "#0f172a",
      level: 1,
    },
  },
  radius: "round",
  // Add other theme options here
  // chatkit.studio/playground to explore config options
});
