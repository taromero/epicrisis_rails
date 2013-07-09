require 'spec_helper'

describe InfeccionController do

  describe "Update infection" do

    before (:each) do
      @epi = create(:epicrisis, :inf)
      @inf = @epi.infeccion
    end

    it "should show infeccion" do
      get :show, { epicrisi_id: @epi.id }
      body = JSON.parse(response.body)['infeccion']
      body['id'].should == @epi.infeccion.id
      body['nombre'].should == @epi.infeccion.nombre
    end

    [
     [:shock_septico, true],
     [:curacion, false],
     [:nombre, 'pepe']
    ].each do |prop, value|
      it "should update infeccion #{prop}" do
        infeccion_params = FactoryGirl.attributes_for(:infeccion)
        infeccion_params[prop] = value
        Infeccion.find(@inf.id)[prop].should_not eq value
        infeccion_params[:epicrisi_id] = @epi.id
        put :update, infeccion_params
        body = JSON.parse(response.body)

        body['infeccion'][prop.to_s].should == value
        Infeccion.first[prop].should == value
      end
    end

  end

  describe "Update ascitis/hemocultivos/urocultivo" do

    [
      :ascitis,
      :hemocultivos,
      :urocultivo
    ].each do |cultivo|
      [
        [nil, false, false, nil],
        [nil, true, true, true],
        [nil, false, true, true],
        [nil, true, false, false],
        [false, false, true, true],
        [false, true, false, false],
        [false, false, false, nil],
        [false, true, true, true],
        [true, false, false, nil],
        [true, true, false, false],
        [true, false, true, true],
        [true, true, true, true],
      ].each do |positivoPreviousValue, realizado, positivo, positivoNewValue|
        it "if positivo's previous value was #{positivoPreviousValue || 'nil'} and realizado is #{realizado} and 
              positivo is #{positivo}, positivo's new value should be #{positivoNewValue}" do
          epi = create(:epicrisis, infeccion: create(:infeccion, cultivo => create(cultivo, positivo: positivoPreviousValue)))
          put :update, { epicrisi_id: epi.id, cultivo => { positivo: positivo, realizado: realizado } }
          body = JSON.parse(response.body)
          body['infeccion'][cultivo.to_s]['positivo'].should == positivoNewValue
          case cultivo
            when :ascitis
              Infeccion.first.ascitis.positivo.should == positivoNewValue
            when :hemocultivos
              Infeccion.first.hemocultivos.positivo.should == positivoNewValue
            else
              Infeccion.first.urocultivo.positivo.should == positivoNewValue
          end
        end
      end
    end

    it 'should update ascitis exclusive properties' do
      epi = create(:epicrisis, infeccion: create(:infeccion, ascitis: create(:ascitis, :pos)))
      epi.infeccion.ascitis.gasa.should_not eq true
      ascitis_params = { gasa: true, proteinas_totales: 17.2, 
                          recuento_de_neutrofilos: 67000, citologico: 'algo para citologico', 
                          positivo: true, realizado: true }
      put :update, { epicrisi_id: epi.id, ascitis: ascitis_params }
      body = JSON.parse(response.body)
      ascitisDB = Ascitis.find(body['infeccion']['ascitis']['id'])
      new_params = body['infeccion']['ascitis'].delete_if {|key| ['created_at', 'id', 'updated_at', 'infeccion_id'].include? key  }
      ascitisResponse = Ascitis.new(new_params)
      
      [ascitisResponse, ascitisDB].each do |ascitis|
        ascitis.gasa.should eq true
        ascitis.proteinas_totales.should == 17.2
        ascitis.recuento_de_neutrofilos.should == 67000
        ascitis.citologico.should == "algo para citologico"
      end
    end

  end

end
