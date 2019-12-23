<template>
  <div class="card mb-4">
    <div class="card-header">
      <span class="h3">
        Akun PPM
      </span>
    </div>
    <div class="card-body">
      <v-form
        ref="form"
        lazy-validation
      >
        <div class="row">
          <v-text-field
            v-model="akun.npm"
            label="Nomor Mahasiswa"
            mask="##.##.####"
            class="col-lg-12 col-xs-12"
            required
            return-masked-value
            disabled
          ></v-text-field> 
        </div>
        <div class="row">
          <v-text-field
            v-model="akun.email"
            :rules="emailRules"
            label="Email"
            required
            class="col-lg-6 col-xs-12"
          ></v-text-field>
          <v-text-field
            v-model="akun.hp"
            :rules="hpRule"
            label="No. Hp"
            mask="#### #### #####"
            required
            class="col-lg-6 col-xs-12"
          ></v-text-field> 
        </div>
        <div class="clearfix">
          <div class="float-right">
            <GantiPassword/>
            <v-btn
              color="primary"
              @click="validate"
              type="submit"
              :disabled="isDisabled"
            >
              <v-progress-circular
                indeterminate
                color="white"
                :size="25"
                v-if="isLoading"
              ></v-progress-circular>
              <span v-else>Edit</span>
            </v-btn>
          </div>
        </div>
      </v-form>
      <v-snackbar
        v-model="show"
        :timeout="2000"
        absolute
        bottom
        left
      >
        {{ textNotif }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { editMhs } from '@/services'
import GantiPassword from './GantiPassword'

export default {
  data: () => ({
    dataAkun: {
      npm: '',
      email: '',
      hp: '',
    },
    show: false,
    textNotif: 'data berhasil diedit',
    emailRules: [
      v => !!v || 'Harus diisi ya :)',
      v => /.+@.+/.test(v) || 'Harus email ya ;)'
    ],
    requiredRule: [
      v => !!v || 'Harus diisi ya :)'
    ],
    isLoading: false,
    isDisabled: false,
  }),

  components: {
    GantiPassword,
  },

  computed: {
    akun () {
      return this.$store.getters.getDataMhs
    },

    hpRule () {
      return [
        ...this.requiredRule,
        v => v.length >= 11 || 'Minimal 11 karakter'
      ]
    }
  },

  methods: {
    validate (e) {
      e.preventDefault()
      if (this.$refs.form.validate(e)) {
        this.dataAkun.npm = this.akun.npm
        this.dataAkun.email = this.akun.email
        this.dataAkun.hp = this.akun.hp
        this.$store.commit('updateAkunMhs', this.dataAkun)
        var dataAkun = this.$store.getters.getDataMhs
        this.isLoading = true
        this.isDisabled = true
        editMhs(this.akun.npm, dataAkun)
          .then( res => {
            window.localStorage.setItem('userdata', JSON.stringify(dataAkun))
            this.show = true
            this.textNotif = 'Data berhasil diedit'
            this.isLoading = false
            this.isDisabled = false
          })
          .catch( err => {
            this.show = true
            this.textNotif = 'Data gagal diedit'
            this.isLoading = false
            this.isDisabled = false
          })
      }
    }
  },
}
</script>

<style>

</style>
