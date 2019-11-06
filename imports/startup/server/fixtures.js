// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
    if(Meteor.users.find().count() == 0) {
        console.log('No users found!');
        console.log('Creating Administrator');
        var adminUser = Accounts.createUser({
            email: 'admin@landscape.com',
            password: 'AdminLandscape',
            profile: {
                displayName: 'Landscape Admin'
            }
        });
        Roles.addUsersToRoles(adminUser, ['admin']);
    }
});
