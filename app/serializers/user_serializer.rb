class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :username, :created_at, :updated_at
end
