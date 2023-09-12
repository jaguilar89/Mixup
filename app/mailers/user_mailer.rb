class UserMailer < ApplicationMailer
  default from: "joseaguilardev@gmail.com"

  def send_signup_confirmation_email
    @user = params[:user]

    mail(to: @user.email_address, subject: "Thanks for signing up for Mixup!")
  end
end
