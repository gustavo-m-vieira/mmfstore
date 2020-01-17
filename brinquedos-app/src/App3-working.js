import React, { Component,useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "./components/LoaderButton";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";


function HomePage(props) {
  const isAuthenticated = props.isAuthenticated;
  if(isAuthenticated){
    return <Routes appProps={this.state.isAuthenticated} />;
  }
  return (
    <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email} onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.password} onChange={this.handleChange2}
              />
            </FormGroup>
            <LoaderButton
              block
              type="submit"
              bsSize="large"
              isLoading={this.state.isLoading}
              disabled={!this.validateForm()}
            >
              Login
            </LoaderButton>
          </form>
        </div>
  );
}

class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        carrinho: new Set(),
        isAuthenticated : false,
        isconfirmed : false,
        isAuthenticating: true,
        isLoading: false,
        email: "",
        password: ""

      }
      this.onLoad();
    }

    onLoad(){
        Auth.currentSession()
        .then(()=>{
          this.state.isAuthenticated=true;
          this.state.isconfirmed=true;
        })
      .catch(err => {
        if (err !== 'No current user') {
          alert(err);
        }});
  
    
      this.state.isAuthenticating= false;
    }
    handleLogout = () => {
      Auth.signOut();
      this.props.history.push("/");
  
      this.state.isAuthenticated = false;
    }

    validateForm = () => {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }

    setPassword(value){
      this.state.password = value;
    }

    setEmail(value){
      this.state.password = value;
    }

    handleSubmit = () => {
      this.state.IsLoading=true;

      try {
        Auth.signIn(this.state.email, this.state.password);
        this.state.isAuthenticated = true;
        this.state.email = "";
        this.state.password = "";
        this.props.history.push("/");
      } catch (e) {
        alert(e.message);
        this.state.isLoading=false;
      }
    }

    handleChange = (event) => {
      this.setState({email: event.target.value});
    }
    handleChange2 = (event) => {
      this.setState({password: event.target.value});
    }

    render(){

      this.onLoad();
      
      return (
        !this.state.isAuthenticating &&
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
            {this.state.isAuthenticated
              ?
                <>
                  <LinkContainer to="/co">
                    <NavItem>Finalizar</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/product/fa2af4f0-3880-11ea-a41e-2d8d12841741">
                    <NavItem>Produto</NavItem>
                  </LinkContainer>
                  <NavItem>{this.state.carrinho.size}</NavItem>
                  <LinkContainer to="/order/new">
                    <NavItem>Comprar</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/Profile">
                    <NavItem>Meu Perfil</NavItem>
                  </LinkContainer>
                  <NavItem onClick={this.handleLogout}>Sair</NavItem>
                  </>
              : <>
                  <LinkContainer to="/signup">
                    <NavItem>Cadastro</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <NavItem>Entrar</NavItem>
                  </LinkContainer>
                  
                </>
            }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.state.isAuthenticated
        ?    
        <Routes appProps={this.state.isAuthenticated} />
        :
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email} onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.password} onChange={this.handleChange2}
              />
            </FormGroup>
            <LoaderButton
              block
              type="submit"
              bsSize="large"
              isLoading={this.state.isLoading}
              disabled={!this.validateForm()}
            >
              Login
            </LoaderButton>
          </form>
        </div>
      }

    </div>
    )
    }
  }
export default withRouter(App);
