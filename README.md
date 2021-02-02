# Twilio-tech-support

Twilio, a cloud communication platform as a service (cPaaS) enables user to develop SMS,Voice and Video solutions.

Frontend: React, Immet, Semantic UI, SocketIO for realtime communication.

Backend: NodeJS, Express for the rest API and SocketIO  

Using the Twilio services and with the help of sockets, 
Call center application is implemented with the dashbaord where call details will be added in real-time, showing the status of the call at each stage with the customer.
(Generated a phone number with Twilio trial account. Used as the customer care number)

-> For a customer, calls will be greeted with a custom welcome message(integrated with programmable voice service provided by Twilio), and will be added to a queue.

-> Workers in Call centre needs to login via SMS verification provied by Twilio (Will be routed to dashbaord). 
   If the call is received, call details with status will be shown in real time.
   
-> The call will flow from ringing to queued, And on Click of Queue status in dashboard, the workers at the call centre can connect with customers and talk to them

-> Then the status moves to answered and of course in case we miss a call it will also display a call missed( IN PROGRESS)
