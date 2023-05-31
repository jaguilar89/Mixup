class Api::AttendancesController < ApplicationController
  #TODO: Create instance variable containing the Event, use in actions.
  def index
    get_event
    attendances = @event.attendances
    render json: attendances, status: :ok
  end

  def create
    get_event
    attendance = @event.attendances.create!(attendance_params)
    render json: attendance, status: :created
  end

  def destroy
    attendance = @current_user.attendances.find_by(id: params[:id]) #userAttendance.id / EventPage.js
    if attendance
      attendance.destroy
      head :no_content
    else
      render json: { errors: ["You are not permitted to perform this action"] }
    end
  end

  private

  def get_event
    @event = Event.find_by(id: params[:event_id])
    @event
  end

  def attendance_params
    params.permit(:user_id, :event_id)
  end
end
