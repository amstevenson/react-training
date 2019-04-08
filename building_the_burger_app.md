# Building the burger app

## Layout/Design

Things to keep in mind:

- Media CSS
- Accessibility

Layout:

```
- App.js
    - Layout.js
        - Toolbar (component)
            - Drawer Toggle (button)
            - Logo
            - Navigation items (component/list)
        - Side Drawer (component)
            - Logo
            - Navigation items (component/list)
        - Backdrop (component)
            - Some html code, no nested children
        - {props.children} (component) (the content for each page clicked on)
            - Burger Builder page (component)
                - Build Controls components (ingredient buttons)
                    - Build control component (remove/add ingredient)
                    - Order control component 
                - Burger component (preview of burger)
                    - A list of ingredients
                - Modal component (checkout)
                    - A wrapper component taking {props.children}. May write messages, alerts, summaries etc
```

Identifying state of the application; we will need to manage or keep track of: 

```
- Burger Builder Page (stateful)
    - Ingredients
        - meats, cheeses etc
    - purchased
        - true or false
    - totalPrice
        - number
```

The state should be controlled by the page itself, not the layout. 

## Notes when implementing

### When importing an image

Make sure to not hard code a path in an img element. When the application is built for a production environment, the images/files will be moved from the `assets` folder to another one. So hard coded paths will not be able to find the file afterwards. To get past this, import the actual image/file itself and use it in the code:

```
import burgerLogo from '../../assets/images/burger-logo.png'

const logo = (props) => (
    <div>
        <img src={burgerLogo} />
    </div>
);
```
