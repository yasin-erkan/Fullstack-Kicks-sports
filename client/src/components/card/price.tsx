import {FC} from 'react';
import {Shoe} from '../../types';

interface Props {
  item: Shoe;
  designs?: string;
}

const Price: FC<Props> = ({item, designs}) => {
  // Fiyatı daha gerçekçi bir aralığa getir (89-299 arası)
  const realPrice = Math.max(89, Math.min(299, Math.floor(item.price / 3)));

  return <span className={designs}>${realPrice.toFixed(2)}</span>;
};

export default Price;
