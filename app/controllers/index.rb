get '/' do
	@habits = Habit.all
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

get '/habits/:id/done' do
	@habit = Habit.find(params[:id])
	@habit.update_all_counters
	redirect '/'
end

get '/quote' do
	response = HTTParty.post("http://api.icndb.com/jokes/random")
	# one = JSON.parse(response.body)
	# p response.quoteText
	# p one["value"]["joke"]
	response.to_json
	# ["value"]["joke"]


end

# # meh, dunno if want to use
# get '/quotetwo' do
# 	p response = HTTParty.get("http://api.theysaidso.com/qod.json")
# end