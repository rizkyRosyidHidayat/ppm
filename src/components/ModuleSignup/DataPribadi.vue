<template>
  <v-form 
    ref="form"
    v-model="valid"
    lazy-validation
  >    
    <p class="h1">
      Data Pribadi
    </p>
    <!-- upload foto -->
    <Cropper/>
    <v-snackbar
      v-model="snackbar"
      top
      color="error"
    >
      Foto di upload dulu ya :)
      <v-btn
        color="white"
        flat
        @click="closeSnackbar"
      >
        Close
      </v-btn>
    </v-snackbar>

    <div class="row">      
      <v-text-field
        v-model="dataPribadi.nama"
        :rules="msg"
        label="Nama Lengkap"
        required
        class="col-lg-6 col-xs-12"
      ></v-text-field>    
      <v-radio-group 
        v-model="dataPribadi.jk" 
        row 
        class="col-lg-6 col-xs-12"
        :rules="msg"
        validate-on-blur
      >
        <v-radio label="Laki-laki" value="laki-laki" color="primary"></v-radio>
        <v-radio label="Perempuan" value="perempuan" color="primary"></v-radio>
      </v-radio-group> 
    </div>   
    <div class="row">
      <v-text-field
        v-model="dataPribadi.tempat_lahir"
        :rules="msg"
        label="Tempat lahir"
        class="col-lg-6 col-xs-12"
        required
      ></v-text-field>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="dataPribadi.tgl_lahir"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dataPribadi.tgl_lahir"
            label="Tanggal Lahir"
            prepend-icon="event"
            readonly
            v-on="on"
            class="col-lg-6 col-xs-12"
          ></v-text-field>
        </template>
        <v-date-picker 
          v-model="dataPribadi.tgl_lahir" 
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="save(dataPribadi.tgl_lahir)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
    </div> 
    <div class="row">
      <v-select
        v-model="dataPribadi.id_agama"
        :items="itemAgama"
        item-text="nama_agama"
        item-value="id_agama"
        :rules="msg"
        label="Agama"
        required
        class="col-lg-6 col-xs-12"
      ></v-select>
      <v-text-field
        v-model="dataPribadi.slta_asal"
        :rules="msg"
        label="Sekolah Asal"
        required
        class="col-lg-6 col-xs-12"
      ></v-text-field> 
    </div>
    <v-btn flat @click="back">
      Back
    </v-btn>
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
  import Cropper from './DataPribadi/Cropper'

  export default {
   data: () => ({
      valid: true,
      dataPribadi: {
        nama: '',
        jk: null,
        id_agama: null,
        tgl_lahir: '2001-01-01',
        tempat_lahir: '',
        slta_asal: '',
      },
      modal: false,
      msg: [
        v => !!v || 'Harus diisi ya :)',        
      ],
      itemAgama: [
        {"id_agama": 1, "nama_agama": 'Islam'},
        {"id_agama": 3, "nama_agama": 'Kristen'},
        {"id_agama": 4, "nama_agama": 'Katholik'},
        {"id_agama": 2, "nama_agama": 'Hindu'},
        {"id_agama": 5, "nama_agama": 'Budha'},
        {"id_agama": 6, "nama_agama": 'Lainnya'},
      ],
      snackbar: false,
   }),
   methods: {
      validate(e){
        e.preventDefault()
        if (this.$refs.form.validate(e)) {
          this.$store.commit('updatePribadi', this.dataPribadi)
          if (this.foto.foto) {
            this.$emit('next-step', 3)
          } else {
            this.snackbar = true
          }
          
        }
      },
      save(tgl_lahir){
        this.$refs.dialog.save(tgl_lahir)
      },
      back () {
        this.$emit('next-step', 1)
      },
      closeSnackbar () {
        this.snackbar = false
      }
   },

   computed: {
     foto () {
       return this.$store.getters.getDataPeserta
     }
   },

    components: {
      Cropper,
    },
  }
</script>
<style lang="stylus">
  label 
    margin-bottom 0
</style>

