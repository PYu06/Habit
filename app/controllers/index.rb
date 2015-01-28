get '/' do
	@habits = Habit.all
	erb :index
end

post '/habits' do
	habit = Habit.create(params[:habit])
	redirect '/'
end