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
                            >{{ item.text }}</v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap pa0>
            <v-flex xs12>
                <VTabs v-model="active" color="rgba(73, 140, 157, 0.3)" dark slider-color="white">
                    <VTab key="tasksList" ripple>Tasks</VTab>
                    <VTab key="tasksForm" ripple>New Task</VTab>
                    <VTabItem>
                        <TasksList />
                    </VTabItem>
                    <VTabItem>
                        <TasksForm />
                    </VTabItem>
                </VTabs>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import TasksList from "../../components/tasks/TasksList.vue";
    import TasksForm from "../../components/tasks/TasksForm.vue";
    import Projects from "../../../api/projects/collections.js";
    export default {
    components: {
        TasksList,
        TasksForm
    },
    data() {
        return {
        active: null
        };
    },
    meteor: {
        $subscribe: {
            projectById: function() {
                return [this.$route.params.projectId];
            }
        },
        breadcrumbItems() {
            if (this.$subReady.projectById) {
                let project = Projects.findOne({ _id: this.$route.params.projectId });
                return [
                {
                    text: "Dashboard",
                    disabled: false,
                    href: "/"
                },
                {
                    text: "Projects",
                    disabled: false,
                    href: "/projects"
                },
                {
                    text: "Tasks (" + project.name + ")",
                    disabled: true
                }
                ];
            }
        }
    }
    };
</script>
