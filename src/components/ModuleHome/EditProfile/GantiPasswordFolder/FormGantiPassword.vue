<template>
  <v-form 
    ref="form"
    lazy-validation
  >
    <v-text-field
      v-model="gantiPassword.password_lama"
      :rules="passwordRule"
      label="Password lama"
      :type="showLama ? 'text':'password'"
      :append-icon="showLama ? 'visibility':'visibility_off'"      
      @click:append="showLama = !showLama"
      required
    ></v-text-field>
    <v-text-field
      v-model="gantiPassword.password_baru"
      :rules="passwordRule"
      label="Password baru"
      :type="showBaru ? 'text':'password'"
      :append-icon="showBaru ? 'visibility':'visibility_off'"      
      @click:append="showBaru = !showBaru"
      required
    ></v-text-field>
    <v-text-field
      v-model="passwordConfirm"
      :rules="passwordRule"
      label="Confirmasi password"
      :type="showConfirm ? 'text':'password'"
      :append-icon="showConfirm ? 'visibility':'visibility_off'"      
      @click:append="showConfirm = !showConfirm"
      required
    ></v-text-field>
    <!-- btn group --> 
    <div class="clearfix">
      <div class="float-right">
        <v-btn depressed @click="hideModal">batal</v-btn>
        <v-btn   
          @click="validate"
          color="primary"
          type="submit"
          :disabled="isDisabled"
        >
          <v-progress-circular
            indeterminate
            color="white"
            :size="25"
            v-if="isLoading"
          ></v-progress-circular>
          <span v-else>Simpan</span>
        </v-btn> 
      </div>
    </div> 
    <v-snackbar
      v-model="ifError"
      top
      color="error"
    >
      proses gagal tolong dilihat kembali password lama dan Confirmasi
      passwordnya
      <v-btn
        color="white"
        flat
        @click="closeSnackbar"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="ifSuccess"
      top
      color="success"
    >
      Password berhasil diganti
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
import { gantiPassword } from '@/services'

export default {
  data: () => ({
      ifError: false,
      ifSuccess: false,
      gantiPassword: {
        npm: '',
        password_lama: '',
        password_baru: '',
      },    
      passwordConfirm: '',  
      requiredRules: [
        v => !!v || 'Harus diisi ya :)',        
      ],
      isLoading: false,
      isDisabled: false,
      showLama: false,
      showBaru: false,
      showConfirm: false,
  }),

  computed: {
    passwordRule () {
      return [
        ...this.requiredRules,
        v => v.length >= 6 || 'Minimal 6 karakter'
      ]
    },

    dataMhs () {
      return this.$store.getters.getDataMhs
    }
  },

  methods: {
    validate (e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.isDisabled = true
        if (this.gantiPassword.password_baru === this.passwordConfirm) {
          this.gantiPassword.npm = this.dataMhs.npm
          console.log(this.gantiPassword)
          gantiPassword(this.gantiPassword)
            .then(data => {  
              this.ifSuccess = true            
              this.isLoading = false
              this.isDisabled = false
            })        
            .catch(err=>{
              this.ifError = true
              this.isLoading = false
              this.isDisabled = false
            })
        } else {
          this.ifError = true
          this.isLoading = false
          this.isDisabled = false
        }
      }
    },

    closeSnackbar(){
      this.ifError = false
      this.ifSuccess = false
    },

    hideModal () {
      this.$emit('dialog', false)
    }
  }
}
</script>

