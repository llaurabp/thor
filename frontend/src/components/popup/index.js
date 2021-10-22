import React, { useState, useEffect } from "react";
import './styles.css';
import api from '../../services/api.js';

function initialState() {
    return {
    marca: "", 
    valor: 0, 
    data: new Date(),
    quantidade: 0,
    } }

const Modal = (props) => {
    const [values, setValues] = useState(initialState);

    const token = localStorage.getItem('@Zeus:token')
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjQ0Y2Y4MDFmMTI3NDA1OWU2OGI0YSIsImlhdCI6MTYzNDI5MzY1MSwiZXhwIjoxNjM0MzgwMDUxfQ.SVRr04qmPCf4yykuYQdeHhXsHKOwEpigeEmKUwG8ta8";

    useEffect (() => {
        console.log(values)
    },[values])


    if (!props.show) { 
        return null
    }

const sendTransaction = async (e) => {
    e.preventDefault();
const data = values;
   
try {
    await api.post("/secondpage/create", data, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
        });  
    } catch (err) {
        console.log(err);
  
    }
    window.location.reload();
}


  
    return (
        
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Nova</h4>
                </div>
                <form className="modal-body" onSubmit={sendTransaction}>
              
                    <input type="text" placeholder="Marca da ração" onChange={(e) => {setValues({...values, marca:e.target.value})}}/>

                    <input type="number" placeholder="Valor" onChange={(e) => {setValues({...values, valor:e.target.value})}}/>

                    <input type="number" placeholder="Quantidade de ração" onChange={(e) => {setValues({...values, quantidade:e.target.value})}}/>
                 
                    <input type="date" onChange={(e) => {setValues({...values, data:new Date(e.target.value)})}}/>
                <button type="submit" className="button" >Adicionar</button>
                <button onClick={props.onClose}className="button">Fechar</button>
                </form>
              
            </div>
        </div>
      
     )
}
export default Modal;
