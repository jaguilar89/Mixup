class EventSerializer < ActiveModel::Serializer
  attributes :id,
             :event_name,
             :event_city,
             :place_identifier,
             :place_name,
             :place_address,
             :event_description,
             :max_attendees,
             :available_spots,
             :is_attending

  has_many :attendances
  belongs_to :organizer

  #Serialized attribute showing whether the logged in user is attending the event.
  def is_attending
    current_user = scope #equals scope defined in the events controller
    attendance = self.object.attendances.find_by(user_id: current_user.id)
    attendance.present? #returns a boolean
  end

  def available_spots
    max_attendees = self.object.max_attendees
    current_attendees = self.object.attendances.count
    max_attendees - current_attendees
  end
end
