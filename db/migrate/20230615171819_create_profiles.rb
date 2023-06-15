class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.string :home_city
      t.text :bio

      t.timestamps
    end
  end
end
