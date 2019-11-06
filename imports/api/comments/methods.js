import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Comments from './collections';

Meteor.methods({
    addComment: function (comment, taskId) {
        if(!this.userId || !Roles.userIsInRole(this.userId, ['employer', 'employee'])) {
            throw new Meteor.Error(403, 'You are not supposed to do that!');
        }
        let user = Meteor.users.findOne(this.userId);
        let commentObject = {
            comment,
            taskId,
            createdAt: new Date(),
            replies: [],
            user: {
                displayName: user.profile.displayName,
                userId: user._id
            },
            likes: []
        };
        Comments.insert(commentObject)
    },
    likeComment: function(commentId) {
        let comment = Comments.findOne({_id: commentId, likes: {$in: [this.userId]}});
        if(comment) {
            return;
        }
        Comments.update({_id: commentId}, {$addToSet: {likes: this.userId}})
    },
    unlikeComment: function(commentId) {
        let comment = Comments.findOne({_id: commentId, likes: {$in: [this.userId]}});
        if(!comment) {
            return;
        }
        Comments.update({_id: commentId}, {$pull: {likes: this.userId}});
    },
    addReply: function(replyText, commentId) {
        let comment = Comments.findOne({_id: commentId});
        let user = Meteor.users.findOne(this.userId);
        if(!comment) {
            throw new Meteor.Error(404, 'Invalid comment.');
        }
        let replyObject = {
            text: replyText,
            user: {
                displayName: user.profile.displayName,
                userId: user._id
            },
            createdAt: new Date(),
            likes: []
        }
        Comments.update({_id: commentId}, {$addToSet: {replies: replyObject}});
    }
})