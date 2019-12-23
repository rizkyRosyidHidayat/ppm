<template>
  <v-form 
    ref="form"
    lazy-validation
  >
    <!-- npm -->
    <v-text-field
      v-model="npm"
      :rules="npmRules"
      label="Nomor Mahasiswa"
      mask="##.##.####"
      return-masked-value
      required
    ></v-text-field>
    <!-- password -->
    <v-text-field
      v-model="password"
      :rules="passwordRule"
      label="Password"
      :type="show ? 'text':'password'"
      :append-icon="show ? 'visibility':'visibility_off'"      
      @click:append="show = !show"
      required
    ></v-text-field>
    <!-- btn group -->
    <div class="d-flex">    
      <div>
        <LupaPassword/>
      </div>   
      <div class="clearfix">
        <v-btn   
          @click="validate"
          color="primary"
          type="submit"
          class="float-right"
          :disabled="isDisabled"
        >
          <v-progress-circular
            indeterminate
            color="white"
            :size="25"
            v-if="isLoading"
          ></v-progress-circular>
          <span v-else>Login</span>
        </v-btn>
      </div>
    </div>
    <v-snackbar
      v-model="snackbar"
      top
      color="error"
    >
      Login gagal, username atau password salah :(
      <v-btn
        color="white"
        flat
        @click="closeSnackbar"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>
import { postLogin } from '@/services'
import LupaPassword from './LupaPassword'

export default {
  components: {
    LupaPassword,
  },

  data: () => ({
      snackbar: false,
      npm: '',
      password: '',
      requiredRules: [
        v => !!v || 'Harus diisi ya :)',        
      ],
      isLoading: false,
      isDisabled: false,
      show: false,
  }),

  computed: {
    npmRules () {
      let validProdi = ['01', '02', '11', '12', '21', '22', '60', '61', '62', '82', '83', '84', '85', '86', '91', '92', '93', '94', '95', '96']

      return [
       ...this.requiredRules,
        v => !!v.match(/\d{2}\.\d{2}\.\d{4}/g) || 'NPM tidak valid',
        v => validProdi.includes(v.split('.')[1]) || 'Kode prodi tidak ada'
      ]
    },

    passwordRule () {
      return [
        ...this.requiredRules,
        v => v.length >= 6 || 'Minimal 6 karakter'
      ]
    }
  },

  methods: {
    validate (e) {
      e.preventDefault();
      const dataLogin = {
        npm: this.npm,
        password: this.password
      }
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.isDisabled = true
        postLogin(dataLogin)
          .then(res => {
            this.$store.commit('updateMhs', res.data.data)
            this.$router.replace({ name: 'home.dashboard' })
          })        
          .catch(err=>{
            this.snackbar = true
            this.isLoading = false
            this.isDisabled = false
          })
      }
    },
    closeSnackbar(){
      this.snackbar = false
    }
  }
}
</script>

