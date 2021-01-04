const spy = require('mobx-remotedev/lib/spy').default;

export const addToDevtools = (store: object) => {
  spy(store, { global: true, name: store.constructor.name });
};
