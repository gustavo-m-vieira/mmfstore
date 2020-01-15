import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";

export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>Cadastro</h3>

                <div className="form-group">
                    <label>Primeiro Nome</label>
                    <input type="text" className="form-control" placeholder="Primeiro Nome" />
                </div>

                <div className="form-group">
                    <label>Último Nome</label>
                    <input type="text" className="form-control" placeholder="Último Nome" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Entre com o email" />
                </div>

                <div className="form-group">
                    <label>Senha</label>
                    <input type="password" className="form-control" placeholder="Entre com a senha" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Cadastrar</button>
                
            </form>
        );
    }
}

/*
<p className="forgot-password text-right">
                    Já Registrado? <LinkContainer to="login">Entre</LinkContainer>
                </p>
                */