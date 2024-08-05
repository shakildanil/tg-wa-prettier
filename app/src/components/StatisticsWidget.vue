<template>
  <div class="statistics-widget">
    <p class="message">You haven’t earned any cashback yet</p>
    <p class="amount">£0</p>
    <p class="link">Tap to explore</p>
  </div>
</template>

<script>
export default {
  name: 'StatisticsWidget',
};
</script>

<style scoped>
.statistics-widget {
  width: calc(100% - 40px); /* 30px padding on each side */
  margin: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.message {
  color: #6B7280; /* gray-500 color */
  font-size: 16px;
  margin-bottom: 10px;
}

.amount {
  color: #000;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}

.link {
  color: #007bff; /* blue color for the link */
  font-size: 16px;
  cursor: pointer;
}
</style>
