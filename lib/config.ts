import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "\u5feb\u901f\u8cb7\u83dc\u5efa\u8b70",
    prompt:
      "\u6211\u4eca\u665a\u60f3\u716e\u4e09\u83dc\u4e00\u6e6f\uff0c\u8acb\u63a8\u85a6\u9700\u8981\u8cfc\u8cb7\u7684\u98df\u6750\u3002",
  },
  {
    label: "\u5b63\u7bc0\u6642\u852c",
    prompt:
      "\u73fe\u5728\u6709\u54ea\u4e9b\u7576\u5b63\u852c\u679c\u503c\u5f97\u5165\u624b\uff1f",
  },
  {
    label: "\u4fdd\u5b58\u6280\u5de7",
    prompt:
      "\u8acb\u5206\u4eab\u4fdd\u5b58\u8449\u83dc\u985e\u7684\u65b0\u9bae\u5c0f\u6487\u6b65\u3002",
  },
];

export const PLACEHOLDER_INPUT =
  "\u544a\u8a34\u8cb7\u83dc\u5c0f\u5e6b\u624b\u4f60\u60f3\u6e96\u5099\u7684\u83dc\u8272\u6216\u98df\u6750\u002e\u002e\u002e";

export const GREETING =
  "\u6b61\u8fce\u4f86\u5230\u8cb7\u83dc\u5c0f\u5e6b\u624b\uff01\u6211\u80fd\u5354\u52a9\u4f60\u898f\u5283\u83dc\u55ae\u3001\u6311\u9078\u597d\u98df\u6750\uff0c\u9084\u6709\u4fdd\u5b58\u8207\u6599\u7406\u5efa\u8b70\u3002";

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
