import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function Sapatos(props){
    const navigate = useNavigate()
    return(
        <>
            <ContainerSapatos onClick={()=> navigate(`/Detalhes${props.category}/${props.id}`)}>
            <p>{props.item}</p>
                    <img src={props.img}/>
                    
                </ContainerSapatos>
        </>
    )
}

const ContainerSapatos = styled.div`
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