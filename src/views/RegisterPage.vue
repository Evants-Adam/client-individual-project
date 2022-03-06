<template>
  <div>
    <div class="bg-overlay"></div>
    <div class="back-to-home rounded d-none d-sm-block">
      <a href="" @click.prevent="handleHomeClick" class="text-white rounded d-inline-block text-center"><i class="mdi mdi-home"></i></a>
    </div>
    <section id="bg-register" class="vh-100">
      <div class="home-center">
        <div class="home-desc-center">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-6">
                <div class="login_page bg-white shadow rounded p-4">
                  <div class="text-center">
                    <h4 class="mb-4 fw-bold">Register</h4>
                  </div>
                  <RegisterForm
                    @newUserRegisterSubmit="newUserRegisterSubmit"
                    @handleSignInClick="handleSignInClick"
                  ></RegisterForm>
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
import RegisterForm from '@/components/RegisterForm.vue'
export default {
  name: 'RegisterPage',
  components: {
    RegisterForm
  },
  methods: {
    newUserRegisterSubmit (newUserCredentials) {
      this.$store.dispatch('registerSubmit', newUserCredentials)
        .then((data) => {
          if (data.id || data.email) {
            Swal.fire({
              icon: 'success',
              title: 'Register Success!'
            })
            this.$router.push({ path: 'login' })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.messages
            })
          }
        })
        .catch((error) => console.log(error))
    },
    handleSignInClick () {
      this.$router.push({ path: 'login' })
    },
    handleHomeClick () {
      this.$router.push({ path: '/' })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$store.commit('SET_PRELOADER_STATE', true)
    })
  }
}
</script>

<style>
  #bg-register {
    background: url('@/assets/huper-by-joshua-earle-5lgPYsE_qe0-unsplash.jpg');
    background-size: cover;
    position: relative;
    background-position: center center;
  }
</style>
