import React, { Component } from "react";

export default class Order extends Component {
    render() {
        return ( 
            <form>
                <h3>Fazer Pedido</h3>

                <div className="form-group">
                    <label>Código do Produto</label>
                    <input type="text" className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Nome do Cliente</label>
                    <input type="text" className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Quantidade de itens</label>
                    <input type="number" min="1" max="8" className="form-control"/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Pedir</button>
                
            </form>
        );
    }
}