const spy = require('mobx-remotedev/lib/spy').default;

export const addToDevtools = (store: object) => {
  if (process.env.NODE_ENV !== 'production') {
    spy(store, { global: true, name: store.constructor.name });
  }
};
