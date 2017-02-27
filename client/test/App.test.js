/* eslint-disable no-undef */

import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import App from '../src/components/App';

describe('App', () => {
    it('should contain poop', () => {
        const wrapper = shallow(<App/>);
        console.log(wrapper.node);
        expect(wrapper.node.props.children).to.include('Poop');
    });

});