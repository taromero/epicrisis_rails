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
      infeccion_params = FactoryGirl.attributes_for(:infeccion)
      Infeccion.find(@inf.id).nombre.should_not eq infeccion_params[:nombre]
      put :update, { epicrisi_id: @epi.id, infeccion: infeccion_params }
      body = JSON.parse(response.body)
      Infeccion.count.should eq 1

      body['infeccion']['nombre'].should == infeccion_params[:nombre]
      Infeccion.first.nombre.should_not == @inf.nombre
      Infeccion.first.nombre.should == infeccion_params[:nombre]
    end

  end

end
