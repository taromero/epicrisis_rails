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

    it "should update infeccion" do
      infeccion_params = FactoryGirl.attributes_for(:infeccion, ascitis: create(:ascitis, :pos))
      infeccion_params[:ascitis] = { realizado: true, positivo: true }
      Infeccion.find(@inf.id).nombre.should_not eq infeccion_params[:nombre]
      infeccion_params[:epicrisi_id] = @epi.id
      put :update, infeccion_params
      body = JSON.parse(response.body)
      Infeccion.count.should eq 1

      body['infeccion']['nombre'].should == infeccion_params[:nombre]
      Infeccion.first.nombre.should_not == @inf.nombre
      Infeccion.first.nombre.should == infeccion_params[:nombre]
    end

  end

  describe "Update ascitis/hemocultivos/urocultivo" do

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
      it "if realizado is #{realizado} and positivo is #{positivo}, positivo's new value should be #{positivoNewValue}" do
        epi = create(:epicrisis, infeccion: create(:infeccion, ascitis: create(:ascitis, positivo: positivoPreviousValue)))
        put :update, { epicrisi_id: epi.id, ascitis: { positivo: positivo, realizado: realizado } }
        body = JSON.parse(response.body)
        body['infeccion']['ascitis']['positivo'].should == positivoNewValue
        Infeccion.first.ascitis.positivo.should == positivoNewValue
      end
    end

  end

end
