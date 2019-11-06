import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Tasks from './collections';
import Comments from '../comments/collections';

Meteor.methods({
    addTask(taskDetails) {
        if(!this.userId) {
            throw new Meteor.Error(401, 'Please login to add a new task');
        }
        if(!Roles.userIsInRole(this.userId, ['employer', 'employee'])) {
            throw new Meteor.Error(401, 'Only employers and employees are supposed to add tasks');
        }
        taskDetails.createdAt = new Date(),
        taskDetails.createdBy = this.userId
        let taskId = Tasks.insert(taskDetails);
    }
});
