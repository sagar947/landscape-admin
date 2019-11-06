import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Clients from '../collections.js';

Meteor.publish('clients', function () {
  if (!Roles.userIsInRole(this.userId, ['admin'])) {
    return [];
  }

  return Clients.find({}, { sort: { createdAt: 1 } });
});
