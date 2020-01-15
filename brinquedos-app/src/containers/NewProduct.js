import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewProduct.css";
import { API } from "aws-amplify";

export default function NewProduct(props) {
  const file = useRef(null);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return description.length > 0 && code.length > 0;
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
      await createProduct({ content });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createProduct(note) {
    return API.post("notes", "/notes", {
      body: note
    });
  }

  return (
    <div className="NewProduct">
      <form onSubmit={handleSubmit}>
      <FormGroup controlId="code">
        <ControlLabel>Código</ControlLabel>
          <FormControl
            value={code}
            componentClass="input"
            onChange={e => setCode(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="description">
        <ControlLabel>Descrição</ControlLabel>
          <FormControl
            value={description}
            componentClass="textarea"
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Foto do Produto</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
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