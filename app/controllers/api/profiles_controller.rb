class Api::ProfilesController < ApplicationController
  def create
    profile = @current_user.profile.create!(profile_params)
    render json: profile, scope: @current_user, status: :created
  end

  def show
    profile = Profile.find_by(id: params[:id])
    render json: profile
  end

  private

  def profile_params
    params.require(:user).permit(:home_city, :bio)
  end
end
