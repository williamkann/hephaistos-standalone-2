<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="2" md="6">
                <h1>New exercise</h1>
            </v-col>
            <v-col cols="12" sm="2" md="2">
                <div class="my-2">
                    <v-btn text medium @click="save()">Save</v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="2" md="6">
                <v-text-field
                v-model="title"
                label="Title"
                required
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" md="4">
                <v-select
                class="pa-2" v-model="lang" :items="lang" :rules="[v => !!v || 'Language is required']" label="Language"
                required
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="2" md="6">
                <h2>Instructions</h2>
                <v-card class="mx-auto">
                    <v-textarea
                    v-model="instruction"
                    auto-grow
                    full-width
                    rows="10"
                    ></v-textarea>

                    <v-row
                    class="px-2 pb-2 ma-0"
                    justify="space-between"
                    >
                        <v-btn-toggle
                            v-model="formatting"
                            multiple
                        >
                            <v-btn color="white">
                            <v-icon>mdi-format-italic</v-icon>
                            </v-btn>

                            <v-btn color="white">
                            <v-icon>mdi-format-bold</v-icon>
                            </v-btn>

                            <v-btn color="white">
                            <v-icon>mdi-format-underline</v-icon>
                            </v-btn>

                            <v-btn color="white">
                                <v-row align="center" class="flex-column" justify="center">
                                    <v-icon class="cols 12">mdi-format-color-text</v-icon>
                                    <v-sheet
                                    tile
                                    style="margin-top: -4px;"
                                    height="4"
                                    width="26"
                                    color="black"
                                    ></v-sheet>
                                </v-row>
                            </v-btn>
                        </v-btn-toggle>

                        <v-btn-toggle v-model="alignment">
                            <v-btn color="white">
                            <v-icon>mdi-format-align-center</v-icon>
                            </v-btn>

                            <v-btn color="white">
                            <v-icon>mdi-format-align-left</v-icon>
                            </v-btn>

                            <v-btn color="white">
                            <v-icon>mdi-format-align-right</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                    </v-row>

                    <v-sheet
                    class="pa-4 text-center"
                    color="grey lighten-3"
                    tile
                    >
                    <v-row
                        class="mb-2"
                        dense
                    >
                        <v-col
                        v-for="n in numbers"
                        :key="n"
                        class="caption grey--text text--darken-1"
                        v-text="n"
                        ></v-col>
                    </v-row>

                    <v-row dense>
                        <v-col
                        v-for="l in letters"
                        :key="l"
                        class="title grey--text font-weight-regular text--darken-2"
                        v-text="l"
                        ></v-col>
                    </v-row>
                    </v-sheet>
                </v-card>
            </v-col>
            <v-col cols="12" sm="2" md="6">
                <h2>Tests</h2>
                 <div id="editor" class="exercise-editor-ace-editor"></div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="2" md="6">
                <v-row>
                    <h2>Template</h2>
                    <div id="template" class="exercise-editor-ace-editor"></div>
                </v-row>
            </v-col>
            <v-col cols="12" sm="2" md="6">
                <v-row>
                    <h2>Sandbox</h2>
                    <v-btn class="ma-1" color="blue" dark>
                        <v-icon dark>mdi-play</v-icon>
                    </v-btn>
                    <div id="sandbox" class="exercise-editor-ace-editor"></div>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="2" md="6">
                <h2>Console Output</h2>
                <div>
                    <div class="d-block pa-2 black white--text">Insert Here output</div>
                </div>
            </v-col>
            <v-col cols="12" sm="2" md="6">
                <h2>Tests results</h2>
                <div>
                    <div class="d-block pa-2 black white--text">Insert Here tests results</div>
                </div>
            </v-col>
        </v-row>
  </v-container>
</template>

<style>

.exercise-editor-ace-editor {
 position: relative;
 height: 20rem;
 font-size: 120%;
 will-change: auto;
}
</style>

<script>

import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'

export default {
  mounted () {
    this.editor = ace.edit('editor')
    this.editor.setTheme('ace/theme/monokai')
    this.editor.session.setMode(`ace/mode/${this.lang}`)

    this.template = ace.edit('template')
    this.template.setTheme('ace/theme/monokai')
    this.template.session.setMode(`ace/mode/${this.lang}`)

    this.sandbox = ace.edit('sandbox')
    this.sandbox.setTheme('ace/theme/monokai')
    this.sandbox.session.setMode(`ace/mode/${this.lang}`)
    console.log('finished mounted')
  },

  data: () => ({
    template: null,
    sandbox: null,
    editor: null,
    instructions: '',
    lang: ['python', 'c', 'JavaScript'],
    title: '',
    tests: '',
    solution: 'dde',
    templateRegions: ['temp'],
    templateRegionsRw: [0],
    difficulty: 0,
    score: 0,
    creation_date: new Date()
  }),
  methods: {
    async save () {
      // eslint-disable-next-line camelcase
      const { instructions, lang, title, tests, solution, templateRegions, templateRegionsRw, difficulty, score, creation_date } = this
      try {
        const result = await this.axios.post('http://localhost:3000/api/v1/exercise', {
          instructions, lang, title, tests, solution, templateRegions, templateRegionsRw, difficulty, score, creation_date
        })
        this.loggedIn = true
        console.log(result)
        this.$router.push({ name: 'exercises' })
      } catch (err) {
        this.errorLogin = err
        console.log('Login error: ' + this.errorLogin)
      }
    }

  }
}
</script>
