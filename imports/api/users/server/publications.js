import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('users', function () {
    if (Roles.userIsInRole(this.userId, ['admin'])) {
        return Meteor.users.find({}, { sort: { createdAt: 1 } });
    } else if(Roles.userIsInRole(this.userId, ['employer'])) {
        let user = Meteor.users.findOne(this.userId);
        return Meteor.users.find({ 'profile.clientId': { $in: [ user.profile.clientId ] } }, { sort: { createdAt: -1 } });
    }
});
