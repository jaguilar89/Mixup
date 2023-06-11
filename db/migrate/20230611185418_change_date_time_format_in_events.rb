class ChangeDateTimeFormatInEvents < ActiveRecord::Migration[6.1]
  def change
    change_column :events, :created_at, :timestamptz
    change_column :events, :updated_at, :timestamptz
  end
end
