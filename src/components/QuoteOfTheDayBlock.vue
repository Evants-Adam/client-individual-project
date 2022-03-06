<template>
  <div class="col-lg-6 pt-2">
    <div class="p-4">
      <blockquote class="blockquote p-3">
        <h4 class="title mb-3"> Quotes of the Day ({{ formattedDate }})</h4>
        <p class="text-muted mb-1 font-italic">{{ quoteOfTheDay.title }}</p>
        <p class="text-muted fw-bold mb-1 font-italic">{{ quoteOfTheDay.author }}</p>
      </blockquote>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuoteOfTheDayBlock',
  computed: {
    quoteOfTheDay () {
      return this.$store.state.quoteOfTheDay
    },
    formattedDate () {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date().toLocaleDateString('en-US', options)
    }
  }
}
</script>

<style>
</style>
