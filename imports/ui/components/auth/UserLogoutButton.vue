<template>
    <v-btn
        icon
        text
        title="Logout"
        :loading="isLoading"
        @click="logout"
        color="transparent"
    >
        <v-icon>logout</v-icon>
    </v-btn>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
        };
    },

    methods: {
        logout() {
            this.isLoading = true;
            Meteor.logout();
            this.$router.push({path: '/'})
            this.isLoading = false;
        },
    },
};
</script>