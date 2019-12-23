<template>
  <v-app class="purple darken-3">
    <router-view/>
  </v-app>  
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  },

  created () {
    const userdata = window.localStorage.getItem('userdata')    
    const mhs = JSON.parse(userdata)
    this.$store.commit('updateMhs', mhs)
    
  }
}
</script>
