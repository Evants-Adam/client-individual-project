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
                    <h3 class="fw-bold">Login</h3>
                  </div>
                  <LoginForm
                    @signInSubmit="signInSubmit"
                    @signUpClick="handleSignUpClick"
                  ></LoginForm>
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
import LoginForm from '@/components/LoginForm.vue'
export default {
  name: 'LoginPage',
  components: {
    LoginForm
  },
  methods: {
    signInSubmit (userCredentials) {
      this.$store.dispatch('signInSubmit', userCredentials)
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem('access_token', data.access_token)
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: true,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            this.$store.dispatch('getUserProfile')
            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully'
            })
            this.$router.push({ name: 'HomePage' })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.message
            })
          }
        })
        .catch((err) => console.log(err))
    },
    handleHomeIconClick () {
      this.$router.push('/')
    },
    handleSignUpClick  () {
      this.$router.push({ name: 'RegisterPage' })
    }
  }
  // mounted () {
  //   this.$nextTick(function () {
  //     this.$store.commit('SET_PRELOADER_STATE', true)
  //   })
  // }
}
</script>

<style></style>
