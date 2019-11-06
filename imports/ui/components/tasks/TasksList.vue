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
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.createAt | date }}</td>
                <td>
                    <v-avatar size="25" v-for="user in props.item.assignedTo" :color="randomColor(user)" :key="user._id">
                        <span class="white--text">{{ user.profile.displayName.charAt(0) }}</span>
                    </v-avatar>
                </td>
                <td class="text-xs-right">
                    <v-icon small class="mr-2" @click="editDoc(props.item)">
                        search
                    </v-icon>
                    <v-icon small @click.prevent="deleteDoc(props.item)">
                        delete
                    </v-icon>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    import Tasks from '../../../api/tasks/collections.js';

    export default {
        components: {},
        meteor: {
            $subscribe: {
                projectTasks: function() {
                    return [this.$route.params.projectId]
                }
            },
            items() {
                if(this.$subReady.projectTasks) {
                    return Tasks.find({}, { createdAt: -1 }).map((doc) => ({
                        title: doc.title,
                        createdAt: doc.createdAt,
                        assignedTo: doc.assignedTo.map((userId) => {
                        let user = Meteor.users.findOne({_id: userId});
                            return user ? user : {}
                        }),
                        _id: doc._id,
                    }));
                }
            },
        },
        data() {
            return {
                search: '',
                headers: [
                    { text: 'Title', align: 'left', value: 'title' },
                    { text: 'Created At', value: 'createdAt' },
                    { text: 'Assigned To', value: 'assignedTo' },
                    { text: 'Actions', align: 'right', value: '_id' },
                ],
            };
        },
        methods: {
            async deleteDoc({ _id, displayName, email }) {
                
            },
            editDoc(doc) {
                this.$router.push({name: 'taskDetails', params: {taskId: doc._id}})
            },
            randomColor(user) {
                let userName = user && user.profile ? user.profile.displayName : '';
                var hash = 0;
                for (var i = 0; i < userName.length; i++) {
                    hash = userName.charCodeAt(i) + ((hash << 5) - hash);
                }

                var h = hash % 360;
                var s = 30;
                var l = 80;
                return 'hsl('+h+', '+s+'%, '+l+'%)';
            }
        },
    };
</script>
