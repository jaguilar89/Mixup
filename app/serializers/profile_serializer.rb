class ProfileSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :bio, :user, :created_at, :attended_events, :avatar
  belongs_to :user

  def attended_events
    user = self.object.user
    attendances = user.attendances
    attended_events = attendances.map { |a| a.event }
    attended_events if attendances
  end

  def avatar
    rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  end
end
