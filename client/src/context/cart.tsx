import {createContext, useContext, useState, ReactNode} from 'react';
import {Shoe} from '../types';

interface CartItem extends Shoe {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (shoe: Shoe) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (shoe: Shoe) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === shoe._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === shoe._id ? {...item, quantity: item.quantity + 1} : item,
        );
      }
      return [...prevItems, {...shoe, quantity: 1}];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(prevItems =>
      prevItems.map(item => (item._id === id ? {...item, quantity} : item)),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
