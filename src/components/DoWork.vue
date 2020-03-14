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
        <h3>Resultats</h3>
          <div v-if="getLastAttemptForExercise(this.exerciseId).valid">
            <div class="d-block pa-2 green accent-4 white--text">{{this.getLastAttemptForExercise(this.exerciseId)}}</div>
          </div>
          <div v-if="getLastAttemptForExercise(this.exerciseId).valid == false">
            <div class="d-block pa-2 red accent-4 white--text">{{this.getLastAttemptForExercise(this.exerciseId)}}</div>
          </div>
          <p>{{this.results}}</p>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(item,i) in 5"
              :key="i"
            >
              <v-expansion-panel-header>Item</v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="2" md="1">
        <h3>Votre Solution</h3>
      </v-col>
      <v-col cols="12" sm="2" md="3">
        {{this.exerciseId}}
        {{this.value}}
        <v-btn class="ma-2" outlined large fab color="indigo" @click="attempt(exerciseId, sessionId, value)">
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <AceEditor @input="onAceEditor"></AceEditor>
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
    value: '',
    results: ''
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
      console.log('(In DoWork.vue) : Fetch the exercise ' + this.exerciseId + ' and getExerciseById performed')
      this.initResult()
      this.fetchExerciseForSession({ sessionId: this.sessionId, exerciseId: this.exerciseId })
      return this.getExerciseById(this.exerciseId) || { name: 'Loading...' }
    },
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapState('attempts', ['lastAttemptResults']),
    ...mapState('attempts', ['attempts']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    ...mapGetters('sessions', ['getSessionById']),
    ...mapGetters('exercises', ['getExerciseById']),
    ...mapGetters('attempts', ['getLastAttemptForExercise'])
  },
  async mounted () {
    await this.fetchLastAttemptForExercise({ sessionId: this.sessionId, exerciseId: this.exerciseId })
  },

  methods: {
    ...mapActions('exercises', ['fetchExerciseForSession']),
    ...mapActions('sessions', ['fetchSession']),
    ...mapActions('attempts', ['createAttemptForSession']),
    ...mapActions('attempts', ['fetchLastAttemptForExercise']),
    async attempt (exoId, sessId, sol) {
      // Create the attempt
      console.log('Creating the attempt for exercise ' + this.exerciseId + ' and fetch performed on session ' + this.sessionId + ' with solution: ' + sol)
      await this.createAttemptForSession({ exerciseId: exoId, sessionId: this.sessionId, solution: sol })
      this.results = this.lastAttemptResults
      await this.fetchLastAttemptForExercise({ sessionId: this.sessionId, exerciseId: this.exerciseId })
    },
    onAceEditor (input) {
      this.value = input
    },
    signOut () {
      this.logout()
      this.$router.push({ name: 'login' })
    },
    initResult () {
      this.results = ''
    }
  }
}
</script>
