const theEventHandler = (() => {
  let pubsub = {};

  const subscribe = (evt, fn) => {
    pubsub[evt] = pubsub[evt] || [];
    pubsub[evt].push(fn);
  };

  const unsubscribe = (evt, fn) => {
    if (pubsub[evt]) {
      pubsub[evt].filter((item, index, array) => {
        if (item === fn) {
          array.splice(index, 1);
          return;
        }
      });
    }
  };

  const publish = (evt, data) => {
    if (pubsub[evt]) {
      pubsub[evt].forEach((fn) => {
        fn(data);
      });
    }
  };

  return { subscribe, unsubscribe, publish };
})();

export default theEventHandler;
