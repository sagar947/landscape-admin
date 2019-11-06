<template>
    <VCard>
        <VCardTitle primary-title>
            <div>
                <h2 class="headline mb-0">
                Add New Project
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
                    v-model="projectName"
                    v-validate="'required'"
                    autofocus
                    color="dark"
                    type="text"
                    label="Project Name"
                    data-vv-name="projectName"
                    :error-messages="errors.collect('projectName')"
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
        projectName: '',
        error: '',
        status: { submitTitle: 'Add Project', color: 'primary', dark: true, isLoading: false }
      }
    },
    watch: {
      status() {
        if(this.status.color == 'success') {
          this.projectName = '';
          this.$validator.reset();
          setTimeout(() => {
            this.status = { submitTitle: 'Add Project', color: 'primary', dark: true, isLoading: false }
          }, 2500)
        }
        if(this.status.color == 'error') {
          setTimeout(() => {
            this.status = { submitTitle: 'Add Project', color: 'primary', dark: true, isLoading: false };
            this.error = '';
          }, 2500)
        }
      }
    },
    methods: {
      async submit() {
        await this.$validator.validateAll();

        const { projectName } = this;

        if(!this.isValid) {
          return;
        }

        this.state = { submitTitle: 'Adding new project...', color: 'default', isLoading: true };
        await Meteor.call('addNewProject', projectName, (err, res) => {
          if(err) {
            this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error' };
            this.error = err.reason;
          } else {
            this.status = { submitTitle: 'Project added successfully.', color: 'success' };
          }
        })
      }
    }
  }
</script>
