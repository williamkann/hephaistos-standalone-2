<template>
  <v-card
    max-width="1500" class="mx-auto">
    <v-toolbar color="indigo" dark>
      <v-toolbar-title>Welcome {{ username }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-cached</v-icon>
      </v-btn>
      <v-btn icon @click="createExercise()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list>
      <v-list-item v-for="(exercise) in exercises" :key="exercise.title" @click="getExercise(exercise.id)">
        <v-list-item-content>
          <v-list-item-title v-text="'Exercise ' + exercise.id + ': ' + exercise.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  async mounted () {
    try {
      const resultGetExercises = await this.axios.get('http://localhost:3000/api/v1/exercises')
      console.log(resultGetExercises.data)
      console.log('Get exercises success')
      this.exercises = resultGetExercises.data

      const resultGetMe = await this.axios.get('http://localhost:3000/api/v1/me')
      console.log(resultGetMe.data)
      console.log('Get Me success')
      this.username = resultGetMe.data.email
    } catch (err) {
      console.log(err)
    }
  },

  data () {
    return {
      username: '',
      exercises: []
    }
  },
  methods: {
    createExercise: function () {
      this.$router.push({ name: 'exercise' })
    },
    async getExercise (id) {
      try {
        console.log(id)
        const resultGetExercise = await this.axios.get('http://localhost:3000/api/v1/exercise/' + id)
        console.log(resultGetExercise.data)
        this.$router.push({ name: 'myExercise' })
      } catch (err) {
        console.log(err)
      }
    }
  }

}
</script>
