class Event < ApplicationRecord
  has_many :attendances, dependent: :destroy
  has_many :users, through: :attendances
  belongs_to :organizer, class_name: "User", foreign_key: "organizer_id"

  validates :event_name, :event_city, :max_attendees, :event_description, presence: true
  validates :max_attendees, numericality: { only_integer: true }
end
