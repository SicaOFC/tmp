import "./CadastroPage.css";
import logo from "../assets/logo.png";
import sideImage from "../assets/sideImage.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function CadastroPage() {
  const [rm, setRm] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const navigate = useNavigate();

  function handleRmChange(e) {
    setRm(e.target.value);
  }

  function handleNomeChange(e) {
    setNome(e.target.value);
  }

  function handleCursoChange(e) {
    setCurso(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleDataChange(e) {
    setData(e.target.value);
  }

  function handleSenhaChange(e) {
    setSenha(e.target.value);
  }

  function handleTelefoneChange(e) {
    setTelefone(e.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = {
      rm: parseInt(rm),
      nome,
      curso,
      email,
      data,
      senha,
      telefone,
    };

    console.log("Enviando:", JSON.stringify(userInfo));

    fetch("http://localhost:3000/usuario/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(userInfo),
    })
      .then(async (response) => {
        const result = await response.text(); // <-- captura resposta crua
        console.log("Resposta do servidor:", result);
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${result}`);
        }
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container_cadastro">
        <div className="container">
          <div className="login-box">
            <img src={logo} alt="Logo SICA" className="logo" />
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit} action="#" method="post">
              <div className="div">
                <label htmlFor="rm">RM</label>
                <input
                  value={rm}
                  onChange={handleRmChange}
                  type="number"
                  id="rm"
                  name="rm"
                  pattern="\d{6}"
                  required
                />
              </div>

              <div className="div">
                <label htmlFor="nome">Nome</label>
                <input
                  value={nome}
                  onChange={handleNomeChange}
                  type="text"
                  id="nome"
                  name="nome"
                  pattern="^[A-Za-z]+( [A-Za-z]+)*$"
                  required
                />
              </div>
              <div className="div">
                <label htmlFor="classe">Classe</label>
                <select
                  value={curso}
                  onChange={handleCursoChange}
                  id="classe"
                  name="classe"
                  required
                >
                  <option value="1DS">1DS</option>
                  <option value="2DS">2DS</option>
                  <option value="3DS">3DS</option>
                </select>
              </div>

              <label htmlFor="email">Email</label>
              <div className="div">
                <div className="email">
                  <input
                    value={email}
                    onChange={handleEmailChange}
                    type="email"
                    id="email"
                    name="email"
                    required
                  />
                </div>
              </div>

              {/* <div className="div">
              <label htmlFor="sexo">Sexo</label>
              <div>
                <input type="radio" name="sexo" value="M" required /> M
                <input
                  type="radio"
                  name="sexo"
                  value="F"
                  required
                  style={{ marginLeft: "25px" }}
                />{" "}
                F
              </div>
            </div> */}

              <div className="div">
                <label htmlFor="nascimento">Data de Nascimento</label>
                <input
                  value={data}
                  onChange={handleDataChange}
                  type="date"
                  id="nascimento"
                  name="nascimento"
                  min="1900-01-01"
                  required
                />
              </div>

              <div className="div">
                <label htmlFor="password">Senha</label>
                <input
                  value={senha}
                  onChange={handleSenhaChange}
                  type="password"
                  id="senha"
                  name="senha"
                  required
                />
              </div>

              <div className="div">
                <label htmlFor="telefone">Telefone</label>
                <input
                  value={telefone}
                  onChange={handleTelefoneChange}
                  type="text"
                  id="telefone"
                  name="telefone"
                  required
                />
              </div>

              <div className="div">
                <button type="submit" name="submit" value="cadastrar">
                  Cadastrar
                </button>
              </div>

              <label style={{ textAlign: "center" }}>
                <a href="indexLoginPage.html">Já tem uma conta? Logar</a>
              </label>
            </form>
          </div>
          <div className="image-box">
            <img src={sideImage} alt="Usuário" className="user-image" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CadastroPage;
