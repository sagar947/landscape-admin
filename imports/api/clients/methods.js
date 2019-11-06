import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base'
import Clients from './collections'

Meteor.methods({
    addNewClient(clientDetails) {
        if(!Roles.userIsInRole(this.userId, ['admin'])) {
            throw new Meteor.Error(401, 'Only administrator can add clients.');
        }
        let user = Meteor.users.findOne({'emails.address': clientDetails.adminEmail});
        let client = Clients.findOne({subdomain: clientDetails.subdomain});
        if(client) {
            throw new Meteor.Error(409, 'A client with that name already exists.');
        }
        if(user) {
            throw new Meteor.Error(409, 'Client administrator with that email already exists.');
        }

        Clients.insert({
            clientName: clientDetails.clientName,
            subdomain: clientDetails.subdomain,
            adminEmail: clientDetails.adminEmail,
            createdAt: new Date()
        }, (error, result) => {
            if(error) {
                throw new Meteor.Error(401, error)
            } else {
                let adminUser = Accounts.createUser({
                    email: clientDetails.adminEmail,
                    password: clientDetails.adminPassword,
                    profile: {
                    displayName: 'Admin ' + clientDetails.clientName,
                    clientId: result
                    }
                })
                Roles.addUsersToRoles(adminUser, ['employer']);
            }
        })
    }
})
