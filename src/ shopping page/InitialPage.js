import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import Header from "../Header/header"
import Blusas from "./Blusas"
import Calças from "./Calcas"
import Sapatos from "./Sapatos"
import OpeningCart from "../CartPage/Cart"
import { AuthContext } from "../Contexts/Auth"
import Finishing from "../Finally/Finishing"

export default function InitialPage() {
    const[blusas, setBlusas] = useState([])
    const[calcas, setCalcas] = useState([])
    const[sapatos, setSapatos] = useState([])
    const[initialBlusas, setInitialBlusas] = useState([])
    const[initialCalcas, setInitialCalcas] = useState([])
    const[initialSapatos, setInitialSapatos] = useState([])
    const {openCart, fin} = useContext(AuthContext)

    useEffect(()=>{
        const promisse = axios.get(`${process.env.REACT_APP_PRODUCTS_URI}/Blusas`)
        promisse.then((resp)=> {setBlusas(resp.data) 
            setInitialBlusas(resp.data)})
        promisse.catch((error)=> console.log(error))

        const promisseCalc = axios.get(`${process.env.REACT_APP_PRODUCTS_URI}/Calcas`)
        promisseCalc.then((resp)=> 
        {setCalcas(resp.data)
            setInitialCalcas(resp.data)})
        promisseCalc.catch((error)=> console.log(error))

        const promisseSap = axios.get(`${process.env.REACT_APP_PRODUCTS_URI}/Sapatos`)
        promisseSap.then((resp)=> 
        {setSapatos(resp.data)
            setInitialSapatos(resp.data)})
        promisseSap.catch((error)=> console.log(error))    
    },[])

    function Search(value){
        if(value === ""){
            setBlusas(initialBlusas)
            setCalcas(initialCalcas)
            setSapatos(initialSapatos)
            return
        }
            let newArrBLusas = blusas.filter(({item})=> item.toLowerCase().includes(value.toLowerCase()))
            setBlusas(newArrBLusas)
            let newArrCalcas = calcas.filter(({item})=>item.toLowerCase().includes(value.toLowerCase()))
            setCalcas(newArrCalcas)
            let newArrSapatos = sapatos.filter(({item})=>item.toLowerCase().includes(value.toLowerCase()))
            setSapatos(newArrSapatos)
    }

    return (
        <>
        {fin ? <Finishing/> : ""}            
            {openCart?<OpeningCart/>:""}
            <Header />
            <InitialPageContainer>
                <div className="Search">
                    <input placeholder="Pesquisar por item" onChange={((e)=> Search(e.target.value))}></input>
                </div>
                <h1>Blusas</h1>
                <div className="ContainerBlusas">
                {blusas.map((obj)=>
                <Blusas item={obj.item} img={obj.img} category={obj.category} id={obj.id}/>
                )}
                </div>

                <h1>Calças</h1>
                <div className="ContainerCalcas">
                {calcas.map((obj)=><Calças item={obj.item} img={obj.img} category={obj.category} id={obj.id}/>)}
                </div>
                
                <h1>Sapatos</h1>
                <div className="ContainerSapatos">
                    {sapatos.map((obj)=> <Sapatos item={obj.item} img={obj.img} category={obj.category} id={obj.id}/> )}
                </div>
            </InitialPageContainer>
        </>
    )
}

const InitialPageContainer = styled.div`
font-size: 30px;
font-family: 'Comfortaa';
padding-top: 120px;
h1{
    margin-bottom: 20px;
    margin-top: 20px;
    margin-left: 15px;
    color: #620e5d;
}
.ContainerBlusas{
    display: flex;
    overflow-x: scroll;
    color: #620e5d;
}
.ContainerCalcas{
    display: flex;
    overflow-x: scroll;
    color: #620e5d;
}
.ContainerSapatos{
    display: flex;
    overflow-x: scroll;
    color: #620e5d;
}
input {
padding: 7px;
font-size: 20px;
border-width: 2px;
border-color: #620e5d80;
background-color: #ffffff;
color: #620e5d;
border-style: solid;
border-radius: 50px;
box-shadow: 0px 0px 0px rgba(66,66,66,.75);
text-shadow: 0px 0px 0px rgba(66,66,66,.75);
margin-bottom: 10px;
width: 90%;
margin-left: 15px;
}
input:focus {
    outline:none;
}
input::placeholder{
    font-style: italic;
}
`