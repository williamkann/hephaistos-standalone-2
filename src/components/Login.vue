<template>
  <v-card
    class="mx-auto"
    max-width="500"
    outlined
  >
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :counter="20"
              label="Email"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :counter="20"
              label="Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <div v-if="!isAuthenticated">
          <v-row>
            <p>BOu</p>
          </v-row>
        </div>
        <div class="text-md-center">
          <v-btn text large color="primary" @click="signIn">Sign in !</v-btn>
        </div>
        {{ this.isAuthenticated }}
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    valid: '',
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => v.length <= 20 || 'Email must be less than 20 characters'],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length <= 20 || 'Password must be less than 20 characters']
  }),

  computed: {

    ...mapState({ }),
    ...mapGetters('user', ['isAuthenticated'])
  },

  methods: {
    ...mapActions('user', ['login']),
    signIn () {
      var email = this.email
      var password = this.password
      this.login({ email, password })
      if (this.isAuthenticated) {
        this.$router.push({ name: 'modules' })
      } else {
      }
    }
  }
}
</script>
