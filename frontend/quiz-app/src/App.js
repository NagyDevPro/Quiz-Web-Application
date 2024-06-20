
import './App.css';
import AboutUs from './Template/AboutUs';
import ContactUs from './Template/ContactUs';
import Footer from './Template/Footer';
import NavBar from './Template/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <AboutUs/>
      {/* <ContactUs/> */}
      <div className='my-5'></div>
      <Footer/>
    </div>
  );
}

export default App;
