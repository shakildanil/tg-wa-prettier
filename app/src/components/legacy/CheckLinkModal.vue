<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <div class="modal-content">
        <p>Отменить проверку?</p>
        <div class="modal-actions">
          <button @click="confirmCancel" class="modal-button">Да</button>
          <button @click="closeModal" class="modal-button">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckLinkModal",
  methods: {
    closeModal() {
      this.$emit("close");
    },
    confirmCancel() {
      this.$emit("confirm");
    }
  }
//   
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 300px;
  width: 100%;
}

.modal-content {
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: space-around;
}

.modal-button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: #4C7BF4;
  color: white;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  cursor: pointer;
}

.modal-button:hover {
  background-color: #3a5bbf;
}
</style>
