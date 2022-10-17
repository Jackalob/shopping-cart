import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utils/format";

type IProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: IProps) => {
  const { removeItemFromCart } = useShoppingCart();
  const item = storeItems.find((storeItem) => storeItem.id === id);

  if (!item) return null;
  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "100px", objectFit: "contain" }}
      />
      <div className="me-auto">
        <div>
          <span style={{ fontSize: "1.25rem" }}>{item.name}</span>{" "}
          <span className="text-muted" style={{ fontSize: ".9rem" }}>
            {"x" + quantity}
          </span>
        </div>
        <div className="text-muted" style={{ fontSize: ".9rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <span>{formatCurrency(item.price * quantity)}</span>
      <Button
        variant="outline-danger"
        onClick={() => removeItemFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
