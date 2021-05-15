

var express = require('express');
  var router = express.Router();
  var cartItemsModel = require("../modules/cartitemsschema");
  //var uploadModel = require("../modules/uploadschema");
  /* GET home page. */

router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {
    res.render('dashboardgetstarted', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee) {
    res.render('dashboardgetstartedemployee', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardgetstartedadmin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin });

  } else {
    res.render('getstarted', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  //res.render('dashboardgetstarted', { title: 'Quick Website'});
});

//
// Correct One starts
//Require multer for file upload
var multer = require('multer');
//require path
var path = require('path');
router.use(express.static(path.join(__dirname, './public')));
//Set Storage Engine for file to be stored
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `./public/uploads/`)
  }, 
  
  filename: function(req, file, cb) {
    
    cb(null, `${Date.now()}_${file.fieldname}${path.extname(file.originalname)}`);
  }
  
  /* Correct One so far
  filename: function(req, file, cb) {
    
    
    cb(null, Date.now() + '_' + file.fieldname + '_' + path.extname(file.originalname));
  }
  */
});


//init upload correct one starts here
/*
const filesForGalleryUpload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
}).single('uploadcontentforgallery');
 Correct One Ends*/
//
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},    
  fileFilter: function(req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
});

var multipleUploads = upload.fields([{ name: 'uploadcontentforgallery', maxCount: 1}, {name: 'uploadcontentfortemplates', maxCount: 1}]);//.single('uploadcontentforgallery');//fields([{name: "uploadcontentforgallery", maxCount: 1}, {name: "uploadcontentfortemplates", maxCount: 1}]);

//
var aws = require("aws-sdk");
  const ses = new aws.SES({"accessKeyId": process.env.SES_I_AM_USER_ACCESS_KEY, "secretAccessKey": process.env.SES_I_AM_USER_SECRET_ACCESS_KEY, "region": process.env.AWS_SES_REGION});

router.post('/', multipleUploads, function(req, res, next) {
  //console.log(req.files);
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  var currentAccountUsername = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;
//

if(currentAccountUsername) {  

  // Correct One
  
  // for Upload Content For Gallery
  /*
  if(req.files['uploadcontentforgallery'][0] == undefined || req.files['uploadcontentfortemplates'][0] == undefined) {
    var uploadContentForGallery = 'No Image Selected';
  } else {
    uploadContentForGallery = req.files.filename;
  }
  */
  /*if(req.files == undefined) {
    var uploadContentForGallery = 'No Image Selected';//req.file.filename;
  } else {
    uploadContentForGallery = filename;
  }
*/

console.log(req.files); //showing both files
console.log('Vipin');
console.log(req.files);

//Correct One is this one   console.log(req.files.uploadcontentforgallery[0].filename);
/*
if(req.files.uploadcontentforgallery[0]) {
  var uploadContentForGallery = req.files.uploadcontentforgallery[0].filename;
} else {
  uploadContentForGallery = 'No Image Selected';
}
*/
/*
if(req.files == null) {
  var uploadContentForGallery = 'No Image Selected';
} else {
  uploadContentForGallery = req.files.uploadcontentforgallery[0].filename;
}
*/
/*if(req.files == undefined || req.files == null) {
  var uploadContentForGallery = 'No Image Selected';
} else {
  var filename = req.files.uploadcontentforgallery[0].filename;
  uploadContentForGallery = filename;
} */
//var uploadContentForGallery = 'No Image Selected';
 
//var uploadContentForGallery = 'No Image Selected'// || req.files.uploadcontentforgallery[0].filename;
var uploadContentForGallery = 'No Image Selected';  
var uploadContentForTemplates = 'Templates Image';
/*
 console.log(req.files, req.body);
  
  

  */

var cartItemsList = new cartItemsModel({
  
Username: currentAccountUsername,
TemplateOption: req.body.template,
//CustomerGivenTemplate: req.body.customertemplate,
//Basic Features
Home: req.body.home,
HomePageContent: req.body.homepagecontent,
About: req.body.about ,
AboutContent: req.body.aboutcontent, 
Services: req.body.services ,
ServicesContent: req.body.servicescontent,
WhyUs: req.body.whyus ,
WhyUsContent: req.body.whyuscontent,
ContactUs: req.body.contactusonlyaddress , 
Address: req.body.address , 
PhoneNumber: req.body.phonenumber ,
SocialMedia: req.body.socialmedia,
SocialMediaLink: req.body.socialmedialink ,
Policy: req.body.policy ,
PolicyContent: req.body.policycontent,
TermsAndConditions: req.body.termsandconditions ,
TermsAndConditionsContent: req.body.termsandconditionscontent,
CopyRight: req.body.copyright ,
CopyRightContent: req.body.copyrightcontent,
Logo: req.body.logo,
//LogoContent: req.body.logocontent,
//External Features
Gallery: req.body.gallery ,
TextContentForGallery: req.body.textcontentforgallery,
UploadContentForGallery: uploadContentForGallery,//req.files.filename,//req.body.uploadcontentforgallery,//uploadContentForGallery,//req.files.filename,//filenameUpload,//uploadContentForGallery,//req.files.filename,//uploadContentForGallery,//req.file.uploadcontentforgallery,
Templates: req.body.templatesfeature ,
TextContentForTemplates: req.body.textcontentfortemplates,
UploadContentForTemplates: uploadContentForTemplates,//req.files.filename,//req.body.uploadcontentfortemplates, //uploadContentForTemplates,//req.files.filename, /*filenameUpload,*///req.files.filename,//uploadContentForGallery,//req.file.uploadcontentfortemplates,
Menu: req.body.menu ,
TextContentForMenu: req.body.textcontentformenu,
//UploadContentForMenu: req.file.uploadcontentformenu 

// Advanced Features
RegisterLogin: req.body.registerlogin,
ContactUsForm: req.body.contactuswithform,
PaymentMethod: req.body.paymentmethod,
BankAccountAndIfsc: req.body.bankaccountandifsc,
EmailId: req.body.emailid,
//Designing Features
WebsiteBackground: req.body.websitebackground,
WebsiteBackgroundColor: req.body.backgroundcolor,
//WebsiteBackgroundImage: req.body.backgroundimage,
TextColor: req.body.textcolor,
//
/*
//UploadFilesNames: uploadedFilesName,

//AboutContent: aboutContentImageName,

//ServicesContent: req.file.servicescontentfile, 

//WhyUsContent: req.file.whyuscontentfile,




BackgroundColor: req.body.backgroundcolor ,
TextColor: req.body.textcolor ,
LogoByCustomer: req.body.logobycustomer , 


TemplatesTextContent: req.body.templatefeaturetextcontent ,
TemplatesUploadContent: req.body.templatefeaturecontentfiles ,

MenuContent: req.body.menucontent ,
TextColor: req.body.textcolor ,
RegisterLogin: req.body.registerlogin ,
ContactUsForm: req.body.contactuswithform,
PaymentMethod: req.body.paymentmethod ,
EmailService: req.body.emailservice ,
MessageService: req.body.messageservice ,
DataBase: req.body.database ,
WebsiteBriefDescription: req.body.websitebriefdescription ,
Include: req.body.include ,
DoNotInclude: req.body.donotinclude 
*/
});
cartItemsList.save((err) => {
  if(err) throw err;

  //Send Email
  var output = `
  <h3>Hi, You Have received a new Order</h3>
  <p>
  ${cartItemsList}
  </p>   
`;

// exactly correct one for production
let params = {
// send to list
Destination: {
    ToAddresses: [
        'vipinkmboj211@gmail.com'
    ]
},
Message: {
    Body: {
        Html: {
            Charset: "UTF-8",
            Data: output//"<p>this is test body.</p>"
        },
        Text: {
            Charset: "UTF-8",
            Data: 'Text Message goes here'
        }
    },
    
    Subject: {
        Charset: 'UTF-8',
        Data: "New Order Through Quick Website"
    }
},
Source: 'vipinkmboj21@gmail.com', // must relate to verified SES account
ReplyToAddresses: [
    'vipinkmboj211@gmail.com',
],
};

// this sends the email
ses.sendEmail(params, (err) => {
var loginUser = {
  loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
  loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
  loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

};
if(err) {
  //res.render('signupcustomer', { title: 'frontendwebdeveloper', msg:'Contact Error, Try Again', adminDetails: ''}); 
//throw err;

if(loginUser.loginUserCustomer) {
  res.render('dashboardcustomer', { title: 'Quick Website', msg:'Error Occured, Try Again!', loginUser: loginUser.loginUserCustomer });
} else if(loginUser.loginUserEmployee){
  res.render('dashboardemployees', { title: 'Quick Website', msg:'Error Occured, Try Again!', loginUser: loginUser.loginUserEmployee });
} else if(loginUser.loginUserAdmin) {
  res.render('dashboardadmin', { title: 'Quick Website', msg:'Error Occured, Try Again!', loginUser: loginUser.loginUserAdmin});
} else {
  //res.redirect('index');    
  res.render('index', {title: 'Quick Website', msg: 'Contact Error, Try Again!' });

}  

} else {    

  if(loginUser.loginUserCustomer) {
    res.render('dashboardgetstarted', { title: 'Quick Website', msg: 'Item Added To Cart', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee) {
    res.render('dashboardgetstartedemployee', { title: 'Quick Website', msg: 'Item Added To Cart', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardgetstartedadmin', { title: 'Quick Website', msg: 'Item Added To Cart', loginUser: loginUser.loginUserAdmin });

  } else {
    res.redirect('/');
    //res.render('getstarted', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  //res.render('signupcustomer', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
}
});
//

  
});
//
} else {
  res.redirect('/');
}
  });
/*
  router.post('/', (req, res, next) => {
    var cartItemsList = new cartItemsModel({
      /*
      PizzaRestaurantTemplate: req.body.template ,
      CateringTemplate: req.body.template ,
      ModalRestaurantTemplate: req.body.template ,
      CafeTemplate: req.body.template ,
      PortfolioTemplate: req.body.template ,
      ResumeTemplate: req.body.template ,
      PhotoPortfolioTemplate: req.body.template ,
      NaturePortfolioTemplate: req.body.template ,
      ClothingStoreTemplate: req.body.template ,
      BlogTemplate: req.body.template ,
      FoodBlogTemplate: req.body.template ,
      FashionBlogTemplate: req.body.template ,
    CafeBlogTemplate: req.body.template ,
    TravelBlogTemplate: req.body.template ,
    WeddingInvitationTemplate: req.body.template , 
    WebPageTemplate: req.body.template ,
    ComingSoonTemplate: req.body.template , 
    BandTemplate: req.body.template ,
    PhotoAlbumTemplate: req.body.template ,
    CustomerGivenTemplate: req.body.customertemplate ,
    */
   /*
    TemplateOption: req.body.template,
    CustomerGivenTemplate: req.body.customertemplate,
    Home: req.body.home ,
    About: req.body.about ,
    Services: req.body.services , 
    WhyUs: req.body.whyus ,
    ContactUs: req.body.contactus , 
    Address: req.body.address , 
    PhoneNumber: req.body.phonenumber , 
    SocialMediaLink: req.body.socialmedialink ,
    Policy: req.body.policy ,
    TermsAndConditions: req.body.termsandconditions ,
    CopyRight: req.body.copyright ,
    BackgroundColor: req.body.backgroundcolor ,
    TextColor: req.body.textcolor ,
    LogoByCustomer: req.body.logobycustomer , 
    LogoPurchasing: req.body.logopurchasing ,
    Gallery: req.body.gallery ,
    GalleryContent: req.body.gallerycontent ,
    Templates: req.body.templatesfeature ,
    TemplatesTextContent: req.body.templatesfeaturetextcontent ,
    TemplatesUploadContent: req.body.templatesfeatureuploadcontent ,
    Menu: req.body.menu ,
    MenuContent: req.body.menucontent ,
    TextColor: req.body.textcolor ,
    RegisterLogin: req.body.registerlogin ,
    ContactUsForm: req.body.contactusform ,
    PaymentMethod: req.body.paymentmethod ,
    EmailService: req.body.emailservice ,
    MessageService: req.body.messageservice ,
    DataBase: req.body.database ,
    WebsiteBriefDescription: req.body.websitebriefdescription ,
    Include: req.body.include ,
    DoNotInclude: req.body.donotinclude 

    });
    cartItemsList.save((err) => {
      if(err) throw err;
      /*
      var loginUser = {
        loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
        loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
        loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
    
      };
  if(loginUser.loginUserCustomer) {
    res.render('dashboardwebsite', { title: 'Front End Web Developer', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee){
    res.render('dashboardwebsite', { title: 'Front End Web Developer', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardwebsiteadmin', { title: 'Front End Web Developer', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserAdmin});
  } else {
    //res.redirect('index');
    
    res.render('index', {title: 'Music-Website', msg: 'Message Submitted Successfully, You will be contacted soon. Thanks!' });
  
  }
     */
    /*
  res.render('dashboardgetstarted', {title: 'Quick Website', msg: 'Items Added to Cart' });
    });
    
  });
*/
  module.exports = router;