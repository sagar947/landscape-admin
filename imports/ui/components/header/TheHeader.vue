<template>
    <VToolbar color="primary" :clipped-left="$vuetify.breakpoint.lgAndUp" app fixed>
        <VToolbarSideIcon @click.stop="toggleDrawer" v-if="currentUser" />
        <VToolbarTitle>Landscape - Admin</VToolbarTitle>
        <slot name="main"></slot>
        <VSpacer/>
        <slot name="actions"></slot>
    </VToolbar>
</template>

<script>
export default {
    methods: {
        toggleDrawer() {
            this.$emit('toggleDrawerVisibility');
        },
    },
    meteor: {
        currentUser: () => Meteor.user() ? Meteor.user() : null
    }
}
</script>
