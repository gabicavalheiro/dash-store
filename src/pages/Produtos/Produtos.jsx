import Catalogo from "./Catalogo";
import NavBar from "./NavBarProd";
import Pro from "./pro";
import './Produtos.css'

export default function Produtos(){
    return(
        <>
        <div className="produtos">
            <NavBar />
        <div className="promocao"><Pro /></div> 
        <div className="catalogo"><Catalogo/></div>
        
        </div>   
        </>
    )
}