<template>
    <div>
        <input type="text" class="new-reminder" v-model="newReminder">
        <button @click="add">Add Reminder</button>


        <ul v-if="reminders.length" class="reminder-list">
            <li v-for="reminder in reminders"  :key="reminder">
                {{reminder}}

                <button class="remove" @click="remove(reminder)">Remove</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                newReminder:'',
                reminders: []
            }
        },

        methods:{
            add(){
                this.reminders.push(this.newReminder);
                this.newReminder = '';
            },

            remove(reminder){
                this.reminders.splice(reminder, 1);
            }
        }
    }
</script>
