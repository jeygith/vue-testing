import {mount} from '@vue/test-utils';
import expect from 'expect';
import Example from '../../resources/js/components/ExampleComponent.vue';

describe('Example', () => {
    it('says it is an example component', () => {
        let wrapper = mount(Example);

        expect(wrapper.html()).toContain('Example Component');
    })
});

