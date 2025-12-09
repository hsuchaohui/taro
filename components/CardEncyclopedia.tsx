import React, { useState } from 'react';
import { MAJOR_ARCANA } from '../constants';
import { TarotCard } from '../types';

interface CardEncyclopediaProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CardEncyclopedia: React.FC<CardEncyclopediaProps> = ({ isOpen, onClose }) => {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-5xl h-[85vh] bg-mystic-dark border border-mystic-purple rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-mystic-purple/20">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📖</span>
            <h2 className="text-2xl font-serif text-mystic-gold">塔羅牌義圖鑑</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Sidebar / Grid List */}
          <div className={`
            flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 scroll-smooth
            ${selectedCard ? 'hidden md:grid md:w-1/2 lg:w-3/5' : ''}
          `}>
            {MAJOR_ARCANA.map((card) => (
              <div 
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`
                  cursor-pointer rounded-lg p-3 border transition-all duration-300 flex flex-col items-center text-center space-y-2 group
                  ${selectedCard?.id === card.id 
                    ? 'bg-mystic-purple border-mystic-gold shadow-[0_0_15px_rgba(255,215,0,0.3)]' 
                    : 'bg-mystic-light/30 border-transparent hover:bg-mystic-light hover:border-mystic-purple'
                  }
                `}
              >
                <div className="w-full aspect-[2/3] rounded overflow-hidden mb-2 relative">
                   <img 
                      src={card.image} 
                      alt={card.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      loading="lazy"
                   />
                   {/* Overlay for quick ID */}
                   <div className="absolute top-1 left-1 bg-black/60 text-xs px-1.5 rounded text-white font-mono border border-white/10">
                     {card.id}
                   </div>
                </div>
                <div>
                  <div className="font-bold text-gray-200 group-hover:text-mystic-gold transition-colors">{card.name}</div>
                  <div className="text-xs text-gray-400">{card.nameEn}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail View (Right Panel on Desktop, Full on Mobile when selected) */}
          {selectedCard && (
            <div className={`
              md:w-1/2 lg:w-2/5 border-l border-white/10 bg-mystic-dark/50 flex flex-col
              ${selectedCard ? 'absolute inset-0 z-10 md:static bg-mystic-dark' : 'hidden'}
            `}>
              {/* Mobile Back Button */}
              <button 
                onClick={() => setSelectedCard(null)}
                className="md:hidden absolute top-4 left-4 z-20 px-4 py-2 bg-black/60 text-white rounded-full backdrop-blur text-sm flex items-center space-x-1 border border-white/20"
              >
                <span>← 返回列表</span>
              </button>

              <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center animate-fade-in">
                 <div className="w-64 h-96 rounded-xl border-4 border-mystic-gold/30 shadow-2xl overflow-hidden mb-8 flex-shrink-0 relative group">
                    <img src={selectedCard.image} alt={selectedCard.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                 </div>
                 
                 <div className="w-full max-w-md space-y-6">
                    <div className="text-center">
                      <h3 className="text-3xl font-serif text-mystic-gold mb-1">{selectedCard.name}</h3>
                      <p className="text-gray-400 font-serif italic text-lg">{selectedCard.nameEn}</p>
                    </div>

                    <div className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10">
                      <div>
                        <h4 className="flex items-center space-x-2 text-green-300 font-bold mb-2">
                          <span className="text-xl">⬆</span>
                          <span>正位含義 (Upright)</span>
                        </h4>
                        <p className="text-gray-300 leading-relaxed pl-7 border-l-2 border-green-500/30 ml-2">{selectedCard.meaningUp}</p>
                      </div>
                      
                      <div className="border-t border-white/10 my-4"></div>

                      <div>
                        <h4 className="flex items-center space-x-2 text-red-300 font-bold mb-2">
                          <span className="text-xl">⬇</span>
                          <span>逆位含義 (Reversed)</span>
                        </h4>
                        <p className="text-gray-300 leading-relaxed pl-7 border-l-2 border-red-500/30 ml-2">{selectedCard.meaningRev}</p>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* Empty State for Desktop Right Panel */}
          {!selectedCard && (
            <div className="hidden md:flex md:w-1/2 lg:w-2/5 items-center justify-center p-8 text-gray-500 flex-col border-l border-white/10 bg-black/20">
              <div className="text-6xl mb-4 opacity-20 grayscale">🃏</div>
              <p>點擊左側卡牌查看詳細牌義</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};