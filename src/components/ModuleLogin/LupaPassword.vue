<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500px"
    >
      <template v-slot:activator="{on}">
        <v-btn
          color="primary"
          flat
          v-on="on"
        >
          lupa password
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Lupa password
        </v-card-title>
        <v-card-text>
          <div class="alert alert-info">
            Silahkan diisi dengan <b>email</b> yang anda masukan saat <b>mendaftar</b>.
          </div>
          <v-form
            lazy-validation
            ref="form"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
            ></v-text-field>
            <v-spacer></v-spacer> 
            <v-btn depressed @click="dialog = false">batal</v-btn>          
            <v-btn
              color="primary"
              @click.prevent="validate"
              type="submit"
              :disabled="isDisabled"
            >
              <v-progress-circular
                indeterminate
                color="white"
                :size="25"
                v-if="isLoading"
              ></v-progress-circular>
              <span v-else>Kirim</span>
            </v-btn>            
          </v-form>

          
          <v-snackbar
            v-model="snackbarError"
            top
            color="error"
          >
            email yang anda masukan salah :)
            <v-btn
              color="white"
              flat
              @click="closeSnackbar"
            >
              Close
            </v-btn>
          </v-snackbar>
          <v-snackbar
            v-model="snackbarSuccsess"
            top
            color="success"
          >
            Tolong lihat email anda untuk ubah password :)
            <v-btn
              color="white"
              flat
              @click="closeSnackbar"
            >
              Close
            </v-btn>
          </v-snackbar>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import {lupaPassword} from '@/services'

export default {
  data: () => ({
    dialog: false,
    emailRules: [
      v => !!v || 'Harus diisi ya :)',
      v => /.+@.+/.test(v) || 'Harus email ya ;)'
    ],
    email: '',
    snackbarError: false,
    snackbarSuccsess: false,
    isLoading: false,
    isDisabled: false,
  }),

  methods: {
    validate (e) {
      const email = {
        email: this.email,
      }
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.isDisabled = true
        lupaPassword(email)
          .then(res => {
            this.snackbarSuccsess = true
            this.isLoading = false
            this.isDisabled = false
          })
          .catch(err => {
            this.snackbarErorr = true
            this.isLoading = false
            this.isDisabled = false
          })
      }
    },

    closeSnackbar () {
      this.snackbarErorr = false
      this.snackbarSuccsess = false
    }
  },
}
</script>

<style>

</style>
