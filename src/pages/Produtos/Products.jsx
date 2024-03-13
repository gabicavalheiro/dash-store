import Catalog from "./catalogSection";
import NavBar from "./NavBarProd";
import Pro from "./pro";
import './Produtos.css'

export default function Produtos(){
    return(
        <>
        <div className="produtos">
            <NavBar />
        <div className="promocao"><Pro /></div> 
        <div className="catalog"><Catalog/></div>
        
        </div>   
        </>
    )
}