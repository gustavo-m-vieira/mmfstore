import AWS from "aws-sdk";

export async function send(params) {
  const ses = new AWS.SES();

  return ses.sendEmail(params, function(err, data) {
    if(err) {
        throw err;
    }
}).promise();
}