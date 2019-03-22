import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { RouterStore, RouterView } from 'mobx-state-router';
import { viewMap } from '../routes';

type Props = {
  routerStore?: RouterStore;
};

@inject('routerStore')
class App extends Component<Props> {
  render() {
    const routerStore = this.props.routerStore!;

    return (
      <>
        {process.env.NODE_ENV === 'development' && <DevTools />}
        <RouterView routerStore={routerStore} viewMap={viewMap} />
      </>
    );
  }
}

export default hot(App);
