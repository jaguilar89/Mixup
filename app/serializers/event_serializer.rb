class EventSerializer < ActiveModel::Serializer
  attributes :id, :date, :start_time, :end_time, :location, :description, :available_spots
end
