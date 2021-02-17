# Twilio-tech-support
DEMO: https://www.awesomescreenshot.com/video/2783179?key=6e4b9e85959f9b40778ad9c9f444c6d7

Twilio, a cloud communication platform as a service (cPaaS) enables user to develop SMS,Voice and Video solutions.

Frontend: React, Immet, Semantic UI, SocketIO for realtime communication.

Backend: NodeJS, Express for the rest API and SocketIO  

By leveraging Twilio voice and sms services, 
Call center application is implemented where call info will be added in real-time on the dashbaord, showing the status of the call at each stage with the customer.
Multiple calls from customers could be made, these calls will be added on the dashboard and then call center worker could decide on the sequence in which calls is answered.
(Generated a phone number with Twilio trial account. Used as the customer care number)

-> When customer places a call, customer will be greeted with a custom welcome message(integrated with programmable voice service by Twilio), and will be added to a queue.

-> Workers in Call centre needs to login via SMS verification provied by Twilio (Will be routed to dashbaord). 
   
-> The call will flow from ringing to queued, And on Click of Queue status in dashboard, the workers at the call centre can connect with customers and talk to them in resolving any issues. Once resolved, the status moves to answered and of course in case we miss a call it will be moved to missed status( IN PROGRESS)
