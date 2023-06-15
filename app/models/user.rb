class User < ApplicationRecord
  has_secure_password
  has_many :attendances, dependent: :destroy
  has_many :events, through: :attendances
  has_many :organized_events, class_name: "Event", foreign_key: "organizer_id" #aliased attribute which will list events organized by the user
  has_one :profile
  before_create :build_profile

  validates :full_name, presence: true
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, length: { in: 8..20 }
  validate :validate_full_name_format

  private

  def validate_full_name_format
    return unless full_name.present?

    names = full_name.split(" ")
    if names.count < 2 || names.any? { |name| name.blank? }
      errors.add(:full_name, "must comprise of a first name and a last name")
    end
  end
end
