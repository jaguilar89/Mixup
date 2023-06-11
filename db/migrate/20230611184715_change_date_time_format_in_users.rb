class ChangeDateTimeFormatInUsers < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :created_at, :timestamptz
    change_column :users, :updated_at, :timestamptz
  end
end
