import { TarotCard } from './types';

export const MAJOR_ARCANA: TarotCard[] = [
  { id: 0, name: '愚者', nameEn: 'The Fool', image: 'https://picsum.photos/seed/tarot0/300/500', meaningUp: '新的開始、冒險、天真', meaningRev: '魯莽、輕率、愚蠢的決定' },
  { id: 1, name: '魔術師', nameEn: 'The Magician', image: 'https://picsum.photos/seed/tarot1/300/500', meaningUp: '創造力、技能、意志力', meaningRev: '欺騙、混亂、意志薄弱' },
  { id: 2, name: '女祭司', nameEn: 'The High Priestess', image: 'https://picsum.photos/seed/tarot2/300/500', meaningUp: '直覺、神秘、潛意識', meaningRev: '秘密被揭穿、缺乏遠見' },
  { id: 3, name: '皇后', nameEn: 'The Empress', image: 'https://picsum.photos/seed/tarot3/300/500', meaningUp: '豐饒、母性、自然', meaningRev: '依賴、虛榮、創造力受阻' },
  { id: 4, name: '皇帝', nameEn: 'The Emperor', image: 'https://picsum.photos/seed/tarot4/300/500', meaningUp: '權威、結構、穩固', meaningRev: '暴政、僵化、缺乏紀律' },
  { id: 5, name: '教皇', nameEn: 'The Hierophant', image: 'https://picsum.photos/seed/tarot5/300/500', meaningUp: '傳統、精神指引、學習', meaningRev: '反叛、非傳統、盲目信仰' },
  { id: 6, name: '戀人', nameEn: 'The Lovers', image: 'https://picsum.photos/seed/tarot6/300/500', meaningUp: '愛情、和諧、選擇', meaningRev: '不和、分離、錯誤的選擇' },
  { id: 7, name: '戰車', nameEn: 'The Chariot', image: 'https://picsum.photos/seed/tarot7/300/500', meaningUp: '勝利、意志力、自律', meaningRev: '失控、挫敗、攻擊性' },
  { id: 8, name: '力量', nameEn: 'Strength', image: 'https://picsum.photos/seed/tarot8/300/500', meaningUp: '勇氣、內在力量、耐心', meaningRev: '自我懷疑、軟弱、不安全感' },
  { id: 9, name: '隱士', nameEn: 'The Hermit', image: 'https://picsum.photos/seed/tarot9/300/500', meaningUp: '內省、孤獨、尋求真理', meaningRev: '孤立、寂寞、拒絕溝通' },
  { id: 10, name: '命運之輪', nameEn: 'Wheel of Fortune', image: 'https://picsum.photos/seed/tarot10/300/500', meaningUp: '轉機、命運、循環', meaningRev: '厄運、抗拒改變、壞週期' },
  { id: 11, name: '正義', nameEn: 'Justice', image: 'https://picsum.photos/seed/tarot11/300/500', meaningUp: '公平、真理、法律', meaningRev: '不公、偏見、逃避責任' },
  { id: 12, name: '倒吊人', nameEn: 'The Hanged Man', image: 'https://picsum.photos/seed/tarot12/300/500', meaningUp: '犧牲、換位思考、暫停', meaningRev: '無謂的犧牲、停滯不前' },
  { id: 13, name: '死神', nameEn: 'Death', image: 'https://picsum.photos/seed/tarot13/300/500', meaningUp: '結束、轉變、新生', meaningRev: '抗拒改變、停滯、恐懼' },
  { id: 14, name: '節制', nameEn: 'Temperance', image: 'https://picsum.photos/seed/tarot14/300/500', meaningUp: '平衡、中庸、耐心', meaningRev: '失衡、過度、缺乏和諧' },
  { id: 15, name: '惡魔', nameEn: 'The Devil', image: 'https://picsum.photos/seed/tarot15/300/500', meaningUp: '束縛、物質主義、誘惑', meaningRev: '擺脫束縛、覺醒、重獲自由' },
  { id: 16, name: '高塔', nameEn: 'The Tower', image: 'https://picsum.photos/seed/tarot16/300/500', meaningUp: '驟變、災難、啟示', meaningRev: '勉強維持、恐懼改變、內部崩潰' },
  { id: 17, name: '星星', nameEn: 'The Star', image: 'https://picsum.photos/seed/tarot17/300/500', meaningUp: '希望、靈感、平靜', meaningRev: '絕望、缺乏信心、灰心' },
  { id: 18, name: '月亮', nameEn: 'The Moon', image: 'https://picsum.photos/seed/tarot18/300/500', meaningUp: '幻覺、恐懼、潛意識', meaningRev: '釋放恐懼、揭露真相、清晰' },
  { id: 19, name: '太陽', nameEn: 'The Sun', image: 'https://picsum.photos/seed/tarot19/300/500', meaningUp: '快樂、成功、活力', meaningRev: '悲觀、不切實際、暫時的陰霾' },
  { id: 20, name: '審判', nameEn: 'Judgement', image: 'https://picsum.photos/seed/tarot20/300/500', meaningUp: '覺醒、重生、召喚', meaningRev: '自我懷疑、拒絕改變、悔恨' },
  { id: 21, name: '世界', nameEn: 'The World', image: 'https://picsum.photos/seed/tarot21/300/500', meaningUp: '圓滿、達成、旅行', meaningRev: '未完成、缺乏閉環、延遲' },
];

export const MOCK_INTERPRETATION = `這是一個示範的占卜結果（當 API Key 未設定時顯示）。
針對您的問題，牌陣顯示目前的狀況充滿了新的可能性（愚者），但您需要注意內在的直覺與潛意識的聲音（女祭司）。最終，這件事情會走向一個圓滿的階段（世界），但需要您保持平衡與耐心。建議您放膽去嘗試，不要害怕未知的挑戰。`;
