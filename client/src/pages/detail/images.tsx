import {FC, useState} from 'react';

interface Props {
  pictures: string[];
}

const Images: FC<Props> = ({pictures}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[500px] scrollbar-hide">
        {pictures.map((url, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
              selectedImage === index
                ? 'ring-2 ring-[#4263EB]'
                : 'hover:ring-2 hover:ring-gray-200'
            }`}>
            <img
              src={`${import.meta.env.BASE_URL}${url}`}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}${pictures[selectedImage]}`}
            alt="Selected product"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Images;
