require 'spec_helper'

describe Ascitis do

	context 'is positive' do
		it 'should validate when exclusive attributes are setted' do
			Ascitis.new(gasa: false, proteinas_totales: 1.3,
							recuento_de_neutrofilos: 5000, citologico: 'algo', positivo: true, nombre: 'a').valid?.should eq true
		end
	end

	context 'is negative' do
		it 'should validate when exclusive attributes are setted' do
			Ascitis.new(gasa: false, proteinas_totales: 1.3,
							recuento_de_neutrofilos: 5000, citologico: 'algo', positivo: false, nombre: 'a').valid?.should eq true
		end
	end

	context 'has not been tested' do
		it 'should not validate when properties are setted' do
			ascitis = Ascitis.new(gasa: false, proteinas_totales: 1.3,
						recuento_de_neutrofilos: 5000, citologico: 'algo', positivo: nil)
			ascitis.valid?.should eq false
			ascitis.errors[:atributos_erroneos].first.should eq 'La ascitis no puede tener atributos si no fue realizada'

		end
	end

	describe 'otros tipos de cultivos' do

		[Urocultivo, Hemocultivos, CultivoGenerico].each do |cultivo_class|
			it "shouldn't validate when ascitis exclusive attributes are setted for #{cultivo_class}" do
				cultivo = cultivo_class.new()
				cultivo.gasa = false
				cultivo.proteinas_totales = 1.3
				cultivo.recuento_de_neutrofilos = 5000
				cultivo.citologico = 'algo'
				cultivo.valid?.should eq false
				cultivo.errors[:atributos_erroneos].should == ['No se pueden asignar atributos especificos de ascitis a otros cultivos']
			end
		end

	end
end