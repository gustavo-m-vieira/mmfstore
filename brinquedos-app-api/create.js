import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
      TableName: process.env.tableNameRequests,
        Item: {
        userId: event.requestContext.identity.cognitoIdentityId,
        status: data.status,
        orderId: uuid.v1(),
        productId: data.productId,
        amount: data.amount,
        orderAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({ status: false });
    }
}