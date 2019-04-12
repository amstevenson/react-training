# Errors and Fixes

## Expected an assignment or function call and instead saw an expression  no-unused-expressions

Means  that I am missing a return statement somewhere more than likely. Usually in a `map()` function call. 

Other than that, it could be that I am using a functional expression with a {} rather than a ():

```
const buildControls = (props) => ( <<< don't use {
    
    <div className={styles.BuildControls}>
        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} label={ctrl.label} />
        ))}
    </div>
); <<< don't use }
```
## Cannot find variable defined in setState

Make sure you are using an arrow function to refer to the state. 

```
method() = {

}

```

Won't work.

```
method = () => {

}
```

Will work. 