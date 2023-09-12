class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email_address, :created_at, :updated_at

  has_many :attendances
  has_one :profile
end
