require 'sinatra'
configure { set :server, :puma }

get '/' do 
  send_file "index.html"
end

get '/sample4.jpg' do
  content_type 'application/octet-stream'
  send_file "sample4.jpg"
end

get '/normal' do 
  send_file "index2.html"
end

get '/image' do
  send_file "index2.html"
end

get '/binary' do
    # content_type 'application/octet-stream'
    send_file "output"
end

get '/video' do
  send_file 'video_stream.html'
end

get '/video2' do
  send_file 'video_stream2.html'
end

get '/video.webm' do
  content_type 'application/octet-stream'
  send_file 'video.webm'
end

get '/base64' do 
  send_file 'using_base64.html'
end

get '/sample2.jpg' do 
  send_file 'sample.jpg'
end
