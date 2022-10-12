import { Container, Navbar as NavbarBS, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const x = <div />;

const Navbar = () => {
  return (
    <NavbarBS className="bg-white shadow-sm mb-3">
      <Container>
        <Nav>
          <Nav.Link to="/" as={NavLink} active>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBS>
  );
};

export default Navbar;
