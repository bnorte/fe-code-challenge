import { debounce, DebouncedFunc } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import Loading from '@/components/Loading';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchPriceHistory, selectors } from '@/store/priceHistorySlice';
import { selectActiveSymbol } from '@/store/dashboardOptionsSlice';
import './priceChart.css';

const PriceChart = () => {
  const dispatch = useAppDispatch();
  const debouncedFetchPriceHistoryRef = useRef<DebouncedFunc<(symbol: string) => void> | undefined>(
    undefined
  );

  const activeSymbol = useAppSelector(selectActiveSymbol);

  const debouncedFetchPriceHistory = useCallback(() => {
    debouncedFetchPriceHistoryRef.current = debounce((symbol) => {
      dispatch(fetchPriceHistory(symbol));
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    debouncedFetchPriceHistory();

    if (activeSymbol && debouncedFetchPriceHistoryRef.current) {
      debouncedFetchPriceHistoryRef.current(activeSymbol);
    }

    return () => {
      if (debouncedFetchPriceHistoryRef.current) debouncedFetchPriceHistoryRef.current.cancel();
    };
  }, [activeSymbol, debouncedFetchPriceHistory]);

  const apiState = useAppSelector(selectors.apiState);
  const data = useAppSelector(selectors.selectPriceHistory);
  const symbolInfo = useAppSelector(selectors.selectSymbolInfo);

  if (apiState.loading && activeSymbol !== null)
    return (
      <div className="priceChart">
        <Loading />
      </div>
    );
  if (apiState.error) return <div className="priceChart">Failed to get price history!</div>;
  if (!activeSymbol) return <div className="priceChart">Select stock</div>;

  return (
    <div className="priceChart">
      <div>{symbolInfo}</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.map((e) => ({ ...e, time: new Date(e.time).toLocaleTimeString() }))}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          <XAxis dataKey="time" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
