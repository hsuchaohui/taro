import React, { useState, useEffect, useCallback } from 'react';
import { CardSelection } from './components/CardSelection';
import { ResultDisplay } from './components/ResultDisplay';
import { HistoryDrawer } from './components/HistoryDrawer';
import { CardEncyclopedia } from './components/CardEncyclopedia';
import { generateTarotReading } from './services/geminiService';
import { AppStep, SelectedCard, TarotCard, ReadingResult } from './types';

const STORAGE_KEY = 'mystic_tarot_history';

function App() {
  const [step, setStep] = useState<AppStep>(AppStep.INTRO);
  const [topic, setTopic] = useState<string>('');
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [interpretation, setInterpretation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<ReadingResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isEncyclopediaOpen, setIsEncyclopediaOpen] = useState<boolean>(false);

  // Load History
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save History Helper
  const saveResult = (cards: SelectedCard[], text: string) => {
    const newRecord: ReadingResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      topic: topic || "心靈探索",
      cards,
      interpretation: text,
    };
    const updatedHistory = [newRecord, ...history];
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const handleStart = () => {
    setStep(AppStep.SELECTION);
    setSelectedCards([]);
  };

  const handleCardSelect = (card: TarotCard) => {
    if (selectedCards.length >= 3) return;

    // Randomize Upright or Reversed (20% chance reversed for demo balance, or 50/50)
    const isReversed = Math.random() < 0.3;
    
    // Determine position based on order
    const positionMap = ['Cause', 'Advice', 'Result'] as const;
    const position = positionMap[selectedCards.length];

    const newSelection: SelectedCard = {
      ...card,
      isReversed,
      position
    };

    const updatedSelection = [...selectedCards, newSelection];
    setSelectedCards(updatedSelection);

    if (updatedSelection.length === 3) {
      // Small delay before transition for better UX
      setTimeout(() => {
        handleReading(updatedSelection);
      }, 800);
    }
  };

  const handleReading = async (finalSelection: SelectedCard[]) => {
    setStep(AppStep.READING);
    setIsLoading(true);
    
    // Call Gemini Service
    const resultText = await generateTarotReading(topic, finalSelection);
    
    setInterpretation(resultText);
    setIsLoading(false);
    saveResult(finalSelection, resultText);
  };

  const handleRestart = () => {
    setStep(AppStep.INTRO);
    setTopic('');
    setSelectedCards([]);
    setInterpretation('');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setStep(AppStep.INTRO)}>
          <div className="text-3xl">✨</div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystic-gold to-amber-200">
            紫微星塔羅
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsEncyclopediaOpen(true)}
            className="px-3 py-2 text-sm text-gray-300 hover:text-white border border-white/20 rounded hover:border-mystic-gold transition-colors flex items-center space-x-1.5"
            title="牌義圖鑑"
          >
            <span>📖</span>
            <span className="hidden sm:inline">牌義圖鑑</span>
          </button>

          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="px-3 py-2 text-sm text-gray-300 hover:text-white border border-white/20 rounded hover:border-mystic-gold transition-colors flex items-center space-x-1.5"
            title="歷史紀錄"
          >
            <span>📜</span>
            <span className="hidden sm:inline">紀錄</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-4">
        
        {step === AppStep.INTRO && (
          <div className="max-w-2xl text-center space-y-8 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              探索你的<br />
              <span className="text-mystic-gold">內在宇宙</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              請在心中默念您的問題，或保持心靈平靜。<br/>
              透過大阿卡納牌的指引，揭示過去、現在與未來的啟示。
            </p>
            
            <div className="w-full max-w-md mx-auto relative group">
              <input
                type="text"
                placeholder="在此輸入您想占卜的主題（可留空）..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-mystic-light border-2 border-mystic-purple rounded-lg px-6 py-4 text-center text-white focus:outline-none focus:border-mystic-gold transition-colors placeholder-gray-500"
              />
            </div>

            <button
              onClick={handleStart}
              className="px-12 py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-white font-bold text-xl rounded shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.8)] transform hover:-translate-y-1 transition-all duration-300"
            >
              開始占卜
            </button>
          </div>
        )}

        {step === AppStep.SELECTION && (
          <div className="w-full max-w-6xl mx-auto text-center space-y-6 animate-fade-in">
            <h3 className="text-2xl font-serif text-mystic-gold">
              請憑直覺選出 <span className="text-white text-3xl mx-2">{3 - selectedCards.length}</span> 張牌
            </h3>
            <p className="text-gray-400">
              {selectedCards.length === 0 && "第一張：象徵問題的根源 (原因牌)"}
              {selectedCards.length === 1 && "第二張：給予您的行動指引 (建議牌)"}
              {selectedCards.length === 2 && "第三張：預測未來的走向 (結果牌)"}
            </p>
            
            <CardSelection 
              onSelect={handleCardSelect}
              selectedIds={selectedCards.map(c => c.id)}
            />
          </div>
        )}

        {step === AppStep.READING && (
          <ResultDisplay 
            cards={selectedCards} 
            interpretation={interpretation} 
            loading={isLoading}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full p-4 text-center text-gray-600 text-sm border-t border-white/5">
        &copy; {new Date().getFullYear()} Mystic Tarot. 僅供娛樂與心靈參考。
      </footer>

      {/* Drawers & Modals */}
      <HistoryDrawer 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        history={history}
      />
      
      <CardEncyclopedia 
        isOpen={isEncyclopediaOpen} 
        onClose={() => setIsEncyclopediaOpen(false)} 
      />
    </div>
  );
}

export default App;