<template>
    <VCard>
        <VCardTitle primary-title>
            <div>
                <h2 class="headline mb-0">
                    Add New Client
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
                    v-model="clientName"
                    v-validate="'required'"
                    color="info"
                    type="text"
                    label="Client Name"
                    data-vv-name="clientName"
                    :error-messages="errors.collect('clientName')"
                />
                <v-text-field
                    name="subdomain"
                    v-model="subdomain"
                    v-validate="'required'"
                    label="Subdomain"
                    id="subdomain"
                    color="info"
                    type="text"
                    data-vv-name="subdomain"
                    :error-messages="errors.collect('subdomain')"
                ></v-text-field>
                <VTextField
                    v-model="adminEmail"
                    v-validate="'required|email'"
                    type="email"
                    color="info"
                    label="Admin Email"
                    data-vv-name="adminEmail"
                    :error-messages="errors.collect('adminEmail')"
                />
                <VTextField
                    v-model="adminPassword"
                    v-validate="'required'"
                    type="password"
                    color="info"
                    label="Admin Password"
                    data-vv-name="adminPassword"
                    :error-messages="errors.collect('adminPassword')"
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
    export default {
        data() {
            return {
                isValid: false,
                clientName: '',
                adminEmail: '',
                adminPassword: '',
                error: '',
                subdomain: '',
                status: { submitTitle: 'Add Client', color: 'info', dark: true, isLoading: false }
            }
        },
        watch: {
            status() {
                if(this.status.color == 'success') {
                    this.clientName = '';
                    this.adminEmail = '';
                    this.adminPassword = '';
                    this.$validator.reset();
                    setTimeout(() => {
                    this.status = { submitTitle: 'Add Client', color: 'info', dark: true, isLoading: false }
                    }, 2500)
                }
                if(this.status.color == 'error') {
                    setTimeout(() => {
                    this.status = { submitTitle: 'Add Client', color: 'info', dark: true, isLoading: false };
                    this.error = '';
                    }, 2500)
                }
            },
            clientName(newVal) {
                let clientName = newVal;
                this.subdomain = clientName.replace(/ /g, '').toLowerCase()
            }
        },
        methods: {
            toggleEditable() {
                this.isEditable = !this.isEditable
            },
            async submit() {
                await this.$validator.validateAll();

                const { clientName, subdomain, adminEmail, adminPassword } = this;

                if(!this.isValid) {
                    return;
                }

                this.state = { submitTitle: 'Creating new client...', color: 'default', isLoading: true };
                await Meteor.call('addNewClient', {clientName, adminEmail, adminPassword, subdomain}, (err, res) => {
                    if(err) {
                        this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error' };
                        this.error = err.reason;
                    } else {
                        this.status = { submitTitle: 'Client created successfully.', color: 'success' };
                    }
                })
            }
        }
    }
</script>
