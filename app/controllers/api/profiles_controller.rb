class Api::ProfilesController < ApplicationController
  def create
    profile = @current_user.build_profile(profile_params)
    if profile.save!
      render json: profile, scope: @current_user, status: :created
    end
  end

  def show
    profile = Profile.find_by(id: params[:id])
    render json: profile
  end

  private

  def profile_params
    params.permit(:home_city, :bio, :profile)
  end
end
