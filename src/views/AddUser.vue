<template>
    <div class="add-user-container">
      <h2>Agregar Nuevo Usuario</h2>
      <form @submit.prevent="addUser">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input v-model="nombre" id="nombre" type="text" required />
        </div>
        <div class="form-group">
          <label for="apellidos">Apellidos</label>
          <input v-model="apellidos" id="apellidos" type="text" required />
        </div>
        <div class="form-group">
          <label for="rol">Rol</label>
          <input v-model="rol" id="rol" type="text" required />
        </div>
        <div class="form-group">
          <label for="estatus">Estatus</label>
          <select v-model="estatus" id="estatus" required>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button type="submit" class="btn">Agregar Usuario</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    data() {
      return {
        nombre: '',
        apellidos: '',
        rol: '',
        estatus: 'activo',
      };
    },
    methods: {
      async addUser() {
        try {
          await axios.post('user', {
            nombre: this.nombre,
            apellidos: this.apellidos,
            rol: this.rol,
            estatus: this.estatus,
          });
          this.$router.push('/'); // Redirige al home después de agregar el usuario
        } catch (error) {
          console.error('Error al agregar usuario:', error.response.data);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .add-user-container {
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
  