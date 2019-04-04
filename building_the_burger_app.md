# Building the burger app

## Layout/Design

Things to keep in mind:

- Media CSS

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

Identifying state of the application: 
