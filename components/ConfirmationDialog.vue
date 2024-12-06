<template>
  <div>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <button @click="handleResponse(false)">Cancelar</button>
        <button @click="handleResponse(true)">Confirmar</button>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationDialog",

  data() {
    return {
      isOpen: false,
      resolvePromise: null,
      title: '',
      message: '',
      confirmText: 'Sim',
      cancelText: 'Não'
    }
  },

  methods: {
    show(options = {}) {
      this.isOpen = true
      this.title = options.title
      this.message = options.message

      return new Promise((resolve) => {
        this.resolvePromise = resolve
      })
    },

    handleResponse(isConfirmed) {
      this.isOpen = false
      if (this.resolvePromise) {
        this.resolvePromise(isConfirmed)
        this.resolvePromise = null
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
}
</style>