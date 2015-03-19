require 'uri'
require 'pry'
require 'net/http'

size = 24772 #the last offset (for the range header)
uri = URI("http://127.0.0.1/~vikasyaligar/even_semester/sample4.jpg")
http = Net::HTTP.new(uri.host, uri.port)
headers = {
  'Range' => "bytes=0-#{size}"
}
path = uri.path.empty? ? "/" : uri.path
puts "PATH = #{path}"
puts "headers = #{headers}"

#test to ensure that the request will be valid - first get the head
code = http.head(path, headers).code.to_i
if (code >= 200 && code < 300) then
	puts code
	response = http.get(uri.path, headers)
	puts response.inspect
	binding.pry
    #the data is available...
    # http.get(uri.path, headers) do |chunk|
    # 	puts chunk.length
    #     #provided the data is good, print it...
    #     # print chunk unless chunk =~ />416.+Range/
    # end
end