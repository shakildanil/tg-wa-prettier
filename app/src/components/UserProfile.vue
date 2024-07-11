<template>
  <div class="background">
    <div class="profilePic"></div>
    <div class="user-info">
      Иван Иванов | @ivanov
    </div>
    <div class="info-block">
      <LinkInput />
      <ChannelSelect />
    </div>
  </div>
</template>

<script>
import LinkInput from './LinkInput.vue';
import ChannelSelect from './ChannelSelect.vue'

export default {
  name: 'UserProfile',
  components: {
    LinkInput,
    ChannelSelect
  }
};
</script>

<style scoped>
.background {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
}

.profilePic {
  background: url('../assets/img/durov.webp');
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.background-image {
  width: 100%;
  height: auto;
}

.info-block {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70%;
  background: #F9F8FA;
  border-radius: 20px 20px 0 0;
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-info {
  position: absolute;
  bottom: calc(70% + 20px);
  width: 60%;
  background: rgba(255, 255, 255, 0.5);
  padding: 4px 12px 4px 12px;
  gap: 10px;
  border-radius: 20px 20px 20px 20px;
  text-align: center;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
}
</style>
