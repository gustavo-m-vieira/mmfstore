import React, { useState , useEffect } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "../components/LoaderButton";
import { API, Storage } from "aws-amplify";

export default function Address(props) {
    const [address , setAddress] = useState("");
    const [cep , setCep] = useState("");
    const [bairro , setBairro] = useState("");
    const [city , setCity] = useState("");
    const [state , setState] = useState("");
    const [finalPrice , setFinalPrice] = useState(0.0);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [products, setProducts] = useState([]);

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
              prod = {
                idProduct: prod.idProduct,
                price: prod.price,
                nameProduct: prod.nameProduct,
                qtd: element.qtd
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
      }, [props.isAuthenticated]);

      function loadProduct(idProduct) {
        return API.get("Requests", `/getProduct/${idProduct}`);
      }

    function validateForm(){
        if(props.carrinho.length > 0 && 
            address.length > 0 && 
            bairro.length > 0 && 
            cep.length > 0 && 
            city.length > 0 && 
            state.length > 0
            ){
          return true;
        }
        return false;
      }
    
      async function handleSubmit(event) {
        event.preventDefault();
      
        setIsUpdating(true);
      
        try {
          const array = products;
          var email = localStorage.getItem('@brinquedo-app/email');
          // const serializedName = localStorage.getItem('@brinquedo-app/name');
          // var name = JSON.parse(serializedName);
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            var productId = element.idProduct;
            var amount = element.qtd;
            var status = "solicitado";
            await createOrder({ productId , amount , status});
          }
          //alert(name);
          var logoImage = await Storage.get("logo.png");
          const total = finalPrice;
          const templ = {
            Address: address,
            Cep: cep,
            Bairro: bairro,
            City: city,
            State: state,
            logoImage: logoImage
          }
          await sendMail({ templ , email , total});
          localStorage.removeItem('@brinquedo-app/carrinho');
          props.setCarrinho([]);
          alert("Pedido Realizado!");
          props.history.push("/");
        } catch (e) {
          alert(e);
          setIsUpdating(false);
        }
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

    return (
        <>
        <h1>Antes de solicitar, informe:</h1> 
        <br/>
        <br/>
        <h3>Endereço de Cobrança e Entrega</h3>
        <br/>
        <form onSubmit={handleSubmit}>
        <div>
            <div class="form-group  col-md-8">
                <label for="inputAddress2">Endereço</label>
                <input type="text" class="form-control" id="inputAddress2" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <div class="form-group  col-md-4">
                <label for="inputAddress2">CEP</label>
                <input type="text" class="form-control" id="inputCep" value={cep} onChange={e => setCep(e.target.value)} />
            </div>
            <div class="form-group col-md-4">
                <label for="inputZip">Bairro</label>
                <input type="text" class="form-control" id="inputBairro" value={bairro} onChange={e => setBairro(e.target.value)} />
            </div>
            <div class="form-group col-md-4">
                <label for="inputCity">Cidade</label>
                <input type="text" class="form-control" id="inputCity" value={city} onChange={e => setCity(e.target.value)} />
            </div>
            <div class="form-group col-md-4">
                <label for="inputState">Estado</label>
                <input type="text" class="form-control" id="inputState" value={state} onChange={e => setState(e.target.value)} />
            </div>
            
        </div>
        
        <br/><br/><br/>
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
        <br/>
        <br/>
        <br/><br/>
        </form>
        </>
    )
}