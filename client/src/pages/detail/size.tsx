import {FC, useState} from 'react';
import {numbers} from '../../utils/constants';

interface Props {
  sizes: string;
}

const Size: FC<Props> = ({sizes}) => {
  const [selected, setSelected] = useState<string>('');

  const toggle = (num: string) => {
    setSelected(selected === num ? '' : num);
  };

  return (
    <div>
      <h2 className="font-semibold mb-4">Select Size</h2>

      <div className="grid grid-cols-5 gap-4">
        {numbers.map(num => {
          // is the displayed number in stock?
          const inStock = sizes.split(',').includes(num);

          // is the displayed number selected?
          const isSelected = selected === num;

          return (
            <button
              onClick={() => toggle(num)}
              disabled={!inStock}
              className={`py-2 px-4 lg:px-0 rounded-md cursor-pointer transition hover:bg-zinc-400 disabled:bg-[#d2d1d3] disabled:text-[#8f8c91] ${
                isSelected ? 'bg-black text-white' : 'bg-white'
              }`}>
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Size;
