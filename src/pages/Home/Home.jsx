
import MainNavBar from '../../components/mainNavBar';
import MainSection from '../../components/mainSection';
import ProductsSection from '../../components/productsSection';
import 'bootstrap/dist/css/bootstrap.min.css'
import PromotionSection from '../../components/promotionSection';
import ReleaseSection from '../../components/releaseSection';
import BrandSection from '../../components/brandSection';
import Footer from '../../components/footer';
import ProductsSectionMobile from '../../components/productsSectionMobile';
import ReleaseSectionMobile from '../../components/releaseSectionMobile'

export default function Home() {

  
  

  return (
    <div >
      <MainNavBar />
      <MainSection />
      <div className="products"><ProductsSection /> </div>
      <div className="productsMobile" ><ProductsSectionMobile /></div>
      <PromotionSection />
      <div className="releaseSection"> <ReleaseSection /></div>
      <div className="releaseMobile"><ReleaseSectionMobile/></div>
      <div className="brand"><BrandSection /></div>
      
      <Footer />
    </div>
  );
}