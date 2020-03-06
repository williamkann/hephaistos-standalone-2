<template>
  <v-container>
    <v-row>
      <h1>{{ this.modules[0].name }}</h1>
    </v-row>
    <v-row>
      <div v-for="session in this.sessions" :key="session.id">
        <h2>{{ session.name }}</h2>
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

  name: 'sessions',
  data: () => ({
  }),
  props: {
  },

  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('user', ['isAuthenticated']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId'])
  },
  async mounted () {
    // We have to get the module that we clicked !!
    await this.fetchModule({ id: this.$route.params.id }).then(console.log('Fetched the module ' + this.$route.params.id))

    // We have to pass the id of the module that we clicked to fetch the sessions
    await Promise.all(
      this.modules.map(m => { this.fetchSessionsForModule({ moduleId: m.id }); console.log(m.id) })
    ).then(console.log('Fetched the sessions of ' + this.$route.params.id))

    await Promise.all(
      this.sessions.map(s => { this.fetchExercisesForSession({ sessionId: s.id }); console.log(s.id) })
    ).then(console.log('Fetched the exercises of ' + this.$route.params.id))
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
