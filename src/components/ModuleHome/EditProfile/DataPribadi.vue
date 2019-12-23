<template>
  <div class="card mb-4">
    <div class="card-header">
      <span class="h3">Data Pribadi</span>
    </div>
    <div class="card-body">
      <v-form 
        ref="form"
        lazy-validation
      >
        <div class="row">      
          <v-text-field
            v-model="pribadi.nama"
            :rules="requiredRule"
            label="Nama Lengkap"
            required
            class="col-lg-6 col-xs-12"
          ></v-text-field>    
          <v-radio-group 
            v-model="pribadi.jk" 
            row 
            class="col-lg-6 col-xs-12"
            :rules="requiredRule"
            validate-on-blur
          >
            <v-radio label="Laki-laki" value="laki-laki" color="primary"></v-radio>
            <v-radio label="Perempuan" value="perempuan" color="primary"></v-radio>
          </v-radio-group> 
        </div>   
        <div class="row">
          <v-text-field
            v-model="pribadi.tempat_lahir"
            :rules="requiredRule"
            label="Tempat lahir"
            class="col-lg-6 col-xs-12"
            required
          ></v-text-field>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="pribadi.tgl_lahir"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="pribadi.tgl_lahir"
                label="Tanggal Lahir"
                prepend-icon="event"
                readonly
                v-on="on"
                class="col-lg-6 col-xs-12"
              ></v-text-field>
            </template>
            <v-date-picker 
              v-model="pribadi.tgl_lahir" 
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="save(pribadi.tgl_lahir)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </div> 
        <div class="row">
          <v-select
            v-model="pribadi.id_agama"
            :items="itemAgama"
            item-text="nama_agama"
            item-value="id_agama"
            :rules="requiredRule"
            label="Agama"
            required
            class="col-lg-6 col-xs-12"
          ></v-select>
          <v-text-field
            v-model="pribadi.slta_asal"
            :rules="requiredRule"
            label="Sekolah Asal"
            required
            class="col-lg-6 col-xs-12"
          ></v-text-field> 
        </div>
        <div class="clearfix">
          <div class="float-right">
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

export default {
  data: () => ({
      show: false,
      textNotif: '',
      dataPribadi: {
        nama: '',
        jk: null,
        id_agama: null,
        tgl_lahir: '',
        tempat_lahir: '',
        slta_asal: '',
      },
      modal: false,
      requiredRule: [
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
      isLoading: false,
      isDisabled: false,
   }),

  computed: {
    pribadi () {
      return this.$store.getters.getDataMhs
    }
  },

   methods: {
      validate(e){
        e.preventDefault()
        if (this.$refs.form.validate(e)) {
          this.dataPribadi.nama = this.pribadi.nama
          this.dataPribadi.jk = this.pribadi.jk
          this.dataPribadi.id_agama = this.pribadi.id_agama
          this.dataPribadi.tgl_lahir = this.pribadi.tgl_lahir
          this.dataPribadi.tempat_lahir = this.pribadi.tempat_lahir
          this.dataPribadi.slta_asal = this.pribadi.slta_asal

          this.$store.commit('updatePribadiMhs', this.dataPribadi)
          var dataPribadi = this.$store.getters.getDataMhs
          this.isLoading = true
          this.isDisabled = true
          editMhs(this.pribadi.npm, dataPribadi)
            .then( res => {      
              window.localStorage.setItem('userdata', JSON.stringify(dataPribadi))        
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
      },
      save(tgl_lahir){
        this.$refs.dialog.save(tgl_lahir)
      }
   },
}
</script>

<style>

</style>
