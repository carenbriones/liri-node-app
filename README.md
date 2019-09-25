# liri-node-app
This application is a LIRI (Language Interpretation and Recognition Interface) to get songs, concert information, and movie information using node.js and the OMDB, Spotify, and Bands in Town APIs via the console.

The application has four different commands that the user can type using bash: "spotify-this-song", "movie-this", "concert-this", and "do-what-it-says".

## Commands

### spotify-this-song
This command uses the Node Spotify API to return information on the song the user searches for. If the user does not specify a song (i.e. only types in "spotify-this-song" without a song after), the information for "The Sign" by Ace of Base will be displayed.  If the user specifies a song, the information on that song (if available) will be logged to the console.
![spotify-this-song output](/images/spotify-this-song.png)

### movie-this
This command uses Axios and the OMDB API to return information on the movie a user searches for.  If the user does not specify a movie title, the information for Mr. Nobody will be displayed. Otherwise, the information on that film (if available) will be logged to the console.
![movie-this output](/images/movie-this.png)

### concert-this
This command uses Axios and the Bands in Town API to return information on upcoming concerts (if available) for the artist a user searches for.
![concert-this output](/images/concert-this.png)

### do-what-it-says
This command uses the fs (File System) module to read a file named "random.txt", and uses the CSV file to interpret what action to do. For example, if random.txt reads "movie-this,The Lion King", the application will provide the information on The Lion King as it would using the movie-this functionality.
![random.txt example](/images/random.png)
![do-what-it-says output](/images/do-what-it-says.png)

#### Other
After each command, the text that is logged to the console is also appended to a file named log.txt. Here is a sample text file:
![log.txt example](/images/log.png)