import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewProduct.css";
import { Storage , API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";

export default function NewProduct(props) {
  const file = useRef(null);
  const [price, setPrice] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [qtdAvailable, setQtdAvailable] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return nameProduct.length > 0 && price.length > 0 && file.current;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
      const image = file.current
      ? await s3Upload(file.current)
      : null;

      const image2 = await Storage.vault.get(image);
      await createProduct({ nameProduct , qtdAvailable , price , image });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createProduct(product) {
    return API.post("Requests", "/createProduct", {
      body: product
    });
  }

  return (
    <div className="NewProduct">
      <form onSubmit={handleSubmit}>
      <FormGroup controlId="nameProduct">
        <ControlLabel>Nome</ControlLabel>
          <FormControl
            value={nameProduct}
            componentClass="input"
            onChange={e => setNameProduct(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="price">
        <ControlLabel>Preço</ControlLabel>
          <FormControl
            value={price}
            componentClass="input"
            onChange={e => setPrice(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="qtdAvailable">
        <ControlLabel>Quantidade Disponível</ControlLabel>
          <FormControl
            value={qtdAvailable}
            type="number"
            min="0"
            onChange={e => setQtdAvailable(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Foto do Produto</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" required />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Adicionar Produto
        </LoaderButton>
      </form>
    </div>
  );
}