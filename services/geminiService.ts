import { GoogleGenAI } from "@google/genai";
import { SelectedCard } from "../types";
import { MOCK_INTERPRETATION } from "../constants";

export const generateTarotReading = async (
  topic: string,
  cards: SelectedCard[]
): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("No API Key found, returning mock data.");
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return MOCK_INTERPRETATION;
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    你是一位專業、神秘且富有同理心的塔羅牌占卜師。
    使用繁體中文為使用者進行占卜。
    
    使用者的占卜主題是：${topic || "一般運勢"}
    
    抽出的牌陣如下：
    1. 原因牌 (The Cause): ${cards[0].name} (${cards[0].isReversed ? '逆位' : '正位'}) - 牌義: ${cards[0].isReversed ? cards[0].meaningRev : cards[0].meaningUp}
    2. 建議牌 (The Advice): ${cards[1].name} (${cards[1].isReversed ? '逆位' : '正位'}) - 牌義: ${cards[1].isReversed ? cards[1].meaningRev : cards[1].meaningUp}
    3. 結果牌 (The Result): ${cards[2].name} (${cards[2].isReversed ? '逆位' : '正位'}) - 牌義: ${cards[2].isReversed ? cards[2].meaningRev : cards[2].meaningUp}
    
    請綜合以上三張牌的關聯性，給出一份流暢、溫暖且具有指引性的解讀。
    格式要求：
    - 不需要再次列出牌的基本定義，直接進入解讀。
    - 第一段：整體能量分析。
    - 第二段：針對「原因」的深入剖析。
    - 第三段：給予具體的「建議」。
    - 第四段：預測可能的「結果」。
    - 最後給予一句神秘的祝福。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || MOCK_INTERPRETATION;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "星象運轉似乎受到了干擾，請稍後再試，或參考牌面本身的含義進行直覺解讀。";
  }
};