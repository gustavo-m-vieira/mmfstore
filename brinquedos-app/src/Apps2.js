import React, { Component,useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";

class App extends Component {

    state = {
        produtos: [

        ],
        precos: []
    }

    render(){
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
                </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <Routes appProps={{ isAuthenticated, userHasAuthenticated, carrinho, setCarrinho }} />
    </div>

    }
    
}