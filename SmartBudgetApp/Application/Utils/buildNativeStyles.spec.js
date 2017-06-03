import getStyles from './getStyles';

describe('getStyles', () => {
  let PLATFORM_ENV = process.env.PLATFORM_ENV;
  
  describe('getStyles should be able to create object for web', function() {
    before(() => process.env.PLATFORM_ENV = 'web');

    let value, style;
    it('Given a css classes "my_class, new_container_class"', () => {
      value = ['my_class', 'new_container_class'];
    });
    it('When I create style for web', () => style = getStyles(value));
    it('Then the style created should have a property className with value "my_class new_container_class"', () => expect(style).to.be.deep.equal({
      className: 'my_class new_container_class'
    }));

    after(() => process.env.PLATFORM_ENV = PLATFORM_ENV);
  });

  describe('getStyles should be able to create object for native environment', () => {
    before(() => process.env.PLATFORM_ENV = 'native');

    let value, style;
    it('Given a css class "my_class"', () => {
      value = [
        { backgroundColor: '#ffffff', justifyContent: 'center' },
        { backgroundColor: '#00f0f0', alignItems: 'center' }
      ];
    });
    it('When I create style for native environment', () => style = getStyles(value));
    it('Then the style created should have a property style with value "my_class"', () => expect(style).to.be.deep.equal({
      style: value
    }));

    after(() => process.env.PLATFORM_ENV = PLATFORM_ENV);
  });

  describe('getStyles should create object for native environment when there is no platform defined', () => {
    before(() => process.env.PLATFORM_ENV = undefined);

    let value, style;
    it('Given a css class "my_class"', () => {
      value = [
        { backgroundColor: '#ffffff', justifyContent: 'center' },
        { backgroundColor: '#00f0f0', alignItems: 'center' }
      ];
    });
    it('When I create style for non defined platform', () => style = getStyles(value));
    it('Then the style created should have a property style with the correct values', () => expect(style).to.be.deep.equal({
      style: value
    }));

    after(() => process.env.PLATFORM_ENV = PLATFORM_ENV);
  });
});
