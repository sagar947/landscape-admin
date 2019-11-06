<template>
    <v-flex xs12 md4>
        <VCard>
            <VCardTitle primary-title>
                <div>
                    <h2 class="headline mb-0">
                        Landscape
                    </h2>
                </div>
            </VCardTitle>

            <VCardText>
                <VForm
                    v-model="isValid"
                    @submit.prevent="submit"
                >
                    <VTextField
                        v-model="email"
                        v-validate="'required|email'"
                        autofocus
                        color="dark"
                        type="email"
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
                        block
                    >
                        {{ status.submitTitle }}
                    </VBtn>

                    <p class="text-lg-right mt-4">
                        <VBtn
                            flat
                            small
                            :to="forgotPasswordLink"
                        >
                            Lost your password? Reset it here!
                        </VBtn>
                    </p>
                    <p class="text-lg-right mt-4">
                        <VBtn
                            flat
                            small
                            :to="registrationLink"
                        >
                            Register yourself now!
                        </VBtn>
                    </p>
                </VForm>
            </VCardText>
        </VCard>
    </v-flex>
</template>
<script>
    export default {
        props: {
            registrationLink: { type: String, default: '/registration' },
            forgotPasswordLink: { type: String, default: '/forgot-password' },
        },
        data() {
            return {
                isValid: false,
                email: '',
                password: '',
                error: '',
                status: { submitTitle: 'Login', color: 'info', dark: true },
            };
        },

        methods: {
            async submit() {
                await this.$validator.validateAll();

                const { email, password } = this;

                if (!this.isValid) {
                    return;
                }

                this.status = { submitTitle: 'Logging you in...', color: 'default' };
                var prot = window.location.protocol.slice(0, window.location.protocol.length - 1)
                let url = window.location.href;
                var startChar = prot == 'http' ? 7: 8;
                var path = url.substr(startChar, url.length);
                var endIndex = path.indexOf('.');
                var clientName = path.substring(0, endIndex);
                await Meteor.call('validateLoginClient', clientName, email, (error, result) => {
                    if(error) {
                        this.error = error.reason
                    } else {
                        Meteor.loginWithPassword(email, password, (err, res) => {
                            if(err) {
                                this.error = err.reason
                            } else {
                                this.$router.push('/dashboard');
                            }
                        })
                    }
                })

            },
        },
    };
</script>
