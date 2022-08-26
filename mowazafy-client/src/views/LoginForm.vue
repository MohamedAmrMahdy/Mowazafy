<template>
    <v-app id="loginForm">
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="blue-grey darken-3">
                                <v-btn color="primary" to="/">
                                    <v-icon class="mr-2">mdi-briefcase-account</v-icon>
                                    <v-toolbar-title>Mowazafy</v-toolbar-title>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-toolbar-title>Login</v-toolbar-title>
                                <v-icon right class="mr-2">mdi-login-variant</v-icon>
                            </v-toolbar>
                            <v-card-text>
                                <v-alert v-if="message" dense type="info" color="blue-grey">
                                    {{message}}
                                </v-alert>
                                <v-form ref="form" v-model="valid">
                                    <v-text-field prepend-icon="mdi-account" name="username" label="Username" :rules="usernameRules"
                                        type="text" v-model="user.username" filled></v-text-field>
                                    <v-text-field id="password" prepend-icon="mdi-lock" name="password" label="Password" :rules="passwordRules"
                                        type="password" v-model="user.password" filled></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <span>
                                    Mohamed Amr Project - All Rights Reserved © 2022-2023</span>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" :loading="loading" :disabled="!valid || loading" @click=handleLogin>Login <v-icon>mdi-login</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import User from '../models/user';
export default {
    data: () => ({
        valid: false,
        user: new User('', ''),
        usernameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length > 4) || 'Name must be more than 4 characters',
        ],
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length > 4) || 'Password must be more than 4 characters',
        ],
        loading: false,
        message: ''
    }),
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    created() {
        if (this.loggedIn) {
            this.$router.push('/dashboard');
        }
    },
    methods: {
        handleLogin() {
            this.loading = true;
            this.$store.dispatch('auth/login', this.user).then(
                () => {
                    this.$router.push('/dashboard');
                },
                error => {
                    this.loading = false;
                    this.message =
                        error.response.data.message ||
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                }
            );
        }
    }
};
</script>

<style>
#loginForm {
    background: url("~@/assets/6222603.jpg") no-repeat center center fixed !important;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>
