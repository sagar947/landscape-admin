<template>
    <v-card color="rgba(73, 140, 157, 0.3)" class="white--text">
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            color="#fff"
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            :search="search"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.clientName }}</td>
                <td>{{ props.item.adminEmail }}</td>
                <td>{{ props.item.createdAt | date }}</td>
                <td class="text-xs-right">
                    <v-icon small class="mr-2" @click="editDoc(props.item)">
                    edit
                    </v-icon>
                    <v-icon small @click.prevent="deleteDoc(props.item)">
                    delete
                    </v-icon>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
    import Clients from '../../../api/clients/collections.js';
    export default {
        components: {

        },
        meteor: {
            $subscribe: {
                clients: []
            },
            items() {
                return Clients.find({}, { createdAt: -1 }).fetch().map((client) => ({
                    value: false,
                    clientName: client.clientName,
                    adminEmail: client.adminEmail,
                    createdAt: client.createdAt,
                    _id: client._id
                }))
            }
        },
        data() {
            return {
                headers: [
                    { text: 'Client Name', align: 'left', value: 'clientName' },
                    { text: 'Admin Email', align: 'left', value: 'adminEmail' },
                    { text: 'Created On', align: 'left', value: 'createdAt' },
                    { text: 'Actions', align: 'right', value: '_id' }
                ],
                search: ''
            }
        },
        methods: {
            async deleteDoc({}) {

            },
            editDoc(doc) {

            }
        }
    }
</script>
