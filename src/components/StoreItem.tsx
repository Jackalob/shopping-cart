import React from "react";
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utils/format";
import { useShoppingCart } from "../context/ShoppingCartContext";

type IProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: IProps) => {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <Card className="py-3">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "contain" }}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-4">{name}</span>
          <span className="ms-2 fs-6 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <div className="d-flex align-items-center" style={{ height: "84px" }}>
              <Button
                className="w-100"
                style={{ margin: "1.5rem 0", padding: ".5rem 0" }}
                onClick={() => increaseItemQuantity(id)}
              >
                + Add To Cart
              </Button>
            </div>
          ) : (
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseItemQuantity(id)}>-</Button>
                <div>
                  <span className="fs-4">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseItemQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                style={{ minWidth: "150px" }}
                onClick={() => removeItemFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
