<template>
  <div>
    <FeedbackMessage v-model:message="feedback.message" v-model:type="feedback.message" />
    <NuxtPage @showFeedback="handleFeedback" :style="{ backgroundColor: 'red' }" />
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