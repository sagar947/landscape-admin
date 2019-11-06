<template>
    <div>
        <v-layout row wrap pa0>
            <v-flex xs12>
                <v-card color="rgba(73, 140, 157, 0.3)">
                    <v-card-text color="secondary">
                        <v-breadcrumbs :items="breadcrumbItems">
                            <template slot="divider">
                                <v-icon>forward</v-icon>
                            </template>
                            <v-breadcrumbs-item
                                slot="item"
                                slot-scope="{ item }"
                                exact
                                :disabled="item.disabled"
                                :to="item.href"
                            >
                                {{ item.text }}
                            </v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-card>
            <v-card-text>
                <VForm v-if="isEditing" @submit.prevent="submitEditForm" id="editForm" v-model="isEditFormValid">
                    <v-layout row wrap>
                        <VFlex xs4>
                            <v-select
                                :items="typeItems"
                                v-model="type"
                                label="Type"
                                color="dark"
                            ></v-select>
                        </VFlex>
                        <VFlex xs4>
                            <v-select
                                :items="statusItems"
                                v-model="status"
                                label="Status"
                                color="dark"
                            ></v-select>
                        </VFlex>
                        <VFlex xs4>
                            <v-select
                                :items="priorityItems"
                                v-model="priority"
                                label="Priority"
                                color="dark"
                            ></v-select>
                        </VFlex>
                        <VFlex xs4>
                            <v-select
                                :items="difficultyItems"
                                v-model="difficulty"
                                label="Difficulty"
                                color="dark"
                            ></v-select>
                        </VFlex>
                        <VFlex xs12 md4>
                            <v-combobox
                                v-model="assignedTo"
                                v-validate="'required'"
                                color="dark"
                                :items="users"
                                hide-selected
                                :item-text="users.text"
                                :item-value="users.value"
                                label="Assign to"
                                multiple
                                data-vv-name="assignedTo"
                                :error-messages="errors.collect('assignedTo')"
                            >
                            </v-combobox>
                        </VFlex>
                        <VFlex xs12 md4>
                            <v-combobox
                                v-model="reviewer"
                                v-validate="'required'"
                                color="dark"
                                :items="users"
                                :item-text="users.text"
                                :item-value="users.value"
                                label="Reviewer"
                                data-vv-name="reviewer"
                                :error-messages="errors.collect('reviewer')"
                            >
                            </v-combobox>
                        </VFlex>
                        <VFlex xs12>
                            <vue-editor v-model="description"></vue-editor>
                        </VFlex>
                    </v-layout>
                    <v-layout row wrap pa0 justify-center>
                        <VFlex xs12 md4>
                            <VBtn color="primary" type="submit">Save</VBtn>
                            <VBtn color="secondary" @click.prevent="handleIsEditing">Cancel</VBtn>
                        </VFlex>
                    </v-layout>
                </VForm>
                <v-layout row wrap pa0 v-else>
                    <v-flex xs12 md6>
                        <h1>{{task.title}}</h1>
                    </v-flex>
                    <v-flex xs12 md6 class="text-xs-right">
                        <VBtn color="secondary" @click.prevent="handleIsEditing"><v-icon>edit</v-icon></VBtn>
                    </v-flex>
                    <v-flex xs12 md6>
                        <p><strong>Type:</strong> {{task.type}}</p>
                        <p><strong>Status:</strong> {{task.status}}</p>
                        <p><strong>Assigned to: </strong>{{assignedTo | assignedToFilter}}</p>
                    </v-flex>
                    <v-flex xs12 md6>
                        <p><strong>Priority:</strong> {{task.priority}}</p>
                        <p><strong>Difficulty:</strong> {{task.difficulty}}</p>
                        <p><strong>Reviewed by: </strong>{{reviewer.text}}</p>
                    </v-flex>
                    <v-flex xs12 md12>
                        <h3>Description</h3>
                        <div v-html="description"></div>
                    </v-flex>
                </v-layout>
                <v-layout row wrap pa0>
                    <v-flex xs12 md12>
                        <v-divider></v-divider>
                        <v-form @submit.prevent="addComment" v-model="isCommentFormValid" ref="commentForm">
                            <v-textarea v-model="comment" label="Add Comment" v-validate="'required'" data-vv-name="comment" :error-messages="errors.collect('comment')" id="addComment" auto-grow></v-textarea>
                            <VAlert
                                :value="!!commentError"
                                color="error"
                                icon="warning"
                                outline
                            >
                                {{ commentError }}
                            </VAlert>
                            <v-btn :color="commentStatus.color" :dark="commentStatus.dark" :isLoading="commentStatus.isLoading" type="submit" block>{{commentStatus.submitTitle}}</v-btn>
                        </v-form>
                        <v-divider></v-divider>
                    </v-flex>
                </v-layout>
                <v-layout row wrap pa0 justify-center v-if="comments.length <= 0">
                    <v-flex xs12 md6 text-xs-center>
                        <h4>Be the first to write a comment</h4>
                    </v-flex>
                </v-layout>
                <v-layout row wrap pa0 justify-center v-else>
                    <v-flex xs12 md8 text-xs-center>
                        <h2>Comments</h2>
                    </v-flex>
                    <v-flex xs12 md8 v-for="item in comments" :key="item._id">
                        <v-card class="mx-auto" color="primary lighten-2" dark>
                            <v-card-title>
                                <v-avatar color="primary darken-2" class="mr-3">
                                    <span class="white--text">{{item.user.displayName.charAt(0).toUpperCase()}}</span>
                                </v-avatar>
                                <span class="title font-weight-light white--text">{{item.user.displayName}}</span>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text class="font-weight-light black--text">
                                "{{item.comment}}"
                            </v-card-text>
                            <v-card-actions>
                                <v-list-tile class="grow">
                                    <v-layout align-center justify-end>
                                        <v-tooltip color="primary darken-2" top v-if="item.likes.includes(currentUserId)">
                                            <template v-slot:activator="{on}">
                                                <v-btn flat icon class="mr-1" @click.prevent="unlikeComment(item)" v-on="on">
                                                    <v-icon>thumb_down</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Dislike</span>
                                        </v-tooltip>
                                        <v-tooltip v-else color="primary darken-2" top>
                                            <template v-slot:activator="{on}">
                                                <v-btn flat icon class="mr-1" @click.prevent="likeComment(item)" v-on="on">
                                                    <v-icon>thumb_up</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Like</span>
                                        </v-tooltip>
                                        <span class="subheading mr-2">{{item.likes.length}}</span>
                                        <span class="mr-2">·</span>
                                        <v-btn flat icon class="mr-1" @click.stop="viewReplies(item)">
                                            <v-icon>reply</v-icon>
                                        </v-btn>
                                        <span class="subheading mr-1">{{item.replies.length}}</span>
                                    </v-layout>
                                </v-list-tile>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-dialog
                        v-model="dialog"
                        fullscreen
                        hide-overlay
                        transition="dialog-bottom-transition"
                    >
                        <v-card color="grey lighten-3">
                            <v-toolbar dark color="primary" persistent fixed>
                                <v-btn icon dark @click="dialog = false">
                                <v-icon>close</v-icon>
                                </v-btn>
                                <v-toolbar-title>Replies</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-items>
                                <v-btn dark flat @click="dialog = false">Close</v-btn>
                                </v-toolbar-items>
                            </v-toolbar>
                            <v-card-text>
                                <v-container fluid grid-list-lg>
                                    <v-layout row wrap pa-5>
                                        <v-flex
                                            xs12
                                        >
                                            <v-form @submit.prevent="addReply" v-model="isReplyFormValid" ref="replyForm">
                                                <v-textarea v-model="reply" label="Add Reply" v-validate="'required'" data-vv-name="reply" :error-messages="errors.collect('reply')" id="addReply"></v-textarea>
                                                <VAlert
                                                    :value="!!replyError"
                                                    color="error"
                                                    icon="warning"
                                                    outline
                                                >
                                                    {{ replyError }}
                                                </VAlert>
                                                <v-btn :color="replyStatus.color" :dark="replyStatus.dark" :isLoading="replyStatus.isLoading" type="submit" block>{{replyStatus.submitTitle}}</v-btn>
                                            </v-form>
                                        </v-flex>
                                        <v-flex
                                            xs12
                                            md4
                                            v-for="reply in replies"
                                            :key="reply.id"
                                            d-flex
                                        >
                                            <v-sheet
                                                elevation=12
                                                class="d-flex" width="200"
                                            >
                                                <v-card>
                                                    <v-card-title>
                                                        <v-avatar color="primary darken-2" class="mr-3">
                                                            <span class="white--text">{{reply.user.displayName.charAt(0).toUpperCase()}}</span>
                                                        </v-avatar>
                                                        <span class="title font-weight-light dark--text">{{reply.user.displayName}}</span>
                                                    </v-card-title>
                                                    <v-divider></v-divider>
                                                    <v-card-text>
                                                        "{{reply.text}}"
                                                    </v-card-text>
                                                </v-card>
                                            </v-sheet>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import dependency from '../../../startup/client/Dependency.js';
    import Tasks from '../../../api/tasks/collections.js';
    import Projects from '../../../api/projects/collections.js';
    import Comments from '../../../api/comments/collections.js';
    import { VueEditor } from 'vue2-quill-editor';
    export default {
        components: {
            VueEditor
        },
        data() {
            return {
                isCommentFormValid: false,
                isReplyFormValid: false,
                isEditFormValid: false,
                isEditing: false,
                typeItems: ['Code Review', 'Integration', 'Implementation', 'Enhancement', 'Infrastructure', 'Testing', 'Other'],
                statusItems: ['Not Started', 'In Progress', 'Reopened', 'Completed'],
                priorityItems: ['Critical', 'High', 'Medium', 'Low'],
                difficultyItems: ['Difficult', 'Moderate', 'Easy'],
                type: '',
                status: '',
                priority: '',
                difficulty: '',
                assignedTo: '',
                reviewer: '',
                description: '',
                comment: '',
                commentStatus: { submitTitle: 'Add Comment', color: 'primary', dark: true, isLoading: false },
                commentError: '',
                dialog: false,
                commentId: '',
                replyStatus: { submitTitle: 'Add Reply', color: 'primary', dark: true, isLoading: false },
                reply: '',
                replyError: ''
            }
        },
        mounted() {
            Tracker.autorun(() => {
                dependency.depend();
                let task = Tasks.findOne({_id: this.$route.params.taskId});
                if(task) {
                    this.type = task.type
                    this.status = task.status;
                    this.priority = task.priority;
                    this.difficulty = task.difficulty;
                    this.assignedTo = task.assignedTo.map((user) => {
                        return {
                            text: Meteor.users.findOne({_id: user}).profile.displayName,
                            value: user
                        }
                    });
                    this.reviewer = {
                        text: Meteor.users.findOne({_id: task.reviewer}).profile.displayName,
                        value: task.reviewer
                    };
                    this.description = task.description;
                }
            })
        },
        meteor: {
            $subscribe: {
                taskById: function() {
                    return [this.$route.params.taskId]
                },
                projectById: function() {
                    if(this.$subReady.taskById) {
                        return [Tasks.findOne({_id: this.$route.params.taskId}).projectId]
                    } else {
                        return [];
                    }
                },
                projectUsers: function () {
                    if(this.$subReady.taskById) {
                        return [Tasks.findOne({_id: this.$route.params.taskId}).projectId]
                    }
                },
                taskComments: function() {
                    return [this.$route.params.taskId]
                }
            },
            currentUserId() {
                return Meteor.userId()
            },
            users() {
                return Meteor.users.find({_id: {$nin: [Meteor.userId()]}}, {sort: {'profile.displayName': 1}}).map((user) => {
                    return {
                        text: user.profile.displayName,
                        value: user._id
                    }
                })
            },
            task: function () {
                if(this.$subReady.taskById) {
                    return Tasks.findOne({_id: this.$route.params.taskId})
                } else {
                    return {}
                }
            },
            comments: function () {
                if(this.$subReady.taskComments) {
                    return Comments.find({taskId: this.$route.params.taskId}).fetch()
                } else {
                    return []
                }
            },
            replies: function () {
                if(this.$subReady.taskComments) {
                    let comment = Comments.findOne({_id: this.commentId});
                    if(comment) {
                        return comment.replies;
                    } else {
                        return []
                    }
                } else {
                    return []
                }
            },
            breadcrumbItems: function() {
                if(this.$subReady.taskById) {
                    let task = Tasks.findOne({_id: this.$route.params.taskId});
                    let project = Projects.findOne({_id: task.projectId});
                    return [{
                        text: 'Dashboard',
                        disabled: false,
                        href: '/'
                    }, {
                        text: 'Projects',
                        disabled: false,
                        href: '/projects'
                    }, {
                        text: 'Tasks (' + project.name + ')',
                        disabled: false,
                        href: '/tasks/' + task.projectId
                    }, {
                        text: task.title,
                        disabled: true
                    }]
                } else {
                    return []
                }
            }
        },
        methods: {
            submitEditForm() {
                console.log(this)
            },
            handleIsEditing() {
                this.isEditing = !this.isEditing
            },
            async addComment() {
                await this.$validator.validateAll();
                if(!this.isCommentFormValid) {
                    return;
                }
                this.commentStatus = { submitTitle: 'Writing comment...', color: 'default', isLoading: true };
                await Meteor.call('addComment', this.comment, this.$route.params.taskId, (err, res) => {
                    if(err) {
                        this.commentStatus = { submitTitle: 'Oops! Something went wrong...', color: 'error' };
                        this.commentError = err.reason;
                    } else {
                        this.commentStatus = { submitTitle: 'Comment written successfully.', color: 'success' };
                    }
                })
            },
            async addReply() {
                await this.$validator.validateAll()
                if(!this.isReplyFormValid) {
                    return;
                }
                this.replyStatus = { submitTitle: 'Writing reply...', color: 'default', isLoading: true };
                await Meteor.call('addReply', this.reply, this.commentId, (err, res) => {
                    if(err) {
                        this.replyStatus = { submitTitle: 'Oops! Something went wrong...', color: 'error' };
                        this.replyError = err.reason;
                    } else {
                        this.replyStatus = { submitTitle: 'Reply written successfully.', color: 'success' }
                    }
                })
            },
            likeComment(item) {
                Meteor.call('likeComment', item._id);
            },
            unlikeComment(item) {
                Meteor.call('unlikeComment', item._id);
            },
            viewReplies(item) {
                this.dialog = true;
                this.commentId = item._id
            }
        },
        watch: {
            commentStatus() {
                if(this.commentStatus.color === 'success') {
                    setTimeout(() => {
                        this.commentStatus = { submitTitle: 'Add Comment', color: 'primary', dark: true, isLoading: false };
                        this.$validator.reset();
                        this.$refs.commentForm.reset();
                    }, 2500);
                }
                if(this.commentStatus.color === 'error') {
                    setTimeout(() => {
                        this.commentStatus = { submitTitle: 'Create', color: 'primary', dark: true, isLoading: false };
                        this.commentError = ''
                    }, 2500)
                }
            },
            replyStatus() {
                if(this.replyStatus.color === 'success') {
                    setTimeout(() => {
                        this.replyStatus = { submitTitle: 'Add Reply', color: 'primary', dark: true, isLoading: false };
                        this.$validator.reset();
                        this.$refs.replyForm.reset();
                    }, 2500);
                }
                if(this.replyStatus.color === 'error') {
                    setTimeout(() => {
                        this.replyStatus = { submitTitle: 'Create', color: 'primary', dark: true, isLoading: false };
                        this.replyError = ''
                    }, 2500)
                }
            }
        }
    }
</script>
