class Api::ProfilesController < ApplicationController
  def create
    profile = @current_user.build_profile(profile_params)
    if profile.save!
      render json: profile, scope: @current_user, status: :created
    end
  end

  def show
    profile = Profile.find_by(id: params[:id])
    user = profile.user
    user_attendances = Attendance.where("user_id = ?", user.id)
    render json: profile, status: :ok
  end

  private

  def profile_params
    params.permit(:home_city, :bio)
  end
end

#render json: profile.as_json(include: { user: { include: { attendances: {} } } }), status: :ok
