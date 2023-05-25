class Event < ApplicationRecord
  validates :event_name, :event_location, :available_spots, :event_description, presence: true
  validates :available_spots, numericality: { only_integer: true }


end
