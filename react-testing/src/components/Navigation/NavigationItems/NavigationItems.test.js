import React from 'react';

// Configure Enzyme and connect it to the react version
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Import Components
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// The Enzyme imports above allow us to set up the Adapter, which
// is needed for testing
configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;

    /*
    Before Each is called before each test. 

    shallow allows us to wrap the Components we want to test.
    It renders the content, but not in a deeply rendered way. Akin to mocks, the content
    Of the actual component isn't rendered, it's just a mocked object. 
    */
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    /*
    `It` describes or allows for one individual test to be written. 

    This takes two arguments
    1) The first one is a string; a description which will appear in the console. 
    2) An arrow function that determines what happens in the test. The actual logic.

    */
    it('should render two <NavigationItem /> elements if not authenticated', () => {

        // Expect is from Jest. Allows us to make comparisons that can fail or pass.
        // By default, authentication is set to false, so we should get two elements back. 
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        // Set the properties for the test.
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exact logout button', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});