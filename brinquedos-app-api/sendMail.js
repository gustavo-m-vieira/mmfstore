import * as sendMailLib from "./libs/ses-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const temp = event.body;
  var params = {
    Destination: {
      ToAddresses: [temp.email]
    },
    Message: {
      Body: {
        Text: {
          Data: "Parabéns " + temp.name + "! Você acaba de Adquirir um ótimo produto.\n Sua compra foi no valor de " + temp.total + " reais."
        }
      },
      Subject: {
        Data: "Confirmação de compra na Meu Malvado Favorito Store"
      }
    },
    Source: "gustavo.vieira@poli.ufrj.br",
    Tags: [
      {
        Name: 'source', /* required */
        Value: 'AWS' /* required */
      },
    ]
  };
  try {
    await sendMailLib.send(params);
    return success(params.Item);
  } catch (e) {
      return failure({ status: false });
  }

}