<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <p class="h1">
      Akun PPM
    </p>
    <div class="row">
      <v-text-field
        v-model="dataAkun.npm"
        :rules="npmRule"
        label="Nomor Mahasiswa"
        mask="##.##.####"
        class="col-lg-6 col-xs-12"
        required
        return-masked-value
      ></v-text-field> 
      <v-text-field
        v-model="dataAkun.password"
        :rules="passwordRule"
        label="Password"
        :type="show ? 'text':'password'"
        :append-icon="show ? 'visibility':'visibility_off'"      
        @click:append="show = !show"
        required
        class="col-lg-6 col-xs-12"
      ></v-text-field>
    </div>
    <div class="row">
      <v-text-field
        v-model="dataAkun.email"
        :rules="emailRules"
        label="Email"
        required
        class="col-lg-6 col-xs-12"
      ></v-text-field>
      <v-text-field
        v-model="dataAkun.hp"
        :rules="hpRule"
        label="No. Hp"
        mask="#### #### #####"
        required
        class="col-lg-6 col-xs-12"
      ></v-text-field> 
    </div>
    <v-btn
      color="primary"
      @click="validate"
      type="submit"
    >
      Next
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    dataAkun: {
      npm: '',
      password: '',
      email: '',
      hp: '',
    },
    show: false,
    emailRules: [
      v => !!v || 'Harus diisi ya :)',
      v => /.+@.+/.test(v) || 'Harus email ya ;)'
    ],
    requiredRule: [
      v => !!v || 'Harus diisi ya :)'
    ]
  }),

  computed: {
    npmRule () {
      let validProdi = ['01', '02', '11', '12', '21', '22', '60', '61', '62', '82', '83', '84', '85', '86', '91', '92', '93', '94', '95', '96']

      return [
       ...this.requiredRule,
        v => !!v.match(/\d{2}\.\d{2}\.\d{4}/g) || 'NPM tidak valid',
        v => validProdi.includes(v.split('.')[1]) || 'Kode prodi tidak ada'
      ]
    },

    passwordRule () {
      return [
       ...this.requiredRule,
        v => v.length >=6 || 'Minimal 6 karakter'
      ]
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
      if (this.$refs.form.validate()) {
        this.$store.commit('updateAkun', this.dataAkun)
        this.$emit('next-step', 2)
      }
    },
  }
}
</script>

