import { Mongo } from 'meteor/mongo';

const Comments = new Mongo.Collection('comments');

Comments.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

export default Comments
