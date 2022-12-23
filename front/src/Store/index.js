import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import service from "../service/index"
import { composeWithDevTools } from 'redux-devtools-extension';
import { display } from "@mui/system";


const initialState = {
  data: [],
};

export const GET_ALL_PRODUCTS = "getAllProduct";
export const ADD_PRODUCT = "addProduct";
export const DELETE_PRODUCT = "deleteProduct";
export const UPDATE_PRODUCT = "updateProduct";


const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, data: action.payload };
    case UPDATE_PRODUCT:
      return { ...state, data: action.payload };
    case ADD_PRODUCT:
      return { ...state, data: [...state.data, action.payload] };
    case DELETE_PRODUCT:
      return { ...state, data: action.payload };
    default:
      return initialState
  }
};


export const getAllProducts = () => {
  return (dispatch) => {
    return service.getAllProducts()
      .then((response) => {
        const products = response?.data || [];
        dispatch({
          type: GET_ALL_PRODUCTS,
          payload: products,
        });
      })
      .catch(() => {
        // :TODO
      })
  };
};

export const addProduct = (data) => {
  return (dispatch) => {
    return service.postProduct(data)
      .then((response) => {
        const { data } = response;
        return dispatch({
          type: ADD_PRODUCT,
          payload: data
        })
      })
  }
}


export const updateProduct = (id, data) => {
  return (dispatch) => {
    return service.updateProductById(id, data)
      .then((response) => {
        const products = response?.data || [];
        dispatch({
          type: UPDATE_PRODUCT,
          payload: products,
        });
      })
  }
}


export const deleteProduct =(id)=> {
  return (dispatch)=> {
    return  service.deleteProductById(id)
    .then((response)=> {
      const products = response?.data || [];
      dispatch({
        type:DELETE_PRODUCT,
        payload:products
      })
    })
  }
}


export const store = createStore(productsReducer, composeWithDevTools(applyMiddleware(thunk)))

