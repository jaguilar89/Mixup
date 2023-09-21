class Api::PasswordResetsController < ApplicationController
  skip_before_action :authorize

  def new
  end

  def create
    @user = User.find_by(email_address: params[:email_address])
    if @user
      PasswordMailer.with(user: @user).reset.deliver_later

      #redirect_to "/login", notice: "If an account with that email was found, a link to reset password has been sent."
    end
  end

  def edit
    begin
      @user = User.find_signed!(params[:token], purpose: "password_reset")
    rescue ActiveSupport::MessageVerifier::InvalidSignature
      redirect_to "/login", alert: "Your token has expired. Please try again."
    end
  end

  def update
    begin
      @user = User.find_signed!(params[:token], purpose: "password_reset")

      if @user.update(password_params)
        redirect_to "/login", notice: "Your password was reset succesfully. Please sign in."
      else
        render "edit"
      end
    rescue ActiveSupport::MessageVerifier::InvalidSignature
      redirect_to "/login", alert: "Your token has expired. Please try again"
    end
  end

  private

  def password_params
    params.permit(:email_address)
  end
end
