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
            see('0 Days');
            see('0 Hours');
            see('0 Minutes');
            see('10 Seconds');
            done();
        });

    });

    it.only('reduces the countdown every second', async  () => {
        wrapper.setProps({
            until: moment().add(10, 'seconds')
        });

        await Vue.nextTick();
        see('10 Seconds');
        clock.tick(1000);

        await Vue.nextTick();
        see('9 Seconds');

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
    it('shows a custom expired message when the counter has completed', (done) => {
        Vue.config.errorHandler = done;

        wrapper.setProps({
            until: moment().add(10, 'seconds'),
            expiredText: 'Contest is over.'
        });

        Vue.nextTick(() => {
            see('10 Seconds');

            clock.tick(10000);

            wrapper.vm.$nextTick(() => {

                see('Contest is over.');

                done();
            });
        });

    });

    it('broadcasts when the countdown is finished', (done) => {
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

    it('clears the interval once completed', (done) => {
        Vue.config.errorHandler = done;

        wrapper.setProps({
            until: moment().add(10, 'seconds')
        });


        Vue.nextTick(() => {
            clock.tick(10000);

            wrapper.vm.$nextTick(() => {
                expect(wrapper.vm.now.getSeconds()).toBe(10);

                wrapper.vm.$nextTick(() => {
                    clock.tick(5000);
                    expect(wrapper.vm.now.getSeconds()).toBe(10);

                    done();
                });
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

    let assertOnNextTick = (callback, done) => {
        wrapper.vm.$nextTick(() => {
            try {
                callback();
            } catch (e) {
                done(e);
            }
        })
    }
});

