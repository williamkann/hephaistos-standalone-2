<template>
  <v-container>
    <v-row>
      <div v-for="session in getSessionsByModuleId(moduleId)" :key="session.id">
        <v-row>
            <v-col cols="12" sm="2" md="12">
                <v-card class="mx-auto" width="250" height="100" outlined color="#3366cc">
                  <v-row>
                    <v-col cols="12" sm="8">
                      <v-card-title>
                        {{ session.name }}
                      </v-card-title>
                    </v-col>
                    <v-col cols="12" sm="4">
                      {{ getNumberExercises(session.id) }}
                      <v-icon medium color="white darken-2">mdi-gavel</v-icon>
                      <v-icon medium color="white darken-2">mdi-pen</v-icon>
                    </v-col>
                  </v-row>
                </v-card>
            </v-col>
        </v-row>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {

  name: 'sessions',
  data: () => ({
  }),
  props: {
    moduleId: { type: Number }
  },

  computed: {
    ...mapState('sessions', ['sessions']),
    ...mapState('modules', ['modules']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId'])
  },
  async mounted () {
    // Lance toutes les requêtes
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id }))
    )
    await Promise.all(
      this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id }))
    )
  },
  methods: {
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),
    getNumberExercises (sessId) {
      for (var number in this.getExercisesBySessionId(sessId)) {
      }
      return parseInt(number) + 1
    }
  }
}
</script>
