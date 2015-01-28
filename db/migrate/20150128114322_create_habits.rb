class CreateHabits < ActiveRecord::Migration
  def change
  	create_table :habits do |t|
  		t.string   :habit_name
  		t.integer  :consecutive_counter, default: 0
  		t.integer  :daily_counter, default: 0


  		t.timestamps
  	end
  end
end
