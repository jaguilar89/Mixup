class Event < ApplicationRecord
  has_many :attendances, dependent: :destroy
  has_many :users, through: :attendances
  belongs_to :organizer, class_name: "User", foreign_key: "organizer_id"

  validates :event_name, :event_location, :available_spots, :event_description, presence: true
  validates :available_spots, numericality: { only_integer: true }
end
