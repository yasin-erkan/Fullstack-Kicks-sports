import {FC} from 'react';
import {useParams} from 'react-router-dom';
import useShoes from '../../hooks/useShoes';
import {useCart} from '../../context/cart';
import Images from './images';

const Detail: FC = () => {
  const {id} = useParams();
  const {shoes} = useShoes();
  const {data, isLoading} = shoes();
  const {addToCart} = useCart();
  const shoe = data?.find(s => s._id === id);

  if (isLoading) return <div>Loading...</div>;
  if (!shoe) return <div>Shoe not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          {/* Left - Image Gallery */}
          <div className="bg-[#F8F9FA] rounded-xl p-4">
            <Images pictures={shoe.picture} />
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="mb-6">
              {shoe.isNew && (
                <span className="inline-block bg-[#4263EB] text-white text-sm font-medium px-3 py-1 rounded-md mb-3">
                  New
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {shoe.name}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#4263EB]">
                  ${shoe.price.toFixed(2)}
                </span>
                {shoe.discount > 0 && (
                  <span className="bg-[#FF6B6B] text-white text-sm font-medium px-2 py-1 rounded">
                    {shoe.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Select Color
              </h3>
              <div className="flex gap-3">
                <button className="w-8 h-8 rounded-full bg-black ring-2 ring-offset-2 ring-[#4263EB]"></button>
                <button className="w-8 h-8 rounded-full bg-[#FF6B6B]"></button>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Select Size
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {[38, 39, 40, 41, 42, 43, 44, 45, 46, 47].map(size => (
                  <button
                    key={size}
                    className="h-11 rounded-lg border border-gray-200 font-medium text-gray-800 hover:border-[#4263EB] hover:text-[#4263EB] transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(shoe)}
              className="w-full bg-black text-white font-medium h-12 rounded-lg hover:bg-gray-900 transition-colors">
              Add to Cart
            </button>

            {/* Product Info */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                About this product
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>• {shoe.name}</p>
                {shoe.discount > 0 && <p>• Excluded from special discounts.</p>}
                <p>
                  • Pay in interest-free installments with Affirm, Klarna, or
                  Afterpay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
