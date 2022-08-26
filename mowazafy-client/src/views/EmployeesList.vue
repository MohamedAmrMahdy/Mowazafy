<template>
    <v-app dark>
        <v-data-table :headers="headers" :items="users" sort-by="calories" class="elevation-1 ma-3">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Employees</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="green" dark class="mb-2" v-bind="attrs" v-on="on">
                                New Employee
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field prepend-icon="mdi-account" label="First name *"
                                                v-model="editedItem.first_name" required box></v-text-field>
                                                <v-text-field prepend-icon="mdi-cellphone-text" label="Mobile *"
                                                v-model="editedItem.mobile" required box></v-text-field>
                                                <v-text-field prepend-icon="mdi-cellphone-text" label="Username *"
                                                v-model="editedItem.username" required box></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field prepend-icon="mdi-account-child" label="Last name *"
                                                v-model="editedItem.last_name" required box></v-text-field>
                                            <v-text-field prepend-icon="mdi-deskphone" label="Phone *"
                                                v-model="editedItem.phone" required box></v-text-field>
                                                <v-text-field v-if="(editedIndex === -1)" prepend-icon="mdi-cellphone-text" label="Password *"
                                                v-model="editedItem.password" required box></v-text-field>
                                                <v-text-field v-if="(editedIndex != -1)" disabled prepend-icon="mdi-cellphone-text" label="Password *" required box></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure ?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:[`item.name`]="{ item }">
                {{ item.first_name }} {{ item.last_name }}
            </template>

            <template v-slot:[`item.contact`]="{ item }">
                <v-tooltip v-if="item.phone" top color="success">
                    <template v-slot:activator="{ on, attrs }">
                        <v-chip class="ma-2" color="primary" label v-bind="attrs" v-on="on">
                            <v-icon>
                                mdi-deskphone
                            </v-icon>
                        </v-chip>
                    </template>
                    <span>{{ item.phone }}</span>
                </v-tooltip>
                <v-tooltip v-if="item.mobile" top color="success">
                    <template v-slot:activator="{ on, attrs }">
                        <v-chip color="primary" label v-bind="attrs" v-on="on">
                            <v-icon>
                                mdi-cellphone-text
                            </v-icon>
                        </v-chip>
                    </template>
                    <span>{{ item.mobile }}</span>
                </v-tooltip>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small class="mr-2" @click="editItem(item)" v-bind="attrs" v-on="on">
                            mdi-pencil
                        </v-icon>
                    </template>
                    <span> Edit </span>
                </v-tooltip>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small @click="deleteItem(item)" v-bind="attrs" v-on="on">
                            mdi-delete
                        </v-icon>
                    </template>
                    <span> Delete </span>
                </v-tooltip>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>
        </v-data-table>
    </v-app>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Username', value: 'username' },
                { text: 'Title', value: 'title' },
                { text: 'E-Mail', value: 'email' },
                { text: 'Contact', value: 'contact' },
                { text: 'Birth Date', value: 'birth_date' },
                { text: 'Actions', value: 'actions' },
            ],
            editedIndex: -1,
            editedItem: {
                first_name: '',
                last_name: '',
                title: '',
                username: '',
                email: '',
                phone: '',
                mobile: '',
                birth_date: '',
                actions: '',
            },
            defaultItem: {
                first_name: '',
                last_name: '',
                title: '',
                username: '',
                email: '',
                phone: '',
                mobile: '',
                birth_date: '',
                actions: '',
                roles : ["employee"]
            },
        };
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Employee' : 'Edit Employee'
        },
        users: function () {
            return this.$store.getters["user/users"];
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            console.log(this.users);
            this.$store
                .dispatch("user/getUsers")
                .catch(err => console.log(err));
        },

        editItem(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.users.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.users[this.editedIndex], this.editedItem)
            } else {
                this.users.push(this.editedItem)
            }
            this.close()
        },
    },
};
</script>