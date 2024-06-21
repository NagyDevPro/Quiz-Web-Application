import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import HomePage from './Student/HomePage';
import NotFound from './Template/NotFound';
import IndexPage from './Template/IndexPage';
import AboutUs from './Template/AboutUs';
import ContactUs from './Template/ContactUs';
import Login from './Auth/Login';
import Register from './Auth/Register';
import UnAutheriazed from './Template/UnAutheriazed';


function App() {
  //general routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<IndexPage />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
