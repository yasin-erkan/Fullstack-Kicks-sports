import {FC} from 'react';

const Hero: FC = () => {
  return (
    <div className="relative mt-6 md:mt-12 xl:mt-20">
      <div className="absolute top-1/2 transform -translate-y-1/2 max-sm:h-full max-sm:flex flex-col justify-end text-white p-4 sm:p-6 md:p-10">
        <p className="text-[15px] sm:text-[17px] lg:text-[21px] xl:text-[24px] xl:font-semibold text-grey">
          Valid for a limited time only
        </p>

        <h1 className="text-[20px] sm:text-[30px] md:text-[40px] lg:text-[60px] xl:text-[74px] text-white font-semibold">
          %30 discount
        </h1>

        <p className="text-[15px] sm:text-[17px] md:text-[19px] xl:text-[21px] text-grey max-w-[80%]">
          Sports shoes designed with your comfort in mind allow you to focus
          fully on your next session.
        </p>
      </div>

      <img src="/banner.png" alt="banner" />
    </div>
  );
};

export default Hero;
