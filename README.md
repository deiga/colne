# COLNE

This is a simple API to forward requests from an [750 Words](http://750words.com/) userscript to [IFTTT](https://ifttt.com/) Maker which in turn sends the data to an archiving solution.

### Motivation
I wanted an automated way of archiving my 750 Words ramblings and since they provide no API I had to get creative with a userscript and IFTTT. Too bad IFTTT Maker doesn't accept remote calls because of CORS.

I chose Node.js mostly for the ease and speed of creating it. I chose [HAPI](http://hapijs.com) because I wanted to learn a new web server library.