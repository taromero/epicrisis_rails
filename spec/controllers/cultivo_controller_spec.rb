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

    it "should not create cultivo if nombre is blank" do
      cultivo_params = FactoryGirl.attributes_for(:cultivo)
      get :create, { epicrisi_id: @epi.id, nombre: '', positivo: cultivo_params[:positivo]}
      resp = JSON.parse(response.body)
      resp['errors'][0].should == "nombre: [\"can't be blank\"]"
    end

    context "a cultivo has been already created" do
      before(:each) do
        @inf.cultivos.push(create(:cultivo))
        @inf.cultivos.size.should eq 1
      end

      it "should delete cultivo" do
        delete :destroy, { epicrisi_id: @epi.id, nombre: '', id: @inf.cultivos.first.id}
        @inf.cultivos.size.should eq 0
      end

    end

  end

end
