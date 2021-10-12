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