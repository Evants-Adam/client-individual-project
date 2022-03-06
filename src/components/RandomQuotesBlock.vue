<template>
  <div class="col-lg-6 pt-2">
    <div class="p-4">
      <blockquote class="blockquote p-3">
        <h4 class="title mb-3"> Random Code Quote for You
          <a href="" class="btn btn-danger rounded-pill"
          @click.prevent="handleMoreClick">More!</a>
        </h4>
        <p class="text-muted mb-1 font-italic">{{ randomQuote.title }}</p>
        <p class="text-muted fw-bold mb-1 font-italic">{{ randomQuote.author }}</p>
      </blockquote>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RandomQuotesBlock',
  data () {
    return {
      polling: null
    }
  },
  methods: {
    handleMoreClick () {
      this.$store.dispatch('getRandomQuote')
    },
    pollData () {
      this.polling = setInterval(() => {
        this.$store.dispatch('getRandomQuote')
      }, 10000)
    }
  },
  computed: {
    randomQuote () {
      return this.$store.state.randomQuote
    }
  },
  created () {
    this.pollData()
  },
  beforeDestroy () {
    clearInterval(this.polling)
  }
}
</script>

<style>
</style>
