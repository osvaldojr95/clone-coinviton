import Header from "../Header/header"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Contexts/Auth"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function ConfirmPage(){
    const {arrCart, name, email, cep, dataNascimento, serHeaderDisabled, setFin} = useContext(AuthContext)
    const navigate = useNavigate()
    const [newCep, setNewCep] = useState("")
    
    let newPrice = 0
    let newArrCart = arrCart.map((obj)=> newPrice += obj.price * obj.qtd)

    useEffect(()=>{
        let promisse = axios.get(`https://viacep.com.br/ws/${Number(cep)}/json/`)
        promisse.then((resp)=> setNewCep(resp.data))
        promisse.catch((error)=> console.log(error))
    },[])
    
    function Back(){
        setFin(false)
        navigate("/")
        serHeaderDisabled(false)
    }

    return(
        <>
            <Header/>
            <ConfirmPageContainer>
                <div className="items">
                    {arrCart.map((obj)=>
                        <div className="item">
                            <img src={obj.img} />
                            <div>
                                <p>{obj.item}</p>
                                <p>R${obj.price * obj.qtd}</p>
                                <p className="qtd">Quantidade: {obj.qtd}</p>
                            </div>
                        </div>
                    )}
                    </div>
                    <div className="infoUser">
                        <div>
                        <p>{name}</p>
                        <p>{dataNascimento}</p>
                        <p>{email}</p>
                        <p>{cep}, {newCep.localidade}, {newCep.uf}</p>
                        </div>
                        <div className="total">
                            <p>Total: R$ {newPrice}</p>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="Finalizar" onClick={()=> navigate("/ThanksPage")}>Confirmar Pedido</button>
                        <div className="back" onClick={()=> Back()}>Comprar mais</div>
                    </div>
                </ConfirmPageContainer>
        </>
    )
}

const ConfirmPageContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-top: 110px;
p{
    font-size: 20px;
        font-family: 'Comfortaa';
        margin-bottom: 20px;
        margin-top: 20px;
}
.items{
    width: 70%;
}
.item{
    display: flex;
    margin-bottom: 20px;
    box-shadow: 2px 2px 10px -1px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 100%;
    img{
        width: 150px;
        border-radius: 10px;
    }
    div{
        margin-left: 10px;
    }
    .qtd{
        margin-top: 80px;
    }
}
.Finalizar {
	box-shadow: 0px 10px 14px -7px #276873;
    background: rgb(47,19,53);
    background: linear-gradient(90deg, rgba(47,19,53,1) 0%, rgba(98,14,93,1) 37%, rgba(157,0,122,1) 100%);
	border-radius:8px;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
    font-family: 'comfortaa';
	font-size:20px;
	font-weight:bold;
	padding:13px 32px;
	text-decoration:none;
	text-shadow:0px 1px 0px #3d768a;
    margin-top: 30px;
}
.Finalizar:hover {
    background: linear-gradient(90deg, rgba(47,19,53,1) 0%, rgba(98,14,93,1) 37%, rgba(157,0,122,1) 100%);
	border-radius:8px;
}
.Finalizar:active {
	position:relative;
	top:1px;
}
.back{
        font-family: 'comfortaa';
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 20px;
}
.back:hover{
    cursor: pointer;
}
.buttons{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
}
.infoUser{
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 10px -1px rgba(0, 0, 0, 0.5);
    width: 400px;
    border-radius: 10px;
    .total{
        margin-left: 50px;
    }
}
`