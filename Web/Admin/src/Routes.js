import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout, Normal as NormalLayout} from './layouts';

import {
  Dashboard as DashboardView,
  Buildings as BuildingsView,
  Companies as CompaniesView,
  DiscountCodes as DiscountCodesView,
  Managers as ManagersView,
  Orders as OrdersView,
  Owners as OwnersView,
  Products as ProductsView,
  Users as UsersView,
  SignUp as SignUpView,
} from './views';
import Login from './views/SignIn/Login';
import SignIn from './views/SignIn/SignIn';
import CompaniesEdit from './views/Companies/CompaniesEdit';
import ManagerEdit from './views/Managers/ManagerEdit';
import UserEdit from './views/Users/UserEdit';
import MyAccount from './views/MyAccount';
import ForgotPassword from 'views/ForgotPassword';
import ResetPassword from 'views/ResetPassword';
const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/login"
      />
      <RouteWithLayout
        component={MyAccount}
        exact
        layout={MainLayout}
        path="/myaccount"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={BuildingsView}
        exact
        layout={MainLayout}
        path="/buildings"
      />
      <RouteWithLayout
        component={UsersView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={UserEdit}
        exact
        layout={MainLayout}
        path="/users/edit/:id"
      />
      <RouteWithLayout
        component={ProductsView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={CompaniesView}
        exact
        layout={MainLayout}
        path="/companies"
      />
      <RouteWithLayout
        component={CompaniesEdit}
        exact
        layout={MainLayout}
        path="/companies/edit/:id"
      />
      <RouteWithLayout
        component={DiscountCodesView}
        exact
        layout={MainLayout}
        path="/discountcodes"
      />
      <RouteWithLayout
        component={ManagersView}
        exact
        layout={MainLayout}
        path="/managers"
      />
      <RouteWithLayout
        component={ManagerEdit}
        exact
        layout={MainLayout}
        path="/managers/edit"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/register"
      />
      <RouteWithLayout
        component={Login}
        exact
        layout={NormalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={ForgotPassword}
        exact
        layout={NormalLayout}
        path="/forgotpassword"
      />
      <RouteWithLayout
        component={ResetPassword}
        exact
        layout={NormalLayout}
        path="/resetpassword"
      />
      <RouteWithLayout
        component={OrdersView}
        exact
        layout={MainLayout}
        path="/orders"
      />
      <RouteWithLayout
        component={OwnersView}
        exact
        layout={MainLayout}
        path="/owners"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
