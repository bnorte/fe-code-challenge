import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import './symbolsGrid.css';

type SymbolsGridProps = {
  activeSymbol: string | null;
  onSymbolClick: (symbolId: string) => void;
};

const SymbolsGrid = ({ activeSymbol, onSymbolClick }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div className="symbolsGrid">
      {stockSymbols.map((id, i) => (
        <SymbolCard
          price={prices[id]}
          onClick={onSymbolClick}
          key={i}
          id={id}
          activeSymbol={activeSymbol}
        />
      ))}
    </div>
  );
};

export default SymbolsGrid;
