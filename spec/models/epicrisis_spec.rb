require 'spec_helper'

describe Epicrisis do

  describe 'infeccion relationship' do

  	it 'should cascade creation case 1' do
  		epi = build(:epicrisis)
  		Epicrisis.count.should eq 0
  		epi.infeccion = build(:infeccion)
  		Infeccion.count.should eq 0
  		epi.save!
  		Epicrisis.count.should eq 1
  		Infeccion.count.should eq 1
  	end

  	it 'should cascade creation case 2' do
  		epi = create(:epicrisis)
  		epi.infeccion = build(:infeccion)
  		epi.save!
  		Infeccion.count.should eq 1
  	end

    it 'should cascade updates' do
    	epi = create(:epicrisis, :inf)
      epi.infeccion.nombre = 'unNombre'
      epi.save!
      Infeccion.find(epi.infeccion.id).nombre.should eq 'unNombre'
    end

	end

end