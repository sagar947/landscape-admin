<template>
    <VCard>
        <VCardTitle primary-title>
            <div>
                <h2 class="headline mb-0">
                    Create new user
                </h2>
            </div>
        </VCardTitle>

        <VCardText>
            <VForm
                ref="form"
                v-model="isValid"
                @submit.prevent="submit"
            >
                <VTextField
                    v-model="displayName"
                    v-validate="'required'"
                    autofocus
                    color="dark"
                    type="text"
                    label="Display Name"
                    data-vv-name="displayName"
                    :error-messages="errors.collect('displayName')"
                />
                <VTextField
                    v-model="email"
                    v-validate:email="'required|email'"
                    type="email"
                    color="dark"
                    label="E-mail address"
                    data-vv-name="email"
                    :error-messages="errors.collect('email')"
                />
                <VTextField
                    v-model="password"
                    v-validate="'required'"
                    type="password"
                    color="dark"
                    label="Password"
                    data-vv-name="password"
                    :error-messages="errors.collect('password')"
                />
                <VAutocomplete
                    v-model="projectId"
                    v-validate="'required'"
                    color="dark"
                    label="Select Project"
                    data-vv-name="project"
                    :error-messages="errors.collect('project')"
                    :items="projects"
                    item-text="name"
                    item-value="value"
                ></VAutocomplete>
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
    import Projects from '../../../api/projects/collections.js'
    export default {
        data() {
            return {
                isValid: false,
                displayName: '',
                email: '',
                password: '',
                projectId: '',
                error: '',
                status: { submitTitle: 'Create User', color: 'primary', dark: true, isLoading: false }
            }
        },
        meteor: {
            $subscribe: {
                projects: []
            },
            projects() {
                return Projects.find().map((project) => {
                    return {
                        name: project.name,
                        value: project._id
                    }
                })
            }
        },
        watch: {
            status() {
                if(this.status.color == 'success') {
                    this.displayName = '';
                    this.email = '';
                    this.password = '';
                    this.projectId = '';
                    this.$validator.reset();
                    setTimeout(() => {
                        this.status = { submitTitle: 'Create User', color: 'primary', dark: true, isLoading: false }
                    }, 2500)
                }
                if(this.status.color == 'error') {
                    setTimeout(() => {
                        this.status = { submitTitle: 'Create User', color: 'primary', dark: true, isLoading: false };
                        this.error = '';
                    }, 2500)
                }
            }
        },
        methods: {
            async submit() {
                await this.$validator.validateAll()

                const { email, password, displayName, projectId } = this;

                if(!this.isValid) {
                    return;
                }
                this.state = { submitTitle: 'Registering user account...', color: 'default', isLoading: true };

                await Meteor.call('createNewEmployee', { email, password, profile: { displayName, projectId } }, (error, result) => {
                    if(error) {
                        this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error' };
                        this.error = error.reason;
                    } else {
                        this.status = { submitTitle: 'User created successfully.', color: 'success' };
                    }
                })
            }
        }
    }
</script>
