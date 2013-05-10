EpicrisisRails::Application.routes.draw do
  root to: "home#index"   # Changes default index to /home/index (requires to delete public/index.html to work)
  resources :epicrisis do
    resource :infeccion, :controller => "infeccion" do
    	resources :cultivos do

    	end
    end
  end
end
