<template>
    <v-card color="rgba(73, 140, 157, 0.3)" class="white-text">
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                color="dark"
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            :search="search"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.createdAt | date }}</td>
                <td class="text-xs-right">
                <v-icon small class="mr-2" @click="gotoTasks(props.item)" data-balloon="Tasks" data-balloon-pos="up">
                    view_list
                </v-icon>
                <v-icon small class="mr-2" @click="editDoc(props.item)" data-balloon="Edit" data-balloon-pos="up">
                    edit
                </v-icon>
                <v-icon small @click.prevent="deleteDoc(props.item)" data-balloon="Delete" data-balloon-pos="up">
                    delete
                </v-icon>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    import Projects from '../../../api/projects/collections'
    export default {
        components: {

        },
        meteor: {
            $subscribe: {
                projects: []
            },
            items() {
                return Projects.find({}, { createdAt: -1 }).fetch().map((project) => ({
                    value: false,
                    name: project.name,
                    createdAt: project.createdAt,
                    _id: project._id
                }))
            }
        },
        data() {
        return {
            search: '',
            headers: [
                { text: 'Project Name', align: 'left', value: 'name' },
                { text: 'Created On', align: 'left', value: 'createdAt' },
                { text: 'Actions', align: 'right', value: '_id' }
            ]
        }
        },
        methods: {
            async deleteDoc({}) {

            },
            editDoc(doc) {

            },
            gotoTasks(doc) {
                this.$router.push({name: 'projectTasks', params: {projectId: doc._id}})
            }
        }
    }
</script>
