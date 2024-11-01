import classNames from 'classnames';
import { useMemo } from 'react';

import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import UpArrowImg from '@/assets/up.png';
import DownArrowImg from '@/assets/down.png';
import ListItem from '@/components/ListItem';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectActiveSymbol, updateActiveSymbol } from '@/store/dashboardOptionsSlice';
import { formatMoney } from '@/utils/formatters';

type SymbolCardProps = {
  id: string;
  price: number;
};

const SymbolCard = ({ id, price }: SymbolCardProps) => {
  const dispatch = useAppDispatch();

  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const activeSymbol = useAppSelector(selectActiveSymbol);

  const handleOnClick = () => {
    dispatch(updateActiveSymbol(activeSymbol === id ? null : id));
  };

  const trendIcon = useMemo(() => {
    if (trend === 'UP') return UpArrowImg;
    if (trend === 'DOWN') return DownArrowImg;
  }, [trend]);

  return (
    <div
      onClick={handleOnClick}
      className={classNames('symbolCard', {
        symbolCard__selected: id === activeSymbol,
        symbolCard__notSelected: activeSymbol && id !== activeSymbol
      })}
    >
      <div className="symbolCard__header">
        {id}
        {trendIcon && <img src={trendIcon} alt="Trend arrow" />}
      </div>
      <div className="symbolCard__details">
        <div className="symbolCard__details__price">
          <div>PRICE:</div>
          <div className="symbolCard__details__price__value">{price || '--'} </div>
        </div>
        <ListItem Icon={<CompanyIcon />} label={companyName} />
        <ListItem Icon={<IndustryIcon />} label={industry} />
        <ListItem Icon={<MarketCapIcon />} label={`$${formatMoney(marketCap)}`} />
      </div>
    </div>
  );
};
export default SymbolCard;
