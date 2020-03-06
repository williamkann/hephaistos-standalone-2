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
              <div class="my-1">
                <router-link :to="'module/' + module.id"> Consulter ce module {{ module.id }} </router-link>
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
    ...mapGetters('user', ['isAuthenticated']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId'])
  },
  async mounted () {
    await this.fetchModules().then(() => { console.log('Fetched Modules') })
  },
  methods: {
    ...mapActions('user', ['logout']),
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),

    signOut () {
      this.logout()
      if (this.isAuthenticated === false) {
        this.$router.push({ name: 'login' })
      }
    },
    consult (moduleId) {
      console.log('ID is ' + moduleId)
      this.$router.push({ name: 'module', params: { id: moduleId } })
    }
  }
}
</script>
