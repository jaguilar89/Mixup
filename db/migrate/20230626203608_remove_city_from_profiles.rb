class RemoveCityFromProfiles < ActiveRecord::Migration[6.1]
  def change
    remove_column :profiles, :home_city
  end
end
