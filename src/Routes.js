import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

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
  SignIn as SignInView,
  SignUp as SignUpView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
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
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
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
