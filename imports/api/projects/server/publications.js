import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Projects from '../collections';

Meteor.publish('projects', function () {
    if (!Roles.userIsInRole(this.userId, ['employer'])) {
        return [];
    }
    let user = Meteor.users.findOne(this.userId);
    return Projects.find({clientId: user.profile.clientId}, { sort: { createdAt: 1 } });
});

Meteor.publish('projectById', function(projectId) {
    return Projects.find({_id: projectId});
})