class ChangeColumnInEvents < ActiveRecord::Migration[6.1]
  def change
    rename_column :events, :available_spots, :max_attendees
    change_column :events, :event_description, :text
  end
end
