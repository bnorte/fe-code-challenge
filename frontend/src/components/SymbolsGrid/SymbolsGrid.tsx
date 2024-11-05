import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import './symbolsGrid.css';

const SymbolsGrid = () => {
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
          price={prices[id]?.price}
          previousPrice={prices[id]?.previousPrice}
          key={i}
          id={id}
        />
      ))}
    </div>
  );
};

export default SymbolsGrid;
