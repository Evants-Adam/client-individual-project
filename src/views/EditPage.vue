<template>
  <div>
    <div class="bg-overlay"></div>
    <div class="back-to-home rounded d-none d-sm-block">
      <a href="" @click.prevent="handleHomeIconClick" class="text-white rounded d-inline-block text-center"><i class="mdi mdi-home"></i></a>
    </div>
    <section id="bg-login" class="vh-100">
      <div class="home-center">
        <div class="home-desc-center">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6">
                <div class="login-page bg-white shadow rounded p-4">
                  <div class="text-center">
                    <h3 class="fw-bold">Create Quote</h3>
                  </div>
                  <CreateForm
                    @createQuoteSubmit="handleEditQuoteSubmit"
                  ></CreateForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import CreateForm from '@/components/CreateForm.vue'
export default {
  name: 'EditPage',
  components: {
    CreateForm
  },
  methods: {
    handleHomeIconClick () {
      this.$router.push('/')
    },
    handleEditQuoteSubmit (quotes) {
      this.$store.dispatch('postEditQuoteSubmit', quotes)
        .then((data) => {
          if (data.message !== 'Quote updated successfully') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.message
            })
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Nice!',
              text: 'Quote Edited Successfully'
            })
            this.$router.push({ name: 'AdminPage' })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>
