# Twilio-tech-support
DEMO: https://www.awesomescreenshot.com/video/2783179?key=6e4b9e85959f9b40778ad9c9f444c6d7

Twilio, a cloud communication platform as a service (cPaaS) enables users to develop SMS, Voice, and Video solutions.

Frontend: React, Immet, Semantic UI, SocketIO for real-time communication.

Backend: NodeJS, Express for the rest API and SocketIO  

By leveraging Twilio voice and SMS services, 
Call center application is implemented where call info will be added in real-time on the dashboard, showing the status of the call at each stage with the customer.
Multiple calls from customers could be made, these calls will be added on the dashboard and then workers could decide on the sequence in which calls are going to be answered.
(Generated a phone number with Twilio trial account. Used as the customer care number)

-> When a customer places a call, the customer will be greeted with a custom welcome message(integrated with programmable voice service by Twilio) and will be added to a queue.

-> Workers in the Call center need to login via SMS verification provided by Twilio (Will be routed to dashboard). 
   
-> The call will flow from ringing to queued, And on Click of Queue status in the dashboard, the workers at the call centre can connect with customers and talk to them in resolving any issues. Once resolved, the status moves to answered and of course in case we miss a call it will be moved to missed status( IN PROGRESS)
