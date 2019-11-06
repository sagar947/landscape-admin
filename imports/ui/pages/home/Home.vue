<template>
    <v-layout row wrap pa0 justify-center>
        <login></login>
    </v-layout>
</template>

<script>
import Login from '../../components/auth/Login.vue';
export default {
    components: {
        'login': Login
    }
}
</script>