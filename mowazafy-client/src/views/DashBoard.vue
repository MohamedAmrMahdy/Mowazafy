<template>
    <v-app class="white--text">
        <v-container fluid grid-list-xl>
            <v-layout wrap row>
                <v-flex sm6 xs12 md6 lg3>
                    <statsCard color="red" icon="mdi-account-group" title="Total Employees" :subTitle="`1,234`"></statsCard>
                </v-flex>
                <v-flex sm6 xs12 md6 lg3>
                    <statsCard color="blue" icon="mdi-account-multiple-check" title="Active Employees" :subTitle="`10`">
                    </statsCard>
                </v-flex>
                <v-flex sm6 xs12 md6 lg3>
                    <statsCard color="purple" icon="mdi-fingerprint" title="Checkin today" :subTitle="`1234`"></statsCard>
                </v-flex>
                <v-flex sm6 xs12 md6 lg3>
                    <statsCard color="green" icon="mdi-cash-multiple" title="Average Salaries" :subTitle="`1234`">
                    </statsCard>
                </v-flex>
            </v-layout>
            <v-row class="fill-height">
                <v-col>
                    <v-sheet height="64" dark>
                        <v-toolbar flat>
                            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                                Today
                            </v-btn>
                            <v-btn fab text small color="grey darken-2" @click="prev">
                                <v-icon small>
                                    mdi-chevron-left
                                </v-icon>
                            </v-btn>
                            <v-btn fab text small color="grey darken-2" @click="next">
                                <v-icon small>
                                    mdi-chevron-right
                                </v-icon>
                            </v-btn>
                            <v-toolbar-title v-if="$refs.calendar">
                                {{ $refs.calendar.title }}
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-menu bottom right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                                        <span>{{ typeToLabel[type] }}</span>
                                        <v-icon right>
                                            mdi-menu-down
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item @click="type = 'day'">
                                        <v-list-item-title>Day</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'week'">
                                        <v-list-item-title>Week</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'month'">
                                        <v-list-item-title>Month</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = '4day'">
                                        <v-list-item-title>4 days</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-toolbar>
                    </v-sheet>
                    <v-sheet height="600">
                        <v-calendar ref="calendar" v-model="focus" color="primary" :events="events"
                            :event-color="getEventColor" :type="type" @click:event="showEvent" @click:more="viewDay"
                            @click:date="viewDay" @change="updateRange"></v-calendar>
                        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement"
                            offset-x>
                            <v-card color="grey lighten-4" min-width="350px" flat>
                                <v-card-title class="text-h5">
                                    {{ selectedEvent.name }}
                                </v-card-title>

                                <v-card-subtitle>
                                    <div><span class="font-weight-medium">Check-in ID :</span> {{ selectedEvent.id }}
                                    </div>
                                    <div><span class="font-weight-medium">Start :</span> {{ selectedEvent.start }}</div>
                                    <div><span class="font-weight-medium">End :</span> {{ selectedEvent.end }}</div>
                                    <div><span class="font-weight-medium">Time :</span> {{
                                            getEventDuration(selectedEvent.start, selectedEvent.end)
                                    }}</div>
                                </v-card-subtitle>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="secondary" @click="selectedOpen = false">
                                        Close
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import statsCard from '../components/statsCard.vue';

export default {
    name: "App",
    components: { statsCard },
    data: () => ({
        focus: '',
        type: 'month',
        typeToLabel: {
            month: 'Month',
            week: 'Week',
            day: 'Day',
            '4day': '4 Days',
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    }),
    mounted() {
        this.$refs.calendar.checkChange()
    },
    methods: {
        viewDay({ date }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor(event) {
            return event.color
        },
        setToday() {
            this.focus = ''
        },
        prev() {
            this.$refs.calendar.prev()
        },
        next() {
            this.$refs.calendar.next()
        },
        showEvent({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        updateRange() {
            this.events = [{
                id: 1234,
                name: 'Mohamed Amr',
                start: '2022-08-08 01:00:20',
                end: '2022-08-08 06:00:25',
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
            }, {
                id: 1234,
                name: 'Omar Mohamed',
                start: '2022-08-08 01:00:20',
                end: '2022-08-08 05:00:25',
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
            }, {
                id: 53452,
                name: 'Mohamed Amr',
                start: '2022-08-10 01:00:20',
                end: '2022-08-10 12:00:28',
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
            }, {
                id: 53452,
                name: 'Mohamed Amr',
                start: '2022-08-10 01:00:20',
                end: '2022-08-10 12:00:28',
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
            }, {
                id: 53452,
                name: 'Mohamed Amr',
                start: '2022-08-10 01:00:20',
                end: '2022-08-10 12:00:28',
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
            }, {
                id: 53452,
                name: 'Mohamed Amr',
                start: '2022-08-10 01:00:20',
                end: '2022-08-10 12:00:28',
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
            }, {
                id: 53452,
                name: 'Mohamed Amr',
                start: '2022-08-10 01:00:20',
                end: '2022-08-10 12:00:28',
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
            }, {
                id: 957856,
                name: 'Mohamed Amr',
                start: '2022-08-11 03:00:20',
                end: '2022-08-11 07:00:29',
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
            }, {
                id: 134536,
                name: 'Mohamed Amr',
                start: '2022-08-09 08:00:20',
                end: '2022-08-09 12:00:34',
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
            }]
            this.events.push({
                name: 'Eid Al Fitr',
                start: '2022-08-09',
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
            }, {
                name: 'Eid Al Fitr',
                start: '2022-08-10',
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
            }, {
                name: 'Eid Al Fitr',
                start: '2022-08-11',
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
            })
        },
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
        padTo2Digits(num) {
            return num.toString().padStart(2, '0')
        },
        convertMsToTime(milliseconds) {
            let seconds = Math.floor(milliseconds / 1000)
            let minutes = Math.floor(seconds / 60)
            let hours = Math.floor(minutes / 60)
            seconds = seconds % 60
            minutes = minutes % 60
            //hours = hours % 24;

            return `${this.padTo2Digits(hours)} hours, ${this.padTo2Digits(minutes)} minutes, ${this.padTo2Digits(seconds)} seconds`;
        },
        getEventDuration(start, end) {
            const date1 = new Date(start)
            const date2 = new Date(end)
            const diffTime = Math.abs(date2 - date1)
            return this.convertMsToTime(diffTime)
        },
    },
};
</script>