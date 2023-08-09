class Event < ApplicationRecord
  has_many :attendances, dependent: :destroy
  has_many :users, through: :attendances
  has_one_attached :event_pic
  belongs_to :organizer, class_name: "User", foreign_key: "organizer_id"

  validates :event_name, :event_pic, :event_start, :event_end, :max_attendees, :event_description, presence: true
  validates :max_attendees, numericality: { only_integer: true, less_than_or_equal_to: 100, greater_than: 2 }
end

