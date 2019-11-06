<template>
    <div>
        <v-layout row wrap pa0>
            <v-flex xs12>
                <v-card color="rgba(73, 140, 157, 0.3)">
                    <v-card-text>
                        <v-breadcrumbs :items="breadcrumbItems">
                            <template slot="divider">
                                <v-icon>forward</v-icon>
                            </template>
                            <v-breadcrumbs-item
                                slot="item"
                                slot-scope="{ item }"
                                exact
                                :disabled="item.disabled"
                                :to="item.href"
                            >
                                {{ item.text }}
                            </v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap pa0>
            <v-flex xs12 lg8>
                <ProjectsList />
            </v-flex>
            <v-flex xs12 lg4>
                <ProjectsForm />
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
  import ProjectsList from '../../components/projects/ProjectsList.vue';
  import ProjectsForm from '../../components/projects/ProjectsForm.vue';

  export default {
    components: {
      ProjectsList,
      ProjectsForm
    },
    data() {
      return {
        breadcrumbItems: [
          {
            text: 'Dashboard',
            disabled: false,
            href: '/dashboard'
          }, {
            text: 'Projects',
            disabled: true
          }
        ]
      }
    }
  }
</script>
