<template>
    <v-app id="inspire">
        <TheNavigation :is-visible="drawerIsVisible" v-if="currentUser"></TheNavigation>
        <TheHeader @toggleDrawerVisibility="drawerIsVisible = !drawerIsVisible">
            <UserLogoutButton slot="actions" />
        </TheHeader>
        <v-content>
            <v-container fluid grid-list-lg>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    components: {
        TheHeader: () => import('../components/header/TheHeader.vue'),
        TheNavigation: () => import('../components/navigation/TheNavigation.vue'),
        UserLogoutButton: () => import('../components/auth/UserLogoutButton.vue')
    },
    data() {
        return {
            drawerIsVisible: true
        }
    },
    meteor: {
        currentUser: () => Meteor.user() ? Meteor.user() : null
    }
}
</script>
