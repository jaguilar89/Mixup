class AddStartTimeEndTimeColumnsToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :event_start, :timestamptz
    add_column :events, :event_end, :timestamptz
  end
end
