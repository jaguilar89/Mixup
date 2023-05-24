class ChangeColumnsInEvents < ActiveRecord::Migration[6.1]
  def change
    rename_column :events, :location, :event_location
    rename_column :events, :description, :event_description
  end
end
