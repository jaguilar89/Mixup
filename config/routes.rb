Rails.application.routes.draw do
  namespace :api do
    resources :events do
      resources :attendances, only: [:index, :create, :destroy]
    end

    resources :profiles, only: [:show, :create]
    post "/signup", to: "users#create"
    post "/login", to: "sessions#create"
    get "/me", to: "users#show"
    delete "/logout", to: "sessions#destroy"

    post "/password/reset", to: "password_resets#create"
    patch "/password/reset/edit", to: "password_resets#update"
  end
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
