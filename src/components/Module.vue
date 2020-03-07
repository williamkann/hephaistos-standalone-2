<template>
  <v-container>
    <v-row>
      <h1>{{ this.modules }} </h1>
    </v-row>
    <v-row>
      <div v-for="session in this.sessions" :key="session.id">
        <router-link :to="'/session/' + session.id + '/exercises'"><h2>{{ session.name }}</h2></router-link>
        <div v-for="exercise in exercises" :key="exercise.id">
          {{ exercise.sessionId }}
          <div v-if="session.id == exercise.sessionId ">
            <v-row>
              {{ this.exercises }}
            </v-row>
          </div>
        </div>
      </div>
    </v-row>
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
    ...mapGetters('user', ['isAuthenticated'])
  },
  async mounted () {
    // Fetch the module with our Id
    this.fetchModule({ id: this.$route.params.moduleId }).then(console.log(this.modules))

    // Fetch the sessions of the module (TP1, TP2, TP3, TP4, TP5)
    // await Promise.all(
    //   this.modules.map(m => { this.fetchSessionsForModule({ moduleId: m.id }); console.log(m) })
    // ).then(console.log('Fetched all sessions of the module'))

    // // Fetch the exercises of each session
    // await Promise.all(
    //   this.sessions.map(s => { this.fetchExercisesForSession({ sessionId: s.id }); console.log(s) })
    // ).then(console.log('Fetched all exercises of each session'))
  },

  methods: {
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),
    ...mapActions('modules', ['fetchModule'])
  }
}
</script>
