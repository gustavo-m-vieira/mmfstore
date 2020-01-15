export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "meumalvadofavoritostore"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: " https://0w1drba3d5.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_swuqGBEey",
    APP_CLIENT_ID: "4kttii17812mhbhr1p53q6utc8",
    IDENTITY_POOL_ID: "us-east-1:277b92a7-ce77-46f2-8d9a-80597a377004"
  }
};