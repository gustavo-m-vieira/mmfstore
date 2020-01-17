import "./confirmOrder.css";
import React, {useState , useEffect } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { getDefaultNormalizer } from "@testing-library/react";
import { API, Storage } from "aws-amplify";

export default function ConfirmOrder(props){
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
       onLoad();
    }, []);
    
    async function onLoad(){
        if(props.isAuthenticated == false){
            props.history.push("/login");
        }
    }

    async function handleSubmit(event){
        event.preventDefault();
        
    }
    async function remova(idProduct){

    }
    async function handleSubmitProduct(event){
        alert(event);
        
    }
    function funcproducts(){
        let row = []
        for(let element in props.carrinho){
            var idProduct , nameProduct, imageURL, price , qtd;
            nameProduct = element.nameProduct;
            idProduct = element.idProduct;
            price = element.price;
            qtd = element.qtd;
            imageURL = element.imageURL;
            row.push(
                <>
                <form onSubmit={handleSubmit}>
                    <div class="productName">{nameProduct}</div>
                    <br/><br/>
                    <div class="product">
                        <img className="productImage"  src={imageURL} alt={nameProduct} />
                
                        <div class="info">
                        <h1 class="price">R$ {price}</h1>
                        <div class="qtdPrice">
                            <FormGroup controlId="qtd" bsSize="large">
                            <FormControl className="qtd" type="number" value={qtd} min="1"/>
                            </FormGroup>
                            <LoaderButton
                            block
                            className="buy"
                            type="submit"
                            bsSize="large"
                            bsStyle="primary"
                            isLoading={isLoading}
                            onClick={remova(idProduct)}
                            >
                            Remover
                            </LoaderButton>
                        </div>
                        </div>
                    </div>
                </form>
                </>
            );
        }
        return row;
    }
    /*const products = props.carrinho.map((element) => {
        var idProduct , nameProduct, imageURL, price , qtd;
        nameProduct = element.nameProduct;
        idProduct = element.idProduct;
        price = element.price;
        qtd = element.qtd;
        imageURL = element.imageURL;
        
        return (
            <>
            <form onSubmit={handleSubmit}>
                <div class="productName">{nameProduct}</div>
                <br/><br/>
                <div class="product">
                    <img className="productImage"  src={imageURL} alt={nameProduct} />
            
                    <div class="info">
                    <h1 class="price">R$ {price}</h1>
                    <div class="qtdPrice">
                        <FormGroup controlId="qtd" bsSize="large">
                        <FormControl className="qtd" type="number" value={qtd} min="1"/>
                        </FormGroup>
                        <LoaderButton
                        block
                        className="buy"
                        type="submit"
                        bsSize="large"
                        bsStyle="primary"
                        isLoading={isLoading}
                        onClick={remova(idProduct)}
                        >
                        Remover
                        </LoaderButton>
                    </div>
                    </div>
                </div>
            </form>
            </>
        );
    });*/


    return (
       
        <form onSubmit={handleSubmit}>
            <>
            {funcproducts()}
            </> 
            <input class="comprar" type="submit" value="Finalizar Compra"/>
        </form>
        
    );
}