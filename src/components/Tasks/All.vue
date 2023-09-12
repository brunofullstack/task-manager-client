<template>
    <b-container fluid>
        <b-row>
            <b-col lg="4" class="pb-2">
                <b-button to="/tasks/new" size="sm" variant="success">Nova tarefa</b-button>

                <b-button size="sm" class="ml-2" :class="visible ? null : 'collapsed'"
                    :aria-expanded="visible ? 'true' : 'false'" aria-controls="collapse-4" @click="visible = !visible">
                    Opções
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-collapse id="collapse-4" v-model="visible" class="mt-2">
                    <b-card>


                        <b-row>
                            <b-col lg="6" class="my-1">
                                <b-form-group label="Sort" label-for="sort-by-select" label-cols-sm="3"
                                    label-align-sm="right" label-size="sm" class="mb-0" v-slot="{ ariaDescribedby }">
                                    <b-input-group size="sm">
                                        <b-form-select id="sort-by-select" v-model="sortBy" :options="sortOptions"
                                            :aria-describedby="ariaDescribedby" class="w-75">
                                            <template #first>
                                                <option value="">-- none --</option>
                                            </template>
                                        </b-form-select>

                                        <b-form-select v-model="sortDesc" :disabled="!sortBy"
                                            :aria-describedby="ariaDescribedby" size="sm" class="w-25">
                                            <option :value="false">Asc</option>
                                            <option :value="true">Desc</option>
                                        </b-form-select>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>

                            <b-col lg="6" class="my-1">
                                <b-form-group label="Initial sort" label-for="initial-sort-select" label-cols-sm="3"
                                    label-align-sm="right" label-size="sm" class="mb-0">
                                    <b-form-select id="initial-sort-select" v-model="sortDirection"
                                        :options="['asc', 'desc', 'last']" size="sm"></b-form-select>
                                </b-form-group>
                            </b-col>

                            <b-col lg="6" class="my-1">
                                <b-form-group label="Filter" label-for="filter-input" label-cols-sm="3"
                                    label-align-sm="right" label-size="sm" class="mb-0">
                                    <b-input-group size="sm">
                                        <b-form-input id="filter-input" v-model="filter" type="search"
                                            placeholder="Type to Search"></b-form-input>

                                        <b-input-group-append>
                                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>

                            <b-col lg="6" class="my-1">
                                <b-form-group v-model="sortDirection" label="Filter On"
                                    description="Leave all unchecked to filter on all data" label-cols-sm="3"
                                    label-align-sm="right" label-size="sm" class="mb-0" v-slot="{ ariaDescribedby }">
                                    <b-form-checkbox-group v-model="filterOn" :aria-describedby="ariaDescribedby"
                                        class="mt-1">
                                        <b-form-checkbox value="name">Name</b-form-checkbox>
                                        <b-form-checkbox value="age">Age</b-form-checkbox>
                                        <b-form-checkbox value="isActive">Active</b-form-checkbox>
                                    </b-form-checkbox-group>
                                </b-form-group>
                            </b-col>

                            <b-col sm="5" md="6" class="my-1">
                                <b-form-group label="Per page" label-for="per-page-select" label-cols-sm="6"
                                    label-cols-md="4" label-cols-lg="3" label-align-sm="right" label-size="sm" class="mb-0">
                                    <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions"
                                        size="sm"></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-row>

                    </b-card>
                </b-collapse>
            </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table :items="tasks" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter"
            :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection" stacked="md" show-empty small @filtered="onFiltered">
            <template #cell(name)="row">
                {{ row.value.first }} {{ row.value.last }}
            </template>

            <template #cell(actions)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-1">
                    {{ row.detailsShowing ? '-' : '+' }} detalhes
                </b-button>
                <b-button size="sm" @click="edit(row.item, row.index, $event.target)" class="mr-1">
                    Editar
                </b-button>
                <b-button size="sm" @click="delete(row.item)">
                    Apagar
                </b-button>
            </template>

            <template #row-details="row">
                <b-card>
                    <ul>
                        <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                    </ul>
                </b-card>
            </template>
        </b-table>

        <b-row>
            <b-col sm="6" md="6" class="my-1">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"
                    class="my-0"></b-pagination>
            </b-col>
        </b-row>

        <!-- Info modal -->
        <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal" v-model="showModal">
            <b-form @submit="onUpdate">
                <b-form-group id="input-group-1" label="Titulo:" label-for="input-1">
                    <b-form-input id="input-1" v-model="task.title" type="text" placeholder="Titulo"
                        required></b-form-input>
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

                <b-button type="reset" variant="secondary" class="mr-2">Limpar</b-button>
                <b-button type="submit" variant="primary">Salvar</b-button>
            </b-form>
            <template #modal-footer>
                <div class="w-100">
                    <b-button variant="secondary" size="sm" class="float-right" @click="showModal = false">
                        Cancelar
                    </b-button>
                </div>
            </template>

        </b-modal>
    </b-container>
</template>
  
<script>
export default {
    data() {
        return {
            showModal: false,
            visible: false,
            tasks: [],
            task: {
                title: '',
                description: '',
                status: '',
                conclusion_date: ''
            },
            fields: [
                { key: 'title', label: 'Tarefa', sortable: true, sortDirection: 'desc' },
                { key: 'description', label: 'Descrição', sortable: true, class: 'text-center' },
                {
                    key: 'status',
                    label: 'Is Status',
                    formatter: (value) => {
                        // formatter: (value, key, item) => {
                        //     console.log(key);
                        //     console.log(item);
                        return value ? 'pendente' : 'completa'
                    },
                    sortable: true,
                    sortByFormatted: true,
                    filterByFormatted: true
                },
                { key: 'actions', label: 'Ações' }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            status: [
                'pending',
                'completed'
            ],
            filter: null,
            filterOn: [],
            infoModal: {
                id: 'info-modal',
                title: '',
                content: ''
            }
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.tasks.length
        this.getTasks();
    },
    methods: {
        edit(item, index, button) {
            this.infoModal.title = `Row index: ${index}`
            this.infoModal.content = item
            this.task = item
            this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        },
        delete(item) {
            console.log('DELETE: ', item)
        },
        resetInfoModal() {
            this.infoModal.title = ''
            this.infoModal.content = ''
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        async getTasks() {
            try {
                // Dispatch the action and handle the response
                const response = await this.$store.dispatch('auth/getTasks');

                // Do something with the response data if needed
                console.log('Response:', response);
                this.tasks = response;
            } catch (error) {
                // Handle errors from the action
                console.error('Error:', error);
            }
        },

        async onUpdate(event) {
            event.preventDefault();

            try {
                // Dispatch the action and handle the response
                await this.$store
                    .dispatch("auth/updateTask", this.task)
                    .then(response => {
                        console.log('response: ', response);
                        alert('Atualizado com sucesso');
                        this.showModal = false;
                    })
                    .catch(err => {
                        console.log(err);
                        alert(err);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });

            } catch (error) {
                // Handle errors from the action
                console.error('Error:', error);
            }
        },

        delete666(item) {
            try {
                // Dispatch the action and handle the response
                this.$store
                    .dispatch("auth/deleteTask", item)
                    .then(response => {
                        console.log('response: ', response);
                        alert('Registro apagado!');
                    })
                    .catch(err => {
                        console.log(err);
                        alert(err);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });

            } catch (error) {
                // Handle errors from the action
                console.error('Error:', error);
            }
        },
    }
}
</script>