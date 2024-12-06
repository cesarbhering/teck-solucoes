<template>
  <transition name="message-fade">
    <div v-if="message" :class="['message', `message--${type}`]">
      <span class="text">{{ message }}</span>
    </div>
  </transition>
</template>
<script lang="ts">

export default defineNuxtComponent({
  name: 'FeedbackMessage',

  props: {
    type: {
      type: String,
      default: 'info'
    },
    message: {
      type: String,
      required: true
    }
  },

  watch: {
    message(newValue, _oldValue) {
      if (newValue) {
        setTimeout(() => {
          this.$emit('update:message', "")
          this.$emit('update:type', "")
        }, 3000);
      }
    }
  }

})
</script>
<style scoped>
.message {
  position: absolute;
  top: 8%;
  left: 50%;
  z-index: 2;
  min-width: 200px;
  border-radius: 4px;
  padding: 14px;
}

.message--success {
  background-color: #669BBC;
  color: white;
}

.message-fade-enter-active,
.message-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}
</style>