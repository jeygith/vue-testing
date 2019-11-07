import {mount} from '@vue/test-utils'
import expect from 'expect';
import CouponCode from '../src/components/CouponCode.vue';
import Vue from 'vue';


describe('CouponCode', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(CouponCode);
    });

    it('accepts a coupon code', () => {

        expect(wrapper.contains('input.coupon-code')).toBe(true);
    });

    it('validates a real coupon code', (done) => {
        enterCouponCode('50OFF');

        expect(wrapper.vm.valid).toBe(true);

        Vue.nextTick(() => {
            expect(wrapper.html()).toContain('Coupon Redeemed: 50% Off!');

            done();
        });

    });
    it('validates a fake coupon code', (done) => {
        enterCouponCode('NOTREAL');

        expect(wrapper.vm.valid).toBe(false);

        Vue.nextTick(() => {
            expect(wrapper.html()).toContain('Invalid Coupon Code');

            done();
        });

    });

    it('broadcast the percentage discount when a valid coupon code id applied',()=>{
        enterCouponCode('50OFF');

        expect(wrapper.emitted().applied).toBeTruthy();
        expect(wrapper.emitted().applied[0]).toEqual([50]);

    });

    function enterCouponCode(code) {
        let couponCode = wrapper.find('input.coupon-code');

        couponCode.element.value = code;
        couponCode.trigger('input');
    }
});

