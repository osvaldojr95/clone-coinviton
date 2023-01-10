import React, {createContext, useState} from "react";

export const AuthContext = createContext({})

function AuthProvider({children}){
    const [details, setDetails] = useState("")
    const [price, setPrice] = useState("")
    let [qtd, setQtd] = useState()
    const [img, setImg] = useState("")
    const[arrCart, setArrCart] = useState([])
    const [totalObject, setTotalObject] = useState({})
    const [openCart, setOpenCart] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [fin, setFin] = useState(false)
    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[dataNascimento, setDataNascimento] = useState("")
    const[cep, setCep] = useState("")
    const[item, setItem] = useState("")
    const[headerDisabled, setHeaderDisabled] = useState(false)
    return(
        <AuthContext.Provider value={{
        setDetails, 
        setPrice, 
        setQtd, 
        setImg, 
        setArrCart, 
        setTotalObject,
        setOpenCart, 
        setDisabled,
        setFin,
        setItem,
        item,
        disabled,
        fin,
        details, 
        price, 
        qtd, 
        img, 
        arrCart, 
        totalObject,
        openCart,setName, 
        setEmail, 
        setDataNascimento,
        setCep,
        name,
        email,
        dataNascimento,
        cep,
        headerDisabled,
        setHeaderDisabled
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider