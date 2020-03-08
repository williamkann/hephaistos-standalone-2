<template>
  <v-container>
    <v-row>
      <h1>{{ this.modules }}</h1>
      <h2>{{ this.sessions }}</h2>
      <h3>{{ this.exercises }} </h3>
    </v-row>
    <!-- <v-row>
      <div v-for="session in this.sessions" :key="session.id">
        <h2>{{ session.name }}</h2>
        {{ this.exercises }}
        <div v-for="exercise in exercises" :key="exercise.id">
          <div v-if="session.id == exercise.sessionId ">
            <v-row>
              {{ exercise.title }}
            </v-row>
          </div>
        </div>
      </div>
    </v-row> -->
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {

  name: 'module',
  data: () => ({
  }),
  props: {
  },

  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapState('user', ['user']),
    ...mapGetters('user', ['isAuthenticated'])
  },
  async Mounted () {
    // Fetch the module with our Id
    await this.fetchModule({ id: this.$route.params.moduleId })

    // Fetch the sessions of the module (TP1, TP2, TP3, TP4, TP5)
    await Promise.all(
      this.modules.map(m => { this.fetchSessionsForModule({ moduleId: m.id }); console.log('exercution de fetch session') })
    )
    // Fetch the exercises of each session
    await Promise.all(
      this.sessions.map(s => { this.fetchExercisesForSession({ sessionId: s.id }); console.log('execution de fetch exercises' + this.sessions) })
    )
  },

  methods: {
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),
    ...mapActions('exercises', ['fetchExerciseForSession']),
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('modules', ['fetchModules'])
  }
}
</script>
