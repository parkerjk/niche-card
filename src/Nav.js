import "./Nav.css";
import { Container, Form, Button, Row, Col, Card, Spinner, Modal, Pagination } from 'react-bootstrap';
import { Navbar, Nav as BootstrapNav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from "./assets/nichelogo.png"

function Nav() {
return (
    <Navbar expand="lg" className="niche-navbar">
        <Container fluid>
            <Navbar.Brand as={Link} to="/main">
                <Row style={{alignItems: 'center'}}>
                    <Col style={{paddingRight: '0'}}>
                        <img src={logo} alt="NicheCard Logo" className="nav-logo"/>
                    </Col>
                    <Col style={{paddingLeft: '0'}}>
                        <h1 className="outfit-niche-header" style={{color: 'white'}}><strong>Niche</strong>Card</h1>
                    </Col>
                </Row>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <BootstrapNav>
                <BootstrapNav.Link as={Link} to="/mycards" className="nav-links" style={{color: 'white'}}>
                    My Cards with NicheAI
                </BootstrapNav.Link>
                <BootstrapNav.Link as={Link} to="/about" className="nav-links" style={{color: 'white'}}>
                    About
                </BootstrapNav.Link>
            </BootstrapNav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);
}

export default Nav;