import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { AuthContext } from "../Contexts/Auth"

export default function Header(){
    const navigate = useNavigate()
    const{arrCart, setOpenCart, setDisabled, headerDisabled} = useContext(AuthContext)
    return(
        <>
            <HeaderContainer>
                <NameShopping>
                    {!headerDisabled? <h1 onClick={()=>{
                        navigate("/")
                        setDisabled(false)}}>
                    <span>C</span><span><img src="https://media-exp1.licdn.com/dms/image/C4E0BAQGtjaN-5cI7Nw/company-logo_200_200/0/1656973103389?e=2147483647&v=beta&t=eClbU0wyH-I-l6TJuSLxc96NYGknlnyjv3XOJ7SPuqw"/></span>in Viton</h1>:<h1>
                    <span>C</span><span><img src="https://media-exp1.licdn.com/dms/image/C4E0BAQGtjaN-5cI7Nw/company-logo_200_200/0/1656973103389?e=2147483647&v=beta&t=eClbU0wyH-I-l6TJuSLxc96NYGknlnyjv3XOJ7SPuqw"/></span>in Viton</h1>}
                </NameShopping>
                <Cart>
                    {arrCart.length !== 0 ?<div><p>Conclua sua compra</p><ion-icon name="arrow-forward-outline"></ion-icon></div>:""}
                <ion-icon name="cart-outline" onClick={(()=> setOpenCart(true))}></ion-icon>
                </Cart>
            </HeaderContainer>
        </>
    )
}

const HeaderContainer = styled.div`
width: 100%;
height: 90px;
background: rgb(47,19,53);
background: linear-gradient(90deg, rgba(47,19,53,1) 0%, rgba(98,14,93,1) 37%, rgba(157,0,122,1) 100%);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
display: flex;
justify-content: space-between;
align-items: center;
position: fixed;
z-index: 0;
top: 0;
left: 0;
`
const NameShopping = styled.div`
font-size: 50px;
color: white;
font-family: 'Comfortaa';
font-size: 40px;
color: white;
position: relative;
h1:hover{
    cursor: pointer;
}
span{
    margin-right: 20px;
}
img{
    width: 40px;
    border-radius: 100%;
    margin-left: 20px;
    position: absolute;
    left: 10px;
}
`
const Cart = styled.div`
p{
    font-family: 'Comfortaa';
}
div{
    font-size: 20px;
    display: flex;
    margin-right: 2px;
    margin-top: 4px;
}
ion-icon:hover{
    cursor: pointer;
}
display: flex;
font-size: 30px;
color: white;
margin-right: 20px;
`