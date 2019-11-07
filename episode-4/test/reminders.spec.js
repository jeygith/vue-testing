import {mount} from '@vue/test-utils'
import expect from 'expect';
import Reminders from '../src/components/Reminders.vue';
import Vue from 'vue';


describe('Reminders', () => {

    let wrapper;
    beforeEach(() => {

        wrapper = mount(Reminders);

    });

    it('hides the reminders list if there are none', () => {

        expect(wrapper.contains('ul')).toBe(false);


    });

    it('can add reminders', (done) => {

        addReminder('Go to the store');

        Vue.nextTick(() => {
            let ul = wrapper.find('ul');

            expect(ul.is('ul')).toBe(true);


            expect(remindersList()).toContain('Go to the store');
            done();
        })


    });

    it('can remove any reminder', (done) => {
        addReminder('Go to the store');
        addReminder('Finish this course');

        Vue.config.errorHandler = done;

        Vue.nextTick(() => {
            let deleteButton = wrapper.find('ul > li:first-child .remove');
            deleteButton.trigger('click');

            Vue.nextTick(()=>{
                expect(remindersList()).not.toContain('Go to the store');
                expect(remindersList()).toContain('Finish this course');
                done();
            })


        });


    });

    function addReminder(body) {

        let newReminder = wrapper.find('.new-reminder');

        newReminder.element.value = body;

        newReminder.trigger('input');


        wrapper.find('button').trigger('click');

    }

    function remindersList() {
        return wrapper.find('ul').text();
    }
});



