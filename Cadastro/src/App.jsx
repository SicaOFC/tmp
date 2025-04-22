import "./App.css";
import logo from "./assets/logo.png";
import sideImage from "./assets/sideImage.png";

function App() {
  return (
    <>
      <div className="container">
        <div className="login-box">
          <img src={logo} alt="Logo SICA" className="logo" />
          <h1>Cadastro</h1>
          <form action="#" method="post">
            <div className="div">
              <label htmlFor="rm">RM</label>
              <input type="text" id="rm" name="rm" pattern="\d{6}" required />
            </div>

            <div className="div">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                pattern="^[A-Za-z]+( [A-Za-z]+)*$"
                required
              />
            </div>
            <div className="div">
              <label htmlFor="classe">Classe</label>
              <select id="classe" name="classe" required>
                <option value="1DS">1DS</option>
                <option value="2DS">2DS</option>
                <option value="3DS">3DS</option>
              </select>
            </div>

            <label htmlFor="email">Email</label>
            <div className="div">
              <div className="email">
                <input
                  type="text"
                  id="email"
                  name="email"
                  pattern="^(?=[A-Za-z0-9._]{3,}$)(?!.*[_.]{2})[A-Za-z0-9]+([._][A-Za-z0-9]+)*$"
                  required
                />
                <select id="email2" name="email2" required>
                  <option value="@gmail.com">@gmail.com</option>
                  <option value="@hotmail.com">@hotmail.com</option>
                  <option value="@outlook.com">@outlook.com</option>
                </select>
              </div>
            </div>

            <div className="div">
              <label htmlFor="sexo">Sexo</label>
              <div>
                <input type="radio" name="sexo" value="M" required /> M
                <input type="radio" name="sexo" value="F" required /> F
              </div>
            </div>

            <div className="div">
              <label htmlFor="nascimento">Data de Nascimento</label>
              <input
                type="date"
                id="nascimento"
                name="nascimento"
                min="1900-01-01"
                required
              />
            </div>

            <div className="div">
              <label htmlFor="password">Senha</label>
              <input type="password" id="senha" name="senha" required />
            </div>

            <div className="div">
              <button type="submit" name="submit" value="cadastrar">
                Cadastrar
              </button>
            </div>

            <label style="text-align: center;">
              <a href="indexLoginPage.html">Já tem uma conta? Logar</a>
            </label>
          </form>
        </div>
        <div className="image-box">
          <img src={sideImage} alt="Usuário" class="user-image" />
        </div>
      </div>
    </>
  );
}

export default App;
