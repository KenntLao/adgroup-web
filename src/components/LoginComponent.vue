<template>
    <div class="login-wrapper">
        <div class="login-card">
        <h1 class="login-title">Login</h1>
        <form @submit.prevent="login">
            <div class="input-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" id="email" placeholder="Enter your email" required />
            </div>
            <div class="input-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" class="login-button">Login</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const email = ref('');
        const password = ref('');
        const errorMessage = ref('');

        const login = async () => {
            try {
                const response = await axios.post('http://adgroup-api.test/api/auth/login', {
                    email: email.value,
                    password: password.value,
                });
                localStorage.setItem('authToken', response.data.token);
                window.location.href = '/dashboard';
            } catch (error) {
                errorMessage.value = `Error: ${error.response.data.message || 'Invalid email or password.'}`;
            }
        };

        return {
            email,
            password,
            errorMessage,
            login,
        };
    },
};
</script>

<style scoped>
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;
}

.login-card {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 360px;
}

.login-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #333;
}

.input-group {
    margin-bottom: 1rem;
}

.input-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
}

.input-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.login-button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #ffffff;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login-button:hover {
    background-color: #0056b3;
}

.error-message {
    color: #e74c3c;
    margin-top: 1rem;
    text-align: center;
}
</style>