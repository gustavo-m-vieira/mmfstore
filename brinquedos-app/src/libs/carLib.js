import { API, Storage } from "aws-amplify";

export default async function getItem(idProduct) {
    function loadProduct() {
        return API.get("Requests", `/getProduct/${idProduct}`);
    }
    
    try {
        const product = await loadProduct();
        const { nameProduct, qtdAvailable , price , image } = product;
        if (image) {
            product.imageURL = await Storage.vault.get(image);
        }

        return {
            nameProduct : nameProduct,
            price : price,
            imageURL : product.imageURL
        };
    } catch (e) {
        alert(e);
        return(e);
    }
}