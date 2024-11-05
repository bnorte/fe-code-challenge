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
import {
  selectActiveSymbol,
  selectShowCardInfo,
  updateActiveSymbol
} from '@/store/dashboardOptionsSlice';
import { formatMoney } from '@/utils/formatters';

type SymbolCardProps = {
  id: string;
  price: number;
  previousPrice: number;
};

const SymbolCard = ({ id, price, previousPrice }: SymbolCardProps) => {
  const dispatch = useAppDispatch();

  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const activeSymbol = useAppSelector(selectActiveSymbol);
  const showCardInfo = useAppSelector(selectShowCardInfo);

  const handleOnClick = () => {
    dispatch(updateActiveSymbol(activeSymbol === id ? null : id));
  };

  const trendIcon = useMemo(() => {
    if (trend === 'UP') return UpArrowImg;
    if (trend === 'DOWN') return DownArrowImg;
  }, [trend]);

  const formattedPrice = useMemo(() => {
    const roundedToUnitsPrice = Number(price?.toFixed(0));

    if (roundedToUnitsPrice >= 10) {
      return roundedToUnitsPrice;
    } else {
      return price?.toFixed(1);
    }
  }, [price]);

  const isBigPriceVariation = useMemo(() => {
    return previousPrice && Math.abs((price - previousPrice) / previousPrice) >= 0.25;
  }, [price, previousPrice]);

  const symbolCardClasses = useMemo(() => {
    return classNames('symbolCard', {
      symbolCard__selected: id === activeSymbol,
      symbolCard__notSelected: activeSymbol && id !== activeSymbol,
      symbolCard__priceIncrease: previousPrice && price > previousPrice,
      symbolCard__priceDecrease: previousPrice && price < previousPrice,
      symbolCard__shakePriceIncrease: price > previousPrice && isBigPriceVariation,
      symbolCard__shakePriceDecrease: price < previousPrice && isBigPriceVariation
    });
  }, [activeSymbol, price, previousPrice]);

  return (
    <div onClick={handleOnClick} className={symbolCardClasses}>
      <div className="symbolCard__header">
        {id}
        {trendIcon && <img src={trendIcon} alt="Trend arrow" />}
      </div>
      <div className="symbolCard__details">
        <div className="symbolCard__details__price">
          <div>PRICE:</div>
          <div className="symbolCard__details__price__value">
            {price ? `$${formattedPrice}` : '-'}{' '}
          </div>
        </div>
        {showCardInfo && (
          <>
            <ListItem Icon={<CompanyIcon />} label={companyName} />
            <ListItem Icon={<IndustryIcon />} label={industry} />
            <ListItem Icon={<MarketCapIcon />} label={`$${formatMoney(marketCap)}`} />
          </>
        )}
      </div>
    </div>
  );
};
export default SymbolCard;
