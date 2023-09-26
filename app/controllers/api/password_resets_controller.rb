class Api::PasswordResetsController < ApplicationController
  skip_before_action :authorize
  rescue_from ActiveSupport::MessageVerifier::InvalidSignature, with: :token_expired_response

  def new
  end

  def create
    @user = User.find_by(email_address: params[:email_address])
    if @user
      PasswordMailer.with(user: @user).reset.deliver_later
      render json: { alerts: "If the email address provided exists, a link to reset password has been sent." }
    end
  end

  def edit
    @user = User.find_signed!(params[:token], purpose: "password_reset")
  end

  def update
    @user = User.find_signed!(params[:token], purpose: "password_reset")

    if @user.update(password_params)
      render json: { alerts: "Password has been successfully reset, please sign in." }
    else
      render "edit"
    end
  end

  private

  def password_params
    params.permit(:password, :password_confirmation)
  end

  def token_expired_response
    render json: { errors: "Your token has expired. Please try again." }
  end
end
