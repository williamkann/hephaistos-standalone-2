<template>
  <v-container>

<!-- La vue étudiante, url dans quel on est session/3/exercise/15 -->
<!-- Les composants ne sont pas re-rendus lorsqu'on change d'exercise. Mais il faut juste changer les parametres
Le composant 'principale recoit exercise_id et session_id. utiliser watch pour déclencher la mise à jour -->
<!-- watch:  -->
    <v-card>
      <v-toolbar flat color="#3366cc" dark>
        <v-toolbar-title>
          {{ session.name }} {{ firstExerciseId }}
          <v-btn text @click="signOut">Logout</v-btn>
        </v-toolbar-title>
      </v-toolbar>
      <!-- Col with exercisesList left and DoWork Right -->
      <v-row>
        <v-col cols="12" sm="2" md="2">
          <ExercisesList @exerciseSelected="onExerciseSelected"/>
        </v-col>
        <v-col cols="12" sm="2" md="10">
          {{this.exerciseIdSelected}}
          <DoWork :exerciseId="firstExerciseId" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import ExercisesList from './ExercisesList.vue'
import DoWork from './DoWork.vue'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {

  name: 'exercises',
  watch: {
    exerciseIdSelected: async function () {
      console.log('Request the exercise')
    }
  },

  components: {
    ExercisesList,
    DoWork
  },

  data: () => ({
    exerciseIdSelected: 0
  }),

  computed: {
    sessionId () {
      return parseInt(this.$route.params.sessionId)
    },
    session () {
      return this.getSessionById(this.sessionId) || { name: 'Loading ... ' }
    },
    firstExerciseId () {
      return parseInt(this.$route.params.exerciseId)
    },
    firstExercise () {
      return this.getExerciseById(this.firstExerciseId)
    },
    exercises () {
      return this.getExercisesBySessionId(this.sessionId)
    },
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    ...mapGetters('sessions', ['getSessionById'])
  },
  async mounted () {
    // Fetch our session
    await this.fetchSession({ id: this.sessionId })

    // Fetch the exercises of each session
    await Promise.all(
      this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id }))
    )

    await Promise.all(
      this.sessions.map(s => this.fetchExerciseForSession({ sessionId: s.id, exerciseId: this.firstExercise }))
    )
  },

  methods: {
    ...mapActions('exercises', ['fetchExercisesForSession']),
    ...mapActions('exercises', ['fetchExerciseForSession']),
    ...mapActions('exercises', ['getExerciseById']),
    ...mapActions('sessions', ['fetchSession']),
    onExerciseSelected (id) {
      console.log('ID PASSED TO PARENT :' + id)
      this.exerciseIdSelected = id
    },
    signOut () {
      this.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
