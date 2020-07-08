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
} from './views/WebAppAdmin';
import {

  Team as TeamView,

} from './views/WebAppManager';

//Admin import
import AdminLogin from './views/WebAppAdmin/SignIn/Login';
import CompaniesEdit from './views/WebAppAdmin/Companies/CompaniesEdit';
import ManagerEdit from './views/WebAppAdmin/Managers/ManagerEdit';
import UserEdit from './views/WebAppAdmin/Users/UserEdit';
import AdminMyAccount from './views/WebAppAdmin/MyAccount';
import AdminForgotPassword from 'views/WebAppAdmin/ForgotPassword';
import AdminResetPassword from 'views/WebAppAdmin/ResetPassword';
import BuildingsEdit from 'views/WebAppAdmin/Buildings/BuildingsEdit';
import ProductsEdit from 'views/WebAppAdmin/Products/ProductsEdit';
import OwnerEdit from 'views/WebAppAdmin/Owners/OwnerEdit';
import AdminHelp from 'views/WebAppAdmin/Help';
import DiscountCodesEdit from 'views/WebAppAdmin/DiscountCodes/DiscountCodesEdit';

//Manager import
import TeamMemberEdit from './views/WebAppManager/Team/TeamMemberEdit';
import ManagerHelp from 'views/WebAppManager/Help';
import ManagerForgotPassword from 'views/WebAppManager/ForgotPassword';
import ManagerResetPassword from 'views/WebAppManager/ResetPassword';
import ManagerLogin from './views/WebAppManager/SignIn/Login';

//Owner import
import OwnerInvoices from './views/WebAppOwner/Informations/Invoices';
import OwnerMyAccount from './views/WebAppOwner/Informations/MyAccount';
import OwnerSubAccounts from './views/WebAppOwner/Informations/SubAccounts';
import OwnerHelp from 'views/WebAppOwner/Help';
import OwnerForgotPassword from 'views/WebAppOwner/ForgotPassword';
import OwnerResetPassword from 'views/WebAppOwner/ResetPassword';
import OwnerLogin from './views/WebAppOwner/SignIn/Login';
const Routes = () => {
  return (
    <Switch>
{/**
 * ADMIN PART
 */}
      <Redirect
        exact
        from="/"
        to={"/admin/login"}
      />
      <Redirect
        exact
        from="/admin"
        to={"/admin/login"}
      />
      <RouteWithLayout
        component={AdminMyAccount}
        exact
        layout={MainLayout}
        path="/admin/myaccount"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/admin/dashboard"
      />
      <RouteWithLayout
        component={BuildingsView}
        exact
        layout={MainLayout}
        path="/admin/buildings"
      />
      <RouteWithLayout
        component={BuildingsEdit}
        exact
        layout={MainLayout}
        path="/admin/buildings/edit/:id"
      />
      <RouteWithLayout
        component={UsersView}
        exact
        layout={MainLayout}
        path="/admin/users"
      />
      <RouteWithLayout
        component={UserEdit}
        exact
        layout={MainLayout}
        path="/admin/users/edit/:id"
      />
      <RouteWithLayout
        component={ProductsView}
        exact
        layout={MainLayout}
        path="/admin/products"
      />
      <RouteWithLayout
        component={ProductsEdit}
        exact
        layout={MainLayout}
        path="/admin/products/edit/:id"
      />
      <RouteWithLayout
        component={CompaniesView}
        exact
        layout={MainLayout}
        path="/admin/companies"
      />
      <RouteWithLayout
        component={CompaniesEdit}
        exact
        layout={MainLayout}
        path="/admin/companies/edit/:id"
      />
      <RouteWithLayout
        component={DiscountCodesView}
        exact
        layout={MainLayout}
        path="/admin/discountcodes"
      />
      <RouteWithLayout
        component={DiscountCodesEdit}
        exact
        layout={MainLayout}
        path="/admin/discountcodes/edit/:id"
      />
      <RouteWithLayout
        component={ManagersView}
        exact
        layout={MainLayout}
        path="/admin/managers"
      />
      <RouteWithLayout
        component={ManagerEdit}
        exact
        layout={MainLayout}
        path="/admin/managers/edit/:id"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/admin/register"
      />
      <RouteWithLayout
        component={AdminLogin}
        exact
        layout={NormalLayout}
        path="/admin/login"
      />
      <RouteWithLayout
        component={AdminForgotPassword}
        exact
        layout={NormalLayout}
        path="/admin/forgotpassword"
      />
      <RouteWithLayout
        component={AdminResetPassword}
        exact
        layout={NormalLayout}
        path="/admin/resetpassword"
      />
      <RouteWithLayout
        component={OrdersView}
        exact
        layout={MainLayout}
        path="/admin/orders"
      />
      <RouteWithLayout
        component={OwnersView}
        exact
        layout={MainLayout}
        path="/admin/owners"
      />
      <RouteWithLayout
        component={OwnerEdit}
        exact
        layout={MainLayout}
        path="/admin/owners/edit/:id"
      />
      <RouteWithLayout
        component={AdminHelp}
        exact
        layout={MainLayout}
        path="/admin/help"
      />
{/**
 * OWNER PART
 */}
      <Redirect
        exact
        from="/owner"
        to={"/owner/login"}
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/owner/dashboard"
      />
      <RouteWithLayout
        component={OwnerLogin}
        exact
        layout={NormalLayout}
        path="/owner/login"
      />
      <RouteWithLayout
        component={OwnerForgotPassword}
        exact
        layout={NormalLayout}
        path="/owner/forgotpassword"
      />
      <RouteWithLayout
        component={OwnerResetPassword}
        exact
        layout={NormalLayout}
        path="/owner/resetpassword"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/owner/incidents"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/owner/chat"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/owner/addons"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/owner/assemblies"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/owner/events"
      />
      <RouteWithLayout
        component={OwnerMyAccount}
        exact
        layout={MainLayout}
        path="/owner/myaccount"
      />
      <RouteWithLayout
        component={OwnerInvoices}
        exact
        layout={MainLayout}
        path="/owner/invoices"
      />
      <RouteWithLayout
        component={OwnerSubAccounts}
        exact
        layout={MainLayout}
        path="/owner/subaccounts"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/owner/payment-methods"
      />
      <RouteWithLayout
        component={OwnerHelp}
        exact
        layout={MainLayout}
        path="/owner/help"
      />


{/** 
 * MANAGER PART
*/}      
      <Redirect
        exact
        from="/manager"
        to={"/manager/login"}
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/manager/dashboard"
      />
      <RouteWithLayout
        component={ManagerLogin}
        exact
        layout={NormalLayout}
        path="/manager/login"
      />
      <RouteWithLayout
        component={ManagerForgotPassword}
        exact
        layout={NormalLayout}
        path="/manager/forgotpassword"
      />
      <RouteWithLayout
        component={ManagerResetPassword}
        exact
        layout={NormalLayout}
        path="/manager/resetpassword"
      />
      <RouteWithLayout
        component={TeamView}
        exact
        layout={MainLayout}
        path="/manager/team"
      />
      <RouteWithLayout
        component={TeamMemberEdit}
        exact
        layout={MainLayout}
        path="/manager/team/edit/:id"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/manager/chat"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/manager/addons"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/manager/assemblies"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/manager/events"
      />
      <RouteWithLayout
        component={OwnerMyAccount}
        exact
        layout={MainLayout}
        path="/manager/myaccount"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/manager/subaccounts"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/manager/payment-methods"
      />
      <RouteWithLayout
        component={ManagerHelp}
        exact
        layout={MainLayout}
        path="/manager/help"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
