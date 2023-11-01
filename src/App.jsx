
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './Component/User/User';
import { Provider } from 'react-redux';
import userstore from './Redux/Store';
import { ToastContainer } from 'react-toastify';
import Topbar from "./Component/Topbar/Topbar";

export default function App() {
  return (
    <Provider store={userstore}>
    <BrowserRouter>
      <Topbar/>
      <Routes>
       <Route path='/' element={<Users/>}></Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer position='top-right'></ToastContainer>
    </Provider>
  );
}
