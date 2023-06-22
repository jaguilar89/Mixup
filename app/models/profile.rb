class Profile < ApplicationRecord
  validates :home_city, presence: true
  validates :bio, length: { maximum: 1000 }

  belongs_to :user
end
