import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

const Heading: FC = () => {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    // Ürün listesine scroll yerine direkt ürünlerin olduğu kısma yönlendirelim
    const productSection = document.getElementById('products');
    if (productSection) {
      productSection.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <div className="flex justify-between items-center my-[24px] md:mt-[36px] lg:mt-[50px] xl:mt-[90px] xl:mb-[32px]">
      <h1 className="font-semibold uppercase leading-[90%] text-[24px] md:text-[36px] lg:text-[60px] xl:text-[74px]">
        Don't miss out on <br /> new products
      </h1>

      <button
        onClick={handleStartShopping}
        className="bg-my-blue text-white py-[8px] px-[12px] lg:py-[12px] lg:px-[28px] rounded-[8px] hover:brightness-90 transition cursor-pointer">
        View All Products
      </button>
    </div>
  );
};

export default Heading;
