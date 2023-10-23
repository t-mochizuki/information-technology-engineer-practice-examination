# usage: ruby script/question_template.rb docs/questions/2023/autumn/am1/15/index.json
require 'erb'
require 'json'

if ARGV[0] && File.file?(ARGV[0])
  File.open(ARGV[0], 'r') do |r|
    json = r.readlines.join
    h = JSON[json]

    template = ERB.new <<~EOF
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width; initial-scale=1.0">
          <title><%= h['title'] %></title>
        </head>
        <body>
          <p>
          <%= h['question'] %>
          </p>

          <table>
            <tr><td><%= h['options'][0]['id'] %></td><td><%= h['options'][0]['describe'] %></td></tr>
            <tr><td><%= h['options'][1]['id'] %></td><td><%= h['options'][1]['describe'] %></td></tr>
            <tr><td><%= h['options'][2]['id'] %></td><td><%= h['options'][2]['describe'] %></td></tr>
            <tr><td><%= h['options'][3]['id'] %></td><td><%= h['options'][3]['describe'] %></td></tr>
          </table>

          <p>
          <%= h['source'] %>
          </p>
        </body>
      </html>
    EOF
    puts template.result(binding)
  end
end
