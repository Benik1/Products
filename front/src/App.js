import CreateProduct from "./components/CreateProduct";
import { Provider } from "react-redux";
import {store} from './Store';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CreateProduct />
      </div>
    </Provider>
  );
}

export default App;
