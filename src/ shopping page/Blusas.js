import styled from "styled-components"
import { useNavigate } from "react-router-dom"

export default function Blusas(props){
    const navigate = useNavigate()
    return(
        <>
            <ContainerBlusas onClick={()=> navigate(`/Detalhes${props.category}/${props.id}`)}>
                    <p>{props.item}</p>
                    <img src={props.img}/>
                </ContainerBlusas>
        </>
    )
}

const ContainerBlusas = styled.div`

font-size: 18px;
font-family: 'Comfortaa';
margin-left: 20px;
:hover{
    cursor: pointer;
}
img{
    width: 200px;
}
p{
    margin-bottom: 5px;
}
`