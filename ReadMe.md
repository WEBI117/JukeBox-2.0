Welcome to JukeBox-2.0
---

Idea
---
An application that allows customers to shape their own customer experience at establishments hosting the JukeBox-2.0 service.

Requirements
---
An establishment with a music system connected to an interenet connected computer system running the JukeBox-2.0 server.
A mobile Phone within a certain distance of the establishment premises running the JukeBox-2.0 mobile app which can send requests to the local computer system.

Components
---
A react native based mobile application running on the client's mobile phone.
A react based web application running on the establishment's music system connected computer.
Restful communication architecture to recieve requests from different clients.
* Currently no database seems to be required.

Specifications
---

Client Application
-
React Native Based Application.
Connects to a computer hosting the web app component of the application.
Must only be able to connect to web app servers that are within a certain distance of the client application.
Allows the user to view the song currently playing as well as the songs within the current playlist on the server.
Must allow users to search for a song of their choice and return a list of songs based on the search key.
Must allow users to add songs returned from the search to the playlist implemented on the server.
Must disallow a client from adding another song to the playlist if one has already present within the current playlist.

Server Application
-
React or Angular based web application that is hosted at a computer connected to a sound system within the premises of the business.
Allows users to connect and send requests to the server.
Implements a playlist of songs to play on the system based on these requests.
