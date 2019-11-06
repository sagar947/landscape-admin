import { Mongo } from 'meteor/mongo';

const Clients = new Mongo.Collection('clients');

Clients.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

export default Clients
