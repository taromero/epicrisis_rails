require 'spec_helper'

describe InfeccionController do

  describe "Update infection" do

    before (:each) do
      @epi = create(:epicrisis, :inf)
      @inf = @epi.infeccion
    end

    it "should show infeccion" do
      get :index, { epicrisi_id: @epi.id, id: @epi.infeccion.id }
      body = JSON.parse(response.body)
      body['id'].should == @epi.infeccion.id
    end

    it "should update infeccion" do
      infeccion_params = FactoryGirl.attributes_for(:infeccion)
      Infeccion.find(@inf.id).nombre.should_not eq infeccion_params[:nombre]
      put :update, { epicrisi_id: @epi.id, id: @epi.infeccion.id, infeccion: infeccion_params }
      body = JSON.parse(response.body)
      Infeccion.count.should eq 1
      body['nombre'].should == infeccion_params[:nombre]
      Infeccion.first.nombre.should_not == @inf.nombre
      Infeccion.first.nombre.should == infeccion_params[:nombre]
    end

  end

end
