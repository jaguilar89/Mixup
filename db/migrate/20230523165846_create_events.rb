class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :location
      t.string :description
      t.integer :available_spots

      t.timestamps
    end
  end
end
