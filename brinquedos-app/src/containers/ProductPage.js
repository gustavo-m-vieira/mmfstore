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
    props.history.push("/");
  }
  

  return (
    <div className="product">
      {isLoading
      ?
      <div><BoxLoading /></div> 
      : 
      <div className="product__main">
        <div className="product__Name">
          <p className="product__Name__Name">{product.nameProduct}</p>
        </div>
        <div className="product__main-info">
          <img className="product__image" src={product.imageURL}/>
          <div className="product__info">
            <div className="product__price">
              <p className="product__price__price">R$ {product.price}</p>
            </div>
            <div className="product__qtd">
              <input className="product__qtd__qtd" type="number" value={qtd} onChange={e => setQtd(e.target.value)} />
              <div className="product__button" onClick={(() => handleSubmit())}>Adicionar ao Carrinho</div>
            </div>
          </div>
        </div>
      </div>      
      }
    </div>
  );

}