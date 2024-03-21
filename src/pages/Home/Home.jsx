
import MainNavBar from '../../components/mainNavBar';
import MainSection from '../../components/mainSection';
import ProductsSection from '../../components/productsSection';
import 'bootstrap/dist/css/bootstrap.min.css'
import ReleaseSection from '../../components/releaseSection';
import Footer from '../../components/footer';
import ProductsSectionMobile from '../../components/productsSectionMobile';
import ReleaseSectionMobile from '../../components/releaseSectionMobile'
import AboutSection from '../../components/aboutSection'

export default function Home() {

  
  

  return (
    <div >
      <MainNavBar />
      <MainSection />
      <div className="about"><AboutSection /></div>
      <div className="products"><ProductsSection /> </div>
      <div className="productsMobile" ><ProductsSectionMobile /></div>
      <div className="releaseSection"> <ReleaseSection /></div>
      <div className="releaseMobile"><ReleaseSectionMobile/></div>
      
      <Footer />
    </div>
  );
}