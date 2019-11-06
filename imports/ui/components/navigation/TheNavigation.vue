<template>
    <v-navigation-drawer
        id="app-drawer"
        app
        fixed
        :clipped="$vuetify.breakpoint.lgAndUp"
        :value="isVisible"
        width="260"
    >
        <v-img
            src="img/app_bg1.jpg"
            gradient="rgba(27, 27, 27, 0.74), rgba(27, 27, 27, 0.74)"
            height="100%"
        >
            <v-layout
                class="fill-height"
                tag="v-list"
                column
                v-if="userRole == 'admin'"
            >
                <v-list-tile
                    v-for="(link, i) in adminItems"
                    :key="i"
                    avatar
                    class="v-list-item white--text"
                    @click.prevent="toggleRoute(link)"
                >
                    <v-list-tile-action>
                        <v-icon color="white">{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title
                        v-text="link.title"
                    />
                </v-list-tile>
            </v-layout>
            <v-layout
                class="fill-height"
                tag="v-list"
                column
                v-if="userRole == 'employer'"
            >
                <v-list-tile
                    v-for="(link, i) in employerItems"
                    :key="i"
                    avatar
                    class="v-list-item white--text"
                    @click.prevent="toggleRoute(link)"
                >
                    <v-list-tile-action>
                        <v-icon color="white">{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title
                        v-text="link.title"
                    />
                </v-list-tile>
            </v-layout>
            <v-layout
                class="fill-height"
                tag="v-list"
                column
                v-if="userRole == 'employee'"
            >
                <v-list-tile
                    v-for="(link, i) in employeeItems"
                    :key="i"
                    avatar
                    class="v-list-item white--text"
                    @click.prevent="toggleRoute(link)"
                >
                    <v-list-tile-action>
                        <v-icon color="white">{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title
                        v-text="link.title"
                    />
                </v-list-tile>
            </v-layout>
        </v-img>
    </v-navigation-drawer>
</template>

<script>
    export default {
        props: {
            isVisible: Boolean,
            isMini: Boolean,
        },
        data() {
            return {
                adminItems: [{
                    to: '/dashboard',
                    icon: 'dashboard',
                    title: 'Dashboard',
                }, {
                    to: '/users',
                    icon: 'group',
                    title: 'Users',
                }, {
                    to: '/clients',
                    icon: 'account_balance',
                    title: 'Clients',
                }],
                employerItems: [{
                    to: '/dashboard',
                    icon: 'dashboard',
                    title: 'Dashboard'
                }, {
                    to: '/projects',
                    icon: 'view_list',
                    title: 'Projects'
                }, {
                    to: '/users',
                    icon: 'group',
                    title: 'Users'
                }],
                employeeItems: [{
                    to: '/dashboard',
                    icon: 'dashboard',
                    title: 'Dashboard'
                }, {
                    to: '/profile',
                    icon: 'person',
                    title: 'Profile'
                }, {
                    to: '/tasks',
                    icon: 'view_list',
                    title: 'Tasks'
                }, {
                    to: '/timesheets',
                    icon: 'assessment',
                    title: 'Time Sheets'
                }]
            };
        },
        meteor: {
            userRole: () => Meteor.user() ? Meteor.user().roles[0] : null
        },
        methods: {
            toggleRoute(item) {
                this.$router.push(item.to)
            }
        }
    };
</script>