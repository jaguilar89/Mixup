class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :username, :profile, :created_at, :updated_at

  has_many :attendances
  has_one :profile
end
