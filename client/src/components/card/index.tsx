import {FC} from 'react';
import {Shoe} from '../../types';
import Price from './price';
import {Link} from 'react-router-dom';
import {useCart} from '../../context/cart';

interface Props {
  shoe: Shoe;
}

const Card: FC<Props> = ({shoe}) => {
  const {addToCart} = useCart();

  const handleAddToCart = () => {
    addToCart(shoe);
  };

  return (
    <div className="group bg-white rounded-2xl p-4 transition-all duration-300 hover:shadow-lg">
      <Link to={`/shoe/${shoe._id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#F8F9FA] mb-4">
          <img
            src={`${import.meta.env.BASE_URL}${shoe.picture[0]}`}
            alt={shoe.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {shoe.isNew && (
              <div className="bg-[#4263EB] text-white text-xs font-medium px-3 py-1.5 rounded-md">
                New
              </div>
            )}
            {shoe.discount > 0 && (
              <div className="bg-[#FF6B6B] text-white text-xs font-medium px-3 py-1.5 rounded-md">
                {shoe.discount}% OFF
              </div>
            )}
          </div>
          {/* Price */}
          <div className="absolute top-3 right-3 bg-white shadow-sm text-sm font-medium px-3 py-1.5 rounded-md">
            <Price item={shoe} designs="text-gray-900" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-medium text-gray-900 text-lg line-clamp-1">
            {shoe.name}
          </h2>

          <div className="flex gap-2">
            <button
              onClick={e => {
                e.preventDefault();
                handleAddToCart();
              }}
              className="flex-1 bg-black text-white text-sm font-medium h-11 rounded-lg transition hover:bg-gray-900">
              Add to Cart
            </button>
            <Link
              to={`/shoe/${shoe._id}`}
              className="bg-gray-100 text-gray-600 h-11 px-4 rounded-lg inline-flex items-center justify-center transition hover:bg-gray-200">
              Details
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
