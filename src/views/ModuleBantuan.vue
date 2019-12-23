<template>
  <div class="col-lg-6 col-md-8 col-xs-12 m-auto my-5">
    <div class="card border-0">
      <div class="card-header bg-white">
        <a href="/">
          <img src="../assets/logo.png" alt="logo"/>
        </a>
      </div>
      <div class="card-body p-0">
        <v-expansion-panel class="mb-0">
          <v-expansion-panel-content
            v-for="(item,i) in items"
            :key="i"
          >
            <template v-slot:header>
              <div>{{ item.pertanyaan }}</div>
            </template>
            <v-card>
              <v-card-text v-html="item.jawaban"></v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { getFAQ } from "@/services";
import Footer from'../components/Footer';
export default {
  components:{
    Footer,
  },
  data: () => ({
    items: [],
  }),
  
  created () {
    getFAQ()
      .then(res => {
        this.items = res.data.data
      })
  },
}
</script>

<style>

</style>
