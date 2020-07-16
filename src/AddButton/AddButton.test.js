import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddButton from './AddButton'

describe(`AddButton component`, () => {
    const props = {
        tag: 'a',
        className: 'test-class-name',
        children: <p>test children</p>,
        'data-other': 'test-other-prop'
    }

    it('renders a button.AddButton by default', () => {
        const wrapper = shallow(<AddButton />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders the add button from props', () => {
        const wrapper = shallow(<AddButton {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})