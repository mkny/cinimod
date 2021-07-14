# `@cinimod/use-store`

Provides a simple way to bind and hook 🎣 your application with React's Context API.

## Usage

- [Simple](#simple-usage)
- [With HOC](#using-with-hoc)
- [Setting a value](#setting-and-updating-value-to-the-context)

### Simple usage

You have your application running and need to put or retrieve something from Context.

```js
import { Provider, useStore } from "@cinimod/use-store";

const MyComponent = () => {
  const { get } = useStore();

  // Should return <p>myValue</p>
  return <p>{get("mykey")}</p>
}

const Container = () => {
  // Provider automatically injects context
  <Provider initialState={{
    mykey: "myValue"
  }}>
    <MyComponent />
  </Provider>
}
```

### Using with HOC

Using HOC to auto inject Context

```jsx
import { withStore, useStore } from "@cinimod/use-store";

const MyComponent = () => {
  const { get } = useStore();

  // Should return <p>myValue</p>
  return <p>{get("mykey")}</p>
}

export default withStore({
  initialState: {
    mykey: "myValue"
  }
})(MyComponent)
```

### Setting and Updating value to the context

```jsx
import { withStore, useStore } from "@cinimod/use-store";

const MyComponent = () => {
  const { set, get } = useStore();

  return (
    // Should update value, when click theButton
    <>
      <button onClick={() => set("mykey", "newValue")}>theButton</button>
      <p>{get("mykey")}</p>
    </>
  )
}

export default withStore({
  mykey: "myValue"
})(MyComponent)

```
