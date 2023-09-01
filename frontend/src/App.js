import { BrowserRouter } from "react-router-dom";
import Routing from "./routing";
import CustomTheme from "./theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <CustomTheme>
            <Routing />
          </CustomTheme>
        </BrowserRouter>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;