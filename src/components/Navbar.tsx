import { Container, Navbar as NavbarBS, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ReactComponent as IonCart } from "../assets/icons/cart-shopping.svg";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
  const { cartQuantity, openCart } = useShoppingCart();
  return (
    <NavbarBS sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>

        <Button
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          variant="outline-primary"
          className="rounded-circle"
          onClick={openCart}
        >
          <IonCart style={{ fill: "currentColor" }} />
          {cartQuantity > 0 && (
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.25rem",
                height: "1.25rem",
                position: "absolute",
                fontSize: '.9rem',
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          )}
        </Button>
      </Container>
    </NavbarBS>
  );
};

export default Navbar;
