<template>
    <v-app id="checkinForm">
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
                                <v-toolbar-title>Checkin</v-toolbar-title>
                                <v-icon right class="mr-2">mdi-fingerprint</v-icon>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field prepend-icon="mdi-account" name="username" label="Username"
                                        type="text" v-model="username" filled></v-text-field>
                                    <v-text-field id="password" prepend-icon="mdi-lock" name="password" label="Password"
                                        type="password" v-model="password" filled></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <span>
                                    Mohamed Amr Project - All Rights Reserved © 2022-2023</span>
                                <v-spacer></v-spacer>
                                <v-btn large depressed color="blue" :value="false">
                                    <v-icon>mdi-arrow-up</v-icon> Enter
                                </v-btn>
                                <v-btn large depressed color="blue" :value="true">
                                    Exit <v-icon>mdi-arrow-down</v-icon>
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
export default {
    data: () => ({
        username: "",
        password: "",
    }),
};
</script>

<style>
#checkinForm {
    background: url("~@/assets/6222603.jpg") no-repeat center center fixed !important;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>
