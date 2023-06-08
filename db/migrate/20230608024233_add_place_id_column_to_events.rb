class AddPlaceIdColumnToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :place_identifier, :string
  end
end
