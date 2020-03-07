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
                                            <div class="overline mb-4"></div>
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
import { mapState, mapActions } from 'vuex'
export default {

  name: 'sessions',
  data: () => ({
    display: false
  }),
  props: {
    moduleId: { type: Number }
  },

  computed: {
    ...mapState('sessions', ['sessions']),
    ...mapState('modules', ['modules'])
  },
  async mounted () {
    await this.fetchModules()
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id }))
    ).then(() => { console.log('2. Fetched sessions for the module') })
  },
  methods: {
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('modules', ['fetchModules'])
  }
}
</script>
