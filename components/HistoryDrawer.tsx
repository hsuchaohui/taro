import React, { useState, useEffect } from 'react';
import { ReadingResult } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: ReadingResult[];
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ isOpen, onClose, history }) => {
  const [selectedRecord, setSelectedRecord] = useState<ReadingResult | null>(null);

  // Reset selected record when drawer is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setSelectedRecord(null), 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-mystic-dark border-l border-mystic-purple h-full shadow-2xl transform transition-transform duration-300 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {selectedRecord ? (
          // --- Detail View ---
          <div className="flex flex-col h-full animate-fade-in">
             <div className="p-4 border-b border-white/10 flex items-center justify-between bg-mystic-purple/20 flex-shrink-0">
               <button 
                 onClick={() => setSelectedRecord(null)}
                 className="flex items-center text-mystic-gold hover:text-white transition-colors text-sm font-bold"
               >
                 <span className="mr-2 text-lg">←</span> 返回列表
               </button>
               <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
               <div className="text-xs text-gray-400 mb-2 font-mono">
                 {new Date(selectedRecord.date).toLocaleString()}
               </div>
               <h2 className="text-2xl font-serif text-white mb-6 font-bold leading-tight border-b border-white/10 pb-4">
                 {selectedRecord.topic || '無題'}
               </h2>
               
               {/* Cards Mini Grid */}
               <div className="grid grid-cols-3 gap-3 mb-8">
                 {selectedRecord.cards.map((card) => (
                   <div key={card.id} className="flex flex-col items-center group">
                     <div className="text-[10px] text-mystic-gold mb-1 uppercase tracking-wider font-bold">{card.position}</div>
                     <div className={`
                       relative w-full aspect-[2/3] rounded-lg overflow-hidden border border-white/20 shadow-lg 
                       transition-transform duration-300 group-hover:scale-105
                       ${card.isReversed ? 'rotate-180' : ''}
                     `}>
                       <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                     </div>
                     <div className="mt-2 text-xs text-gray-200 text-center font-bold">{card.name}</div>
                     <div className={`text-[10px] ${card.isReversed ? 'text-red-300' : 'text-green-300'}`}>
                       {card.isReversed ? '逆位' : '正位'}
                     </div>
                   </div>
                 ))}
               </div>
               
               <div className="prose prose-invert prose-sm max-w-none text-gray-200 leading-relaxed whitespace-pre-line bg-white/5 p-4 rounded-xl border border-white/5">
                 {selectedRecord.interpretation}
               </div>
             </div>
          </div>
        ) : (
          // --- List View ---
          <div className="flex flex-col h-full animate-fade-in">
            <div className="p-6 border-b border-white/10 flex justify-between items-center flex-shrink-0 bg-mystic-dark">
              <h2 className="text-xl font-serif text-mystic-gold">🔮 占卜紀錄</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <span className="text-4xl opacity-30">📜</span>
                  <p>尚無紀錄，請先進行一次占卜。</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((record) => (
                    <div 
                      key={record.id} 
                      onClick={() => setSelectedRecord(record)}
                      className="bg-mystic-light p-4 rounded-lg border border-mystic-purple hover:border-mystic-gold hover:bg-mystic-purple/40 transition-all cursor-pointer group shadow-lg"
                    >
                      <div className="flex justify-between text-xs text-gray-400 mb-2 font-mono">
                        <span>{new Date(record.date).toLocaleDateString()}</span>
                        <span className="text-mystic-gold opacity-0 group-hover:opacity-100 transition-opacity">查看完整內容 →</span>
                      </div>
                      <h3 className="text-white font-bold mb-3 truncate text-lg">{record.topic || '無題'}</h3>
                      <div className="flex space-x-2 mb-3">
                         {record.cards.map(c => (
                           <div key={c.id} className="text-xs px-2 py-1 bg-black/30 rounded text-gray-300 border border-white/5">
                             {c.name} {c.isReversed ? '(逆)' : ''}
                           </div>
                         ))}
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2 italic leading-relaxed">
                        {record.interpretation}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};