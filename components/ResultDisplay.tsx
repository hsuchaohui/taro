import React from 'react';
import { SelectedCard } from '../types';

interface ResultDisplayProps {
  cards: SelectedCard[];
  interpretation: string;
  loading: boolean;
  onRestart: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ cards, interpretation, loading, onRestart }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      {/* Cards Reveal Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {cards.map((card, index) => (
          <div key={`${card.id}-${index}`} className="flex flex-col items-center animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
            <div className="mb-4 text-mystic-gold font-bold tracking-widest uppercase text-sm">
              {card.position}
            </div>
            
            <div className={`
              relative w-48 h-80 rounded-xl shadow-2xl overflow-hidden border-4 border-mystic-gold/50 transition-transform duration-700
              ${card.isReversed ? 'rotate-180' : ''}
            `}>
              <img 
                src={card.image} 
                alt={card.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>

            <div className="mt-6 text-center">
              <h3 className="text-2xl font-serif text-white mb-1">{card.name}</h3>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{card.nameEn}</p>
              <div className={`
                inline-block px-3 py-1 rounded-full text-xs font-bold mb-3
                ${card.isReversed ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}
              `}>
                {card.isReversed ? '逆位' : '正位'}
              </div>
              <p className="text-gray-300 text-sm italic min-h-[3rem]">
                "{card.isReversed ? card.meaningRev : card.meaningUp}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Interpretation Section */}
      <div className="bg-mystic-light/50 border border-mystic-purple rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        <h2 className="text-2xl md:text-3xl font-serif text-mystic-gold mb-6 text-center border-b border-white/10 pb-4">
          ✨ 牌靈解讀
        </h2>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-12 h-12 border-4 border-mystic-gold border-t-transparent rounded-full animate-spin"></div>
            <p className="text-purple-300 animate-pulse">正在連結宇宙能量，解讀牌意中...</p>
          </div>
        ) : (
          <div className="prose prose-invert prose-lg max-w-none text-gray-200 leading-relaxed whitespace-pre-line">
            {interpretation}
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onRestart}
          className="group relative px-8 py-3 bg-transparent border border-mystic-gold text-mystic-gold font-bold rounded hover:bg-mystic-gold hover:text-mystic-dark transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10">開始新的占卜</span>
          <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-mystic-gold"></div>
        </button>
      </div>
    </div>
  );
};