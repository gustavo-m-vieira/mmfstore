import React, { useState, useEffect } from "react";
import "./Home.css";
import { PageHeader, ListGroup } from "react-bootstrap";
import { Storage , API } from "aws-amplify";
import { BoxLoading } from 'react-loadingg';

export default function Home(props) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const products = await loadProducts();
        setProducts(products);

        for (let index = 0; index < products.length; index++) {
          const element = products[index];
          element.image = await Storage.get(element.image);
        }
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]);
  
  function loadProducts() {
    return API.get("Requests", "/listProducts");
  }

  function loadImages(image){
    return Storage.vault.get(image);
  }
  
  
  
  function renderProductsList(products) {
    return [{}].concat(products).map((product, i) =>
    
      i !== 0 ?
      (
        <>
        <div class="col-sm-6 col-md-4">
          <div class="thumbnail">
            <img src={product.image} alt="..."/>
            <div class="caption">
              <h3>{product.nameProduct}</h3>
              <p>R${product.price}</p>
              <p><a href={"/product/".concat(product.idProduct)} class="btn btn-primary" role="button">Comprar</a></p>
            </div>
          </div>
        </div>
        </>
      ) : (
        <div></div>
      )
    );
  }

  function renderProducts() {
    return (
      <>
      <div className="lander">
        <h1>Meu Malvado Favorito Store</h1>
        <p>Compre seus minions com a gente!</p>
      </div>
      <div className="Products">
        <PageHeader>Produtos</PageHeader>
        <div class="row">
        <ListGroup>
          {!isLoading && renderProductsList(products)}
        </ListGroup>
        </div>
      </div>
      </>
    );
  }
  
  

  
  
  
  
  return (
    <div className="Home">
      
    {isLoading 
    ?
      <div><BoxLoading /></div> 
    : 
    renderProducts()}
    
  </div>
  );
}