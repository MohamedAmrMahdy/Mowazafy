<template>
    <v-app>
        <v-navigation-drawer dark app clipped width="260" class="elevation-8">
            <v-list-item>
                <v-list-item-icon>
                    <v-icon x-large>mdi-briefcase-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="text-h6"> Mowazafy </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list expand class="pt-5 mt-4">
                <template v-for="(item, index) in menuItems">
                    <v-subheader v-if="item.header" :key="item.title" class="text-uppercase font-weight-medium">
                        {{ item.header }}</v-subheader>
                    <v-divider v-else-if="item.divider" :key="`divider-${index}`"></v-divider>
                    <v-list-item v-else :key="`item-${index}`" :to="item.path" ripple="ripple">
                        <v-list-item-icon>
                            <v-icon medium>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="text-uppercase">
                                {{ item.title }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="caption text-capitalize">
                                {{ item.subtitle }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar dark fixed app clipped-left color="blue-grey darken-3">
            <h4>
                {{ currentUser.first_name }} {{ currentUser.last_name }} <div>{{ currentUser.email }}</div>
            </h4>
            <v-spacer></v-spacer>

            <v-toolbar-title class="font-weight-light font-italic text-uppercase">
                {{ $route.name }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text>
                refresh
                <v-icon right>mdi-cloud-refresh</v-icon>
            </v-btn>
            <v-btn text @click="logout">
                logout
                <v-icon right>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>
        <router-view />
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            menuItems: [
                {
                    icon: "mdi-tablet-dashboard",
                    title: "DashBoard",
                    subtitle: "contain all info and stats",
                    path: "/dashboard/main",
                },
                {
                    divider: true,
                },
                {
                    header: "Main Control",
                },
                {
                    icon: "mdi-account-group",
                    title: "Employees",
                    subtitle: "Shows All Employees",
                    path: "/dashboard/employees",
                },
                {
                    icon: "mdi-account-off",
                    title: "Vacations",
                    subtitle: "Edit Calendar Vacations",
                    path: "/dashboard/vacations",
                },
                {
                    divider: true,
                },
                {
                    header: "Others",
                },
                {
                    icon: "mdi-calendar-clock-outline",
                    title: "Attendance",
                    path: "/dashboard/attendance",
                },
            ],
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    }
};
</script>
