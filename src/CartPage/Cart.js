import { useContext, useEffect } from "react"
import styled from "styled-components"
import { AuthContext } from "../Contexts/Auth"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

export default function OpeningCart() {
    const { arrCart, setOpenCart, setArrCart, setFin, qtd, fin, email, cep, dataNascimento, name} = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()

    function GetItem(){
        useEffect(()=>{
            let promisse = axios.get(`${process.env.REACT_APP_PRODUCTS_URI}/Cart`)
            promisse.then((resp)=> {
                setArrCart(resp.data)
            })
            promisse.catch((error)=>console.log(error))
        },[])
    }
    GetItem()

    function DeleteItem(idItem) {
        let promisse = axios.delete(`${process.env.REACT_APP_PRODUCTS_URI}/Cart/${idItem}`)
        promisse.then((resp)=>console.log(resp))
        promisse.catch((error)=>console.log(error))
        let newArray = arrCart.filter((item) => item.id !== idItem)
        setArrCart(newArray)
    }

    function FinalizarPedido() {
        if(fin && name && email && cep && dataNascimento){
            navigate("/ConfirmPage")
        }
        setFin(true)
        setOpenCart(false)
    }

    function AddQtd() {
        const body = {
            "qtd": qtd
        }
        const promisseQtd = axios.patch(`${process.env.REACT_APP_PRODUCTS_URI}/Cart/${id}`, body)
        promisseQtd.then((resp) => console.log(resp))
    }  
    AddQtd()

    function SubQtd(quantidade) {
        if (quantidade < 1) {
            return
        }
        const body = {
            "qtd": qtd
        }
        const promisseQtd = axios.patch(`${process.env.REACT_APP_PRODUCTS_URI}/Cart/${id}`, body)
        promisseQtd.then((resp) => console.log(resp))
    }
    SubQtd()

    return (
        <>
            <ContainerCart>
                {arrCart.length !== 0 ? <ul>
                    {arrCart.map((obj) =>
                        <div className="procutc">
                            <img src={obj.img} />
                            <div>
                                <p>{obj.item}</p>
                                <p>R${obj.price * obj.qtd}</p>
                                <div className="containerAdd">
                                    <p>Quantidade: {obj.qtd}</p>
                                </div>
                            </div>
                            <ion-icon name="trash-outline" className="trash" onClick={(() => DeleteItem(obj.id))}></ion-icon>
                        </div>
                    )}
                </ul> : <p className="none">Nenhum produto no carrinho</p>}

                <div className="buttons">
                    {arrCart.length !== 0 ? <button className="Finalizar" onClick={(() => FinalizarPedido())}>Finalizar pedido</button> : ""}
                    <p className="back" onClick={(() => setOpenCart(false))}>Continuar comprando</p>
                </div>
            </ContainerCart>
        </>
    )
}

const ContainerCart = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
width: 60%;
position: fixed;
background-color: white;
right: 0;
top: 0;
border-radius: 100px 0px;
box-shadow: 2px 2px 10px -1px rgba(0, 0, 0, 0.5);
z-index: 10000000;
overflow-y: scroll;

@media (max-width:600px){
    width: 90%;
}
ul{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.procutc{
    margin-top: 50px;
    width: 95%;
    background-color: white;
    display: flex;
    box-shadow: 2px 2px 10px -1px rgba(0, 0, 0, 0.5);
    position: relative;
    border-radius: 100px 0px;
    img{
        height: 150px;
        margin-right: 20px;
    }
    p{
        font-size: 20px;
        font-family: 'Comfortaa';
        margin-bottom: 15px;
        margin-top: 20px;
    }
    ion-icon{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 20px;
    }
    ion-icon:hover{
        cursor: pointer;
    }
}
.buttons{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    .back{
        font-family: 'comfortaa';
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 20px;
    text-decoration: underline;
    }
    .back:hover{
        cursor: pointer;
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
}
.none{
    font-family: 'comfortaa';
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 30px;
}
.buttonsAdd{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
}
.somar {
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
	text-decoration:none;
	text-shadow:0px 1px 0px #3d768a;
    height: 25px;
    font-size: 20px;
    font-family: 'comfortaa';
    width: 30px;
}
.somar:hover {
    background: linear-gradient(90deg, rgba(47,19,53,1) 0%, rgba(98,14,93,1) 37%, rgba(157,0,122,1) 100%);
	border-radius:8px;
}
.somar:active {
	position:relative;
	top:1px;
}
.sub {
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
	text-decoration:none;
	text-shadow:0px 1px 0px #3d768a;
    height: 25px;
    font-size: 20px;
    font-family: 'comfortaa';
    width: 30px;
}
.sub:hover {
    background: linear-gradient(90deg, rgba(47,19,53,1) 0%, rgba(98,14,93,1) 37%, rgba(157,0,122,1) 100%);
	border-radius:8px;
}
.sub:active {
	position:relative;
	top:1px;
}
.containerAdd{
    display: flex;
}
`