class Api::AttendancesController < ApplicationController
  def index
    attendances = get_event.attendances
    render json: attendances, scope: @current_user, status: :ok
  end

  def create
    attendance = get_event.attendances.create!(attendance_params)
    render json: attendance, scope: @current_user, status: :created
  end

  def destroy
    attendance = @current_user.attendances.find_by(id: params[:id]) #userAttendance.id / EventPage.js
    if attendance
      attendance.destroy
      render json: { status: ["You are no longer attending"] }
    else
      render json: { errors: ["You are not permitted to perform this action"] }
    end
  end

  private

  def get_event
    event = Event.find_by(id: params[:event_id])
    event
  end

  def attendance_params
    params.permit(:user_id, :event_id)
  end
end
