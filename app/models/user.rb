class User < ApplicationRecord
  has_secure_password
  has_many :attendances, dependent: :destroy
  has_many :events, through: :attendances

  validates :full_name, presence: true
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, length: { in: 8..20 }
end
