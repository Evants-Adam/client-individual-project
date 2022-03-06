<template>
<div>
  <form class="login-form" @submit.prevent="createQuoteSubmit">
    <div class="row">
      <div class="col-lg-12">
        <div class="form-group position-relative">
          <label>Title <span class="text-danger">*</span></label>
          <input type="text" class="form-control" placeholder="Quote" name="text" required=""
          v-model="quotes.title">
        </div>
      </div>
      <div class="col-lg-12">
        <div class="form-group position-relative">
          <label>Author <span class="text-danger">*</span></label>
          <input type="text" class="form-control" placeholder="Author" required=""
          v-model="quotes.author">
        </div>
      </div>
      <div class="col-lg-12">
        <div class="form-group position-relative">
          <label>Genre <span class="text-danger">*</span></label>
          <input type="text" class="form-control" placeholder="Genre"
          v-model="quotes.genre">
        </div>
      </div>
      <div class="col-lg-12 mb-0">
        <button class="btn btn-info w-100">Submit</button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
export default {
  name: 'CreateForm',
  data () {
    return {
      quotes: {
        id: '',
        title: '',
        author: '',
        genre: ''
      }
    }
  },
  computed: {
    chosenQuoteToEdit () {
      return this.$store.state.dataToEdit
    }
  },
  methods: {
    createQuoteSubmit () {
      this.$emit('createQuoteSubmit', this.quotes)
    }
  },
  created () {
    if (this.chosenQuoteToEdit) {
      this.quotes.id = this.chosenQuoteToEdit.id
      this.quotes.title = this.chosenQuoteToEdit.title
      this.quotes.author = this.chosenQuoteToEdit.author
      this.quotes.genre = this.chosenQuoteToEdit.genre
    }
  }
}
</script>

<style>
</style>
