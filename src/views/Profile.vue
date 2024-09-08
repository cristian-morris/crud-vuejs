<template>
    <div>
      <h2>Perfil del Usuario</h2>
      <div v-if="user">
        <p>Nombre: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
      </div>
      <div v-else>
        <p>Cargando perfil...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    data() {
      return {
        user: null,
      };
    },
    async mounted() {
      await this.fetchProfile();
    },
    methods: {
      async fetchProfile() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('perfil', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.user = response.data.datos;
        } catch (error) {
          console.error('Error al obtener el perfil:', error.response.data);
        }
      },
    },
  };
  </script>
  