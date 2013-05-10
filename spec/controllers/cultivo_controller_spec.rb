require 'spec_helper'

describe CultivosController do

  describe "create cultivo" do

    before (:each) do
      @epi = create(:epicrisis, :inf)
      @inf = @epi.infeccion
    end

    it "should create cultivo" do
      cultivo_params = FactoryGirl.attributes_for(:cultivo)
      get :create, { epicrisi_id: @epi.id, nombre: cultivo_params[:nombre], positivo: cultivo_params[:positivo]}
      body = JSON.parse(response.body)
      body['nombre'].should == cultivo_params[:nombre]
      body['positivo'].should == cultivo_params[:positivo]
    end

  end

end
