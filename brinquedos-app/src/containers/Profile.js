import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";

export default function Profile(props) {

    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
      });


    return (
        <>
            <h1>Informações Pessoais</h1>
            <br/>
        <div className="Profile">
            <form>
                <FormGroup controlId="Name" bsSize="Large">
                    <ControlLabel>Nome: </ControlLabel>
                    <FormControl
                        autoFocus
                        type="txt"
                        value={fields.name}
                        readOnly
                    />
                </FormGroup>
                <FormGroup controlId="cpf" bsSize="Large">
                    <ControlLabel>CPF: </ControlLabel>
                    <FormControl
                        autoFocus
                        type="txt"
                        value={fields.cpf}
                        readOnly
                    />
                </FormGroup>
                <FormGroup controlId="Email" bsSize="Large">
                    <ControlLabel>Email: </ControlLabel>
                    <FormControl
                        autoFocus
                        type="txt"
                        value={fields.email}
                        readOnly
                    />
                </FormGroup>
            </form>
        </div>
        <br/>
        <hr></hr>
        <h3>Endereço de Cobrança e Entrega</h3>
        <br/>
        <form>
        <FormGroup controlId="Adress" bsSize="Large">
            <div class="form-group">
                <label for="inputAddress2">Endereço</label>
                <input type="text" class="form-control" id="inputAddress2" readOnly/>
            </div>
            <div class="form-group col-md-6">
                <label for="inputCity">Cidade</label>
                <input type="text" class="form-control" id="inputCity" readOnly/>
            </div>
            <div class="form-group col-md-4">
                <label for="inputState">Estado</label>
                <input type="text" class="form-control" id="inputState" readOnly/>
            </div>
            <div class="form-group col-md-2">
                <label for="inputZip">CEP</label>
                <input type="text" class="form-control" id="inputZip" readOnly/>
            </div>
        </FormGroup>
        </form>
        <br/>
        <br/>
        <br/><br/>
        <hr></hr>
        <h3>Cartão de Crédito</h3>
        <br/>
        <form>

        </form>
        </>
    )
}