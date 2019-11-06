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
            :headers="employerHeaders"
            :items="employerUsers"
            class="elevation-1"
            v-if="userRole == 'employer'"
            :search="search"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.displayName }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.projects | list }}</td>
                <td class="text-xs-right">
                    <!--<v-icon small class="mr-2" @click="editDoc(props.item)">-->
                    <!--edit-->
                    <!--</v-icon>-->
                    <v-icon small @click="deleteDoc(props.item)">
                        delete
                    </v-icon>
                </td>
            </template>
        </v-data-table>
        <v-data-table
            :headers="adminHeaders"
            :items="adminUsers"
            class="elevation-1"
            v-if="userRole == 'admin'"
            :search="search"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.displayName }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.roles | list }}</td>
                <td class="text-xs-right">
                    <!--<v-icon small class="mr-2" @click="editDoc(props.item)">-->
                    <!--edit-->
                    <!--</v-icon>-->
                    <v-icon small @click="deleteDoc(props.item)">
                        delete
                    </v-icon>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    import Projects from '../../../api/projects/collections.js';
    export default {
        components: {},
        meteor: {
            $subscribe: {
                users: [],
                projects: [],
            },
            userRole: () => Meteor.user() ? Meteor.user().roles[0] : '',
            adminUsers() {
                return Meteor.users.find({_id: {$nin: [Meteor.userId()]}}).map((doc) => ({
                    value: false,
                    displayName: doc.profile.displayName,
                    email: doc.emails[0].address,
                    roles: doc.roles,
                    createdAt: doc.createdAt,
                    _id: doc._id,
                }));
            },
            employerUsers() {
                if(this.$subReady.users && this.$subReady.projects) {
                    return Meteor.users.find({_id: {$nin: [Meteor.userId()]}}).map((doc) => ({
                        value: false,
                        displayName: doc.profile.displayName,
                        email: doc.emails[0].address,
                        projects: doc.profile.projects.map((projectId) => {
                            let project = Projects.findOne({_id: projectId});
                            return project.name;
                        }),
                        createdAt: doc.createdAt,
                        _id: doc._id,
                    }));
                }
            },
        },
        data() {
            return {
                adminHeaders: [
                    { text: 'Display name', align: 'left', sortable: false, value: 'displayName' },
                    { text: 'E-mail', align: 'left', value: 'email' },
                    { text: 'Roles', align: 'left', value: 'roles' },
                    { text: 'Actions', align: 'right', value: '_id' },
                ],
                employerHeaders: [
                    { text: 'Display name', align: 'left', sortable: false, value: 'displayName' },
                    { text: 'E-mail', align: 'left', value: 'email' },
                    { text: 'Projects', align: 'left', value: 'projects' },
                    { text: 'Actions', align: 'right', value: '_id' },
                ],
                search: ''
            };
        },
        methods: {
            async deleteDoc({ _id, displayName, email }) {
                const bool = confirm(`Are you sure that you want to remove ${displayName || email}?`);
                if (!bool) {
                    return;
                }

                Meteor.call('removeUser', { _id }, (error) => {
                    if (error) {
                        this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error', dark: true };
                        this.error = error.reason;
                    } else {
                        this.status = { submitTitle: `${displayName || email} was removed!`, color: 'success', dark: true };
                    }
                });
            },
            editDoc(doc) {
                console.log('Edit action not yet implemented', doc);
            },
        },
    };
</script>
