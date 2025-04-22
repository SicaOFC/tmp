import "./LoginPage.css";
import sideImage from "../assets/sideImage.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSenhaChange(e) {
    setSenha(e.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInfo = {
      email,
      senha,
    };

    fetch("http://localhost:3000/usuario/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then(async (response) => {
        const result = await response.json();

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${JSON.stringify(result)}`);
        }

        const token = result.token;
        console.log("Token recebido:", token);

        fetch("http://localhost:3000/usuario/login", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }).then(async (loginResponse) => {
          const loginResult = await loginResponse.json();

          if (!loginResponse.ok) {
            throw new Error(
              `Erro ${loginResponse.status}: ${JSON.stringify(loginResult)}`
            );
          }

          console.log("Login efetuado com sucesso:", loginResult);
        });
      })

      .catch((error) => {
        console.error("Erro no processo de token/login:", error.message);
      });
  };

  return (
    <>
      <div className="container_login">
        <div className="container-grid">
          <div className="login-box">
            <img src={logo} alt="Logo SICA" className="logo" />
            <h2>Login</h2>
            <form onSubmit={handleSubmit} action="#" method="post">
              <label htmlFor="rm">email</label>
              <input
                value={email}
                onChange={handleEmailChange}
                type="email"
                id="email"
                name="email"
                required
              />

              <label htmlFor="password">Senha</label>
              <input
                value={senha}
                onChange={handleSenhaChange}
                type="password"
                id="senha"
                name="senha"
                required
              />

              <button type="submit" name="submit" value="login">
                Entrar
              </button>
              <label className="sign-out">
                Ainda não tem conta?<a href="#"> Cadastre-se!</a>
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

export default LoginPage;
