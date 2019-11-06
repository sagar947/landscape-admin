import { Mongo } from 'meteor/mongo';

const Tasks = new Mongo.Collection('tasks');

Tasks.deny({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

export default Tasks;
