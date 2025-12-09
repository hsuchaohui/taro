export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  image: string; // Placeholder URL
  meaningUp: string;
  meaningRev: string;
}

export interface SelectedCard extends TarotCard {
  isReversed: boolean;
  position: 'Cause' | 'Advice' | 'Result'; // 原因 | 建議 | 結果
}

export interface ReadingResult {
  id: string;
  date: string;
  topic: string;
  cards: SelectedCard[];
  interpretation: string;
}

export enum AppStep {
  INTRO = 'INTRO',
  SELECTION = 'SELECTION',
  REVEAL = 'REVEAL',
  READING = 'READING',
}