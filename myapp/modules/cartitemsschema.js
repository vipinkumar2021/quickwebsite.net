var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var cartItemsSchema = new mongoose.Schema({
/*
 PizzaRestaurantTemplate: {
    type: String,
    //required: true
},
CateringTemplate: {
    type: String,
    //required: true
},
ModalRestaurantTemplate: {
    type: String,
    //required: true
},
CafeTemplate: {
    type: String,
    //required: true
},
PortfolioTemplate: {
    type: String,
    //required: true
},
ResumeTemplate: {
    type: String,
    //required: true
},
PhotoPortfolioTemplate: {
    type: String,
    //required: true
},
NaturePortfolioTemplate: {
    type: String,
    //required: true
},
ClothingStoreTemplate: {
    type: String,
    //required: true
},
BlogTemplate: {
    type: String,
    //required: true
},
FoodBlogTemplate: {
    type: String,
    //required: true
},
FashionBlogTemplate: {
    type: String,
    //required: true
},
CafeBlogTemplate: {
    type: String,
    //required: true
},
TravelBlogTemplate: {
    type: String,
    //required: true
},
WeddingInvitationTemplate: {
    type: String,
    //required: true
},
WebPageTemplate: {
    type: String,
    //required: true
},
ComingSoonTemplate: {
    type: String,
    //required: true
},
BandTemplate: {
    type: String,
    //required: true
},
PhotoAlbumTemplate: {
    type: String,
    //required: true
},
*/
Username: {
    type:String
},
TemplateOption: {
    type:String
},
TemplatePrice: {
    type: String
},
CustomerGivenTemplate: {
    type: String,
    //required: true
},
Home: {
    type: String,
    //required: true
},
HomeContent: {
    type: String,
    //required: true
},
About: {
    type: String,
    //required: true
},
AboutContent: {
    type: String,
    //required: true
},
Services: {
    type: String,
    //required: true
},
ServicesContent: {
    type: String,
    //required: true
},
WhyUs: {
    type: String,
    //required: true
},
WhyUsContent: {
    type: String,
    //required: true
},
ContactUs: {
    type: String,
    //required: true
},
Address: {
    type: String,
    //required: true
},
PhoneNumber: {
    type: String,
    //required: true
},
SocialMedia: {
    type: String
},
SocialMediaLink: {
    type: String,
    //required: true
},
Policy: {
    type: String,
    //required: true
},
PolicyContent: {
    type: String,
    //required: true
},
TermsAndConditions: {
    type: String,
    //required: true
},
TermsAndConditionsContent: {
    type: String,
    //required: true
},
CopyRight: {
    type: String,
    //required: true
},
BackgroundColor: {
    type: String,
    //required: true
},
TextColor: {
    type: String,
    //required: true
},
LogoByCustomer: {
    type: String,
    //required: true
},
LogoContentByCustomer: {
    type: String,
    //required: true
},
LogoPurchasing: {
    type: String,
    //required: true
},
Gallery: {
    type: String,
    //required: true
},
GalleryContent: {
    type: String,
    //required: true
},
Templates: {
    type: String,
    //required: true
},
TemplatesTextContent: {
    type: String,
    //required: true
},
TemplatesUploadContent: {
    type: String,
    //required: true
},
Menu: {
    type: String,
    //required: true
},
MenuContent: {
    type: String,
    //required: true
},
RegisterLogin: {
    type: String,
    //required: true
},
ContactUsForm: {
    type: String,
    //required: true
},
PaymentMethod: {
    type: String,
    //required: true
},
PaymentMethodContent: {
    type: String,
    //required: true
},
EmailService: {
    type: String,
    //required: true
},
MessageService: {
    type: String,
    //required: true
},
DataBase: {
    type: String,
    //required: true
},
WebsiteBriefDescription: {
    type: String,
    //required: true
},
Include: {
    type: String,
    //required: true
},
DoNotInclude: {
    type: String,
    //required: true
},
Date: {
    type: Date,
    default: Date.now
}
});

var cartItemsModel = mongoose.model('cartitems', cartItemsSchema);
module.exports = cartItemsModel;
