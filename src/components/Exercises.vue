<template>
  <v-container>
    {{ this.isAuthenticated }}
    <div v-for="exercise in this.exercisesOfSession" :key="exercise.id">
      <p>{{ exercise.title }}</p>
    </div>
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
    this.sessId = await parseInt(this.$route.params.sessionId)
    this.exercisesOfSession = await this.getExercisesBySessionId(this.sessId)

    this.result = await this.getExerciseIdOfSession(this.sessId)
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
        console.log(exos)
        return exos[0].id
      } else {
        return 0
      }
    }
  }
}
</script>
