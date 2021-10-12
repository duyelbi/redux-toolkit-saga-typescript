# Project - Student Management

react-router-dom
@types/react-router-dom

/login:
/admin: Layout

/admin/*
feature: /admin/dashboard
feature: /admin/students

auth / authentication
- login
- sign up / register
- forget password

Click Login
- Cal API to login
- Success --> redirect ADMIN
- Failed --> show ERROR

LOGIN
LOGOUT

authSaga

LOOP
- if logged in, watch LOGOUT
- else watch LOGIN

LOGIN
- call login API to get token + user info
- set token to local storage
- redirect to admin pages

LOGOUT
- clear token from local localStorage
- redirect to login page

authSlice
authSaga

----

### Different ways to handle navigation in Redux Saga

1. Watch redux store and make redirect on component

```jsx
const function App() {
  const loginSuccess = useAppSelector(state => state.auth.loginSuccess)
  
  useEffect(() => {
    if (loginSuccess) {
      // redirect to admin page
    }
  }, [loginSuccess])
  // ...
}
```
--> Flow is fragmented, hard to control when you have more and more state.

2. Using callbacks

- This approach using non-serializable (callback) in action and dispatch to redux store which is **NOT RECOMMENDED** BY Redux Toolkit.

```jsx
const function App() {
  const dispatch = useAppDispatch();
  
  const handleLoginSubmit = (values) => {
    dispatch(authActions.login({
      ...values,
      onSuccess: () => history.push('/admin'),
      onError: () => console.log('Notify error to user'),
    }))
  }
  // ...
}
```

3. Using connected-react-router

- Sync routings to redux.
- Navigate by dispatching an action to redux store.
- One thing to make sure, when route changes, it doesn't cause re-render our components.

--> We'll go with this solution for now.

Lib: connected-react-router + custom history