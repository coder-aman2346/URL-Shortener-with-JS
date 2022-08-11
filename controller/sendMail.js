
var nodemailer =require('nodemailer')
const { google} = require('googleapis')

const client_ID = '666780173410-j83cql91fi83k4msk6d0jvnrfqeqs77n.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const refreshToken = "1//04JT7-KOgtoD2CgYIARAAGAQSNwF-L9Irbct1d1iBvWV6TW1OYyf0rK5AxoW-pdsZ1RvPWV5xvUF5I2FgkD79ngRKo_Jd7qypdzw"

const oAuth2Client = new google.auth.OAuth2(client_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: refreshToken})



module.exports.sendResetEmail = async (email, token) => {
   // change first part to your domain
  var url = "http://localhost:8000/user/reset-password?token=" + token;

  await smtpTransport.sendMail({
    from: "amanprasad1072@gmail.com",
    to: email,
    subject: "RESET YOUR PASSWORD",
    text: `Click on this link to reset your password ${url}`,
    html: `<h3> Click on this link to reset your password : ${url} </h3>`,
  });
};

module.exports.sendVerifyEmail = async (email, token) => {
  // change first part to your domain
  console.log(email);
  var url = "http://localhost:8000/user/verifyemail?token=" + token;
  
  var mailOptions = {
    from: 'amanprasad1072@gmail.com',//replace with your email
    to: email,//replace with your email
    subject: `Contact name:`,
    html:`<h1>Contact details${url}</h1>
    <h2> name </h2><br>`
    };

    var accessToken= await oAuth2Client.getAccessToken()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    type:'OAuth2',
    user: 'amanprasad1072@gmail.com',
    clientId: client_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: refreshToken,
    accessToken: accessToken
  }
})

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
      console.log(error);
      res.send('error') // if error occurs send error as response to client
      }
      else {
      console.log('Email sent: ' + info.response);
      res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
      }
      });

};
