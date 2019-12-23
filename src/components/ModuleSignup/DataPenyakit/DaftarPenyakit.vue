<template>
  <div class="card">
    <div class="card-header">      
      <p class="h3">
        Penyakit
      </p>
    </div>
    <div class="card-body">
      <div class="alert alert-info">
        Jika kamu tidak mempunyai penyakit yang sewaktu-waktu bisa kambuh,
         tidak perlu di isi tidak apa - apa
      </div>
      <v-autocomplete
        v-model="penyakit" 
        :items="jenis"
        chips
        color="blue-grey lightn-2"
        label="Masukan penyakit"
        item-text="nama_penyakit"
        return-object
        multiple
      >
        <template v-slot:selection="data">
          <v-chip
            :selected="data.selected"
            close
            @input="remove(data.item)"
          >
            {{ data.item.nama_penyakit }}
          </v-chip>
        </template>
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-tile-content v-text="data.item"></v-list-tile-content>
          </template>
          <template>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.nama_penyakit"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </template>
      </v-autocomplete>
      <div class="clearfix">
        <v-btn 
          color="primary" 
          @click="simpan"
          class="float-right"
        >
          Simpan
        </v-btn> 
      </div>
      <!--  -->
    </div>

    <div class="card-body"> 
      <div class="h3">Daftar Penyakit</div>     
      <DataPenyakitMhs/>
    </div>
  </div>
</template>

<script>
import differenceWith from 'lodash/differenceWith'
import { getFullPenyakit, postPenyakit } from "@/services";
import DataPenyakitMhs  from "./DataPenyakitMhs";

export default {
  data: () => ({
    penyakit: [],
    jenis: [],
  }),

  created () {
    getFullPenyakit()
      .then(res => {
        var penyakitMhs = this.$store.getters.getDataPenyakit
        this.jenis = differenceWith(res.data.data, penyakitMhs, (val, otherVal) => val.id_np === otherVal.id_np)        
      })    
  },

  components: {
    DataPenyakitMhs,
  },

  computed: {
    dataMhs () {
      return this.$store.getters.getDataMhs
    },
  },

  methods: {
    remove (item) {
      const index = this.penyakit.indexOf(item)
      if (index >= 0) this.penyakit.splice(index, 1)
    },
    simpan () {
      const dataPenyakit = {
        npm: this.dataMhs.npm,
        penyakit: this.penyakit.map(val => val.id_np),
      }
      if (this.penyakit.length !== 0) {
        this.$store.dispatch('postPenyakit', dataPenyakit)
          .then(res => {
            console.log('berhasil')
          })
      }
    }
  }
}
</script>
