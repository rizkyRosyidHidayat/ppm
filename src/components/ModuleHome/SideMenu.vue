<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="media">
        <div class="media-body ml-2">
          <img src="../../assets/logo2.png" alt="logo" height="48px">
        </div>
      </div>
    </div>
    <div class="card-footer bg-white p-0">
      <v-list>
        <v-list-tile 
          v-for="item in menu"
          :key="item.text"
          :to="item.link"
          active-class="primary--text decoration-none"
          exact
        >          
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="item.text"></v-list-tile-title>
          </v-list-tile-content>          
        </v-list-tile>  

        <!-- list group -->
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-tile active-class="primary--text decoration-none">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile
            active-class="primary--text decoration-none"
            v-for="subItem in item.items"
            :key="subItem.title"
            :to="subItem.link"
          >          
            <v-list-tile-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile 
          active-class="primary--text decoration-none"
          :to="{name: 'home.bantuan'}"
          exact
        >          
          <v-list-tile-action>
            <v-icon>help</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Bantuan</v-list-tile-title>
          </v-list-tile-content>          
        </v-list-tile>

        <v-list-tile 
          active-class="primary--text decoration-none"
          @click="logout"
          exact
        >          
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Keluar</v-list-tile-title>
          </v-list-tile-content>          
        </v-list-tile>
      </v-list>
    </div>
  </div>
</template>

<script>
import { getKelompok } from "@/services";
export default {
  data: () => ({
    menu: [
      { text: 'Dashboard', icon: 'home', link: '/home' },
      { text: 'Daftar Open House', icon: 'receipt', link: {name: 'home.daftar'} },
      { text: 'Edit Profile', icon: 'edit', link: {name: 'home.edit'} },
    ],

    items: [
      {
        action: 'add_box',
        title: 'Data Tambahan',
        items: [
          {title: 'Data Prestasi', icon: 'stars', link: {name: 'home.prestasi'}},
          {title: 'Data Penyakit', icon: 'healing', link: {name: 'home.penyakit'}},
        ]
      }
    ],
  }),

  methods: {
    logout () {
      window.localStorage.removeItem('userdata')
      window.localStorage.removeItem('auth_token');      
      this.$router.replace({ name: 'login' })      
    }
  },
}
</script>

<style lang="stylus">
.decoration-none
  text-decoration: none !important

.v-list__tile--link:hover
  text-decoration: none !important

.v-list__group__items--no-action .v-list__tile
  padding-left: 16px !important;
</style>

