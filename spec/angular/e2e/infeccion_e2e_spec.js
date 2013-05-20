describe('Infeccion', function() {
 
  var infeccion;

  beforeEach(function() {
    browser().navigateTo('/public/index.e2e.html');
    expect(browser().location().url()).toBe("/epicrisis/2");
  });

  it('should show infeccion information by default', function() {
    expect(input('infeccion.nombre').val()).toEqual(mockInfeccion.nombre)
  });

  it("should update realizado's checkbox when positivo is updated", function() {
    expect(element('input[ng-model="infeccion.ascitis.positivo"]').attr('checked')).toEqual(undefined);
    expect(element('input[ng-model="infeccion.ascitis.realizado"]').attr('checked')).toEqual('checked');

    input('infeccion.ascitis.positivo').check();
    expect(element('input[ng-model="infeccion.ascitis.positivo"]').attr('checked')).toEqual('checked');
    expect(element('input[ng-model="infeccion.ascitis.realizado"]').attr('checked')).toEqual('checked');

    input('infeccion.ascitis.realizado').check();
    expect(element('input[ng-model="infeccion.ascitis.positivo"]').attr('checked')).toEqual(undefined);
    expect(element('input[ng-model="infeccion.ascitis.realizado"]').attr('checked')).toEqual(undefined);

    input('infeccion.ascitis.positivo').check();
    expect(element('input[ng-model="infeccion.ascitis.positivo"]').attr('checked')).toEqual('checked');
    expect(element('input[ng-model="infeccion.ascitis.realizado"]').attr('checked')).toEqual('checked');
  });

  describe('standard cultivos', function() {
    it("should show realizado's checkbox marked if positivo is true for a cultivo", function() {
      _(['ascitis', 'hemocultivos', 'urocultivo']).each(function(property) {
        expect(element('input[ng-model="infeccion.' + property + '.positivo"]').attr('checked')).toEqual(undefined);
        input('infeccion.' + property + '.positivo').check();
        expect(element('input[ng-model="infeccion.' + property + '.positivo"]').attr('checked')).toEqual('checked');
        expect(element('input[ng-model="infeccion.' + property + '.realizado"]').attr('checked')).toEqual('checked');
      });
    });
  });
});
