class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :home_city, :bio, :user, :created_at

  belongs_to :user
end
