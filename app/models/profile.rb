class Profile < ApplicationRecord
  validates :bio, length: { maximum: 1000 }

  has_one_attached :avatar
  validates :avatar, presence: true

  belongs_to :user
end
