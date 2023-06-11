class AddStartTimeEndTimeColumnsToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :start_time, :timestamptz
    add_column :events, :end_time, :timestamptz
  end
end
