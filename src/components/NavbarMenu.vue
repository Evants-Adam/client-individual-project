<template>
  <header id="topnav" class="defaultscroll scroll-active">
    <div class="container">
      <div>
        <a class="logo">
            <img src="" alt="" class="logo-dark" height="50" />
        </a>
      </div>
      <div id="navigation">
        <ul class="navigation-menu">
          <li class="has-submenu">
            <a href="" @click.prevent="handleHomeClick">Home</a>
          </li>
          <li class="has-submenu">
            <a >Categories</a><span class="menu-arrow"></span>
            <ul class="submenu">
              <li><a href="" @click.prevent="handleCategoryOriginal">Our Original List</a></li>
              <li><a href="" @click.prevent="handleCategoryProgramming">Programming</a></li>
              <li><a href="" @click.prevent="handleCategoryCoding">Code</a></li>
            </ul>
          </li>
          <li class="has-submenu" v-if="getUserProfile.role === 'Admin'">
            <a >Admin Menu</a><span class="menu-arrow"></span>
            <ul class="submenu">
              <li><a href="" @click.prevent="handleCreateClick">Create Quote</a></li>
              <li><a href="" @click.prevent="handleListClick">All Original Quotes</a></li>
            </ul>
          </li>
          <li class="has-submenu" v-if="getUserProfile">
            <a >Profile</a><span class="menu-arrow"></span>
            <ul class="submenu">
              <li><a>Hi {{ getUserProfile.email }}</a></li>
              <li><a href="" @click.prevent="handleSubscriptionClick">View My Subscription</a></li>
              <li><a href="" @click.prevent="handleSignOutClick">Sign Out</a></li>
            </ul>
          </li>
          <li class="has-submenu" v-else>
            <a href="" @click.prevent="handleLoginClick">Login / Register</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'NavbarMenu',
  computed: {
    isLogin () {
      if (localStorage.getItem('access_token')) return true
      else return false
    },
    getUserProfile () {
      return this.$store.state.userProfile
    }
  },
  methods: {
    handleCreateClick () {
      this.$router.push({ name: 'CreatePage' })
    },
    handleListClick () {
      this.$router.push({ name: 'AdminPage' })
    },
    handleCategoryOriginal () {
      this.$store.commit('SET_PRELOADER_STATE', false)
      this.$emit('clearFilter')
      this.$router.push({ path: '/home', query: { page: 1, genre: 'original' } })
      this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: 'original' })
        .then(() => {
          this.$nextTick(function () {
            this.$store.commit('SET_PRELOADER_STATE', true)
          })
        })
    },
    handleCategoryProgramming () {
      this.$store.commit('SET_PRELOADER_STATE', false)
      this.$emit('clearFilter')
      this.$router.push({ path: '/home', query: { page: 1, genre: 'programming' } })
      this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: 'programming' })
        .then(() => {
          this.$nextTick(function () {
            this.$store.commit('SET_PRELOADER_STATE', true)
          })
        })
    },
    handleCategoryCoding () {
      this.$store.commit('SET_PRELOADER_STATE', false)
      this.$emit('clearFilter')
      this.$router.push({ path: '/home', query: { page: 1, genre: 'coding' } })
      this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: 'coding' })
        .then(() => {
          this.$nextTick(function () {
            this.$store.commit('SET_PRELOADER_STATE', true)
          })
        })
    },
    handleSignInClick () {
      this.$router.push({ name: 'LoginPage' })
    },
    handleHomeClick () {
      this.$router.push({ path: '/home', query: { page: 1 } })
    },
    handleSignOutClick () {
      this.$store.dispatch('signOutSubmit')
        .then(() => {
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
          Toast.fire({
            icon: 'success',
            title: 'Signed out successfully'
          })
          this.$router.push({ name: 'DefaultPage' })
        })
    },
    subscriptionDispatcher (stats) {
      return this.$store.dispatch('changeSubscriptionStatus', { isSubscribe: stats })
    },
    handleSubscriptionClick () {
      const statusSubscribe = this.$store.state.userProfile.isSubscribe
      if (statusSubscribe === false) {
        Swal.fire({
          title: `Hi ${this.getUserProfile.email}`,
          text: 'Thanks for registering. As of now, you are not subscribing to our daily motivational quotes mailing list, do you want to subscribe? It is free!',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yeash!'
        })
          .then((result) => {
            if (result.isConfirmed) {
              return this.subscriptionDispatcher(true)
            }
            return false
          })
          .then((res) => {
            if (res === false) return false
            return this.$store.dispatch('getUserProfile')
          })
          .then((res) => {
            if (res === false) return false
            Swal.fire(
              'Success!',
              'Your subcription is active now, and you will receive our daily mail!',
              'success'
            )
          })
      } else {
        Swal.fire({
          title: `Hi ${this.getUserProfile.email}`,
          text: 'Glad to see you back. You are currently an active subscriber to our daily motivation quotes mailing list. Do you want to stop subscribing? :")',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Um.. yes?'
        })
          .then((result) => {
            if (result.isConfirmed) {
              return this.subscriptionDispatcher(false)
            }
            return false
          })
          .then((res) => {
            if (res === false) return false
            return this.$store.dispatch('getUserProfile')
          })
          .then((res) => {
            if (res === false) return false
            Swal.fire(
              'Success!',
              'Your subcription status is not active now.',
              'success'
            )
          })
          .catch(() => console.log())
      }
    },
    handleLoginClick () {
      this.$router.push({ name: 'LoginPage' })
    },
    handleScroll (event) {
      const header = document.querySelector('#topnav')
      if (window.scrollY > 25) {
        header.classList.add('scroll')
      } else {
        header.classList.remove('scroll')
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
 #topnav {
   max-width: 100%;
 }
</style>
