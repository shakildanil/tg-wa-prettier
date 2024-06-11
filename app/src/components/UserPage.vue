<template>
    <div>
      <h1>Вы авторизованы</h1>
      <p>ID: {{ user.id }}</p>
      <p>Имя: {{ user.first_name }}</p>
      <p>Фамилия: {{ user.last_name }}</p>
      <p>Username: {{ user.username }}</p>
  
      <h2>Список групп</h2>
      <ul>
        <li v-for="group in groups" :key="group.id">
          {{ group.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  
  interface Group {
    id: number;
    name: string;
  }
  
  export default defineComponent({
    name: 'UserPage',
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    setup() {
      const groups = ref<Group[]>([]);
  
      onMounted(async () => {
        try {
          const response = await axios.get('https://nameless-ravine-59157-5e1fd469c57a.herokuapp.com/groups');
          groups.value = response.data;
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      });
  
      return {
        groups
      };
    }
  });
  </script>
  
  <style scoped>
  /* Дополнительные стили, если нужны */
  </style>
  