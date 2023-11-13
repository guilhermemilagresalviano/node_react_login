import React,{useState,useEffect} from "react";
import './login.css';
import axios from "axios";

function Login() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([]);
    const [token, setToken] = useState(null); // Para armazenar o token após o login

    const handleLogin = () => {
        // Verificação de email e senha
        if (!email || !password) {
            alert('Preencha todos os campos');
            return;
        }

        console.log('Enviando dados de login:', { email, password });

        // Faz uma solicitação POST para o endpoint /login para autenticação
        axios
            .post("http://localhost:3000/login", { email, password  })
            .then((response) => {
                // Lida com a resposta de autenticação, neste exemplo, apenas armazena o token no estado
                setToken(response.data.token);
            })
            .catch((err) => {
                console.error("Erro ao fazer login:", err);
            });
    }

    useEffect(() => {
        // A partir deste ponto, você pode usar o token para fazer solicitações autenticadas
        // Certifique-se de incluir o token nas solicitações para o backend.

        // Por exemplo, para fazer uma solicitação GET autenticada:
        if (token) {
            axios.get("http://localhost:3000/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao buscar dados:", error);
                });
        }
    }, [token]); // Certifique-se de que o useEffect observe as alterações no token

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
            <div>
                <label>Email</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu email"
                />
              </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Sua senha"
                    />
                </div>
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
            <div>
                {/* Exibir os dados do backend */}
                {Array.isArray(data) && data.map((item) => (
                    <div key={item.id}>{item.nome}</div>
                ))}
            </div>
        </div>
    );
}

export default Login;
