<template>
    <div>
      <h2>Registro</h2>
      <form @submit.prevent="register">
        <input v-model="name" type="text" placeholder="Nombre" />
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Contraseña" />
        <input v-model="password_confirmation" type="password" placeholder="Confirmar Contraseña" />
        <button type="submit">Registrar</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión aquí</router-link>
      </p>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
          });
          console.log('Registro exitoso:', response.data);
          this.$router.push('/login'); // Redirige a la página de inicio de sesión después del registro
        } catch (error) {
          console.error('Error al registrar:', error.response.data);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .edit-user-container {
    padding: 20px;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    opacity: 0.9;
  }
  </style>
  