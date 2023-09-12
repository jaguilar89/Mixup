class ChangeUsernameColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :username, :email_address
  end
end
