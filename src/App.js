import './App.css';
import SideNav from './components/SideNav';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
// google ananytics
// import ReactGA from 'react-ga';
import NewProjects from './pages/NewProjects';


function App() {

  // const location = useLocation();

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
        <Route path='/projects' element={<NewProjects />} />
        <Route path='/project' element={<Projects />} />
        <Route path='/service' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
        {/* <Route path='/projects' element={<Projects />} /> */}
      </Routes>
      </>
  );
}

export default App;
