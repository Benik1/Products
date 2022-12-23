import axios from "axios";
import { endpoints } from "../Constants";


const instance = axios.create({
  baseURL: "http://localhost:4001",
  timeout: 10000,
});


const getAllProducts = () => instance.get(endpoints.PRODUCTS);
const postProduct = (data) =>  instance.post(endpoints.PRODUCTS, data);
const deleteProductById = (id) => instance.delete(endpoints.PRODUCT_ID(id));
const updateProductById = (id,data) => instance.put(endpoints.PRODUCT_ID(id),data);


export default {
  postProduct,
  getAllProducts,
  deleteProductById,
  updateProductById,
}