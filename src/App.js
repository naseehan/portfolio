import './App.css';
import SideNav from './components/SideNav';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import NewProjects from './pages/NewProjects'
// google ananytics
import ReactGA from 'react-ga';


function App() {

  const location = useLocation();

  // useEffect(() => {
  //   ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  // }, []);

  // useEffect(() => {
  //   ReactGA.pageview(location.pathname + location.search);
  // }, [location]);

  return (
    <>
      <SideNav />
      <Routes>
        <Route  path='/'  element={<Home />}  />
        <Route path='/about' element={<About />} />
        <Route path='/project' element={<Projects />} />
        <Route path='/service' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/projects' element={<Projects />} />
        {/* <Route path='/new' element={<NewProjects />} /> */}
      </Routes>
      </>
  );
}

export default App;
