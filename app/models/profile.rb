class Profile < ApplicationRecord
  validates :home_city, presence: true
  validates :bio, length: { maximum: 140 }

  belongs_to :user
end
