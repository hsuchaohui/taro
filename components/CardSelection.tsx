import React from 'react';
import { MAJOR_ARCANA } from '../constants';
import { TarotCard } from '../types';

interface CardSelectionProps {
  onSelect: (card: TarotCard) => void;
  selectedIds: number[];
}

export const CardSelection: React.FC<CardSelectionProps> = ({ onSelect, selectedIds }) => {
  return (
    <div className="w-full overflow-x-auto py-8 px-4 snap-x snap-mandatory scroll-smooth hide-scrollbar">
      <div className="flex space-x-6 w-max mx-auto px-8">
        {MAJOR_ARCANA.map((card) => {
          const isSelected = selectedIds.includes(card.id);
          return (
            <div
              key={card.id}
              onClick={() => !isSelected && onSelect(card)}
              className={`
                relative w-32 h-56 rounded-xl border-2 cursor-pointer transition-all duration-300 transform snap-center
                flex flex-col items-center justify-center shadow-lg
                ${isSelected 
                  ? 'border-mystic-gold bg-mystic-purple -translate-y-6 opacity-50 cursor-default' 
                  : 'border-mystic-purple bg-gradient-to-br from-indigo-900 to-purple-900 hover:-translate-y-4 hover:border-mystic-gold hover:shadow-[0_0_15px_rgba(255,215,0,0.4)]'
                }
              `}
            >
              {/* Card Back Pattern */}
              <div className="absolute inset-2 border border-white/10 rounded-lg flex items-center justify-center opacity-30">
                <div className="w-16 h-16 rounded-full border-2 border-white/20"></div>
              </div>
              
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl font-bold text-mystic-gold tracking-widest">
                  已選
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="text-center mt-6 text-gray-400 text-sm animate-pulse">
        ← 左右滑動瀏覽牌陣，憑直覺點擊三張牌 →
      </div>
    </div>
  );
};