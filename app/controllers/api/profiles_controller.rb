class Api::ProfilesController < ApplicationController
  def create
    profile = @current_user.profile.update!(profile_params)
    render json: profile, scope: @current_user, status: :created
  end

  def show
    profile = Profile.find_by(id: params[:id])
    render json: profile
  end

  private

  def profile_params
    params.permit(:home_city, :bio)
  end
end
