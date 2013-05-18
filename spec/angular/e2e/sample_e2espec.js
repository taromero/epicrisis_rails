describe('PhoneCat App', function() {
 
  describe('Phone list view', function() {
 
    beforeEach(function() {
      browser().navigateTo('/public/index.e2e.html');
      // browser().navigateTo('/#/epicrisis/2');
    });
 
 
    it('should filter the phone list as user types into the search box', function() {
      // expect(element('tr').count()).toBe(5);
      expect(browser().location().url()).toBe("/epicrisis/2");
      // browser().navigateTo('#/epicrisis');
      pause();
      expect(repeater('table').count()).toEqual(1);
      expect(element('tr', 'algo').count()).toBe(3);
 
      // input('query').enter('nexus');
      // expect(repeater('.phones li').count()).toBe(1);
 
      // input('query').enter('motorola');
      // expect(repeater('.phones li').count()).toBe(2);
    });
  });
});