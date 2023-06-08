class AddPlaceColumnsToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :place_name, :string
    add_column :events, :place_address, :string
  end
end
