import createReducers from './Reducers';

describe('createReducers', () => {
  const MAPPING = {
    add: (state, { value }) => {
      return {
        value: 10 + value
      };
    }
  };
  const INITIAL_STATE = {
    value: 1
  };

  let reducers, state;

  function prepareReducers() {
    reducers = createReducers({ ...INITIAL_STATE }, { ...MAPPING });
    state = reducers();
  }

  function getAction(action) {
    return () => {
      state = reducers(state, action);
    }
  }

  describe('reducers should change value when an action is invoked correctly', () => {
    it('Given the reducers are ready', prepareReducers);
    it('When an add action is invoked correctly', getAction({ type: 'add', value: 32 }));
    it('Then the state should have the correct value', () => expect(state).to.be.deep.equal({ value: 42 }));
  });

  describe('reducers should not change value when an action is invoked with no matching type', () => {
    it('Given the reducers are ready', prepareReducers);
    it('When an incorrect action type is invoked', getAction({ type: 'sub', value: 32 }));
    it('Then the state should have kept the initial value', () => expect(state).to.be.deep.equal({ value: 1 }));
  });
});
