get '/' do
	@habits = Habit.all
	# @habits.each do |habit| @habit = habit end
	erb :index
end

post '/habits' do
	@habit = Habit.create(params[:habit])
	redirect '/'
end

get '/habits/:id/edit' do
	@habit = Habit.find(params[:id])
	erb :'habits/edit'
end

put '/habits/:id' do
	@habit = Habit.find(params[:id])
	@habit.update_attributes(params[:habit])
	redirect '/'	
end

get '/habits/:id/delete' do
	Habit.find(params[:id]).destroy
	redirect '/'
end