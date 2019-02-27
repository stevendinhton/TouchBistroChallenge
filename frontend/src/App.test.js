import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

describe('Main app component', () => {
  it('has a header', () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find('h1').text();

    expect(text).toEqual('Median Finder');
  });

  it('should render without errors', () => {
    expect(shallow(<App />).find('.App').exists()).toBe(true)
  });

  it('should respond to form change event and update the state of the component', () => {
    const wrapper = mount(<App />);

    wrapper.find('.form-control').simulate('change', {target: {value: '1'}});
    expect(wrapper.state('upperLimit')).toEqual('1');
  });

  it('should respond to form change event and update the state of the component to reflect an invalid form', () => {
    const wrapper = mount(<App />);

    wrapper.find('.form-control').simulate('change', {target: {value: '-1'}});
    expect(wrapper.state('upperLimit')).toEqual('-1');
    expect(wrapper.state('validForm')).toEqual(false);
  });

  it('should attempt to fetch data when primary button is clicked', () => {
    const wrapper = mount(<App />);
    const mockFn = jest.fn();
    const button = wrapper.find('.btn-primary')

    wrapper.instance().fetchData = mockFn
    wrapper.instance().forceUpdate();
    button.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('should have list items when items exist in state', () => {
    const wrapper = mount(<App />);

    expect(wrapper.find('.list-group-item')).toHaveLength(0);
    wrapper.setState({ results: [{upperLimit: 3, medians: [2]}] });
    expect(wrapper.find('.list-group-item')).toHaveLength(1);
  });

  it('should clear list items when clear button is clicked', () => {
    const wrapper = mount(<App />);
    const clearButton = wrapper.find('.btn-secondary')

    expect(wrapper.find('.list-group-item')).toHaveLength(0);
    wrapper.setState({ results: [{upperLimit: 3, medians: [2]}] });
    expect(wrapper.find('.list-group-item')).toHaveLength(1);
    clearButton.simulate('click');
    expect(wrapper.find('.list-group-item')).toHaveLength(0);
  });
});
