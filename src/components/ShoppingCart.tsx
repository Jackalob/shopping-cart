import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/format";
import CartItem from "./CartItem";
import storeItems from "../data/items.json";

type IProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: IProps) => {
  const { cartItems, closeCart } = useShoppingCart();
  const totalPrice = cartItems.reduce((total, carItem) => {
    const item = storeItems.find((storeItem) => storeItem.id === carItem.id);
    return total + (item?.price ?? 0) * carItem.quantity;
  }, 0);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>Cart</Offcanvas.Header>
      <Offcanvas.Body>
        <Stack className="h-100">
          <Stack gap={5} className="h-100 overflow-auto mb-3">
            {cartItems.map((carItem) => (
              <CartItem key={carItem.id} {...carItem} />
            ))}
          </Stack>
          <div className="ms-auto fw-bold fs-4">
            Total {formatCurrency(totalPrice)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
