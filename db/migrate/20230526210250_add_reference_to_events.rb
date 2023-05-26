class AddReferenceToEvents < ActiveRecord::Migration[6.1]
  def change
    add_reference :events, :organizer, foreign_key: { to_table: :users }
  end
end
