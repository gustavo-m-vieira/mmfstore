import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";


function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [carrinho , setCarrinho] = useState(new Set());
  
  async function handleLogout() {
    await Auth.signOut();
    props.history.push("/login");

    userHasAuthenticated(false);
  }

  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  } 
  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Meu Malvado Favorito Store</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav pullRight>
          {isAuthenticated
            ?
              <>
                <LinkContainer to="/co">
                  <NavItem>Finalizar</NavItem>
                </LinkContainer>
                <LinkContainer to="/product/fa2af4f0-3880-11ea-a41e-2d8d12841741">
                  <NavItem>Produto</NavItem>
                </LinkContainer>
                <NavItem>{carrinho.size}</NavItem>
                <LinkContainer to="/order/new">
                  <NavItem>Comprar</NavItem>
                </LinkContainer>
                <LinkContainer to="/Profile">
                  <NavItem>Meu Perfil</NavItem>
                </LinkContainer>
                <NavItem onClick={handleLogout}>Sair</NavItem>
                </>
            : <>
                <LinkContainer to="/signup">
                  <NavItem>Cadastro</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Entrar</NavItem>
                </LinkContainer>
                
              </>
          }
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated, carrinho, setCarrinho }} />
    </div>
  );
}

export default withRouter(App);