import Catalog from "./catalogSection";
import NavBar from "./NavBarProd";
import './Produtos.css'

export default function Produtos(){
    return(
        <>
        <div className="produtos">
            <NavBar />
        <div className="catalog"><Catalog/></div>
        
        </div>   
        </>
    )
}