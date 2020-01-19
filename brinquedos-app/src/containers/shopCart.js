import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { PageHeader, ListGroup } from "react-bootstrap";
import { BoxLoading } from 'react-loadingg';

export default function ShopCart(props) {
  const file = useRef(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [flag , setFlag] = useState(true);
  const [finalPrice , setFinalPrice] = useState(0.0);
  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        await props.setCarStorage();
        //alert(props.carrinho.length);
        const pp = props.carrinho;
        const tempArray = [];
        //alert(props.carrinho);
        var total = 0.0;
        for (let index = 0; index < pp.length; index++) {
          const element = pp[index];
          var prod = await loadProduct(element.idProduct);
          prod.image = await Storage.get(prod.image);
          
          prod = {
            idProduct: prod.idProduct,
            price: prod.price,
            nameProduct: prod.nameProduct,
            qtd: element.qtd,
            image: prod.image
          }
          total = total + (parseFloat(prod.price)*parseInt(prod.qtd));
          //alert(prod);
          //setProducts([prod].concat(products));
          tempArray.push(prod);
        }
        setFinalPrice(total);
        //alert(tempArray);
        setProducts(tempArray);
        //alert("products:".concat(products.length));
        setIsLoading(false);
      } catch (e) {
        alert(e);
      }
  
      
    }
  
    onLoad();
  }, [props.isAuthenticated , flag]);

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsUpdating(true);
  
    try {
      const array = products;
      var email = localStorage.getItem('@brinquedo-app/email');
      const serializedName = localStorage.getItem('@brinquedo-app/name');
      var name = JSON.parse(serializedName);
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        var productId = element.idProduct;
        var amount = element.qtd;
        var status = "solicitado";
        await createOrder({ productId , amount , status});
      }
      //alert(name);
      const total = finalPrice;
      await sendMail({ name , email , total});
      localStorage.removeItem('@brinquedo-app/carrinho');
      props.setCarrinho([]);
      alert("Pedido Realizado!");
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsUpdating(false);
    }
  }

  async function handleSubmitItem(idProduct){
    
    setIsLoading(true);
    function catchTwin(value){
      return value.idProduct !== idProduct;
    }
    var filtered = props.carrinho.filter(catchTwin);
    props.setCarrinho(filtered);
    const serializedCarrinho = JSON.stringify(filtered);
    localStorage.setItem('@brinquedo-app/carrinho' , serializedCarrinho );
    setIsLoading(false);
    setFlag(!flag);
  }
  
  function createOrder(order) {
    /*API.post("Requests", "/sendMail", {
      body: order
    });*/
    return API.post("Requests", "/Requests", {
      body: order
    });
  }

  function sendMail(order) {
    return API.post("Requests", "/sendMail", {
      body: order
    });
  }


  function validateForm(){
    if(props.carrinho.length > 0){
      return true;
    }
    return false;
  }

  

  function loadProduct(idProduct) {
    return API.get("Requests", `/getProduct/${idProduct}`);
  }

  function renderProductsList(products) {
    //alert(products);
    return [{}].concat(products).map((product, i) =>
      i !== 0 ? (
        <>
        <div key={i} class="col-sm-6 col-md-4">
          <div class="thumbnail">
            <img src={product.image} alt="..."/>
            <div class="caption">
              <h3>{product.nameProduct}</h3>
              <h4>{product.qtd} unidades</h4>
              <p> R$ {product.price} cada</p>
              <h4><strong>Total =</strong> R$ {parseFloat(product.price)*parseInt(product.qtd)}</h4>
              <p><a onClick={() => handleSubmitItem(product.idProduct)} class="btn btn-primary" role="button">Retirar do Carrinho</a></p>
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
      <div className="Products">
        <PageHeader>Seu Carrinho</PageHeader>
        <div class="row">
        <ListGroup>
          {!isLoading && renderProductsList(products)}
        </ListGroup>
        </div>
      </div>
      </>
    );
  }
  function renderLoader(){
    return (
      <>
      <PageHeader>Total</PageHeader>
      <h1>R$ {finalPrice}</h1>
      <br/><br/>
      <LoaderButton
        block
        type="submit"
        bsSize="large"
        isLoading={isUpdating}
        disabled={!validateForm()}
      >
        Solicitar
      </LoaderButton>
      <br/>
      <br/>
      <br/>
      </>
    );
  }
  return (
    <div className="Home">
    <form onSubmit={handleSubmit}> 
    {props.isAuthenticated ? renderProducts() : renderProducts()}
    {isLoading
    ?
    <div><BoxLoading /></div>
    :
      !validateForm() 
      ?
      <div className="NotFound">
        <h3>Carrinho Vazio!</h3>
      </div> 
      : renderLoader()
      
      
    }
    </form> 
  </div>
  );



}