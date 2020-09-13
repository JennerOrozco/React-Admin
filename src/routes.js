import React from 'react';

const BasicForms = React.lazy(() => import('./views/users/AddUser'));
const Password = React.lazy(() => import('./views/users/Password'));
const API = React.lazy(() => import('./views/users/Api'));
const PasswordId = React.lazy(() => import('./views/users/PasswordId'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Usuarios = React.lazy(() => import('./views/users/Usuarios'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true,name: 'Dashboard', component: Dashboard },      
  { path: '/User/Add',exact: true, name: 'Forms', component: BasicForms },
  { path: '/User/Api/:id',exact: true, name: 'Api', component: API },
  { path: '/User/Password',exact: true, name: 'User', component: Password},
  { path: '/User/Password/:id',exact: true, name: 'User', component: PasswordId},
  { path: '/charts', exact: true,name: 'Charts', component: Charts },  
  { path: '/Usuarios', exact: true,  name: 'Usuarios', component: Usuarios },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
  
];

export default routes;
