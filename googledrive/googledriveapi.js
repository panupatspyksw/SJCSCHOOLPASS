const { google } = require('googleapis');
const { auth } = require('google-auth-library');
const fs = require('fs')

const ggapi = {}
const CLIENT_ID = process.env.GOOGLEDRIVE_CLIENTID;
const CLIENT_SECRET = process.env.GOOGLEDRIVE_SECRET_CLIENTID;
const REDIRECT_URI = process.env.GOOGLEDRIVE_REDIRECTURI;
const REFRESH_TOKEN = process.env.GOOGLEDRIVE_REFRESHTOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});


ggapi.uploadFile = async (name, buffer)=> {
    try {
      const response = await drive.files.create({
        requestBody: {
          name: name, //This can be name of your choice
          mimeType: 'image/jpg',
        },
        media: {
          mimeType: 'image/jpg',
          body: buffer,
        //   body: fs.createReadStream(buffer),
        },
      });
      console.log(response.data);
      return(response.data)
    } catch (error) {
      console.log(error.message);
      return(error.message)
    }
  }
  
  // uploadFile();
  
ggapi.deleteFile = async ()=>{
    try {
      const response = await drive.files.delete({
        fileId: 'YOUR FILE ID',
      });
      console.log(response.data, response.status);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  // deleteFile();
  
ggapi.generatePublicUrl = async (fileId)=>{
    try {
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
  
      /* 
      webViewLink: View the file in browser
      webContentLink: Direct download link 
      */
      const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
      });
      console.log(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  
ggapi.generateImageUrl = async (fileId) => {
  try{
      drive.files.get({
          fileId: fileId, //id of the file you are looking for
          alt: 'media'
      }, {
          responseType: 'arraybuffer',
          encoding: null
      }, function(err, response) {
          if (err) {
              console.log(err);
      
              //handle the error
          } else {
              var imageType = response.headers['content-type'];
              var base64 = new Buffer(response.data, 'utf8').toString('base64');
              var dataURI = 'data:' + imageType + ';base64,' + base64;
      
              console.log(dataURI)
          }
      });
  } catch (error){
      console.log(error.message);
  }
  
  }
  

  
  ggapi.listFiles = async (auth)=> {
      const drive = google.drive({version: 'v3', auth});
      drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
      }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
          console.log('Files:');
          files.map((file) => {
            console.log(`${file.name} (${file.id})`);
          });
        } else {
          console.log('No files found.');
        }
      });
    }
  

module.exports = ggapi