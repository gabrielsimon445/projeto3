import React, { useState, FormEvent } from 'react';

export interface UserCredentials {
  email: string;
  password: string;
}

const LoginRegisterForm: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleForms = () => {
    setIsLoginMode(!isLoginMode);
    setEmail('');
    setPassword('');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const credentials: UserCredentials = { email, password };

    if (!validateEmail(email) || !validatePassword(password)) {
      showError('Por favor, verifique seu email e senha.');
      return;
    }

    if (isLoginMode) {
      await submitLogin(credentials);
    } else {
      await submitRegister(credentials);
    }
  };

  const submitLogin = async (credentials: UserCredentials) => {
    try {
      console.log('Tentativa de login:', credentials);
      alert('Login realizado com sucesso! (simulação)');
    } catch (error) {
      showError('Erro ao fazer login. Tente novamente.');
      console.error('Login error:', error);
    }
  };

  const submitRegister = async (credentials: UserCredentials) => {
    try {
      console.log('Tentativa de cadastro:', credentials);
      alert('Cadastro realizado com sucesso! (simulação)');
    } catch (error) {
      showError('Erro ao cadastrar. Tente novamente.');
      console.error('Register error:', error);
    }
  };

  const showError = (message: string) => {
    alert(message);
  };

  return (
    <div className="form-container">
      <div className={`card ${isLoginMode ? '' : 'hidden'}`} id="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} id="login-form">
          <input
            type="email"
            id="login-email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="login-password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>

      <div className={`card ${isLoginMode ? 'hidden' : ''}`} id="register-card">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit} id="register-form">
          <input
            type="email"
            id="register-email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="register-password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>

      <button onClick={toggleForms} id="toggle-button">
        {isLoginMode ? 'Criar uma conta' : 'Fazer login'}
      </button>
    </div>
  );
};

export default LoginRegisterForm;