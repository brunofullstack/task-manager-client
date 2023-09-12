<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Titulo:" label-for="input-1">
                <b-form-input id="input-1" v-model="task.title" type="text" placeholder="Titulo" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Descrição:" label-for="input-2">
                <b-form-input id="input-2" v-model="task.description" type="text" placeholder="Descrição da tarefa"
                    required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Status:" label-for="input-3">
                <b-form-select id="input-3" v-model="task.status" :options="status" required></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-3" label="Data de conclusão:" label-for="input-3">
                <b-form-input id="input-4" v-model="task.conclusion_date" type="date"></b-form-input>
            </b-form-group>

            <b-button type="reset" variant="danger" class="mr-2">Limpar</b-button>
            <b-button type="submit" variant="primary">Enviar</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ task }}</pre>
        </b-card>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            task: {
                title: '',
                description: '',
                status: '',
                conclusion_date: ''
            },
            status: [{ text: 'Pendente', value: 'pending' }, { text: 'Concluído', value: 'completed' }],
            show: true
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();

            try {
                // Dispatch the action and handle the response
                this.$store
                    .dispatch("auth/storeTask", this.task)
                    .then(response => {
                        console.log('response: ', response);
                        alert('Enviado com sucesso');
                        this.$router.push("/tasks")
                    })
                    .catch(err => {
                        console.log(err);
                        alert(err);
                        this.$router.push("/login")
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });

            } catch (error) {
                // Handle errors from the action
                console.error('Error:', error);
            }
        },
        async postData() {
            try {
                const payload = {
                    // Data to be posted
                };

                // Dispatch the action and handle the response
                const response = await this.$store.dispatch('auth/storeTask', payload);

                // Do something with the response data if needed
                console.log('Response:', response);
            } catch (error) {
                // Handle errors from the action
                console.error('Error:', error);
            }
        },
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.task.title = ''
            this.task.description = ''
            this.task.status = 'pending'
            this.task.conclusion_date = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
}
</script>