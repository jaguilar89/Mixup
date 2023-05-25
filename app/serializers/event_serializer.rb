class EventSerializer < ActiveModel::Serializer
  attributes :id, :event_name, :event_location, :event_description, :available_spots

end
