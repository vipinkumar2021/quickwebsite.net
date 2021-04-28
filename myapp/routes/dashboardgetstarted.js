/*var express = require('express');
var router = express.Router();


module.exports = router;

*/

var express = require('express');
  var router = express.Router();
  var cartItemsModel = require("../modules/cartitemsschema");
  
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
    res.render('dashboardgetstarted', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardgetstarted', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin });

  } else {
    res.render('getstarted', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  //res.render('dashboardgetstarted', { title: 'Quick Website'});
});


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
  res.render('dashboardgetstarted', {title: 'Quick Website', msg: 'Items Added to Cart' });
    });
    
  });

  module.exports = router;