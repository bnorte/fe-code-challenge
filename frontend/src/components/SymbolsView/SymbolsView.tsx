import { useState } from 'react';

import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import './symbolsView.css';

const SymbolsView = () => {
  const [activeSymbol, setActiveSymbol] = useState<null | string>(null);
  const handleSymbolClick = (symbolId: string) => {
    setActiveSymbol((s) => (s === symbolId ? null : symbolId));
  };

  return (
    <div>
      <DesktopInfo />
      <div className="symbolsView__content">
        <div className="symbolsView__content__cards">
          <SymbolsGrid activeSymbol={activeSymbol} onSymbolClick={handleSymbolClick} />
        </div>
        <div className="symbolsView__content__chart">
          <h3>PRICE HISTORY</h3>
          <PriceChart symbolId={activeSymbol} />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;
