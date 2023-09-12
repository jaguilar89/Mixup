class UserMailer < ApplicationMailer
  default from: "joseaguilardev@gmail.com"

  def signup_confirmation_email
    @user = params[:user]

    mail(to: @user.email, subject: "Thanks for signing up for Mixup!")
  end
end
