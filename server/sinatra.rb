# encoding: UTF-8
require 'sinatra/base'
require 'json'

require_relative 'diet/diet'
require_relative 'diet/serializer'
require_relative 'diet/mem_serializer'

# WebApp
class WebApp < Sinatra::Base
  set :port, 3010

  # set(:session_secret, 'a random string that wont change')
  # or
  # use Rack::Session::Cookie, :key => 'rack.session', :path => '/',
  # :secret => 'some-random-string'
  enable :sessions

  helpers do
    def authenticate
      return false if h(:user).nil?
      check_user || add_user
    end

    def check_user(check_if_available = false)
      users = JSON.parse(File.read('server/users.txt'))
      user = h(:user).chomp
      check_if_available ? users[user].nil? : users[user] == h(:password).chomp
    end

    def add_user
      if check_user(true)
        users = JSON.parse(File.read('server/users.txt'))
        users[h(:user).chomp] = h(:password).chomp
        File.write('server/users.txt', users.to_json)
        return true
      end
      false
    end

    def h(key)
      Rack::Utils.escape_html(params[key])
    end

    def load_diet
      Diet.from_storage(FileSerializer, (session[:user] || '') + '_diet.txt')
    end
  end

  before do
    @diet = Diet.from_storage(MemSerializer, session[:session_id])
  end

  after do
    @diet.to_storage(MemSerializer, session[:session_id]) unless @diet.nil?
  end

  get '/api' do
    { request: params,
      user: session[:user], diet: @diet.to_json }.to_json
  end

  get '/api/day/:date' do
    @diet.select_day(h(:date))
    { request: params,
      user: session[:user], diet: @diet.to_json }.to_json
  end

  post '/api/login' do
    session[:user] = nil
    @diet = nil
    MemSerializer.save(nil, session[:session_id])
    if authenticate
      session[:user] = h(:user)
      @diet = load_diet
    end
    { user: session[:user] || '',
      request: params, diet: @diet.to_json }.to_json
  end

  post '/api' do
    @diet.add_item(type: h(:type), name: h(:name), calories: h(:calories).to_i)
    { user: session[:user] || '',
      request: params, diet: @diet.to_json }.to_json
  end

  post '/api/add_day' do
    @diet.add_day(Day.new(h(:date)))
         .merge_duplicate_days.select_day(h(:date))
    { user: session[:user] || '',
      request: params, diet: @diet.to_json }.to_json
  end

  get '/api/save' do
    @diet.to_storage(FileSerializer, session[:user] + '_diet.txt')
    'Diet saved'
  end
end

WebApp.run!
