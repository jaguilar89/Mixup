class Event < ApplicationRecord
  validates :event_name, :event_location, :max_attendees, :event_description, presence: true
  validates :max_attendees, numericality: { only_integer: true }
end
