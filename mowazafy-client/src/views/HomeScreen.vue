<template>
    <v-container fluid fill-height>
        <v-app-bar app color="blue-grey darken-3" dark>
            <div class="d-flex align-center">
                <v-icon class="mr-2">mdi-briefcase-account</v-icon>
                <v-toolbar-title to="/" class="font-weight-medium text-uppercase mr-2" >Mowazafy</v-toolbar-title>
            </div>

            <v-spacer></v-spacer>
            <v-btn to="/checkin" text>
                <span class="mr-2">Check-in</span>
                <v-icon>mdi-fingerprint</v-icon>
            </v-btn>
            <v-btn to="/login" text>
                <span class="mr-2">Sign in</span>
                <v-icon>mdi-login</v-icon>
            </v-btn>
        </v-app-bar>
        <v-row class="text-center white--text" align-center justify-center>
            <v-col class="mb-4">
                <v-icon x-large color="white">mdi-briefcase-account</v-icon>
                <h1 class="display-2 font-weight-bold mb-3">
                    Welcome to Mowazafy
                </h1>

                <p class="subheading font-weight-regular">
                    For your HR employee management
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({

    }),
};
</script>
