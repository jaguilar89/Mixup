class ChangeEventLocationInEvents < ActiveRecord::Migration[6.1]
  def change
    rename_column :events, :event_location, :event_city
  end
end
