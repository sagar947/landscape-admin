<template>
    <v-flex xs12 v-if="currentUser">
        <h1>Welcome back {{displayName}}</h1>
        <p>This page uses the default layout which is a Vue component with a sidebar</p>
    </v-flex>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    meteor: {
        currentUser: () => Meteor.user() ? Meteor.user() : null,
        displayName: () => Meteor.user() ? Meteor.user().profile.displayName: ''
    }
}
</script>