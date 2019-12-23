<template>
  <div>
      <vue-croppie 
        ref="croppieRef"
        :enable-resize="false"
        :boundary="{height: 300}"
        :viewport="{ width: 150, height: 200 }"
      />
      <img v-bind:src="cropped" v-if="cropped" class="img-thumbnail"/>  
      
      <input 
        type="file" 
        ref="avatarFile" 
        id="uploadFile"
        @change="handleUpload"
        accept="image/jpeg"
        required
        class="d-none"
      />
              
      <div class="alert alert-info mt-3">
        Setelah memilih foto dan ukurannya jangan lupa diklik tombol
        <b>crop</b>
      </div>
      <!-- Rotate angle is Number -->
      <div class="mt-3">        
        <div class="clearfix">
          <div class="float-left">
            <v-btn depressed>
              <label for="uploadFile">
                  Upload foto
              </label>
            </v-btn>
            <v-btn depressed color="primary" @click.prevent="crop()">
              <v-icon>crop</v-icon>
            </v-btn>
          </div>
          <div class="float-right">
            <v-btn 
              depressed 
              color="primary" 
              @click="simpan"
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
      </div>      
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
</template>

<script>
import { editMhs } from "@/services";

export default {
  data: () => ({
    cropped: null,
    isLoading: false,
    isDisabled: false,
    foto: '',
    show: false,
    textNotif: '',
  }),

  methods: {
    handleUpload (e) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        // console.log(reader.result)
        this.$refs.croppieRef.bind({
          url: reader.result
        })
      })

      reader.readAsDataURL(this.$refs.avatarFile.files[0])
    },

    bind() {
        // Randomize cat photos, nothing special here.
        let url = this.images[Math.floor(Math.random() * 4)]

        // Just like what we did with .bind({...}) on 
        // the mounted() function above.
        this.$refs.croppieRef.bind({
            url: url,
        });
    },
    // CALBACK USAGE
    crop(e) {
      // Here we are getting the result via callback function
      // and set the result to this.cropped which is being 
      // used to display the result above.
      let options = {
        type: 'base64',
        format: 'jpeg', 
        circle: false
      }
      this.$refs.croppieRef.result(options).then((output) => {
        this.cropped = output;
      });
    },
    simpan () {
      var dataMhs = Object.assign(this.mhs, {foto: this.cropped})
      this.isLoading = true
      this.isDisabled = true
      editMhs(this.mhs.npm, dataMhs)
        .then(res => {
          this.isLoading = false
          this.isDisabled = false
          this.show = true
          this.textNotif = 'Data berhasil diedit'
        })
        .catch(err => {
          this.isLoading = false
          this.isDisabled = false
          this.show = true
          this.textNotif = 'Data gagal diedit'
        })
    },
  },

  computed: {
    mhs () {
      return this.$store.getters.getDataMhs
    }
  },
}
</script>

<style>

</style>
