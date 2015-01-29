class Habit < ActiveRecord::Base
	DAY_IN_SECONDS = 86400
	TEST_TIME = 1

	  
	def update_all_counters
		update_daily_counter
		update_all_time_counter
	end

	def update_all_time_counter
		if (Time.now.utc - self.updated_at) < DAY_IN_SECONDS
			self.daily_counter += 1
			self.save
		else
			self.update(daily_counter: 1)
		end
	end

	def update_daily_counter
		self.consecutive_counter += 1
		self.save
	end

end
