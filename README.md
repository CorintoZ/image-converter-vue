# Image converter⚙️ using Vue and Express
### Requirements:
Node v11.7.0
Windows 10
@vue/cli 4.3.0
Express

### Project Setup:
To install all dependencies we should run:
```npm install```

RUN PROJECT:
 For starting both front and back you should run:
```npm run serve```
```node src/server.js```
### ENDPOINT:
**POST /photos/upload**
'Content-Type': 'multipart/form-data',
	
### Project Decisions:
My **first approach** was not storing any data in the server and just stream the result from converting the image. This approach didn’t work for me as I was not able to transform correctly the buffer received from the server to an image. On the other hand, on dev tools, I was able to preview the image with the correct MIME type.

The **second approach** was to transform the data into an Image file with extensión JPG, I was able to store the image correctly on a static folder. As a response from the POST request, I would send the image URL. The client would be able to use that URL with no access to the public address from the server. I was not successful because I got a bad request error that denied me to access the data from the response.

The actual solution implemented does not work as expect because returns a bad image format.
For the frontend part, I used the Vuex pattern to store all the information about the images and apply the required modifications.

### Conclusion
Given the problem I had with the backend, the solution is client-side using Vuex. The optimal solution would be to store the images on the server and work asynchronously as the work should be queued and donde in a remote server.
