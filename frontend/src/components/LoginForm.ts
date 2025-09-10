export interface UserCredentials {
    email: string;
    password: string;
}

export class LoginForm {
    private loginForm: HTMLFormElement;
    private registerForm: HTMLFormElement;
    private toggleButton: HTMLButtonElement;
    private loginCard: HTMLElement;
    private registerCard: HTMLElement;

    constructor() {
        this.loginForm = document.getElementById('login-form') as HTMLFormElement;
        this.registerForm = document.getElementById('register-form') as HTMLFormElement;
        this.toggleButton = document.getElementById('toggle-button') as HTMLButtonElement;
        this.loginCard = document.getElementById('login-card') as HTMLElement;
        this.registerCard = document.getElementById('register-card') as HTMLElement;

        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        this.toggleButton.addEventListener('click', () => this.toggleForms());
    }

    private handleLogin(event: Event): void {
        event.preventDefault();
        
        const email = (document.getElementById('login-email') as HTMLInputElement).value;
        const password = (document.getElementById('login-password') as HTMLInputElement).value;
        
        const credentials: UserCredentials = { email, password };
        
        if (this.validateEmail(credentials.email) && this.validatePassword(credentials.password)) {
            this.submitLogin(credentials);
        } else {
            this.showError('Por favor, verifique seu email e senha.');
        }
    }

    private handleRegister(event: Event): void {
        event.preventDefault();
        
        const email = (document.getElementById('register-email') as HTMLInputElement).value;
        const password = (document.getElementById('register-password') as HTMLInputElement).value;
        
        const credentials: UserCredentials = { email, password };
        
        if (this.validateEmail(credentials.email) && this.validatePassword(credentials.password)) {
            this.submitRegister(credentials);
        } else {
            this.showError('Por favor, verifique seu email e senha.');
        }
    }

    private validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private validatePassword(password: string): boolean {
        return password.length >= 6;
    }

    private async submitLogin(credentials: UserCredentials): Promise<void> {
        try {
            // Simulação de requisição de login
            console.log('Tentativa de login:', credentials);
            
            // Aqui você faria uma requisição real para sua API
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(credentials)
            // });
            
            // if (response.ok) {
            //     const data = await response.json();
            //     console.log('Login bem-sucedido:', data);
            // } else {
            //     throw new Error('Falha no login');
            // }
            
            alert('Login realizado com sucesso! (simulação)');
        } catch (error) {
            this.showError('Erro ao fazer login. Tente novamente.');
            console.error('Login error:', error);
        }
    }

    private async submitRegister(credentials: UserCredentials): Promise<void> {
        try {
            // Simulação de requisição de registro
            console.log('Tentativa de cadastro:', credentials);
            
            // Aqui você faria uma requisição real para sua API
            // const response = await fetch('/api/register', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(credentials)
            // });
            
            // if (response.ok) {
            //     const data = await response.json();
            //     console.log('Cadastro bem-sucedido:', data);
            // } else {
            //     throw new Error('Falha no cadastro');
            // }
            
            alert('Cadastro realizado com sucesso! (simulação)');
        } catch (error) {
            this.showError('Erro ao cadastrar. Tente novamente.');
            console.error('Register error:', error);
        }
    }

    private toggleForms(): void {
        if (this.loginCard.classList.contains('hidden')) {
            this.loginCard.classList.remove('hidden');
            this.registerCard.classList.add('hidden');
            this.toggleButton.textContent = 'Criar uma conta';
        } else {
            this.loginCard.classList.add('hidden');
            this.registerCard.classList.remove('hidden');
            this.toggleButton.textContent = 'Fazer login';
        }
    }

    private showError(message: string): void {
        // Você pode implementar uma exibição de erro mais sofisticada aqui
        alert(message);
    }
}