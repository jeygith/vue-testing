<template>

    <div>
        <div v-if="! finished">
            <span>{{remaining.days}} Days, </span>
            <span>{{remaining.hours}} Hours, </span>
            <span>{{remaining.minutes}} Minutes, </span>
            <span>{{remaining.seconds}} Seconds</span>
            left...

        </div>
        <div v-else>
            Now Expired
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        props: ['until'],
        data() {
            return {
                now: new Date()
            };
        },
        computed: {
            finished() {
                return this.remaining.total <= 0;
            },
            remaining() {
                let remaining = moment.duration(Date.parse(this.until) - this.now);
                return {
                    total: remaining,
                    days: remaining.days(),
                    hours: remaining.hours(),
                    minutes: remaining.minutes(),
                    seconds: remaining.seconds(),
                }
            }
        },
        created() {
            setInterval(() => {
                this.now = new Date();
            }, 1000)
        }
    }
</script>
