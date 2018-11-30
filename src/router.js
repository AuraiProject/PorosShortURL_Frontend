import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {App} from './containers/app';
import {GenerateShortUrl} from "./containers/generating";
import {RestoreShortUrl} from "./containers/restoring";
import {CheckPassword} from "./containers/checking/check";
import {ApiDoc} from "./containers/api";
import {NotFound} from "./components/notFound";


export const routes = [
  {
    name: 'Generate',
    path: '/',
    exact: true,
    component: GenerateShortUrl
  },
  {
    name: 'Restore',
    path: '/restore',
    component: RestoreShortUrl,
  },
  {
    name: 'Api',
    path: '/api',
    component: ApiDoc,
  },
  {
    name: 'CheckPassword',
    path: '/check',
    component: CheckPassword,
  },
  {
    component: NotFound
  }
];


export class AppRouter extends Component {
  static getRoutes(routes) {
    return routes.map(({path, component, exact = false, ...rest}) => {
      return (<Route {...{path, component, exact, ...rest}}/>)
    })
  }

  render() {
    return (
      <Router>
        <App>
          <Switch>
            {AppRouter.getRoutes(routes)}
          </Switch>
        </App>
      </Router>
    )
  }
}