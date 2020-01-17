import React, {useRef, useState , useEffect } from "react";
import { API, Storage } from "aws-amplify";
import "./ProductPage.css";
import Minion from '../images/minion1.jpg'
import LoaderButton from "../components/LoaderButton";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default function ProductPage(props){
  const [isLoading, setIsLoading] = useState(false);
  const file = useRef(null);
  const [product, setProduct] = useState(null);
  const [idProduct, setIdProduct] = useState(props.match.params.idProduct);
  const [nameProduct, setNameProduct] = useState("");
  const [qtdAvailable, setQtdAvailable] = useState(0);
  const [price , setPrice] = useState(0.0);
  const [qtd , setQtd] = useState(1);
  
  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }





  useEffect(() => {
    function loadProduct() {
      return API.get("Requests", `/getProduct/${props.match.params.idProduct}`);
    }

    async function onLoad() {
      if(props.isAuthenticated == false){
        props.history.push("/login");
      }
      try {
        const product = await loadProduct();
        const { nameProduct, qtdAvailable , price , image } = product;
        if (image) {
          product.imageURL = await Storage.vault.get(image);
        }

        setProduct(product);
        setNameProduct(nameProduct);
        setQtdAvailable(qtdAvailable);
        setPrice(price);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.idProduct]);
  
   
  async function handleSubmit(event){
    event.preventDefault();   
    props.carrinho = new Set(props.carrinho).add({
      idProduct: idProduct,
      nameProduct: nameProduct,
      imageURL: product.imageURL,
      qtd: qtd,
      price: price
    });
    alert(props.carrinho.size);
  }

  const image = {Minion};
  return (
    <div className="Product">
      {product && (
        <>
        <form onSubmit={handleSubmit}>
          <div class="productName">{nameProduct}</div>
          <br/><br/>
          <div class="product">
            <img className="productImage"  src={product.imageURL} alt={nameProduct} />
    
            <div class="info">
              <h1 class="price">R$ {price}</h1>
              <div class="qtdPrice">
                <FormGroup controlId="qtd" bsSize="large">
                  <FormControl className="qtd" type="number" value={qtd} onChange={e => setQtd(e.target.value)} min="1"/>
                </FormGroup>
                <LoaderButton
                  block
                  className="buy"
                  type="submit"
                  bsSize="large"
                  bsStyle="primary"
                  isLoading={isLoading}
                >
                  Adicionar ao Carrinho
                </LoaderButton>
              </div>
            </div>
          </div>
        </form>
        </>
      )
      }
    </div>
  );

}