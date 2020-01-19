import React, {useRef, useState , useEffect } from "react";
import { API, Storage } from "aws-amplify";
import "./ProductPage.css";
import LoaderButton from "../components/LoaderButton";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { BoxLoading } from 'react-loadingg';

export default function ProductPage(props){
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(true);
      try {
        const product = await loadProduct();
        const { nameProduct, qtdAvailable , price , image } = product;
        if (image) {
          product.imageURL = await Storage.get(image);
        }

        setProduct(product);
        setNameProduct(nameProduct);
        setQtdAvailable(qtdAvailable);
        setPrice(price);
      } catch (e) {
        alert(e);
      }
      setIsLoading(false);
    }

    onLoad();
  }, [props.match.params.idProduct]);
  
   
  async function handleSubmit(event){
    event.preventDefault();   
    /*props.setCarrinho([{
      idProduct: idProduct,
      nameProduct: nameProduct,
      imageURL: product.imageURL,
      qtd: qtd,
      price: price
    }].concat(props.carrinho));*/

    function catchTwin(value){
      return value.idProduct === idProduct;
    }
    var car = [];
    var qtd2 = parseInt(qtd);
    var filtered = props.carrinho.filter(catchTwin);
    if(filtered.length > 0){
      var position = props.carrinho.indexOf(filtered[0]);
      car = props.carrinho;
       qtd2 = parseInt(qtd)+parseInt(filtered[0].qtd);
      car[position] = {
        idProduct: idProduct,
        qtd: qtd2
      }
      props.setCarrinho(car);
      //car = newCar;
    }else{
      car = [{
        idProduct : idProduct,
        qtd : qtd2
      }].concat(props.carrinho);
      props.setCarrinho(car);
    }
    
    
    alert("Adicionado ao Carrinho!");
    const serializedCarrinho = JSON.stringify(car);
    localStorage.setItem('@brinquedo-app/carrinho' , serializedCarrinho );
    props.history.push("/shopcart");
  }
  
  return (
    <div className="Product">
      {isLoading
      ?
      <div><BoxLoading /></div> 
      :
      product && (
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