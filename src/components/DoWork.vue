<template>
  <v-container>

<!-- La vue étudiante, url dans quel on est session/3/exercise/15 -->
<!-- Les composants ne sont pas re-rendus lorsqu'on change d'exercise. Mais il faut juste changer les parametres
Le composant 'principale recoit exercise_id et session_id. utiliser watch pour déclencher la mise à jour -->
<!-- watch:  -->
    <v-alert
      outlined
      color="#3366cc"
    >
    <v-row>
      <v-col cols="12" sm="2" md="6">
        <h1>{{ exercise.title }} {{this.exerciseId}}</h1>
      </v-col>
      <v-col cols="12" sm="2" md="6">
        <h2>Tests</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="2" md="6">
        <p v-html="exercise.instructions">{{ exercise.instructions }} {{this.exerciseId}} {{sessionId}}</p>
      </v-col>
      <v-col cols="12" sm="2" md="6">
        <p>Resultats</p>
        <p>{{ exercise.tests }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="2" md="1">
        <h3>Votre Solution</h3>
      </v-col>
      <v-col cols="12" sm="2" md="3">
        <v-btn class="ma-2" outlined large fab color="indigo">
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <AceEditor></AceEditor>
    </v-alert>
  </v-container>
</template>

<style scoped>
h1, h2, h3, p {
  color: white
}
</style>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import AceEditor from './AceEditor.vue'
export default {

  name: 'exercises',
  components: {
    AceEditor
  },
  props: ['exerciseId'],
  data: () => ({
  }),

  computed: {
    sessionId () {
      return parseInt(this.$route.params.sessionId)
    },
    session () {
      return this.getSessionById(this.sessionId) || { name: 'Loading ... ' }
    },
    exercises () {
      return this.getExercisesBySessionId(this.sessionId)
    },
    exercise () {
      console.log('fetch the exercise ' + this.exerciseId + ' and getExerciseById performed')
      this.fetchExerciseForSession({ sessionId: this.sessionId, exerciseId: this.exerciseId })
      return this.getExerciseById(this.exerciseId)
    },
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    ...mapGetters('sessions', ['getSessionById']),
    ...mapGetters('exercises', ['getExerciseById'])
  },
  async mounted () {
  },

  methods: {
    ...mapActions('exercises', ['fetchExerciseForSession']),
    ...mapActions('sessions', ['fetchSession']),
    signOut () {
      this.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
