class User < ApplicationRecord
  has_secure_password
  validates :full_name, presence: true
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, length: { in: 8..20 }
end
