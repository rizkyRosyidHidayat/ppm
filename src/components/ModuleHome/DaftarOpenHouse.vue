<template>
  <div class="card">
    <div class="card-header">
      <span class="h3">Daftar Open House</span>
    </div>
    <div class="card-body">
      <span v-if="keluarga.length === 0">
        <FormKeluarga @isEmpty="validasi"/>
      </span>
      <span v-else>
        <div class="alert alert-info">
          Silahkan pilih tanggal dan sesinya utk mengikuti
          Open House, setelah itu klik tombol Cetak undangan
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex">
            <div class="col-sm-6">Nama lengkap</div>
            <div class="col-sm-6">{{keluarga[0].nama_kel}}</div>
          </li>
          <li class="list-group-item d-flex">
            <div class="col-sm-6">No. Hp</div>
            <div class="col-sm-6">{{keluarga[0].telepon}}</div>
          </li>
          <li class="list-group-item d-flex">
            <div class="col-sm-6">Alamat</div>
            <div class="col-sm-6">{{keluarga[0].alamat}}</div>
          </li>
          <li class="list-group-item d-flex">
            <div class="col-sm-6">
              <span style="line-height: 68px;">Pilih tanggal</span>
            </div>
            <div class="col-sm-6">
              <v-select
                v-model="tgl"
                :items="dataTgl"
                item-text="text"
                item-value="value"
                label="Tanggal"
              ></v-select> 
            </div>
          </li>
          <li class="list-group-item d-flex">
            <div class="col-sm-6">
              <span style="line-height: 68px;">Pilih sesi</span>
            </div>
            <div class="col-sm-6">
              <v-select
                v-model="sesi"
                :items="dataSesi"
                item-text="text"
                item-value="value"
                label="Sesi"
              ></v-select>
            </div>
          </li>
        </ul>
        <div class="clearfix">
          <v-btn
            color="default"
            @click.prevent="hapus"
            class="float-right mt-3"
            :disabled="isDisabled"
          >
            <v-progress-circular
              indeterminate
              color="white"
              :size="25"
              v-if="isLoading"
            ></v-progress-circular>
            <span v-else>Hapus</span>
          </v-btn>
          <v-btn
            color="primary"
            class="float-right mt-3 mr-3"
            disabled
          >
            Cetak undangan
          </v-btn>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getKeluarga, deleteKeluarga } from "@/services"
import FormKeluarga from './DaftarOpenHouse/FormKeluarga'

export default {
  data: () =>({
    isEmpty: 0,
    isLoading: false,
    isDisabled: false,
    tgl: '',
    sesi: '',
    dataSesi: [],
    dataTgl:[
      {text: '5 September', value: '2019-09-05'},
      {text: '6 September', value: '2019-09-06'},
    ],
    dataSesiKamis:[
      {text: '1 - 08.00', value: '1'},
      {text: '2 - 08.00', value: '2'},
      {text: '3 - 08.00', value: '3'},
    ],
    dataSesiJumat:[
      {text: '1 - 08.00', value: '1'},
      {text: '2 - 08.00', value: '2'},
    ],
    
  }),

  components: {
    FormKeluarga,
  },
  

  methods: {
    hapus () {
      this.isLoading = true
      this.isDisabled = true
      this.$store.dispatch('deleteKeluarga')
        .then(res => {
          this.isLoading = false
          this.isDisabled = false
        })
    },

    validasi(e) {
      this.isEmpty = e
    }
  },

  watch: {
    tgl: function (val) {
      if (val === '2019-09-05') {
        this.dataSesi = this.dataSesiKamis
      } else if (val === '2019-09-06') {
        this.dataSesi = [...this.dataSesiJumat]
      }
    }
  },

  created () {
    this.$store.dispatch('getKeluarga')
  },

  computed: {
    ...mapState(['keluarga'])
  },
}
</script>

