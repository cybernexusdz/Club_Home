<<<<<<< Updated upstream
import Footer from "./component/Footer";
import Header from "./component/Header";
import HeroSection from "./component/hero-section/HeroSection";
import BlogSection from "./component/blog-section/BlogSection";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-navyDark to-purpleDeep">
      <Header />
      {/* Hna Les Components Guys */}
      <HeroSection />
      <BlogSection languageCode="en" />
      <Footer />
    </div>
=======
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShipGame from "./pages/ShipGame";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shipgame" element={<ShipGame />} />
    </Routes>
>>>>>>> Stashed changes
  );
}

export default App;
/*<Routes>
      <Route path="/" element={<h1>bdina</h1>}/>
      <Route path="/b" element={<h1>bdina2</h1>}/>
    </Routes>
    */
/* <div className='flex-auto  backdrop-filter backdrop-blur-lg bg-opacity-0 bg-clip-padding'>
         Welcome To Ha-Softwares 
         you have a business , you are entreprenor ,you need website 
       </div>
<h1 className="text-3xl font-bold text-textPrimary">
          Welcome to Cyber Nexus 🚀
        </h1>
       */
