#CapitalOne on Instagram

This web application shows #capitalone pictures from Instagram in real time. It uses node.js and is built on top of RethinkDB and Instagram's PubSubHubbub API. 

This application shows recent photos in a grid format as well as photos based on location. OpenMap was used for the location based layout on the client-side.

Sentiment, a npm package, was used to determine the sentiment of the comment that accompanies the photo. Currently, the sentiment of the photo is printed to the server. This needs to be displayed in photo layout.

When you start the application, it will subscribe to Instagram's '#capitalone' tag. Instagram will send POST requests to your application every time a new image is posted with the tag.

In order to receive the POST requests from Instagram, you must run the application at a publicly accessible address and specify the public host in the 'config.js' file. For development purposes, it is generally most convenient to use something like [ngrok](https://ngrok.com/) to expose a locally-running instance of the application to the public Internet.

The application uses RethinkDB change feeds to identify newly-added photos and then uses WebSockets (socket-io) to propagate photo information to the application frontend.

Future additions to this project (given more time and manpower) include:
Sorting photos by sentiment (grid layout)
Determining where the most photos with #capitalone are located (map layout)
Promoting #capitalone and seeing the demographic of users that respond to hypothetical promotion

The code for this project is located here on [GitHub](https://github.com/shiaue/zealous-octo-waddle-c1-insta)