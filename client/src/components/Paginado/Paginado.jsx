import "./Paginado.module.css"
import React from "react"

const Paginado = ({numPage, setCurrentPage}) =>{
    let page = []
    for(let i = 1;Math.ceil(numPage) >= i;i++){
        page.push(i)
    }
    
    return(
        <div className="containerPaginado">
            {
                page.map((val)=>{
                    return <div key={val} style={{display: "inline", margin: "10px"}} onClick={()=>setCurrentPage(val)}><button className={"paginado"}>{val}</button></div>
                })
            }
            
        </div>
    ) 
    
    
}

export default Paginado;