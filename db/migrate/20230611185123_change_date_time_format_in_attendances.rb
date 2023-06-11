class ChangeDateTimeFormatInAttendances < ActiveRecord::Migration[6.1]
  def change
    change_column :attendances, :created_at, :timestamptz
    change_column :attendances, :updated_at, :timestamptz
  end
end
