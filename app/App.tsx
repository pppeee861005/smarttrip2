"use client";

import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";
import { WORKFLOW_EMBED_SNIPPET } from "@/lib/workflowSnippet";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-emerald-100 px-6 py-12 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 dark:text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row">
        <section className="flex flex-1 flex-col justify-between gap-10">
          <div className="space-y-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300 bg-white/70 px-4 py-1 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur-sm dark:border-emerald-700/60 dark:bg-slate-900/60 dark:text-emerald-300">
              MVP · 三狼賣菜小鋪
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                讓買菜像聊天一樣輕鬆的
                <span className="text-emerald-600 dark:text-emerald-300">
                  {" "}
                  三狼賣菜小鋪
                </span>
              </h1>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                這是一個極簡的網路菜市場 MVP。左側是品牌與服務介紹，右側嵌入了「買菜小助手」對話框，替你處理購物、退貨與尋問等所有互動。
                不管是挑菜、了解商品，或是處理售後，都可以交給小助手。
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-emerald-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-emerald-700/40 dark:bg-slate-900/60">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  小助手可以幫忙的事
                </p>
                <ul className="mt-3 space-y-2 text-base text-slate-600 dark:text-slate-200">
                  <li>· 購物：推薦菜單、快速生成採買清單</li>
                  <li>· 退貨：協助紀錄問題、提供安心補救流程</li>
                  <li>· 尋問：即問即答的蔬菜保存與料理攻略</li>
                </ul>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-3 py-1 font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                  ✅ 線上預覽
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-3 py-1 font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                  ⚡ 即時客服
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-3 py-1 font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                  🧾 訂單追蹤
                </span>
              </div>
            </div>
          </div>

          <details className="group rounded-2xl border border-slate-300/60 bg-white/70 p-4 shadow-sm backdrop-blur transition dark:border-slate-700/60 dark:bg-slate-900/60">
            <summary className="cursor-pointer text-sm font-semibold text-slate-700 transition hover:text-emerald-600 focus:outline-none group-open:text-emerald-600 dark:text-slate-200 dark:group-open:text-emerald-300">
              JavaScript 嵌入程式碼（買菜小助手對話框）
            </summary>
            <div className="mt-4 max-h-72 overflow-y-auto rounded-xl bg-slate-950/90 p-4 text-xs leading-relaxed text-emerald-100 shadow-inner dark:bg-slate-950">
              <pre className="whitespace-pre-wrap break-all">
                <code>{WORKFLOW_EMBED_SNIPPET}</code>
              </pre>
            </div>
          </details>
        </section>

        <section className="flex flex-1 justify-center lg:justify-end">
          <div className="h-full w-full max-w-3xl rounded-3xl border border-emerald-200 bg-white/80 p-4 shadow-xl backdrop-blur dark:border-emerald-700/40 dark:bg-slate-900/70 lg:p-6">
            <ChatKitPanel
              theme={scheme}
              onWidgetAction={handleWidgetAction}
              onResponseEnd={handleResponseEnd}
              onThemeRequest={setScheme}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
