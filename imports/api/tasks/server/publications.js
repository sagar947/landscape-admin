import { Meteor } from 'meteor/meteor';
import Tasks from '../collections.js';

Meteor.publish({
	projectUsers(projectId) {
		return Meteor.users.find({'profile.projects': [projectId]});
	},
	projectTasks(projectId) {
		return Tasks.find({
			projectId: projectId
		})
	},
	taskById(taskId) {
		return Tasks.find({
			_id: taskId
		})
	}
})