import { Meteor } from 'meteor/meteor';
import Comments from '../collections.js';

Meteor.publish({
    taskComments: function (taskId) {
        return Comments.find({taskId: taskId}, {sort: {createdAt: -1}});
    }
})