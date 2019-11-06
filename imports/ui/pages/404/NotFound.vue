<template>
    <fragment>
        <v-layout row wrap justify-center>
            <v-flex xs12 md8>
                <v-img src="img/not_found.gif"></v-img>
            </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
            <v-flex xs12 md4 text-xs-center>
                <h4 class="subtitle-1">Whoops! We can't find the page you're looking for!</h4>
            </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
            <v-flex xs12 md4>
                <v-btn block :to="{name: 'dashboard'}" color="primary">Dashboard</v-btn>
            </v-flex>
        </v-layout>
    </fragment>
</template>