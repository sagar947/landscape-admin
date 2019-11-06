import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Projects from './collections'

Meteor.methods({
    addNewProject: function(projectName) {
        if(!this.userId || !Roles.userIsInRole(this.userId, ['employer'])) {
            throw new Meteor.Error(401, 'You are not authorized to add a project.');
        }
        let user = Meteor.users.findOne(this.userId);
        if(user) {
            Projects.insert({
                name: projectName,
                clientId: user.profile.clientId,
                createdAt: new Date()
            })
        }
    }
})
