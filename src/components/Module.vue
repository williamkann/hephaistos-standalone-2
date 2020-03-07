<template>
  <v-container>
    <v-row>
      <h1>{{ $route.params.moduleId }}</h1>
    </v-row>
    <v-row>
      <div v-for="session in this.sessionsOfModule" :key="session.id">
        <router-link :to="'/session/' + session.id + '/exercises'"><h2>{{ session.name }}</h2></router-link>
        <div v-for="exercise in exercises" :key="exercise.id">
          <div v-if="session.id == exercise.sessionId">
              {{ exercise.title }}
          </div>
      </div>
      </div>
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {

  name: 'module',
  data: () => ({
    moduleSelected: [],
    modId: '',
    sessionsOfModule: []
  }),
  props: {
  },

  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('user', ['isAuthenticated']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    ...mapGetters('modules', ['getModuleById']),
    ...mapGetters('sessions', ['getSessionsByModuleId'])
  },
  async mounted () {
    // Get the module ID that we clicked
    this.modId = parseInt(this.$route.params.moduleId)
    this.moduleSelected = this.getModuleById(this.modId)
    console.log(this.modId)
    this.sessionsOfModule = this.getSessionsByModuleId(this.modId)
  },

  methods: {
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('modules', ['fetchModule']),

    getExerciseIdOfSession (sessId) {
      const exos = this.getExercisesBySessionId(sessId)
      if (exos.length) {
        return exos[0].id
      } else {
        return 0
      }
    }
  }
}
</script>
