import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import {FiLogIn} from 'react-icons/fi';
import { MdDarkMode, MdModeEditOutline } from "react-icons/md";
import { IoMdArrowBack, IoMdRemoveCircleOutline } from "react-icons/io";
import "./styles.css";
import "../../global.css";
import logoImg from "../../assets/Frame 1.svg";
import logoImg2 from "../../assets/Frame 1 (1).svg";
import Modal from "../../components/popup";
import EditModal from "../../components/editPopup";

import api from "../../services/api";
const token = localStorage.getItem("@Zeus:token");

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjQ0Y2Y4MDFmMTI3NDA1OWU2OGI0YSIsImlhdCI6MTYzNDI5MzY1MSwiZXhwIjoxNjM0MzgwMDUxfQ.SVRr04qmPCf4yykuYQdeHhXsHKOwEpigeEmKUwG8ta8";
export default function SecondPage() {
  const [show, setShow] = useState(false);
  const [showw, setShoww] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [image, setImage] = useState(logoImg);
  const [status, setStatus] = useState([]);
  const [id, setId] = useState("");
  const [totalV, setTotalV] = useState();
  const [totalQ, setTotalQ] = useState();

  const getList = async () => {
    await api
      .get("/secondpage/get_many", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setPurchases(res.data);
        setTotalV(
          res.data
            .map((item) => item.valor)
            .reduce((total, item) => total + item, 0)
        );
        setTotalQ(
          res.data
            .map((item) => item.quantidade)
            .reduce((total, item) => total + item, 0)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getList();
  }, []);

  const deleteItem = (id) => {
    api
      .delete(`/secondpage/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getList();
      });
  };

  function darkmode() {
    var someElement = document.getElementById("root");
    if (someElement.className == "light") {
      someElement.className = "";
      someElement.className += "dark";
      setImage(logoImg2);
    } else if (someElement.className == "dark") {
      someElement.className = "light";
      setImage(logoImg);
    }
  }

  return (
    <div className="teste">
      <header>
        <img src={image} className="new-logo" id="logotest" alt="Logo" />
      </header>
      <div className="container">
        <div className="containers">
          <div className="info-card">
            <h3>Gastos com ração</h3>
            <p>R$ {totalV}</p>
          </div>
          <div className="info-card">
            <h3>Total de ração comprada</h3>
            <p>{totalQ} kg</p>
          </div>
        </div>

        <div className="left">
          <div className="modaltest">
            <button
              className="transaction-button"
              onClick={() => setShow(true)}
              onclick="showModal()"
            >
              Nova transação
            </button>
            <Modal
              onClose={() => setShow(false)}
              show={show}
              setShow={setShow}
              getList={getList}
            />
          </div>

          <div className="backk">
            <Link to="/">
              <button className="back-button">
                <IoMdArrowBack size={16} color="#fff" />
              </button>
            </Link>
          </div>

          <div className="darkk">
            <button className="darkmode-button" onClick={darkmode}>
              {" "}
              <MdDarkMode size={16} color="#fff" />
            </button>
          </div>

          <section id="transactions">
            <h2 class="sr-only">Transações</h2>

            <table id="data-table">
              <tr>
                <th>Marca</th>
                <th>Qtd de ração</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
              {purchases.map((purchase) => {
                return (
                  <tr key={purchase._id}>
                    <td>{purchase.marca}</td>
                    <td>{purchase.quantidade}</td>
                    <td>{purchase.valor}</td>
                    <td>{`${purchase.data.slice(5, 7)}/${purchase.data.slice(
                      8,
                      10
                    )}/${purchase.data.slice(0, 4)}`}</td>
                    <td id="remove">
                      <button onClick={() => deleteItem(purchase._id)}>
                        <IoMdRemoveCircleOutline />
                      </button>
                      <button
                        onClick={() => {
                          setId(purchase._id);
                          setShoww(true);
                        }}
                      >
                        <MdModeEditOutline />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </section>
        </div>
      </div>
      <EditModal
        onClose={() => setShoww(false)}
        showw={showw}
        id={id}
        setShoww={setShoww}
        getList={getList}
      />
    </div>
  );
}
