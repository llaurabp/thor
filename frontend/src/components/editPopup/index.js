import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api.js";

function initialState() {
  return {
    marca: "",
    valor: 0,
    data: new Date(),
    quantidade: 0,
  };
}

const EditModal = ({ id, showw, onClose, setShoww, getList }) => {
  const [values, setValues] = useState(initialState);

  const token = localStorage.getItem("@Zeus:token");
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjQ0Y2Y4MDFmMTI3NDA1OWU2OGI0YSIsImlhdCI6MTYzNDI5MzY1MSwiZXhwIjoxNjM0MzgwMDUxfQ.SVRr04qmPCf4yykuYQdeHhXsHKOwEpigeEmKUwG8ta8";

  useEffect(() => {
    api
      .get(`/secondpage/get_one/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("aaaaaaaaaaaaaaaaaaa", res.data);
        setValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("bbbbbbbbbbbbbbbbbbbbbbbb", id);
  }, [id]);

  //abrir modal
  if (!showw) {
    return null;
  }

  const editTransaction = async (e) => {
    e.preventDefault();
    const data = values;

    try {
      await api.put(
        `/secondpage/update/${id}`,
        {
          marca: data.marca,
          valor: data.valor,
          quantidade: data.quantidade,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    getList();
    setShoww(false);
  };

  // console.log(id);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Edite seus valores</h4>
        </div>
        <form className="modal-body" onSubmit={editTransaction}>
          <input
            type="text"
            value={values.marca}
            onChange={(e) => {
              setValues({ ...values, marca: e.target.value });
            }}
          />

          <input
            type="number"
            value={values.quantidade}
            onChange={(e) => {
              setValues({ ...values, quantidade: e.target.value });
            }}
          />

          <input
            type="number"
            value={values.valor}
            onChange={(e) => {
              setValues({ ...values, valor: e.target.value });
            }}
          />

          {/* <input type="date" onChange={(e) => {setValues({...values, data:new Date(e.target.value)})}}/> */}
          <button type="submit" className="button">
            Atualizar
          </button>
          <button onClick={onClose} className="button">
            Fechar
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditModal;
