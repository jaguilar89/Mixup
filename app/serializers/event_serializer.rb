class EventSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,
             :event_name,
             :event_pic,
             :event_city,
             :event_start,
             :event_end,
             :place_identifier,
             :place_name,
             :place_address,
             :event_description,
             :max_attendees,
             :available_spots,
             :is_attending
  #:organizer_avatar

  has_many :attendances
  belongs_to :organizer

  def event_pic
    rails_blob_path(object.event_pic, only_path: true) if object.event_pic.attached?
  end

  #def organizer_avatar

  #end

  #Serialized attribute showing whether the logged in user is attending the event.
  def is_attending
    current_user = scope #equals scope defined in the events controller
    attendance = self.object.attendances.find_by(user_id: current_user&.id)
    attendance.present? #returns a boolean
  end

  def available_spots
    max_attendees = self.object.max_attendees
    current_attendees = self.object.attendances.count
    max_attendees - current_attendees
  end
end
