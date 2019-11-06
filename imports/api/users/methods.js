import { Meteor } from 'meteor/meteor';
import Clients from '../clients/collections.js'

Meteor.methods({
    validateLoginClient: function(clientName, email) {
        let globalClientNames = new Set(['www', 'dev', 'test', 'prod', 'uat', 'demo']);
        let user = Accounts.findUserByEmail(email);
        if(!user) {
            throw new Meteor.Error(404, 'User not found');
        }
        if(Roles.userIsInRole(user._id, ['admin'])) {
            return true
        }
        if(globalClientNames.has(clientName)) {
            let userClientName = Clients.findOne({_id: user.profile.clientId}).clientName;
            throw new Meteor.Error(401, 'You are not authorized to login here. Please login from http://' + userClientName.toLowerCase() + '.landscape.com');
        } else {
            let currentClient = Clients.findOne({subdomain: clientName});
            if(user.profile.clientId == currentClient._id) {
                return true
            } else {
                let userClientName = Clients.findOne({_id: user.profile.clientId}).clientName;
                throw new Meteor.Error(401, 'You are not authorized to login here. Please login from http://' + userClientName.toLowerCase() + '.landscape.com');
            }
        }
    },
    createNewEmployee(userDetails) {
        if(!Roles.userIsInRole(this.userId, ['employer'])) {
            throw new Meteor.Error(401, 'Only administrator can add users.');
        }
        let user = Meteor.users.findOne({'emails.address': userDetails.email});
        if(user) {
            throw new Meteor.Error(409, 'User with that email already exists.');
        }
        let me = Meteor.users.findOne(this.userId);
        let createdUser = Accounts.createUser({
                email: userDetails.email,
                password: userDetails.password,
                profile: {
                    displayName: userDetails.profile.displayName,
                    clientId: me.profile.clientId,
                    projects: [
                        userDetails.profile.projectId
                    ]
                }
        });
        if(createdUser && (createdUser != null || createdUser != undefined)) {
            Roles.addUsersToRoles(createdUser, ['employee'])
        }
    }
})