class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :home_city, :bio, :user, :created_at, :attended_events

  belongs_to :user

  def attended_events
    user = self.object.user
    attendances = user.attendances
    attended_events = attendances.map { |a| a.event }
    attended_events if attendances
  end
end
