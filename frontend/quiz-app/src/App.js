import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import HomePage from './Student/HomePage';
import NotFound from './Template/NotFound';
import { BrowserRouter } from 'react-router-dom';
import IndexPage from './Template/IndexPage';


function App() {
  //general routes
  const router = createBrowserRouter(createRoutesFromElements(
    <>
     <Route path="/" element={<IndexPage/>}>
       <Route index element={<HomePage/>}/>
       <Route path="*" element={<NotFound/>}/>

     </Route>
    </>

  ))
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
