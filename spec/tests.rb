require 'spec_helper'

describe 'GET "/"' do
	it "should exist" do
		get '/'
		expect(last_response.status).to eq(200)
	end
end