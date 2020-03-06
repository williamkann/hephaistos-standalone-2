<template>
  <v-container>
    <v-row>
        <div v-for="session in this.sessions" :key="session.id">
            <div v-if="moduleId">
                <v-row>
                    <v-col cols="12" sm="2" md="12">
                        <v-card class="mx-auto" width="250" outlined>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <strong><div class="overline mb-4">{{ session.name }}</div></strong>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-col>
                    <div v-if="display">
                        <div v-for="exercise in exercises" :key="exercise.id">
                            <div v-if="exercise.sessionId == session.id">
                                <v-card class="mx-auto" width="250" outlined color="">
                                    <v-list-item three-line>
                                        <v-list-item-content>
                                            <div class="overline mb-4">{{ exercise.title }}</div>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </div>
                        </div>
                    </div>
                </v-row>
            </div>
        </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {

  name: 'sessions',
  data: () => ({
    display: false
  }),
  props: {
    moduleId: { type: Number }
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
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id }))
    ).then(() => { console.log('Fetched sessions for the module') })
    await Promise.all(
      this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id }))
    ).then(() => { console.log('Fetched exercises for the session') })
  },
  methods: {
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),

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
