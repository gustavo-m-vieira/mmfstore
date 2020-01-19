import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableNameProducts,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'idProduct' Product id defined at the create process
    Key: {
      idProduct: event.pathParameters.idProduct
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET nameProduct = :nameProduct, qtdAvailable = :qtdAvailable, price = :price, image = :image",
    ExpressionAttributeValues: {
      ":nameProduct": data.nameProduct || null,
      ":qtdAvailable": data.qtdAvailable || null,
      ":price": data.price || null,
      ":image": data.image || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}