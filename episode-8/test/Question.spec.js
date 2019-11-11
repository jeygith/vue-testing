import {mount} from '@vue/test-utils'
import expect from 'expect';
import Question from '../src/components/Question.vue';
import Vue from 'vue';
import axios from 'axios'
import moxios from 'moxios'


describe('Question', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Question, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body'
                }
            }
        });
        moxios.install();


    });

    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall()
    })

    it('presents the title and the body', () => {
        see('The title');
        see('The body');

    });
    it('can be edited', (done) => {
        Vue.config.errorHandler = done;

        expect(wrapper.contains('input[name=title]')).toBe(false);

        click('#edit');


        Vue.nextTick(() => {
            expect(wrapper.find('input[name=title]').element.value).toBe('The title');
            expect(wrapper.find('textarea[name=body]').element.value).toBe('The body');

            done();
        });

    });

    it('hides the edit button during edit mode', (done) => {

        click('#edit');

        Vue.nextTick(() => {
            expect(wrapper.contains('#edit')).toBe(false);
            done();
        });
    });

    it.only('updates the question after being edited', (done) => {
        Vue.config.errorHandler = done;

        click('#edit');
        Vue.nextTick(() => {
            type('input[name=title]', 'Changed title');
            type('textarea[name=body]', 'Changed body');

            click('#update');


            moxios.stubRequest('/questions/1', {
                status: 200,
                response: {
                    title: 'Changed title',
                    body: 'Changed body'
                }
            });


            Vue.nextTick(() => {

                see('Changed title');
                see('Changed body');

                moxios.wait(() => {

                    see('Your question has been updated.');

                    done();
                })
            })
        });
    });

    it('can cancel out of edit mode', (done) => {
        Vue.config.errorHandler = done;

        click('#edit');

        Vue.nextTick(() => {

            type('input[name=title]', 'Changed title');

            click('#cancel');

            Vue.nextTick(() => {
                see('The title');
                done();
            });
        });

    });


    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;

        expect(wrap.html()).toContain(text);
    };

    let type = (selector, text) => {
        let node = wrapper.find(selector);
        node.element.value = text;
        node.trigger('input');
    };

    let click = selector => {
        wrapper.find(selector).trigger('click');
    }
});

