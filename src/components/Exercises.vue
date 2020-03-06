<template>
  <v-container>
    <p>{{ this.exercises }}</p>
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
    // We have to pass the id of the module that we clicked to fetch the sessions

    await Promise.all(
      this.exercises.map(s => { this.fetchExercisesForSession({ sessionId: s.id }); console.log('session :' + s.id) })
    ).then(console.log('Fetched the exercises for ' + this.$route.params.sessionId))

    // await Promise.all(
    //   this.sessions.map(e => { this.fetchExerciseForSession({ sessionId: this.$route.params.sessionId, exerciseId: e.id }); console.log(e.id) })
    // ).then(console.log('Fetched the exercises of ' + this.$route.params.sessionId))
  },

  methods: {
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('sessions', ['fetchExerciseForSession']),
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
