import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import './symbolsView.css';

const SymbolsView = () => {
  return (
    <div>
      <DesktopInfo />
      <div className="symbolsView__content">
        <div className="symbolsView__content__cards">
          <SymbolsGrid />
        </div>
        <div className="symbolsView__content__chart">
          <h3>PRICE HISTORY</h3>
          <PriceChart />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;
