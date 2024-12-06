<template>
  <div class="app-container">
    <FeedbackMessage v-model:message="feedback.message" v-model:type="feedback.type" />
    <NuxtPage @showFeedback="handleFeedback" />
  </div>
</template>
<script lang="ts">
import type { Feedback } from '~/types/types';
export default defineNuxtComponent({

  name: "defaultLayout",

  data() {
    return {
      feedback: {
        message: "",
        type: ""
      }
    }
  },

  methods: {
    handleFeedback({ message, type }: Feedback) {
      this.feedback.message = message
      this.feedback.type = type
    }
  },
})
</script>
<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  display: block;
  margin: 0px;
  overflow-x: hidden;
  background-color: #FDF0D5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', Arial, sans-serif;
}

button {
  border: none;
  background-color: #003049;
  border-radius: 6px;
  padding: 8px;
  font-weight: 700;
  color: white;
}

button:hover {
  background-color: #669BBC;
  color: white;
}
</style>