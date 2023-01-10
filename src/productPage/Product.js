import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import Header from "../Header/header"
import { useContext } from "react"
import { AuthContext } from "../Contexts/Auth"
import OpeningCart from "../CartPage/Cart"
import Finishing from "../Finally/Finishing"


export default function Product() {
    const { category, id } = useParams()
    const { setDetails, setPrice, setQtd, setImg, setTotalObject, setArrCart, details, price, qtd, img, totalObject, arrCart, openCart, setDisabled, fin, setItem, item } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const promisse = axios.get(`${process.env.REACT_APP_PRODUCTS_URI}/${category}/${id}`)
        promisse.then((resp) => {
            setTotalObject(resp.data)
            setDetails(resp.data.details)
            setPrice(resp.data.price)
            setQtd(resp.data.qtd)
            setImg(resp.data.img)
            setItem(resp.data.item)
        })
    }, [qtd])

    function AddQtd() {
        setQtd(qtd + 1)
        const body = {
            "qtd": qtd + 1
        }
        const promisseQtd = axios.patch(`${process.env.REACT_APP_PRODUCTS_URI}/${category}/${id}`, body)
        promisseQtd.then((resp) => console.log(resp))
    }

    function SubQtd() {
        if (qtd < 2) {
            return
        }
        setQtd(qtd - 1)
        const body = {
            "qtd": qtd - 1
        }
        const promisseQtd = axios.patch(`${process.env.REACT_APP_PRODUCTS_URI}/${category}/${id}`, body)
        promisseQtd.then((resp) => console.log(resp))
    }

    function AddCart() {
        if (!arrCart.includes(totalObject)) {
            let Postbody = {
                "id": id,
                "item": item,
                "img": img,
                "price": price,
                "qtd": qtd
            }
            const promisse = axios.post(`${process.env.REACT_APP_PRODUCTS_URI}/Cart`, Postbody)
            promisse.then((resp) => console.log(resp))
            promisse.catch((error) => console.log(error))
        }
        if (!arrCart.includes(totalObject)) {
            setArrCart([...arrCart, totalObject])
        }

    }

    return (
        <>
            {fin ? <Finishing /> : ""}
            <Header />
            {openCart ? <OpeningCart /> : ""}
            <ContainerProdutct>
                <div className="imgProduct">
                    <img src={img} />
                </div>
                <div className="Rigth">
                    <div className="details">
                        <p>{details}</p>
                        <p>R${price}</p>
                    </div>
                    <div className="finaly">
                        <div className="buttons">
                        <button className="sub" onClick={() => SubQtd()}>-</button>
                            <p>{qtd}</p>
                        <button className="somar" onClick={() => AddQtd()}>+</button>
                            
                        </div>
                        <button className="addCart" onClick={() => AddCart()}>Colocar no carrinho</button>
                        {arrCart.includes(totalObject) ? <p className="sucess">produto adicionado no carrinho</p> : ""}
                        <div className="back" onClick={() => {
                            navigate("/")
                            setDisabled(false)
                        }}>Voltar</div>
                    </div>
                </div>

            </ContainerProdutct>

        </>
    )
}

const ContainerProdutct = styled.div`
display: flex;
justify-content: center;
padding-top: 130px;
margin: auto;
width: 42%;
@media (max-width:600px){
    width: 50%;
    margin-left: 120px;
}
img{
    width: 400px;
}
.Rigth{
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
}
p{
    font-family: 'comfortaa';
    font-size: 30px;
    margin-bottom: 40px;
}
.addCart {
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
}
.addCart:hover {
    background: linear-gradient(90deg, rgba(47,19,53,1) 0%, rgba(98,14,93,1) 37%, rgba(157,0,122,1) 100%);
	border-radius:8px;
}
.addCart:active {
	position:relative;
	top:1px;
}
.buttons{
    display: flex;
    position: absolute;
    top: -30px;
    right: 10px;
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
.finaly{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .sucess{
        font-size: 15px;
        margin-top: 5px;
    }
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
`