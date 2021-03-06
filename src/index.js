import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import Details from "../src/components/Details/details"
import Login from "../src/components/Login/login"
import AdminDashboard from "../src/components/AdminDashboard/dashboard"
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Contact from './components/Contact/Contact';
import ResetPassword from "./components/ResetPassword/reset_password"
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/details" element={<Details />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/reset_password" element={<ResetPassword />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
