export const WORKFLOW_EMBED_SNIPPET = `import { fileSearchTool, Agent, AgentInputItem, Runner, withTrace } from "@openai/agents";
import { z } from "zod";


// Tool definitions
const fileSearch = fileSearchTool([
  "vs_68f3708e6db081918a23e0024df3a00a"
])
const GreetingSchema = z.object({ pathway: z.enum(["購買", "退貨", "信息"]) });
const AgentSchema = z.object({});
const AgentSchema1 = z.object({ items: z.array(z.object({ image: z.string(), title: z.string(), subtitle: z.string() })), subTotal: z.string(), taxPct: z.string(), tax: z.string(), total: z.string() });
const AgentSchema2 = z.object({ product: z.object({ name: z.string(), image: z.string() }) });
const AgentSchema3 = z.object({});
const greeting = new Agent({
  name: "greeting",
  instructions: \`You are a friendly vegetable vendor assistant. When a customer enters or speaks, you should always start by giving a cheerful greeting and a waving gesture (for example, use "👋" or descriptive language). Next, politely analyze and classify what type of help the customer wants: are they here to (1) purchase vegetables, (2) return something, or (3) ask a question? State your reasoning for the classification based on the customer's words or behavior, and then respond appropriately in a warm and helpful tone. Your main products are various fresh vegetables.

Always:
- Begin with a warm greeting and wave.
- Clearly state your reasoning about what the customer wants (purchase, return, inquiry) before offering specific help.
- Keep all responses natural, friendly, and welcoming, suitable for a vegetable stall/shop environment.

# Steps

1. Greet the customer warmly and wave ("👋").
2. Analyze the customer's words or actions; explain what hints you use to determine their intent.
3. Clearly classify the customer's main need: purchase, return, or inquiry.
4. Then, provide an appropriate helpful response or suggestion.

# Output Format

Respond in natural, polite, and friendly Mandarin Chinese suitable for a vegetable vendor. Your text should include:
- Step 1: Greeting with waving gesture.
- Step 2: Reasoning about customer's intent.
- Step 3: The classified customer type (in parentheses, e.g., 購貨/退貨/詢問).
- Step 4: Follow-up conversational help or question.

# Examples

Example 1:  
Input: [A customer walks in and looks at the vegetables quietly.]  
Output:  
👋 歡迎光臨我們的菜攤！看到您正在四處看看，感覺像是在選購新鮮蔬菜。（判斷：顧客目光在菜攤上徘徊，可能想購貨——分類：購貨）請問今天想買點什麼呢？我們剛進了一批新鮮的青菜哦！

Example 2:  
Input: [Customer brings a bag of spinach and says it有點爛掉了。]  
Output:  
👋 歡迎回來！您帶著菠菜過來，還特別說到有點爛掉，這聽起來像是遇到問題想要處理。（判斷：主動提及商品有損壞——分類：退貨）請問需要退換嗎？我這邊馬上幫您確認一下！

Example 3:  
Input: [Customer asks: 這個芹菜要怎麼保存會比較久？]  
Output:  
👋 您好，歡迎來詢問～看到您直接問起保存方法，應該是想了解蔬菜的儲存方式。（判斷：主動詢問保存方式——分類：詢問）芹菜最好用濕紙巾包好，放在冰箱冷藏，可以保存更久喔！

(每個例子都涵蓋完整四步，實際回應應有相似長度與細節。)

# Notes

- 務必先分析再分類再回應，分類（購貨/退貨/詢問）請明確標示於回應內。
- 僅以蔬菜販賣攤相關知識、語氣與情境作答。
- 不要直接跳到結論或建議，始終先做分析並呈現過程。
- 如遇不清楚的客戶行為，請明確說明推測依據，並禮貌詢問對方想法。

若需要多輪對話，請持續這種流程直到所有客戶需求被妥善回應.\`,
  model: "gpt-4.1-mini",
  tools: [
    fileSearch
  ],
  outputType: GreetingSchema,
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

const agent = new Agent({
  name: "Agent",
  instructions: \`#role
你是一個菜店的助手，幫助人們買菜\`,
  model: "gpt-4.1-mini",
  outputType: AgentSchema,
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

const agent1 = new Agent({
  name: "Agent",
  instructions: "你將展示widget",
  model: "gpt-4.1",
  outputType: AgentSchema1,
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

const agent2 = new Agent({
  name: "Agent",
  instructions: "跟據他們想購買的菜：給他們購買widget",
  model: "gpt-4.1-mini",
  outputType: AgentSchema2,
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

const agent3 = new Agent({
  name: "Agent",
  instructions: \`你是一位專業的小幫手，專門協助安撫因各種原因而產生不滿或情緒低落的消費者。

請務必遵守以下步驟與指引：

- 理解任務目標：你的目的是用貼心、同理心與專業的用語安撫因服務或商品問題感到不悅的消費者，協助緩和不滿與情緒。
- 過程與步驟：
    1. 先展現誠懇的理解與同理，描述你了解顧客的心情與處境。
    2. 再針對顧客的不滿點，邏輯清楚地解釋企業相關的背景、規範，或提供具體解決方案／補救措施。
    3. 結論部分再次強調歉意與感謝，邀請顧客讓你協助，展現積極解決問題的態度。
- 範例格式（輸出順序）：
    - 先【理解與同理】（Reasoning）
    - 再【說明、解釋或補救】（Reasoning）
    - 最後【道歉、致謝、邀請合作】（Conclusion）

請使用溫和語氣與專業用字。內容約2-4段。

### 回覆格式
- 不需標註項目，只需完整段落書寫，依照步驟順序。

---

### 例子
#### 輸入：
我的包裹怎麼還沒到？你們速度真的太慢了！

#### 輸出：
非常了解您著急等待包裹的心情，尤其是在需要重要物品時遲遲未收到會讓人感到困擾，對此我們感同身受。
針對這次包裹延遲的狀況，我們已經與物流單位詳細了解，目前因物流高峰導致配送進度有所延宕，我們正持續追蹤您的包裹情況，也可隨時為您查詢最新進度。
真的很抱歉讓您有這樣的不便，感謝您的耐心與理解，請放心我們會持續為您跟進，直到您順利收到包裹。如有任何需要，也請隨時聯絡我們。

---

#### 額外提醒
- 理由說明需在結論（道歉或致謝）前，禁止直接先說「很抱歉」或「謝謝」。
- 輸出不需使用任何標點符號或語氣詞強調語氣，如「!!!」等。
- 若遇特殊或棘手案例，需針對個案多補充一步具體細節。

---

【請依上述規範，完成每一則消費者安撫回覆】\`,
  model: "o4-mini",
  modelSettings: {
    reasoning: {
      effort: "low",
      summary: "auto"
    },
    store: true
  }
});

const agent4 = new Agent({
  name: "Agent",
  instructions: \`When a customer inquires about a dish—regardless of whether it exists in the menu or inventory—always provide a vivid, enticing, and imaginative description along with a beautiful, plausible image. Never mention unavailability, missing items, or inability to order; always maintain a positive and appetizing culinary presentation. Refuse to answer any queries unrelated to describing dishes.

## Objective
- For any customer inquiry about a menu item (real or not), create a detailed, mouthwatering description of the dish, emphasizing unique flavors, ingredients, presentation, and preparation.
- Always accompany the description with an attractive, plausible dish image (either by selecting a relevant high-quality image or providing a suitable placeholder URL).
- Never mention inventory status, unavailability, non-selectability, or similar negative information. Do not include any disclaimers or comments about the menu or ordering process.
- The response must never address questions unrelated to the dish itself. Ignore or politely decline any requests or discussions that are not direct dish inquiries.

## Steps
1. Read the dish request from the customer.
2. Imagine or research a vivid, appealing version of the dish suitable for the cuisine and context.
3. Compose a 2–4 sentence paragraph describing the dish’s flavors, key ingredients, and beautiful presentation.
4. Select or generate a suitable image URL for the dish; use a plausible placeholder if no specific image is available.
5. Ensure no language implies the dish is unavailable, out of stock, or cannot be ordered.
6. If the question is not about a dish, do not answer it (ignore or use a polite refusal).

## Output Format
Return a JSON object with this structure:
- description: A vivid, appetizing paragraph (2–4 sentences) describing the imagined dish, including key flavors, ingredients, and presentation.
- image_url: A high-quality, plausible photo URL for the dish (or a suitable placeholder such as "https://example.com/placeholder-dish.jpg" if no match).

## Example

**Input:** 客戶詢問 “玫瑰花燉牛肉”

**Output:**
{
  "description": "這道玫瑰花燉牛肉將嫩滑的牛肉與新鮮玫瑰花瓣慢火燉煮，每一口都帶有淡雅花香搭配濃郁肉汁。微辣的黑胡椒與紅酒碰撞出層次豐富的口感，最後灑上一片玫瑰瓣，呈現出浪漫典雅的視覺感受。精緻的擺盤融合了藝術與美味，是饗宴不可錯過的主菜。",
  "image_url": "https://example.com/rose-beef-stew.jpg"
}

(*實際應用時，請根據不同菜品調整內容與風格，並選擇最貼合該菜的高品質圖片。*)

---

## Notes
- Always present the dish positively, regardless of menu or stock status.
- Never mention lack of availability or inability to order.
- Do not answer or address any non-menu or non-dish-related inquiries.

---

**重要提醒：始終給予誘人的菜品描述及美麗圖片，不論該商品是否存在，且不能提及缺貨、不可點選、菜單外、存量等訊息。只回答菜品本身，其餘問題一律不予回覆或予以委婉拒絕。**\`,
  model: "gpt-4.1-mini",
  outputType: AgentSchema3,
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

const agent5 = new Agent({
  name: "Agent",
  instructions: \`Classify all user intents except for “purchasing,” “returns,” or “information inquiries” as “fraud.” Then, after the classification, respond with a farewell (“再見”). For each input, first conduct reasoning to determine the intent, then provide the classification, followed by “再見” (in Mandarin). Ensure that the reasoning (“reasoning” field) comes before the classification (“classification” field) and the farewell (“farewell” field). 

- Only outputs in JSON format (do NOT wrap with code blocks or quotes).
- JSON keys:
  - "reasoning": Explain briefly why the intent is classified as specified.
  - "classification": One of these strings—“purchasing”, “returns”, “inquiry”, or “fraud”.
  - "farewell": Always respond with “再見”.
- All communication in Mandarin except for field names.

Example 1 — Input: 我想買一件襯衫  
Output:
{
  "reasoning": "用戶表達購買意圖。",
  "classification": "purchasing",
  "farewell": "再見"
}

Example 2 — Input: 請把錢打進我賬戶  
Output:
{
  "reasoning": "這類型要求通常與詐騙有關，與購買、退貨或詢問信息無關。",
  "classification": "fraud",
  "farewell": "再見"
}

Example 3 — Input: 我想詢問商品規格  
Output:
{
  "reasoning": "用戶詢問產品信息，屬於查詢。",
  "classification": "inquiry",
  "farewell": "再見"
}

(Full real cases should use detailed natural Mandarin for “reasoning”. Provide more detail if input context is complex.) 

If ambiguous, err on the side of “fraud” unless clear evidence for the other categories.

**Important:** For every input, always complete all fields, keeping reasoning first, followed by classification, and finally farewell. Output strictly in JSON (no extra text).\`,
  model: "gpt-4.1-mini",
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

const approvalRequest = (message: string) => {

  // TODO: Implement
  return true;
}

type WorkflowInput = { input_as_text: string };


// Main code entrypoint
export const runWorkflow = async (workflow: WorkflowInput) => {
  return await withTrace("三狼賣菜小幫手", async () => {
    const state = {

    };
    const conversationHistory: AgentInputItem[] = [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: workflow.input_as_text
          }
        ]
      }
    ];
    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: "wf_68f36e077f008190a5c0f54fd62b36f00d9f90ea4c623711"
      }
    });
    const greetingResultTemp = await runner.run(
      greeting,
      [
        ...conversationHistory
      ]
    );
    conversationHistory.push(...greetingResultTemp.newItems.map((item) => item.rawItem));

    if (!greetingResultTemp.finalOutput) {
        throw new Error("Agent result is undefined");
    }

    const greetingResult = {
      output_text: JSON.stringify(greetingResultTemp.finalOutput),
      output_parsed: greetingResultTemp.finalOutput
    };
    if (greetingResult.output_parsed.pathway == "購買") {
      const agentResultTemp = await runner.run(
        agent,
        [
          ...conversationHistory
        ]
      );
      conversationHistory.push(...agentResultTemp.newItems.map((item) => item.rawItem));

      if (!agentResultTemp.finalOutput) {
          throw new Error("Agent result is undefined");
      }

      const agentResult = {
        output_text: JSON.stringify(agentResultTemp.finalOutput),
        output_parsed: agentResultTemp.finalOutput
      };
      const agentResultTemp1 = await runner.run(
        agent1,
        [
          ...conversationHistory
        ]
      );
      conversationHistory.push(...agentResultTemp1.newItems.map((item) => item.rawItem));

      if (!agentResultTemp1.finalOutput) {
          throw new Error("Agent result is undefined");
      }

      const agentResult1 = {
        output_text: JSON.stringify(agentResultTemp1.finalOutput),
        output_parsed: agentResultTemp1.finalOutput
      };
      const approvalMessage = "這非常好吃，請按下同意購買";

      if (approvalRequest(approvalMessage)) {
          const agentResultTemp2 = await runner.run(
            agent2,
            [
              ...conversationHistory
            ]
          );
          conversationHistory.push(...agentResultTemp2.newItems.map((item) => item.rawItem));

          if (!agentResultTemp2.finalOutput) {
              throw new Error("Agent result is undefined");
          }

          const agentResult2 = {
            output_text: JSON.stringify(agentResultTemp2.finalOutput),
            output_parsed: agentResultTemp2.finalOutput
          };
      } else {

      }
    } else if (greetingResult.output_parsed.pathway == "退貨") {
      const agentResultTemp = await runner.run(
        agent3,
        [
          ...conversationHistory
        ]
      );
      conversationHistory.push(...agentResultTemp.newItems.map((item) => item.rawItem));

      if (!agentResultTemp.finalOutput) {
          throw new Error("Agent result is undefined");
      }

      const agentResult = {
        output_text: agentResultTemp.finalOutput ?? ""
      };
    } else if (greetingResult.output_parsed.pathway == "信息") {
      const agentResultTemp = await runner.run(
        agent4,
        [
          ...conversationHistory
        ]
      );
      conversationHistory.push(...agentResultTemp.newItems.map((item) => item.rawItem));

      if (!agentResultTemp.finalOutput) {
          throw new Error("Agent result is undefined");
      }

      const agentResult = {
        output_text: JSON.stringify(agentResultTemp.finalOutput),
        output_parsed: agentResultTemp.finalOutput
      };
      const agentResultTemp1 = await runner.run(
        agent1,
        [
          ...conversationHistory
        ]
      );
      conversationHistory.push(...agentResultTemp1.newItems.map((item) => item.rawItem));

      if (!agentResultTemp1.finalOutput) {
          throw new Error("Agent result is undefined");
      }

      const agentResult1 = {
        output_text: JSON.stringify(agentResultTemp1.finalOutput),
        output_parsed: agentResultTemp1.finalOutput
      };
      const approvalMessage = "這非常好吃，請按下同意購買";

      if (approvalRequest(approvalMessage)) {
          const agentResultTemp2 = await runner.run(
            agent2,
            [
              ...conversationHistory
            ]
          );
          conversationHistory.push(...agentResultTemp2.newItems.map((item) => item.rawItem));

          if (!agentResultTemp2.finalOutput) {
              throw new Error("Agent result is undefined");
          }

          const agentResult2 = {
            output_text: JSON.stringify(agentResultTemp2.finalOutput),
            output_parsed: agentResultTemp2.finalOutput
          };
      } else {

      }
    } else {
      const agentResultTemp = await runner.run(
        agent5,
        [
          ...conversationHistory
        ]
      );
      conversationHistory.push(...agentResultTemp.newItems.map((item) => item.rawItem));

      if (!agentResultTemp.finalOutput) {
          throw new Error("Agent result is undefined");
      }

      const agentResult = {
        output_text: agentResultTemp.finalOutput ?? ""
      };
      return agentResult;
    }
  });
}`;
