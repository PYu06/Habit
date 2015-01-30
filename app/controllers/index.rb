get '/' do
	@habits = Habit.all
	erb :index
end

post '/habits' do
	if request.xhr?
		habit = Habit.create(params[:habit])
		content_type :json
		habit.to_json
		# erb :'habits/new', locals: {habit: habit}, layout: false
	else
		redirect '/'
	end
end

get '/habits/:id/edit' do
	habit = Habit.find(params[:id])
end

put '/habits/:id' do
	@habit = Habit.find(params[:id])
	@habit.update_attributes(params[:habit])
	redirect '/'	
	if request.xhr? 
		erb :'habits/edit', locals: {habit: habit}, layout: false
	else
		redirect '/'
	end
end

get '/habits/:id/delete' do
	Habit.find(params[:id]).destroy
	redirect '/'
end

delete '/habits/:id/delete' do
	Habit.find(params[:id]).destroy
end

post '/habits/:id/done' do
	@habit = Habit.find(params[:id])
	@habit.update_all_counters
	content_type :json
	@habit.to_json

	# redirect '/'
	# {img: }
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