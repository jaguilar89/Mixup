class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :unproccessably_entity_response

  before_action :authorize

  def authorize
    @current_user = User.find_by(id: session[:user_id])
    unless @current_user
      render json: { errors: ["Not Authorized"] }, status: :unauthorized
    end
  end

  private

  def unproccessably_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
