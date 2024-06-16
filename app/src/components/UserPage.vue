<template>
  <div>
    <h1>Добро пожаловать, {{ user.first_name }}!</h1>
    <p>Ваше имя пользователя: {{ user.username }}</p>
    <p>Ваш идентификатор: {{ user.id }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'UserPage',
  setup() {
    // Здесь вы можете получать данные пользователя из localStorage или другого источника
    const user = reactive(JSON.parse(localStorage.getItem('telegramUser') || '{}'));

    return {
      user,
    };
  },
});
</script>

<style scoped>
/* Ваши стили */
</style>


<!-- <template>
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
import { defineComponent, ref, onMounted, PropType } from 'vue';
import axios from 'axios';

interface Group {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'UserPage',
  props: {
    user: {
      type: Object as PropType<TelegramWebAppUser>,
      required: true
    }
  },
  setup(props) {
    const groups = ref<Group[]>([]);

    onMounted(async () => {
      try {
        // Отправка данных авторизации на сервер
        await axios.post('https://nameless-ravine-59157-5e1fd469c57a.herokuapp.com/auth', props.user);

        // Проверка данных авторизации
        const validateResponse = await axios.get('https://nameless-ravine-59157-5e1fd469c57a.herokuapp.com/validate');
        if (validateResponse.data !== 'User authorized') {
          throw new Error('User not authorized');
        }

        // Получение списка групп
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
</style> -->