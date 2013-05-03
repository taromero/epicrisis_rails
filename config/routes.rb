EpicrisisRails::Application.routes.draw do
  root to: "home#index"   # Changes default index to /home/index (requires to delete public/index.html to work)
  resources :epicrisis do
    resources :infeccion do
    end
  end
end
