<template>
    <div class="home-container">
      <div class="top-buttons">
        <button @click="goToProfile" class="btn-p">Perfil</button>
        <button @click="logout" class="btn btn-logout">Cerrar sesión</button>
      </div>
      <div class="add-button-container">
        <button @click="goToAddUser" class="btn btn-add">Agregar Usuario</button>
      </div>
      <div class="table-container">
        <h2>Lista de Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Rol</th>
              <th>Estatus</th>
              <th>fecha de alta</th>
              <th>fecha de baja</th>
              <th>fecha de modificacion</th>
              <th>Acciones</th> <!-- Nueva columna de acciones -->
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.nombre }}</td>
              <td>{{ user.apellidos }}</td>
              <td>{{ user.rol }}</td>
              <td>{{ user.estatus }}</td>
              <td>{{ user.fecha_alta }}</td>
              <td>{{ user.fecha_baja }}</td>
              <td>{{ user.fecha_modificacion }}</td>
              <td>
                <button @click="editUser(user.id)" class="btn btn-edit">Editar</button>
                <button @click="deleteUser(user.id)" class="btn btn-delete">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    data() {
      return {
        users: [],
      };
    },
    async mounted() {
      await this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('user');
          this.users = response.data;
        } catch (error) {
          console.error('Error al obtener usuarios:', error.response.data);
        }
      },
      async logout() {
        try {
          const token = localStorage.getItem('token');
          await axios.post('logout', {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          localStorage.removeItem('token'); // Elimina el token del almacenamiento local
          this.$router.push('/login'); // Redirige a la página de inicio de sesión
        } catch (error) {
          console.error('Error al cerrar sesión:', error.response.data);
        }
      },
      goToProfile() {
        this.$router.push('/profile'); // Redirige a la página de perfil
      },
      goToAddUser() {
        this.$router.push('/add-user'); // Redirige a la página de agregar usuario
      },
      editUser(userId) {
        this.$router.push(`/edit-user/${userId}`); // Redirige a la página de editar usuario
      },
      async deleteUser(userId) {
        // Confirmación antes de eliminar
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        try {
          await axios.delete(`user/${userId}`);
          this.fetchUsers(); // Refresca la lista de usuarios después de la eliminación
        } catch (error) {
          this.errorMessage = 'Error al eliminar el usuario.';
        }
      }
      },
    },
  };
  </script>
  
  <style scoped>
  .home-container {
    padding: 20px;
  }
  
  .top-buttons {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }

  .btn-p {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: blue;
    cursor: pointer;
  }
  
  .btn-logout {
    background-color: #dc3545;
  }
  
  .btn-add {
    background-color: #28a745;
  }
  
  .btn-edit {
    background-color: #007bff;
  }
  
  .btn-delete {
    background-color: #dc3545;
  }
  
  .btn:hover {
    opacity: 0.9;
  }
  
  .table-container {
    max-width: 100%;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #ef3333;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    color: white;
  }
  
  th {
    background-color: #d91a1a;
    color: white;
  }
  
  .actions {
    display: flex;
    gap: 5px;
  }
  </style>
  