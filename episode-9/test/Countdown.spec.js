import {mount} from '@vue/test-utils'
import expect from 'expect';
import Countdown from '../src/components/Countdown.vue';
import Vue from 'vue';
import moment from 'moment';
import sinon from 'sinon';


describe('Question', () => {
    let wrapper, clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
        wrapper = mount(Countdown, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body'
                }
            }
        });


    });

    afterEach(function () {
        clock.restore();
    })

    it('renders a countdown timer', (done) => {
        Vue.config.errorHandler = done;

        wrapper.setProps({
            until: moment().add(10, 'seconds')

        });

        Vue.nextTick(() => {
            see('0 days');
            see('0 hours');
            see('0 minutes');
            see('10 Seconds');
            done();
        });

    });

    it('reduces the countdown every second', (done) => {
        Vue.config.errorHandler = done;

        wrapper.setProps({
            until: moment().add(10, 'seconds')
        });

        Vue.nextTick(() => {
            see('10 Seconds');

            clock.tick(1000);

            wrapper.vm.$nextTick(() => {

                see('9 Seconds');

                done();
            });
        });
    });

    it('shows an expired message when the counter has completed', (done) => {
        Vue.config.errorHandler = done;

        wrapper.setProps({
            until: moment().add(10, 'seconds')
        });

        Vue.nextTick(() => {
            see('10 Seconds');

            clock.tick(10000);

            wrapper.vm.$nextTick(() => {

                see('Now Expired');

                done();
            });
        });

    });

    it.only('broadcasts when the countdown is finished', (done) => {
        Vue.config.errorHandler = done;

        wrapper.setProps({
            until: moment().add(10, 'seconds')
        });

        Vue.nextTick(() => {
            see('10 Seconds');

            clock.tick(10000);

            wrapper.vm.$nextTick(() => {
                expect(wrapper.emitted().finished).toBeTruthy();
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

