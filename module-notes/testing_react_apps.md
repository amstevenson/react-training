# Testing React Apps

## What To Test

Do not want to test libraries. Such as Redux itself, or anything imported from a node package. Nothing from third development parties. 

Certain tests could include for Components if the page is rendered correctly, if the individual functions declared return what they are meant to be returning. 

![alt text][logo]

[logo]: ./images/what_to_test.PNG "What To Test"

## Writing Tests

To write tests, we will need to install some additional packages.

- `npm install --save enzyme react-test-renderer enzyme-adapter-react-16`

All of these are then added to the `package.json` file. 

We can then navigate to a component that needs testing and add a js file alongside it. For example: `Navigationitems.test.js`. Using `create-react-app` this is automatically avilable. This will look like the following:

```
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
```

### Running the Tests

- Use `npm test` to automatically scan for all test files, and run those that have changed. 
- Use `npm test a` to run all tests.

For the application `react-testing`, all five tests should pass.

#### Potential Errors When Running Tests

If you get an error try deleting the `App.test.js` file and then run again. 

If there is a silly message saying `No tests found related to files changed since last commit.` , then you can get past this by forcing them all to run by using `npm test a`. 

### Reference Point for BB Tests

- Redux: `auth.test.js` (without testing connecting to Redux, but instead the Reducers and the logic within them)
- Containers: `BurgetBuilder.test.js`
- Components: `NavigationItems.test.js`

## Jest and Enzyme Documentation

Jest - https://jestjs.io/docs/en/getting-started.html (JavaScript test runner - includes details on how to mock function calls, which seems especially useful)

Enzyme - https://airbnb.io/enzyme/ (contains information about shallow, etc)
