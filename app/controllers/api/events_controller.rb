class Api::EventsController < ApplicationController
  wrap_parameters format: []

  def index
    events = Event.all
    render json: events, scope: @current_user
  end

  def create
    event = @current_user.organized_events.create!(event_params)
    render json: event, scope: @current_user, status: :created
  end

  def show
    event = Event.find_by(id: params[:id])
    render json: event, scope: @current_user
  end

  def update
    event = @current_user.organized_events.find_by(id: params[:id])

    if event.present?
      if params[:event_name].present?
        event.event_name = params[:event_name]
      end

      if params[:event_start].present?
        event.event_start = params[:event_start]
      end

      if params[:event_end].present?
        event.event_end = params[:event_end]
      end

      if params[:place_identifier].present?
        event.place_identifier = params[:place_identifier]
      end

      if params[:place_name].present?
        event.place_name = params[:place_name]
      end

      if params[:place_address].present?
        event.place_address = params[:place_address]
      end

      if params[:max_attendees].present?
        event.max_attendees = params[:max_attendees]
      end

      if params[:event_description].present?
        event.event_description = params[:event_description]
      end
    end

    if event.save
      render json: event, status: :ok
    end
  end

  def destroy
    event = Event.find_by(id: params[:id])
    event.destroy
    head :no_content
  end

  private

  def event_params
    params.permit(:event_name,
                  :event_pic,
                  :event_city,
                  :event_start,
                  :event_end,
                  :event_description,
                  :max_attendees,
                  :place_identifier,
                  :place_name,
                  :place_address)
  end
end
