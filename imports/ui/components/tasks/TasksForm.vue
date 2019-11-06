<template>
    <VCard>
        <VCardText>
            <VForm
                ref="form"
                v-model="isValid"
                @submit.prevent="submit"
            >
                <v-layout row wrap>
                    <v-flex xs12 md12>
                        <VTextField
                            v-model="title"
                            v-validate="'required'"
                            color="dark"
                            type="text"
                            label="Title"
                            data-vv-name="title"
                            :error-messages="errors.collect('title')"
                        />
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-select
                            :items="typeItems"
                            v-validate="'required'"
                            v-model="type"
                            label="Type"
                            color="dark"
                            data-vv-name="type"
                            :error-messages="errors.collect('type')"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-select
                            :items="statusItems"
                            v-model="taskStatus"
                            label="Status"
                            readonly
                            color="dark"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-select
                            :items="priorityItems"
                            v-validate="'required'"
                            v-model="priority"
                            label="Priority"
                            color="dark"
                            data-vv-name="priority"
                            :error-messages="errors.collect('priority')"
                        ></v-select>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 md4>
                        <v-select
                            :items="difficultyItems"
                            v-validate="'required'"
                            v-model="difficulty"
                            label="Difficulty"
                            color="dark"
                            data-vv-name="difficulty"
                            :error-messages="errors.collect('difficulty')"
                        ></v-select>
                    </v-flex>
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
                </v-layout>
                <v-layout row wrap>
                    <VFlex xs12>
                        <vue-editor v-model="description"></vue-editor>
                    </VFlex>
                </v-layout>        
                <VAlert
                    :value="!!error"
                    color="error"
                    icon="warning"
                    outline
                >
                    {{ error }}
                </VAlert>
                <VBtn
                    type="submit"
                    :color="status.color"
                    :dark="status.dark"
                    :isLoading="status.isLoading"
                    block
                >
                    {{ status.submitTitle }}
                </VBtn>
            </VForm>
        </VCardText>
    </VCard>
</template>

<script>
    import { VueEditor } from 'vue2-quill-editor'
    export default {
        components: {
            VueEditor
        },
        data() {
            return {
                isValid: false,
                title: '',
                description: '',
                error: '',
                type: '',
                taskStatus: 'Not Started',
                priority: '',
                difficulty: '',
                reviewer: '',
                status: { submitTitle: 'Create', color: 'secondary', dark: true, isLoading: false },
                assignedTo: [],
                typeItems: ['Code Review', 'Integration', 'Implementation', 'Enhancement', 'Infrastructure', 'Testing', 'Other'],
                statusItems: ['Not Started'],
                priorityItems: ['Critical', 'High', 'Medium', 'Low'],
                difficultyItems: ['Difficult', 'Moderate', 'Easy']
            };
        },
        meteor: {
            $subscribe: {
                projectUsers: function () {
                    return [this.$route.params.projectId]
                }
            },
            users() {
                return Meteor.users.find({_id: {$nin: [Meteor.userId()]}}, {sort: {'profile.displayName': 1}}).map((user) => {
                return {
                    text: user.profile.displayName,
                    value: user._id
                }
                })
            }
        },

        watch: {
            status() {
                if(this.status.color === 'success') {
                setTimeout(() => {
                    this.status = { submitTitle: 'Create', color: 'secondary', dark: true, isLoading: false };
                    this.$validator.reset();
                    this.$refs.form.reset();
                    this.description = ''
                }, 2500);
                }
                if(this.status.color === 'error') {
                setTimeout(() => {
                    this.status = { submitTitle: 'Create', color: 'secondary', dark: true, isLoading: false };
                    this.error = ''
                }, 2500)
                }
            }
        },

        methods: {
            async submit() {
                await this.$validator.validateAll();
                if (!this.isValid) {
                    return;
                }

                var taskDetails = {
                    title: this.title,
                    type: this.type,
                    status: this.taskStatus,
                    priority: this.priority,
                    difficulty: this.difficulty,
                    description: this.description,
                    projectId: this.$route.params.projectId
                }
                taskDetails.assignedTo = this.assignedTo.map((user) => {
                    return user.value
                });
                taskDetails.reviewer = this.reviewer.value
                this.status = { submitTitle: 'Saving item...', color: 'default', isLoading: true };
                await Meteor.call('addTask', taskDetails, (error, result) => {
                    if(error) {
                        this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error' };
                        this.error = error.reason;
                    } else {
                        this.status = { submitTitle: 'Task created successfully.', color: 'success' };
                    }
                })
            },
        },
    };
</script>
