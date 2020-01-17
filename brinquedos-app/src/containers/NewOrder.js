import React, { /*useRef,*/ useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
//import config from "../config";
import "./NewOrder.css";
import { API } from "aws-amplify";

export default function NewOrder(props) {
  //const file = useRef(null);
  const [productId, setProductId] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("N");
  function validateForm() {
    return productId.length > 0 && amount.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await createOrder({ productId , amount , status});
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createOrder(order) {
    API.post("Requests", "/sendMail", {
      body: order
    });
    return API.post("Requests", "/Requests", {
      body: order
    });
  }

  return (
    <div className="NewOrder">
      <form onSubmit={handleSubmit}>
      <FormGroup controlId="ProductId">
        <ControlLabel>Código do Produto</ControlLabel>
          <FormControl
            value={productId}
            componentClass="input"
            onChange={e => setProductId(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="Amount">
        <ControlLabel>Quantidade</ControlLabel>
          <FormControl
            value={amount}
            componentClass="input"
            type="number"
            min="1"
            onChange={e => setAmount(e.target.value)}
          />
        </FormGroup>
        
        
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Fazer Pedido
        </LoaderButton>
      </form>
    </div>
  );
}