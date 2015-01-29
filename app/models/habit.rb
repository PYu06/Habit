class Habit < ActiveRecord::Base
	DAY_IN_SECONDS = 86400
	TEST_TIME = 0
	default_scope { order('updated_at DESC') }

	  
	def update_all_counters
		update_total_counter
		update_consecutive_counter
	end

	# Need to figure out a better way to set all time to local
	# AR timestamps are in UTC, says they are local by default
	def update_consecutive_counter
		if (Time.now.utc - self.updated_at) < DAY_IN_SECONDS
			self.consecutive_counter += 1
			self.save
		else
			self.update(consecutive_counter: 1)
		end
	end

	def update_total_counter
		self.total_counter += 1
		self.save
	end

end
