<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2" md="10">
          <h1>Liste de vos modules</h1>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <v-btn text @click="signOut">Logout</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="2" md="12">
        <div v-for="module in this.modules" :key="module.id">
          <v-row>
            <v-col cols="12" sm="2" md="3">
              <h2>{{ module.name }}</h2>
            </v-col>
            <v-col cols="12" sm="2" md="2">
            <div class="my-2">
              <v-btn text small color="primary" @click="consult(module.id)">Consulter</v-btn>
            </div>
            </v-col>
          </v-row>
          <Sessions :moduleId="module.id"/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import Sessions from './Sessions.vue'
export default {

  name: 'modules',
  components: {
    Sessions
  },
  data: () => ({
  }),

  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('user', ['isAuthenticated'])
  },
  async mounted () {
    await this.fetchModules().then(() => { console.log('All modules fetched') })
  },
  methods: {
    ...mapActions('user', ['logout']),
    ...mapActions('modules', ['fetchModules']),

    signOut () {
      this.logout()
      if (this.isAuthenticated === false) {
        this.$router.push({ name: 'login' })
      }
    },
    consult: function (id) {
      this.$router.push({ name: 'module', params: { moduleId: id } })
    }
  }
}
</script>
