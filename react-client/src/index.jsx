import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loadedAuctions: [],
      auctions: [],
      savedAuctions: {}
    }
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.addToSaved = this.addToSaved.bind(this);
    this.updateDisplayedAuctions = this.updateDisplayedAuctions.bind(this);
    this.getSavedAuctions = this.getSavedAuctions.bind(this);
  }

  updateDisplayedAuctions(auctions) {
    // console.log('update func auctions: ', auctions);
    this.setState({auctions: auctions});
  }

  componentDidMount() {
    this.getSavedAuctions();
  }

  getSavedAuctions() {
    $.ajax({
      url: '/auctions', 
      success: (auction10andAll) => {
        var recent10Auctions = auction10andAll[0];
        var allSavedAuctionIds = {};
        auction10andAll[1].forEach(auction => {
          allSavedAuctionIds[auction.itemId] = true;
        });
        this.setState({
          auctions: recent10Auctions,
          loadedAuctions: recent10Auctions,
          savedAuctions: allSavedAuctionIds
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  addToSaved(auction) {
    console.log('Saved auction!');
    var newItem = {};
    newItem[auction.itemId] = true;        
    var newSavedAuctions = $.extend({}, this.state.savedAuctions, newItem);
    this.setState({
      savedAuctions: newSavedAuctions
    }); 
  }

  handleSaveClick(auction) {
    var jsonData = JSON.stringify(auction);
    $.ajax({
      type: 'POST',      
      url: '/auctions',
      contentType: 'application/json',
      data: jsonData,
      processData: false,
      success: (data) => {
        console.log('Sent POST to /auctions');
        this.addToSaved(auction);
      },
      error: (err) => {
        console.log('Error sending POST to /auctions:\n', err);
      }
    });    
  }
  
  render () {
    return (<div>
      <div className="app-title"><img src="gavel.png" className="logo"/>auction historian</div>
      <hr style={{margin: "40px 0 30px 0"}}/>
      <List auctions={this.state.auctions} 
            loadedAuctions={this.state.loadedAuctions}
            savedAuctions={this.state.savedAuctions}  
            getSavedAuctions={this.getSavedAuctions}
            handleSaveClick={this.handleSaveClick}
            updateDisplayedAuctions={this.updateDisplayedAuctions}/>
    </div>)
  }
}



var sampleData = [
  {
    "itemId":["112633164758"],
    "title":["EDDIE BO That Certain Someone NEW ORLEANS SOUL FUNK 45 Scram *hear*"],
    "globalId":["EBAY-US"],
    "primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],
    "galleryURL":["http:\/\/thumbs3.ebaystatic.com\/m\/mUNzkU0LXRW8Pni9GBFAXSg\/140.jpg"],
    "viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-Certain-Someone-NEW-ORLEANS-SOUL-FUNK-45-Scram-hear-\/112633164758"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["70119"],"location":["New Orleans,LA,USA"],
    "country":["US"],
    "shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"4.0"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["2"]}],
    "sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"14.99"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"14.99"}],"bidCount":["1"],"sellingState":["Active"],"timeLeft":["P2DT0H7M10S"]}],
    "listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-11-07T20:08:42.000Z"],"endTime":["2017-11-12T20:08:42.000Z"],"listingType":["Auction"],"gift":["false"],"watchCount":["14"]}],
    "returnsAccepted":["true"],
    "condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],
    "isMultiVariationListing":["false"],
    "topRatedListing":["false"]
  },
  {"itemId":["201847213077"],"title":["EDDIE BO Hook & Sling 7\" NEW VINYL Funky Delicacies New Orleans Funk"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs2.ebaystatic.com\/m\/m8in3s8usGKSTjLNf1jV5Hw\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-Hook-Sling-7-NEW-VINYL-Funky-Delicacies-New-Orleans-Funk-\/201847213077"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["59801"],"location":["Missoula,MT,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"3.99"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["true"],"oneDayShippingAvailable":["false"],"handlingTime":["1"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"9.99"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"9.99"}],"sellingState":["Active"],"timeLeft":["P24DT6H3M36S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-03-10T02:05:08.000Z"],"endTime":["2017-12-05T02:05:08.000Z"],"listingType":["FixedPrice"],"gift":["false"],"watchCount":["5"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["1000"],"conditionDisplayName":["New"]}],"isMultiVariationListing":["false"],"topRatedListing":["true"]
  },
  {"itemId":["322862984616"],"title":["Funk Breaks 45 EDDIE BO Hook And Sling SCRAM HEAR"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs1.ebaystatic.com\/m\/mvqdDT8Pr1p0sp6kNNwFRBw\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/Funk-Breaks-45-EDDIE-BO-Hook-And-Sling-SCRAM-HEAR-\/322862984616"],"paymentMethod":["PayPal","VisaMC","AmEx","Discover"],"autoPay":["false"],"postalCode":["63114"],"location":["Saint Louis,MO,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"4.0"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["true"],"oneDayShippingAvailable":["false"],"handlingTime":["1"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"8.0"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"8.0"}],"bidCount":["1"],"sellingState":["Active"],"timeLeft":["P2DT6H42M35S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-11-06T02:44:07.000Z"],"endTime":["2017-11-13T02:44:07.000Z"],"listingType":["Auction"],"gift":["false"],"watchCount":["5"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["true"]
  },
  {"itemId":["142569925253"],"title":["Eddie Bo, I'm So Tired, Ace # 515, vg-"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs2.ebaystatic.com\/m\/m0E35Z-oJUJg_k_iH7HkXEw\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/Eddie-Bo-Im-So-Tired-Ace-515-vg-\/142569925253"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["07719"],"location":["Belmar,NJ,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"4.0"}],"shippingType":["FlatDomesticCalculatedInternational"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["2"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"5.0"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"5.0"}],"bidCount":["0"],"sellingState":["Active"],"timeLeft":["P1DT18H49M38S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-11-07T14:51:10.000Z"],"endTime":["2017-11-12T14:51:10.000Z"],"listingType":["Auction"],"gift":["false"],"watchCount":["1"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  },
  {"itemId":["112632911125"],"title":["EDDIE BO Every Dog Got His Day NEW ORLEANS R&B SOUL 45 *hear*"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs2.ebaystatic.com\/m\/mhODKQdU9HHkKK3ro8UslnA\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-Every-Dog-Got-His-Day-NEW-ORLEANS-R-B-SOUL-45-hear-\/112632911125"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["70119"],"location":["New Orleans,LA,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"4.0"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["2"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"14.99"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"14.99"}],"bidCount":["0"],"sellingState":["Active"],"timeLeft":["P1DT19H59M46S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-11-07T16:01:18.000Z"],"endTime":["2017-11-12T16:01:18.000Z"],"listingType":["Auction"],"gift":["false"],"watchCount":["3"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  },
  {"itemId":["232551554283"],"title":["Curley Moore Kool Ones 45 Shelley's Rubber Band HOUSE OF THE FOX funk EDDIE BO"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs4.ebaystatic.com\/m\/m73GR6fQ2aLrg35Y8K2A4tg\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/Curley-Moore-Kool-Ones-45-Shelleys-Rubber-Band-HOUSE-FOX-funk-EDDIE-BO-\/232551554283"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["87047"],"location":["Sandia Park,NM,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"3.0"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["1"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"9.99"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"9.99"}],"bidCount":["0"],"sellingState":["Active"],"timeLeft":["P2DT9H47M29S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-11-08T05:49:01.000Z"],"endTime":["2017-11-13T05:49:01.000Z"],"listingType":["Auction"],"gift":["false"],"watchCount":["4"]}],"returnsAccepted":["false"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  },
  {"itemId":["152777936479"],"title":["Rare EDDIE BO I Cry Oh\/My Heart Was Meant For You Blues Soul R&B"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs4.ebaystatic.com\/m\/mazzWitGxT37S6kXrDz8Hmg\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/Rare-EDDIE-BO-Cry-Oh-My-Heart-Meant-You-Blues-Soul-R-B-\/152777936479"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["39667"],"location":["Tylertown,MS,USA"],"country":["US"],"shippingInfo":[{"shippingType":["Calculated"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["3"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"9.99"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"9.99"}],"bidCount":["0"],"sellingState":["Active"],"timeLeft":["P7DT4H17M29S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-11-08T00:19:01.000Z"],"endTime":["2017-11-18T00:19:01.000Z"],"listingType":["Auction"],"gift":["false"],"watchCount":["1"]}],"returnsAccepted":["false"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  },
  {"itemId":["152612907162"],"title":["EDDIE BO Every Dog Got His Day on RIC R&B 45 Hear"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs3.ebaystatic.com\/m\/mcyZ8JB_j-O01-nhLKzL-ww\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-Every-Dog-Got-His-Day-RIC-R-B-45-Hear-\/152612907162"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["45213"],"location":["Cincinnati,OH,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"4.0"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["2"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"20.0"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"20.0"}],"sellingState":["Active"],"timeLeft":["P21DT22H6M38S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-07-05T18:08:10.000Z"],"endTime":["2017-12-02T18:08:10.000Z"],"listingType":["FixedPrice"],"gift":["false"],"watchCount":["4"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  },
  {"itemId":["151198537941"],"title":["EDDIE BO - \"PLEASE FORGIVE ME\" b\/w \"I'LL BE SATISFIED\" on APOLLO (M-) "],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs2.ebaystatic.com\/m\/mkzS6KtE6reW06lK3RfxcRA\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-PLEASE-FORGIVE-ME-b-w-ILL-SATISFIED-APOLLO-M-\/151198537941"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["70003"],"location":["Metairie,LA,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"3.5"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["1"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"75.0"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"75.0"}],"sellingState":["Active"],"timeLeft":["P27DT0H6M45S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2013-12-28T20:08:17.000Z"],"endTime":["2017-12-07T20:08:17.000Z"],"listingType":["StoreInventory"],"gift":["false"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  },
  {"itemId":["150885452198"],"title":["EDDIE BO - \"YOU'RE THE ONLY\"  b\/w \"YOU'RE WITH ME\" on RIP (VG++)"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs3.ebaystatic.com\/m\/m8Cq2omDHsSx_Z1NvMubn1g\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-YOURE-ONLY-b-w-YOURE-ME-RIP-VG-\/150885452198"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["70003"],"location":["Metairie,LA,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"3.5"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["1"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"30.0"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"30.0"}],"sellingState":["Active"],"timeLeft":["P14DT1H52M42S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2012-08-22T21:54:14.000Z"],"endTime":["2017-11-24T21:54:14.000Z"],"listingType":["StoreInventory"],"gift":["false"],"watchCount":["5"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  }
];

ReactDOM.render(<App />, document.getElementById('app'));