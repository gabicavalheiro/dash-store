import './App.css';
import AboutSection from './components/aboutSection';
import MainNavBar from './components/mainNavBar';
import MainSection from './components/mainSection';
import ProductsSection from './components/productsSection';
import 'bootstrap/dist/css/bootstrap.min.css'
import PromotionSection from './components/promotionSection';
import ReleaseSection from './components/releaseSection';
import BrandSection from './components/brandSection';
import Footer from './components/footer';


function App() {
  return (
    <div >
      <MainNavBar />
      <MainSection/>
      <AboutSection/>
      <ProductsSection/> 
      <PromotionSection/>
      <ReleaseSection/>
      <BrandSection/>
      <Footer/>
    </div>
  );
}

export default App;
