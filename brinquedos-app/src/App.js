import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";


function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [carrinho , setCarrinho] = useState([]);
  const [conjProd , setConjProd] = useState([]);
  
  async function handleLogout() {
    await Auth.signOut();
    props.history.push("/login");

    userHasAuthenticated(false);
  }

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  
  const setCarStorage = () => {
    
      const serializedCarrinho = localStorage.getItem('@brinquedo-app/carrinho');
      if(serializedCarrinho == null){
        setCarrinho(Array(0));
      }else{
        setCarrinho(JSON.parse(serializedCarrinho));
      }
      
  }


  function setCarrinhoLocalStorage(){
    
      const serializedCarrinho = localStorage.getItem('@brinquedo-app/carrinho');
      if(serializedCarrinho == null){
        setCarrinho(Array(0));
      }else{
        setCarrinho(JSON.parse(serializedCarrinho));
      }
      
  }

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
    setCarrinhoLocalStorage();
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
                <LinkContainer to="/shopcart">
                  <NavItem><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"> Carrinho</span></NavItem>
                </LinkContainer>
                <NavItem>{carrinho.length}</NavItem>
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
      <Routes appProps={{ setCarStorage , isAuthenticated, userHasAuthenticated, carrinho, setCarrinho , conjProd , setConjProd }} />
    </div>
  );
}

export default withRouter(App);