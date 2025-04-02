import {FC} from 'react';
import useShoes from '../../hooks/useShoes';
import Card from '../../components/card';
import {useLocation} from 'react-router-dom';

const List: FC = () => {
  const {shoes} = useShoes();
  const {data, isLoading} = shoes();
  const location = useLocation();
  const category = location.hash.replace('#', ''); // #men or #women

  const filteredShoes = data?.filter(shoe => {
    if (category === 'men') {
      // Rastgele erkek ayakkabıları (id'si çift olanlar diyelim)
      return parseInt(shoe._id.slice(-1)) % 2 === 0;
    }
    if (category === 'women') {
      // Rastgele kadın ayakkabıları (id'si tek olanlar)
      return parseInt(shoe._id.slice(-1)) % 2 === 1;
    }
    return true;
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {filteredShoes?.map(shoe => (
          <div key={shoe._id} className="w-full">
            <Card shoe={shoe} />
          </div>
        ))}
      </div>
      {filteredShoes?.length === 0 && (
        <div className="text-center text-grey-dark mt-10">
          No shoes found in this category
        </div>
      )}
    </div>
  );
};

export default List;
