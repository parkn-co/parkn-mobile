// @flow
import React, {Component} from 'react';

export type Route = {
  id: string,
  component: Component<*, *, *>,
  nav?: Object,
  isInitial?: boolean,
  keys?: Array<string>,
  isSignUp?: boolean,
};

export type NavButtonGenerator = (
  route: Route,
  navigator: any,
  index: number,
  navState: any
) => React.Element<*>;
