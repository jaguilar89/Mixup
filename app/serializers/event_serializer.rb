class EventSerializer < ActiveModel::Serializer
  attributes :id, :event_name, :event_location, :event_description, :available_spots, :is_attending
  has_many :attendances
  belongs_to :organizer

  def is_attending
    current_user = scope
    attendance = self.object.attendances.find_by(user_id: current_user.id)
    attendance.present? || false
  end
end
