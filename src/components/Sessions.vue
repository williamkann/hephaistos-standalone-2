<template>
  <v-container>
    <v-row>
        <div v-for="session in this.sessions" :key="session.id">
            <div v-if="moduleId == session.module_id">
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
  }),
  props: {
    moduleId: { type: Number }
  },

  computed: {
    ...mapState('sessions', ['sessions']),
    ...mapState('modules', ['modules'])
  },
  async mounted () {
    await Promise.all(
      this.modules.map(module => this.fetchSessionsForModule({ moduleId: module.id }))
    )
  },
  methods: {
    ...mapActions('sessions', ['fetchSessionsForModule'])
  }
}
</script>
