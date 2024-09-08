<template>
    <div class="edit-user-container">
      <h2>Editar Usuario</h2>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input v-model="nombre" id="nombre" type="text" required />
          <span v-if="errors.nombre" class="error">{{ errors.nombre }}</span>
        </div>
        <div class="form-group">
          <label for="apellidos">Apellidos</label>
          <input v-model="apellidos" id="apellidos" type="text" required />
          <span v-if="errors.apellidos" class="error">{{ errors.apellidos }}</span>
        </div>
        <div class="form-group">
          <label for="rol">Rol</label>
          <input v-model="rol" id="rol" type="text" required />
          <span v-if="errors.rol" class="error">{{ errors.rol }}</span>
        </div>
        <div class="form-group">
          <label for="estatus">Estatus</label>
          <select v-model="estatus" id="estatus" required>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button type="submit" class="btn">Actualizar Usuario</button>
        <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
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
        errors: {},
        errorMessage: '',
      };
    },
    async created() {
      const userId = this.$route.params.id;
      try {
        const response = await axios.get(`user/${userId}`);
        const user = response.data;
        this.nombre = user.nombre;
        this.apellidos = user.apellidos;
        this.rol = user.rol;
        this.estatus = user.estatus;
      } catch (error) {
        this.errorMessage = 'Error al cargar los datos del usuario.';
      }
    },
    methods: {
      async updateUser() {
        this.errors = {};
        this.errorMessage = '';
  
        if (!this.nombre || !this.apellidos || !this.rol) {
          this.errors = {
            nombre: !this.nombre ? 'Nombre es requerido' : '',
            apellidos: !this.apellidos ? 'Apellidos son requeridos' : '',
            rol: !this.rol ? 'Rol es requerido' : '',
          };
          return;
        }
  
        try {
          const userId = this.$route.params.id;
          await axios.put(`user/${userId}`, {
            nombre: this.nombre,
            apellidos: this.apellidos,
            rol: this.rol,
            estatus: this.estatus,
          });
          this.$router.push('/'); // Redirige al home después de actualizar el usuario
        } catch (error) {
          this.errorMessage = 'Error al actualizar el usuario: ' + error.response.data.message;
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
  
  