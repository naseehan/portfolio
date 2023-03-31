import './App.css';
import SideNav from './components/SideNav';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <SideNav />
      <Routes>
        <Route  path='/'  element={<Home />}  />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      </>
  );
}

export default App;
