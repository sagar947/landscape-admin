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
                                :to="item.href">
                                {{ item.text }}
                            </v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout v-if="userRole == 'admin'" row wrap pa0>
            <v-flex xs12 lg12>
                <UserList />
            </v-flex>
        </v-layout>
        <v-layout v-if="userRole == 'employer'" row wrap pa0>
            <v-flex xs12 lg8>
                <UserList />
            </v-flex>
            <v-flex xs12 lg4>
                <UsersForm />
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import UserList from '../../components/users/UsersList.vue';
    import UsersForm from '../../components/users/UsersForm.vue';

    export default {
        components: {
            UserList,
            UsersForm
        },
        data() {
            return {
                breadcrumbItems: [
                    {
                        text: 'Dashboard',
                        disabled: false,
                        href: '/dashboard'
                    }, {
                        text: 'Users',
                        disabled: true
                    }
                ]
            }
        },
        meteor: {
            userRole: () => Meteor.user() ? Meteor.user().roles[0] : ''
        }
    };
</script>
