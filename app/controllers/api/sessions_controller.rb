class Api::SessionsController < ApplicationController
  skip_before_action :authorize, only: :create

  def create
    user = User.find_by(email_address: params[:email_address])

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: { errors: ["Invalid Username and/or Password"] }, status: :unauthorized
    end
  end

  def destroy
    session.delete(:user_id)
    head :no_content
  end
end
