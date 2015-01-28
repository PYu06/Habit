class Habit < ActiveRecord::Base
  
	def update_all_counters
		update_daily_counter
		update_all_time_counter
	end

	def update_daily_counter
		p "daily"
		self.daily_counter += 1
		self.save
	end

	def update_all_time_counter
		p "consecutive_counter"
		self.consecutive_counter += 1
		self.save
	end

end
