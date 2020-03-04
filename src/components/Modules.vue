<template>
  <v-container>
    <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">OVERLINE</div>
                <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
                <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="grey"
            ></v-list-item-avatar>
        </v-list-item>
        {{ isAuthenticated }}
        <v-card-actions>
            <v-btn text @click="logout">Button</v-btn>
            <v-btn text>Button</v-btn>
        </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  name: 'modules',

  data: () => ({

  }),
  computed: {
    ...mapGetters('user', ['isAuthenticated'])
  }
}
</script>
