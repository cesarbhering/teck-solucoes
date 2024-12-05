<template>
  <div>
    <FeedbackMessage :message="feedback.message" :type="feedback.message" @closeFeedback="handleCloseFeedback"/>
    <NuxtPage @showFeedback="handleFeedback"/>
  </div>
</template>
<script lang="ts">
import type { Feedback } from '~/types/Feedback';
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
    handleFeedback({message, type}: Feedback) {
      this.feedback.message = message
      this.feedback.type = type
    },

    handleCloseFeedback () {
      debugger
      this.feedback.message = ""
      this.feedback.type = ""
    }
  },
})
</script>