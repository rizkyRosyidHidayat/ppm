<template>
  <div class="mb-3">
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
      <v-btn depressed>
        <label for="uploadFile">
            Upload foto
        </label>
      </v-btn>
      <v-btn depressed color="primary" @click.prevent="crop()">
        <v-icon>crop</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    cropped: null,
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
        this.$store.commit('updateFoto', output)
      });
    },
    rotate(rotationAngle) {
        // Rotates the image
        this.$refs.croppieRef.rotate(rotationAngle);
    }
  }
}
</script>

<style>

</style>
