<template>
    <v-layout row wrap>
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
        <v-flex xs12 lg8>
            <ClientsList />
        </v-flex>
        <v-flex xs12 lg4>
            <ClientsForm />
        </v-flex>
    </v-layout>
</template>
<script>
    import ClientsList from '../../components/clients/ClientsList.vue';
    import ClientsForm from '../../components/clients/ClientsForm.vue';
    export default {
        components: {
            ClientsList,
            ClientsForm
        },
        data() {
            return {
                breadcrumbItems: [
                    {
                        text: 'Dashboard',
                        disabled: false,
                        href: '/dashboard'
                    }, {
                        text: 'Clients',
                        disabled: true
                    }
                ]
            }
        }
    }
</script>