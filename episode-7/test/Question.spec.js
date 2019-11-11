import {mount} from '@vue/test-utils'
import expect from 'expect';
import Question from '../src/components/Question.vue';
import Vue from 'vue';


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
        })
        ;


    });

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

    it('updates the question after being edited', (done) => {
        Vue.config.errorHandler = done;

        click('#edit');
        Vue.nextTick(() => {
            type('input[name=title]', 'Changed title');
            type('textarea[name=body]', 'Changed body');

            click('#update');

            Vue.nextTick(() => {

                see('Changed title');
                see('Changed body');

                done();
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

