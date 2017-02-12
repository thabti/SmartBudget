import ApiFactory from './ApiFactory';

describe('ApiFactory', () => {
  let apiRef;

  function getApiRefFactory(headers) {
    return () => {
      apiRef = ApiFactory.createApiRef(headers)
    };
  }

  function isValidApiRef() {
    expect(apiRef).to.be.defined;
    expect(typeof apiRef.request).to.be.equal('function');
  }

  describe('ApiFactory should be able to create an apiRef with no headers', () => {
    it('Given the apiRef is created with no headers', getApiRefFactory());
    it('Expect that the apiRef should be a valid instance', isValidApiRef);
  });

  describe('ApiFactory should be able to create an apiRef with headers', () => {
    it('Given the apiRef is created with headers', getApiRefFactory({
      common: { 'X-Authorization': 'Token Blah!' }
    }));
    it('Expect that the apiRef should be a valid instance', () => {
      isValidApiRef();
      expect(apiRef.defaults.headers.common).to.be.deep.equal({
        Accept: 'application/json, text/plain, */*',
        'X-Authorization': 'Token Blah!'
      });
    });
  });

  describe('ApiFactory should be able to create an endpoint URL', () => {
    let jsonStructure, mapping, endpoint;
    it('Given a certain JSON structure', () => jsonStructure = { id: 1, name: 'some-name' });
    it('And a mapping endpoint for rest', () => mapping = 'api/person/:id');
    it('When the ApiFactory create and endpoint', () => endpoint = ApiFactory.applyAttributes(mapping, jsonStructure))
    it('Expect that the ApiFactory should be able to create an endpoint URL', () =>
      expect(endpoint).to.be.equal('api/person/1')
    );
  });
});
