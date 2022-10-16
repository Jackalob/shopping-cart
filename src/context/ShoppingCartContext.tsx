import { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type CarItems = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItemFromCart: (id: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function ShoppingCartProvider({ children }: Props) {
  const [cartItems, setCartItems] = useState<CarItems[]>([]);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity ?? 0;
  };

  const increaseItemQuantity = (id: number) => {
    const isExisted = cartItems.find((item) => item.id === id);
    setCartItems((currItems) =>
      isExisted
        ? currItems.map((item) => {
            if (item.id === id) return { ...item, quantity: item.quantity + 1 };
            return item;
          })
        : [...currItems, { id, quantity: 1 }]
    );
  };

  const decreaseItemQuantity = (id: number) => {
    const isQuantityEqualTo1 =
      cartItems.find((item) => item.id === id)?.quantity === 1;
    setCartItems((currItems) =>
      isQuantityEqualTo1
        ? currItems.filter((item) => item.id !== id)
        : currItems.map((item) => {
            if (item.id === id) return { ...item, quantity: item.quantity - 1 };
            return item;
          })
    );
  };

  const removeItemFromCart = (id: number) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItemFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error("useShoppingCart must be used within ShoppingCartProvider");
  }
  return context;
}
