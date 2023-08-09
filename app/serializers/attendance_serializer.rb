class AttendanceSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :user_id, :event_id, :avatar

  belongs_to :user
  belongs_to :event

  def avatar
    profile = Profile.find_by(id: self.object.user.id)
    rails_blob_path(profile.avatar, only_path: true) if profile.avatar.attached?
  end
end
