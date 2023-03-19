$.mobile.allowCrossDomainPages = true;
_debug = false;

var popUp;
var city_id='';
var category_id='';

var gallery_cat='';
var galstr='';
var player_cat='';
var fix_cat='';

var reg_id="";
var backstore ="";
var lastattemptpage='';
var foodtype='';

var json_fb='https://taghash.co/mloyalApps/facebookarvinddairy.php';
var RSS_twitter='https://taghash.co/mloyalApps/twitter.php?uname=arvinddairyhome';
var RSS_pinterest='http://103.25.128.61/projects/taghash/mloyalApps/pinteresttantra.php?brand=arvinddairy';
var RSS_instagram='https://www.instagram.com/arvinddairy/?__a=1';
var RSS_youtube='http://xceedfbapps.com/mloyalfeeds/youtube.php?brandname=arvinddairy';
var RSS_tumblr='http://xceedfbapps.com/mloyalfeeds/tumblr.php?brandurl=http://arvinddairy.tumblr.com';

var brandname='vijayadairy';
var aboutus_det='vijayadairy';
var brand_url='https://www.vijayadairy.com/';
var cart = { cartdata: []};
var indexary=new Array();
var ids = [];
var cityarr=new Array();
var cityidarr=new Array();

user = {
	"balance" : 0,
	"firstname" : "",
	"id" : "",
	"lastname" : "",
	"total" : 0,
	"validity" : "",
	"mobile" : "",
	"store_code_gd" : "",
	"email":"",
	"dob":"",
	"membership_slab":"",
	"pincode":"",
	"city":"",
	"cattype_ad":""
};

var SERVER = "https://vijayadairy.mloyalretail.com/m/";
var SERVER1 = "https://vijayadairy.mloyalretail.com/";
var SERVER2 = "https://vijayadairy.mloyalretail.com/APIs/";
var SERVER3 = 'https://vijayadairy.mloyalretail.com/Rewards/';

var gbrd ='E6F85649-20A0-4DD5-A9DC-E78699931692';


var SERVER_m = "https://mliveshare.com/"; 
var SERVER1_m = "https://mliveshare.com/user/";
var BITLYS = "https://mliveshare.com/";
var versionurl  ='https://taghash.co/';
var versionurl1  ='https://taghash.co/';

//var shopcmsurl = 'https://taghash.co/mloyalshops/specialty/';
//var shopcmsurl = 'http://180.179.198.149:8086/https://taghash.co/mloyalshops/vijayadairy/';
var shopcmsurl = 'https://taghash.co/mloyalshops/vijayadairy/';


       
$(document).ready(function(event){


			
                $( function() {
					 $("#popupNested1").enhanceWithin().popup();
				});

                $("#wait").css("display","none"); // hide it initially
				
                 $(document).ajaxStart(function() {
                       $("#wait").css("display","block");
                    });
				  
                 $(document).ajaxStop(function() {
                       $("#wait").css("display","none");
                    });

				 localStorage.setItem('selectedstorearvinddairy',gbrd);
				 localStorage.setItem('deliverytypearvinddairy','delivery');
				 

				 document.addEventListener("backbutton", function(e){
						if($.mobile.activePage.is('#myaccount')){
							navigator.app.exitApp();
						}
			   if($.mobile.activePage.is('#homepage')){
				   e.preventDefault();
				   var x;
					if (confirm("Are you sure you want to exit?") == true) {
						x = "Yes";
						navigator.app.exitApp();
					} else {
						x = "No";
					}
				   
			   }
			   else {

				   navigator.app.backHistory();
			   }
			}, false);
			
                 //$.mobile.changePage( "#selectcategorypage", { transition: "none"} );
});



 function forget_pswd()
 {

	 var mob = $('#forgot_mobile').val();
	 
	 if(mob=='')
	 {
		 toast('Please enter your mobile number');
	 }
	 else if(mob.length==10){
		 //$.mobile.changePage("#login_pg");
		 $.ajax({
			url: SERVER+'forgot_pswd.asp',
			type: 'GET',
			timeout: 30000,
			data: {'mobileno': mob},
			success: function(data, textStatus, xhr) {
			 console.log(data);
			 console.log(textStatus);
			 if(data.toLowerCase()=='success'){
				 //startWatch();
				 console.log("In forgot_pswd.asp");
				 toast('Passcode has been sent to your mobile.Please check your SMS.');
			  
				  localStorage.setItem("SMSMNO",mob);
				 
			      $('#username').val(mob);
				  localStorage.setItem('usernamearvinddairy',mob);
				 
				  $.mobile.changePage("#login_pg");
              }
			  else{
				 toast(mob+' is not registered, please try again.');
				 $('#forgot_mobile').val('');
			 }
                    
			 },
			error: function(xhr, textStatus, errorThrown) {
				   toast('Could not connect to Server, make sure you are connected to Internet');
				}
		});
  }else{
   toast('Please enter 10 digits mobile number');
  }

}

function existingUser_check()
{
	
	 var searchcust = $('#forgot_mobile').val();

	 if(searchcust=='')
	 {
		toast('Please enter your mobile number');
	 }
	 else if(searchcust.length<10 || searchcust.length>10)
	 {
		 toast('Invalid mobile number');
	 }
	 else
	 {
	  

	 $.ajax({
	   url: SERVER2+'get_points_json_api.asp',
	   type: 'GET',
	   timeout: 50000,
		dataType: 'json',
		data: {'apiuid': 'MLOYALAPI','apipswd':'Ml0yalAP!2o14','mobileno': searchcust},
		complete: function(xhr, textStatus) {
	   //called when complete
		},
		success: function(data, textStatus, xhr) {
		    //console.log('JSONDATA'+JSON.stringify(data));
			if(data.data.length>0)
			{
				//toast('User already registered with us');
				forget_pswd();
			}
			else
			{
				toast(data.error);
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			//toast('searchcust:Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
	  });
	  

	 }

}

function setnew_pswd()
{

	 var mob = $('#forgot_mobile').val();
	 var pswd = $('#forgot_pass').val();
	 
	 if(mob=='' || pswd=='')
	 {
		 toast('Please enter your mobile number/password');
	 }
	 else if(mob.length != 10)
	 {
		 toast('Please enter 10 digits mobile number');
	 }
	 else
	 {
		 //$.mobile.changePage("#login_pg");
		 $.ajax({
			url: SERVER+'forgot_pswd.asp',
			type: 'GET',
			timeout: 30000,
			data: {'mobileno': mob, 'pswd': pswd},
			success: function(data, textStatus, xhr) {
			 console.log(data);
			 console.log(textStatus);
			 if(data.toLowerCase()=='success'){
				 //startWatch();
				 console.log("In forgot_pswd.asp");
				 toast('Password set successfully & has been sent to your mobile.Please check your SMS.');
			  
				  localStorage.setItem("SMSMNO",mob);
				 
			      $('#username').val(mob);
				  localStorage.setItem('usernamearvinddairy',mob);
				 
				  $.mobile.changePage("#login_pg");
              }
			  else
			  {
				 toast(mob+' is not registered, please try again.');
				 $('#forgot_mobile').val('');
			  }
                    
			 },
			error: function(xhr, textStatus, errorThrown) {
				   toast('Could not connect to Server, make sure you are connected to Internet');
				}
		});
  }

}


$(document).on('pageinit', '#myaccount', function (event, ui) {

		//receivedEvent('deviceready');

		  
        $(document).on('tap', '#login_button', function (e, ui) {

			
		e.preventDefault();
		e.stopPropagation();
		
		authenticate();

	});
});

$(document).on('pageinit', '#slidepage', function (event, ui) {
         //document.getElementById("slide1img").src=SERVER+'images/apps/splash1.jpg';
		 //document.getElementById("slide2img").src=SERVER+'images/apps/splash2.jpg';
		 //document.getElementById("slide3img").src=SERVER+'images/apps/splash3.jpg';
		
});
function hideloader()
{
	try{
	var pop = document.getElementById('wait');
	if(pop.style.display=='block')
		pop.style.display = 'none';
    }catch(err){}
}

$(document).on('pageshow', '#homepage', function (event, ui) {
    hideloader();
	
	$(".promo_slider").owlCarousel({
		items:1,
		loop:false,
		margin:0,
		autoplay:true,
		nav:false,
		dots:false,
		autoplayTimeout:1800
	})
	$(".promo_slider2").owlCarousel({
		items:1,
		loop:false,
		margin:0,
		autoplay:true,
		nav:false,
		dots:false,
		autoplayTimeout:2400
	})
    
});
$(document).on('pageinit', '#homepage', function (event, ui) {
        
	/*if(user.firstname=='undefined' || user.firstname=='null' || user.firstname==null || user.firstname==''){
		document.getElementById("profilenm").innerHTML= 'Welcome Guest!';
		document.getElementById("profilenm1").innerHTML='Guest';
	}else{
		document.getElementById("profilenm").innerHTML= 'Welcome '+user.firstname+'!';
		document.getElementById("profilepts").innerHTML=user.balance+' Points';
		document.getElementById("profilenm1").innerHTML=user.firstname;
		document.getElementById("profilepts1").innerHTML=user.balance+' Points';
			if(user.membership_slab=='1' || user.membership_slab=='')
            {
               document.getElementById("category_img").src="img/Silver_icon.png";
			   //document.getElementById("profiletype").innerHTML = 'Silver';
            }
            else if(user.membership_slab=='2')
            {
               document.getElementById("category_img").src="img/gold.png";
			   //document.getElementById("profiletype").innerHTML = 'Gold';
            }
            else if(user.membership_slab=='3')
            {
               document.getElementById("category_img").src="img/platinum.png";
			   //document.getElementById("profiletype").innerHTML = 'Platinum';
            }
	}*/
		
});



function authenticate_none()
{

  var uname = $('#username').val();
  var pwd = $('#password_myacc').val();
  
 if(uname=='' || pwd=='')
 {
    toast('Please enter Username/Password');
 }
 else
 {

  $.ajax({
   url: SERVER+'mloyallogin_json.asp',
   type: 'GET',
   timeout: 50000,
    dataType: 'json',
    data: {'username': uname, 'password': pwd},
    complete: function(xhr, textStatus) {
    },
    success: function(data, textStatus, xhr) {
   
	   console.log("success:"+JSON.stringify(data)); 

	   if(data.status=='success')
	   {
		
			//console.log(data);

			  var data = '{"BoothCode":"15483","BoothMobile":"","InvNo":"336159","InvDate":"19-01-2022","InvAmt":"2006.000000000","Shift":"AM","RouteCode":"78","PType":"Products"},{"BoothCode":"9931","BoothMobile":"9966532880","InvNo":"336169","InvDate":"19-01-2022","InvAmt":"7962.000000000","Shift":"AM","RouteCode":"82","PType":"Products"}';

			  var str = '';

			  for (var i = 0; i < data.length; i++)
			  {

				str+='<div class="cart_check mt-40">'+
					 '<div class="cart_inner">'+
					 '<div class="inner_text">Booth Code:</div>'+
					 '<div class="inner_price">'+data[i].BoothCode+'</div>'+
					 '</div></div>';
				str+='<div class="cart_check">'+
					 '<div class="cart_inner">'+
					 '<div class="inner_text">Mobile:</div>'+
					 '<div class="inner_price">'+data[i].BoothMobile+'</div>'+
					 '</div></div>';
				str+='<div class="cart_check">'+
					 '<div class="cart_inner">'+
					 '<div class="inner_text">Inv No:</div>'+
					 '<div class="inner_price">'+data[i].InvNo+'</div>'+
					 '</div></div>';
				str+='<div class="cart_check">'+
					 '<div class="cart_inner">'+
					 '<div class="inner_text">InvDate:</div>'+
					 '<div class="inner_price"><input type="date" id="invdate'+i+'" value="'+data[i].InvDate+'" /></div>'+
					 '</div></div>';
				str+='<div class="cart_check">'+
					 '<div class="cart_inner">'+
					 '<div class="inner_text">Shift:</div>'+
					 '<div class="inner_price"><select name="shift_type'+i+'" id="shift_type'+i+'"><option value="AM">AM</option><option value="PM">PM</option></select></div>'+
					 '</div></div>';

				str+='<div class="text-center mt-20">'+
				     '<a href="javascript:getQR(\''+data[i].BoothCode+'\',\''+data[i].InvNo+'\',\''+i+'\',\''+data[i].InvAmt+'\');" data-role="none" class="cartpage_btn">PROCEED</a>'+
			         '</div>';

              }

			  document.getElementById("boothdiv").innerHTML=str;

			  $.mobile.changePage("#boothhomepage");
	   }
	   else
	   {
			 toast('Authentication failed');
			 $.mobile.changePage( "#login_pg", { transition: "flip"} );
	   }
	
    },
    error: function(xhr, textStatus, errorThrown) {
	
   
    }
  });
 }
}

function authenticate()
{

  var uname = $('#username').val();
  var pwd = $('#password_myacc').val();
  var phno = localStorage.getItem("phno");
    console.log("uname:"+uname);
    console.log("pwd:"+pwd);
  if(phno=='')
		JSON.stringify(phonenos);
  else
	phno='';
 if(uname=='' || pwd==''){
  toast('Please enter Mobile Number /Password');
 }
 else{
  $.ajax({
   url: SERVER+'mloyallogin_json.asp',
   type: 'GET',
   timeout: 50000,
    dataType: 'json',
    data: {'username': uname, 'password': pwd,'phonenos':phno},
    complete: function(xhr, textStatus) {
    },
    success: function(data, textStatus, xhr) {
   
	console.log("success"+JSON.stringify(data));
   if(data.status=='success'){
    user.balance = data.balance;
    user.firstname = data.firstname;
    user.id = data.id;
    user.lastname = data.lastname;
    user.total = data.total;
    user.validity = data.validity;
    user.mobile = uname;
	user.trans_sms = data.trans_sms;
	user.mktgsms = data.mktgsms;
	user.cpns = data.cpns;
    user.ads = data.ads;
    user.dob = data.dob;
    user.emailid = data.emailid;
	user.store_code_gd = data.storecode;
	user.def_store = data.store;
	user.def_city = data.store_city;
	user.visit_frequency = data.visit_frequency;
	user.membership_slab = data.slabid;
	//user.cattype_ad = data.cust_type;

	if(user.cpns==null || user.cpns=='null' || user.cpns=='undefined')
		user.cpns='0';

	//console.log("firstname:"+user.firstname);
    
    $('#username').val('');
    $('#password_myacc').val('');
  
   localStorage.setItem('usernamearvinddairy',uname);
   localStorage.setItem('passwordarvinddairy',pwd);
   localStorage.setItem('balance',user.balance);
   localStorage.setItem('firstname',user.firstname);
   localStorage.setItem('lastname',user.lastname);
   localStorage.setItem('id',user.id);
   localStorage.setItem('total',user.total);
   localStorage.setItem('validity',user.validity);
   localStorage.setItem('trans_sms',user.trans_sms);
   localStorage.setItem('mktgsms',user.mktgsms);
   localStorage.setItem('cpns',user.cpns);
   localStorage.setItem('ads',user.ads);
   localStorage.setItem('dob',user.dob);
   localStorage.setItem('emailid',user.emailid);
   localStorage.setItem('def_store',user.def_store);
   localStorage.setItem('def_city',user.def_city);
   localStorage.setItem('visit_frequency',user.visit_frequency);
   localStorage.setItem('membership_slab',user.membership_slab);
   // localStorage.setItem('passworddd',pwd);

	 if(user.firstname=='undefined' || user.firstname=='null' || user.firstname==null)
			user.firstname = '';
	 if(user.lastname=='undefined' || user.lastname=='null' || user.lastname==null)
			user.lastname = '';
	 if(user.emailid=='undefined' || user.emailid=='null' || user.emailid==null)
			 user.emailid = '';
	 if(user.dob=='undefined' || user.dob=='null' || user.dob==null)
			 user.dob = '';
	 if(user.mobile=='undefined' || user.mobile=='null' || user.mobile==null)
			user.mobile = '';
	 if(user.store_code_gd=='undefined' || user.store_code_gd=='null' || user.store_code_gd==null)
			user.store_code_gd = 'HO-001';

	$('#update_firstname').val(user.firstname);
	$('#update_lastname').val(user.lastname);

	    var dob = user.dob.split('-');
		var mm = dob.length == 3 ? dob[1] : '';
		var dd = dob.length == 3 ? dob[0] : '';
		var yyyy = dob.length == 3 ? dob[2] : '';
		
	/*$('#update_dd').val(dd);
	$('#update_mm').val(mm);
	$('#update_yyyy').val(yyyy);
	$('#update_dob').val(user.dob);*/

	$('#update_email').val(user.emailid);
	

     //$('#push_reg_no').val(reg_id);

	
	document.getElementById("profilenm").innerHTML= user.firstname+' '+user.lastname;
	document.getElementById("trans_nm").innerHTML= user.firstname+' '+user.lastname;
	//document.getElementById("profilepts").innerHTML=user.total;
	document.getElementById("profilenm1").innerHTML=user.firstname;
	//document.getElementById("profilenm_mloyal").innerHTML=user.firstname+' '+user.lastname;
    document.getElementById("profilepts1").innerHTML=user.total;
	document.getElementById("trans_pts").innerHTML=user.total;



	var existmemtype = data.cust_type;
	if(typeof existmemtype == undefined || existmemtype == null || existmemtype == 'null')
		existmemtype = '';
	if((existmemtype != '') && (existmemtype != localStorage.getItem('cattype_ad')))
	{
		toast('You are already registered as '+existmemtype);
		$.mobile.changePage( "#selectcategorypage", { transition: "flip"} );
	}
	else
	{
		if(user.firstname=='undefined' || user.firstname=='null' || user.firstname==null || user.firstname=='')
		{
			 $.mobile.changePage( "#profilepage", { transition: "flip"} );
		}
		else
		{
			if(localStorage.getItem("profiledone_arvinddairy"))
			{
				//document.getElementById("profilepts").innerHTML=user.balance;
				if(user.firstname=='undefined' || user.firstname=='null' || user.firstname==null || user.firstname=='')
				{
					document.getElementById("profilenm").innerHTML = 'Guest';
					document.getElementById("profilenm1").innerHTML= 'Guest';
					document.getElementById("trans_nm").innerHTML= 'Guest';
					//document.getElementById("profilenm_mloyal").innerHTML= 'Guest';
				}
				else
				{
					document.getElementById("profilenm").innerHTML= user.firstname+' '+user.lastname;
					document.getElementById("trans_nm").innerHTML= user.firstname+' '+user.lastname;
					//document.getElementById("profilepts").innerHTML=user.balance;
					document.getElementById("profilenm1").innerHTML=user.firstname;
					//document.getElementById("profilenm_mloyal").innerHTML=user.firstname+' '+user.lastname;
					document.getElementById("profilepts1").innerHTML=user.balance;
					document.getElementById("trans_pts").innerHTML=user.balance;
						
				}

				 $.mobile.changePage( "#homepage", { transition: "flip"} );

			}
			else
				$.mobile.changePage( "#profilepage", { transition: "flip"} );
		}
	}



   }
   else{
		  toast('Authentication failed');
		  $.mobile.changePage( "#login_pg", { transition: "flip"} );
   }
	
    },
    error: function(xhr, textStatus, errorThrown) {
	user.mobile = localStorage.getItem('usernamearvinddairy');
	pwd = localStorage.getItem('passwordarvinddairy');
	uname = user.mobile;
    user.balance = localStorage.getItem('balance');
    user.firstname = localStorage.getItem('firstname');
    user.lastname = localStorage.getItem('lastname');
    user.id = localStorage.getItem('id');
    user.total = localStorage.getItem('total');
    user.validity = localStorage.getItem('validity');
    user.trans_sms = localStorage.getItem('trans_sms');
    user.mktgsms = localStorage.getItem('mktgsms');
    user.cpns = localStorage.getItem('cpns');
    user.ads = localStorage.getItem('ads');
    user.dob = localStorage.getItem('dob');
    user.emailid = localStorage.getItem('emailid');
	user.store_code_gd = localStorage.getItem('store_code_gd');
    user.def_store = localStorage.getItem('def_store');
    user.def_city = localStorage.getItem('def_city');
	user.visit_frequency = localStorage.getItem('visit_frequency');
    /*document.getElementById("pr_name").innerHTML=user.firstname+' '+user.lastname;
	document.getElementById("pr_id").innerHTML=user.id;
	document.getElementById("pr_dob").innerHTML=user.dob;
	document.getElementById("pr_valid").innerHTML=user.validity;*/
	if(localStorage.getItem("imagedata")!=null)
	   {
		document.getElementById("cardImagemenu").src = localStorage.getItem("imagedata");
		//document.getElementById("cardImagepunch").src = localStorage.getItem("imagedata");
		
	   }
	if(localStorage.getItem("cardPic")==null || localStorage.getItem("cardPic")=='null' || localStorage.getItem("cardPic")=='undefined' )
	   {
		//document.getElementById("cardImage").src = 'img/person_img.png';
		//document.getElementById("cardImagepunch").src = 'img/person_img.png';
		
	   }
	else
	   {
		//document.getElementById("cardImage").src = 'http://graph.facebook.com/' + localStorage.getItem("cardPic") + '/picture?type=small';
		//document.getElementById("cardImagepunch").src = 'http://graph.facebook.com/' + localStorage.getItem("cardPic") + '/picture?type=small';
	   }
   
    }
  });
 }
}

function updateProfile()
{
		var firstname = $('#update_firstname').val();
		var lastname = $('#update_lastname').val();
		var mobile = user.mobile;
		var email = $('#update_email').val();

		//var pincode = $('#update_pincode').val();
		var city = $('#update_city').val();

		/*var birthday = $('#update_dob').val();
		var dob = birthday.split('-');
		var mm = dob.length == 3 ? dob[1] : '';
		var dd = dob.length == 3 ? dob[2] : '';
		var yyyy = dob.length == 3 ? dob[0] : '';*/
		//var devid=$('#push_reg_no').val();
		/*var mm = $('#update_mm').val();
		var dd = $('#update_dd').val();
		var yyyy =$('#update_yyyy').val();*/
		
    if(firstname=='' || email=='')
	{
		toast('Please enter mandatory fields.');
	}
	else
	{
    
	 $.ajax({
			url: SERVER+'mloyalprofileupdate.asp',
			type: 'GET',
			timeout: 30000,
		  	data: {
				FirstName: firstname,
				LastName: lastname,
				deviceid: reg_id,
				cname:'',
				Emailid: email,
				mobileno: mobile,
				cust_type: localStorage.getItem('cattype_ad'),
				dd: '',
				mm: '',
				yy: '',
                deviceType: deviceType,
				doaday: '',
				doamonth: '',
				doayear: '',
				city: city
				
			},
			success: function(data, textStatus, xhr) {

				
				localStorage.setItem("profiledone_arvinddairy","Yes");
				
				if (data.indexOf("Success")>=0)
				{
					   
					   
						toast('Your profile has been updated successfully.');
						user.firstname=firstname;
						user.lastname=lastname;
						user.emailid=email;
						//user.dob=dd+"-"+mm+"-"+yyyy;

				}
				else if(data=='Failed')
					toast('Update failed.');
				else
					toast(data);
					

				
	//document.getElementById("profilepts").innerHTML=user.balance;
	if(user.firstname=='undefined' || user.firstname=='null' || user.firstname==null || user.firstname=='')
	{
		document.getElementById("profilenm").innerHTML= 'Guest';
		document.getElementById("profilenm1").innerHTML='Guest';
		document.getElementById("trans_nm").innerHTML= 'Guest';
		//document.getElementById("profilenm_mloyal").innerHTML= 'Guest';
	}
	else
	{
		document.getElementById("profilenm").innerHTML= user.firstname+' '+user.lastname;
		document.getElementById("trans_nm").innerHTML= user.firstname+' '+user.lastname;
		//document.getElementById("profilepts").innerHTML=user.balance;
		document.getElementById("profilenm1").innerHTML=user.firstname;
		//document.getElementById("profilenm_mloyal").innerHTML=user.firstname+' '+user.lastname;
		document.getElementById("profilepts1").innerHTML=user.balance;
		document.getElementById("trans_pts").innerHTML=user.balance;
	}
				
				
		$.mobile.changePage( "#homepage", {transition: "flip"} );
		         
				
				
			},
			error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet');
			}
		});
		
  }
		
}

$(document).on('pageinit', '#profilepage_fb', function (event, ui) {

	    console.log("in profilepage");
	
		$(document).on('tap', '#update_button_fb', function (e, ui) {

			
		e.preventDefault();
		e.stopPropagation();
		var firstname = $('#update_firstname_fb').val();
		var lastname = $('#update_lastname_fb').val();
		var mobile = user.mobile;
		var email = $('#update_email_fb').val();
		var mm;
		var dd;
		var yyyy;
		if(user.dob!=null || user.dob !='null')
			{
		var birthday = $('#update_dob_fb1').val();
		var dob = birthday.split('-');
		mm = dob.length == 3 ? dob[1] : '';
		dd = dob.length == 3 ? dob[0] : '';
		yyyy = dob.length == 3 ? dob[2] : '';
			}
		else
			{
			mm = $('#update_mm1').val();
		    dd = $('#update_dd1').val();
		    yyyy =$('#update_yyyy1').val();
			}

    
	$.ajax({
			url: SERVER+'mloyalprofileupdate.asp',
			type: 'GET',
			timeout: 30000,
		  	data: {
				FirstName: firstname,
				LastName: lastname,
				deviceid:reg_id,
				cname:'',
				Emailid: email,
				mobileno: mobile,
				dd: dd,
				mm: mm,
				yy: yyyy,
                deviceType:deviceType
				//subscribe: bc_hair
				
			},
			success: function(data, textStatus, xhr) {

				console.log("Anoop"+data);
				
				 
				
				if (data.indexOf("Success")>=0)
				{
					   
					   
						$('#update_response_msg_fb').html('Your profile has been updated successfully.');
						user.firstname=firstname;
						user.lastname=lastname;
						user.emailid=email;
						user.dob=dd+"-"+mm+"-"+yyyy;

				}
				else if(data=='Failed')
					$('#update_response_msg_fb').html('Update failed.');
				else
					$('#update_response_msg_fb').html(data);
					

					//showHome();
					//document.getElementById("profilepts").innerHTML=user.balance;
	if(user.firstname=='undefined' || user.firstname=='null' || user.firstname==null || user.firstname==''){
		document.getElementById("profilenm").innerHTML= 'Welcome Guest!';
		document.getElementById("profilenm1").innerHTML='Guest';
	}else{
		document.getElementById("profilenm").innerHTML= 'Welcome '+user.firstname+'!';
		document.getElementById("profilepts").innerHTML=user.balance+' Points';
		document.getElementById("profilenm1").innerHTML=user.firstname;
		document.getElementById("profilepts1").innerHTML=user.balance+' Points';
		if(parseInt(user.balance)<=10000){
			document.getElementById("category_img").src="img/Silver_icon.png";
		}
		else if(parseInt(user.balance)<=20000){
			document.getElementById("category_img").src="img/gold.png";
		}
		else{
			document.getElementById("category_img").src="img/platinum.png";
		}
	}
                $.mobile.changePage( "#homepage", {transition: "flip"} );
		        
			},
			error: function(xhr, textStatus, errorThrown) {
				$('#login-msg').html('Could not connect to Server, make sure you are connected to Internet');
			}
		});
		
		
	});
	if($('#update_firstname_fb').val()=='' || $('#update_firstname_fb').val()=='null' || $('#update_firstname_fb').val()==null || $('#update_firstname_fb').val()=='undefined')
	{
		        $('#update_firstname_fb').val(user.firstname);
	            $('#update_lastname_fb').val(user.lastname);
	
	            $('#update_email_fb').val(user.emailid);
				try{
				if(user.dob!=null || user.dob!='null' || user.dob==' ')
					{
					$('#updt_1').css('display','none');
	                $('#update_dob_fb1').val(user.dob);
                    $('#updt_2').css('display','block');
					}
					else
					{
					$('#updt_2').css('display','none');
	               // $('#update_dob_fb1').val(user.dob);
                    $('#updt_1').css('display','block');
					}
				}catch(err)
		        {
					txt="There was an error on this page.\n\n"; 
					txt+="Error description: " + err.message + "\n\n"; 
					alert(txt);
				}
	}
	});





$(document).on('pageinit', '#profile', function (event, ui) {

	    //console.log("in profilepage");
		
	
		$(document).on('tap', '#update_button1', function (e, ui) {

			
		e.preventDefault();
		e.stopPropagation();
		var firstname = $('#update_firstname1').val();
		var lastname = $('#update_lastname1').val();
		var mobile = user.mobile;
		var email = $('#update_email1').val();
		var birthday = $('#update_dob1').val();
		var dob = birthday.split('-');
		var mm = dob.length == 3 ? dob[1] : '';
		var dd = dob.length == 3 ? dob[2] : '';
		var yyyy = dob.length == 3 ? dob[0] : '';
		//var devid=$('#push_reg_no').val();
		

		
    
	$.ajax({
			url: SERVER+'mloyalprofileupdate.asp',
			type: 'GET',
			timeout: 30000,
		  	data: {
				FirstName: firstname,
				LastName: lastname,
				deviceid:reg_id,
				cname:'',
				Emailid: email,
				mobileno: mobile,
				dd: dd,
				mm: mm,
				yy: yyyy,
                deviceType:deviceType
				//subscribe: bc_hair
				
			},
			success: function(data, textStatus, xhr) {

				//console.log("Anoop"+url);
				
				
				
				if (data.indexOf("Success")>=0)
				{
					   
					   
						$('#update_response_msg1').html('Your profile has been updated successfully.');
						user.firstname=firstname;
						user.lastname=lastname;
						user.emailid=email;
						//user.dob=mm+"-"+dd+"-"yyyy;

				}
				else if(data=='Failed')
					$('#update_response_msg1').html('Update failed.');
				else
					$('#update_response_msg1').html(data);
					


				//document.getElementById("profilepts").innerHTML=user.balance;
	if(user.firstname=='undefined' || user.firstname=='null' || user.firstname==null || user.firstname==''){
		document.getElementById("profilenm").innerHTML= 'Welcome Guest!';
		document.getElementById("profilenm1").innerHTML='Guest';
	}else{
		document.getElementById("profilenm").innerHTML= 'Welcome '+user.firstname+'!';
		document.getElementById("profilepts").innerHTML=user.balance+' Points';
		document.getElementById("profilenm1").innerHTML=user.firstname;
		document.getElementById("profilepts1").innerHTML=user.balance+' Points';
		if(parseInt(user.balance)<=10000){
			document.getElementById("category_img").src="img/Silver_icon.png";
		}
		else if(parseInt(user.balance)<=20000){
			document.getElementById("category_img").src="img/gold.png";
		}
		else{
			document.getElementById("category_img").src="img/platinum.png";
		}
	}
				$.mobile.changePage( "#homepage", {transition: "flip"} );
               
			},
			error: function(xhr, textStatus, errorThrown) {
				$('#login-msg').html('Could not connect to Server, make sure you are connected to Internet');
			}
		});
		
	});
	});


function aboutprg(){
	

	    $("#navBdr").css('display', 'none');
        $("#navBdr_about").css('display', 'block');
        $("#navBdr_coupon").css('display', 'none');
        $("#navBdr_points").css('display', 'none');

		$("#MESSAGES").css('display', 'none');
		$("#ABOUT").css('display', 'block');
		$("#COUPONS").css('display', 'none');
		$("#POINTS").css('display', 'none');
		renderTemplatedetail('aboutus');
		//document.getElementById("barcontentplist").innerHTML='<img src="img/batch_mem.png" class="batch_mem"><span class="mem_wel_msg">Hi '+user.firstname+'!</span></a>';
        
        $.mobile.changePage( "#mloyalpg", {transition: "flip"} );
  }   

function showInbox(){
	if(user.mobile==null || user.mobile=='')
	{
	$.mobile.changePage( "#myaccount", { transition: "none"} ); 
	}
	else
	{
	//document.getElementById("barcontent").innerHTML='<img src="img/batch_mem.png" class="batch_mem"><span class="mem_wel_msg">Hi '+user.firstname+'!</span><span class="submenu_button_right" ><a href="javascript:showCoupons();"><div class="couponbx"><span class="age_4">'+user.cpns+' Coupons</span></div><img src="img/sci_coupons.png"/></span></a>';
	//document.getElementById("headername").innerHTML='Messages';
	//var main = document.getElementById("cardcontent");
	//main.style.display = 'none';
	$("#navBdr").css('display', 'block');
    $("#navBdr_about").css('display', 'none');
    $("#navBdr_coupon").css('display', 'none');
    $("#navBdr_points").css('display', 'none');

	$("#MESSAGES").css('display', 'block');
    $("#ABOUT").css('display', 'none');
    $("#COUPONS").css('display', 'none');
    $("#POINTS").css('display', 'none');
   
	$.mobile.changePage( "#mloyalpg", { transition: "none"} ); 
	showTabContent('inbox', 'msg_history_json.asp');
	}
}
function showLoyalty(){
	if(user.mobile==null || user.mobile=='')
	{
	$.mobile.changePage( "#myaccount", { transition: "none"} ); 
	}
	else
	{
	/*document.getElementById("barcontent").innerHTML='<img src="img/batch_mem.png" class="batch_mem"><span class="mem_wel_msg">Hi '+user.firstname+'!</span><span class="submenu_button_right" ><a href="javascript:showCoupons();"><div class="couponbx"><span class="age_4">'+user.cpns+' Coupons</span></div><img src="img/sci_coupons.png"/></span></a>';
	document.getElementById("headername").innerHTML='Points';
	 var main = document.getElementById("cardcontent");
	main.style.display = 'none';*/
	$("#navBdr").css('display', 'none');
    $("#navBdr_about").css('display', 'none');
    $("#navBdr_coupon").css('display', 'none');
    $("#navBdr_points").css('display', 'block');

	$("#MESSAGES").css('display', 'none');
    $("#ABOUT").css('display', 'none');
    $("#COUPONS").css('display', 'none');
    $("#POINTS").css('display', 'block');
    
	$.mobile.changePage( "#mloyalpg", { transition: "none"} ); 
	showTabContent('loyalty', 'points_history_json.asp');
	}
}
function showCoupons(){
	if(user.mobile==null || user.mobile=='')
	{
	$.mobile.changePage( "#myaccount", { transition: "none"} ); 
	}
	else
	{
	/*document.getElementById("barcontent").innerHTML='<img src="img/batch_mem.png" class="batch_mem"><span class="mem_wel_msg">Hi '+user.firstname+'!</span><span class="submenu_button_right" ><a href="javascript:showCoupons();"><div class="couponbx"><span class="age_4">'+user.cpns+' Coupons</span></div><img src="img/sci_coupons.png"/></span></a>';
	document.getElementById("headername").innerHTML='Coupons';
	
	 var main = document.getElementById("cardcontent");
	 main.style.display = 'none';*/
	$("#navBdr").css('display', 'none');
    $("#navBdr_about").css('display', 'none');
    $("#navBdr_coupon").css('display', 'block');
    $("#navBdr_points").css('display', 'none');

	$("#MESSAGES").css('display', 'none');
    $("#ABOUT").css('display', 'none');
    $("#COUPONS").css('display', 'block');
    $("#POINTS").css('display', 'none');
   
	$.mobile.changePage( "#mloyalpg", { transition: "none"} ); 
	showTabContent('coupons', 'cpns_history_json.asp');
	}
}
function showRewards(){
	 
	openInWebView('https://vijayadairy.mloyalretail.com/microsite/');
	//RewardsNA();
	/*
	if(user.mobile==null || user.mobile=='')
	{
	$.mobile.changePage( "#myaccount", { transition: "none"} ); 
	}
	else
	{
	 document.getElementById("barcontent").innerHTML='<img src="img/batch_mem.png" class="batch_mem"><span class="mem_wel_msg">Hi '+user.firstname+'!</span><span><img src="img/pro_btn_star.png" class="mem_acc_icon_rewardstore"></span><span><a href="javascript:showcategories();"><img src="img/menu_icon.png" class="rewardstore_menu"></a></span>';
     document.getElementById("headername").innerHTML='Rewardstore';
	 var main = document.getElementById("cardcontent");
	 main.style.display = 'none';
	$.mobile.changePage( "#page-card", { transition: "none"} ); 
	showTabContent('rewardstore', 'coupons_json.asp');
	
	$("a[data-role='button']").button();
	}*/
}
function showcategories(){

    $.mobile.changePage( "#reward-cat", { transition: "none"} ); 
	showTabContent('reward-cat', 'categories_json.asp');
}
function showcatbrands(catid){
    $.mobile.changePage( "#reward-brand", { transition: "none"} ); 
	showTabContent('reward-brand', 'coupons_json.asp?cat_id='+catid);
}
function viewcart_1(){
	var main = document.getElementById("cardcontent");
	main.style.display = 'none';
	$.mobile.changePage( "#page-card", { transition: "none"} ); 
	  renderTemplate('viewcart',cart);
	  $("a[data-role='button']").button();

	 
}

function showSpecial(){
	
	if(user.mobile==null || user.mobile=='')
	{
		$.mobile.changePage( "#login_pg", { transition: "none"} ); 
	}
	else
	{
		//document.getElementById("barcontentspecials").innerHTML='<img src="img/batch_mem.png" class="batch_mem"><span class="mem_wel_msg">Hi '+user.firstname+'!</span><span class="submenu_button_right" ><a href="javascript:showCoupons();"><div class="couponbx"><span class="age_4">'+user.cpns+' Coupons</span></div><img src="img/sci_coupons.png"/></span></a>';
		$.mobile.changePage( "#specials", { transition: "none"} );
		//document.getElementById("left-panel").panel( "close" );
		try{
		$( "#sidebar" ).panel( "close" );
		}catch(err) 
		{	}
		
		showTabContent('specials', 'specials_json.asp');
	}
	
}

function gobackfromstore()
{
    if(backstore=='home')
    {
        showHome1();
    }
    else if(backstore=='store')
    {
        showStores();
    }
}

function showStores(){
	
	backstore = 'home';
	//document.getElementById("barcontentstores").innerHTML='<img src="img/batch_mem.png" class="batch_mem"><span class="mem_wel_msg">Hi '+user.firstname+'!</span><a href="javascript:getNearStores();"><span class="myacc">Find Nearby</span></a>';
	
	$.mobile.changePage( "#stores", { transition: "none"} );
	
	showTabContent('citylist', 'city_locator_json.asp');


}

function getCityId(id)
{
       city_id=id;
	   backstore = 'store';
	   $.mobile.changePage( "#stores", { transition: "none"} );
	   showTabContent('centre', 'store_locator_json.asp?city='+city_id);
	  
      
}


function showTabContent_Map(addr,ind) {
var url="http://delhidaredevilsadda.com/latlong.php";
 console.log(url+'&addr='+addr);
	$.getJSON(
		url, {
		//page: url,
		addr : addr
	}, function (json) {
       console.log("SSSS"+JSON.stringify(json));
	  
	    
		var lat,lng;
		try
		{
		lat=json.results[0].geometry.location.lat;
		lng=json.results[0].geometry.location.lng;	
		}
		catch (err)
		{
			lat="";
			lng="";
		}
        
		
		if(lat !="" && lng !="")
			{
			 drawMap(new google.maps.LatLng(lat, lng),ind);
			//openInWebView('http://maps.google.com/maps/api/staticmap?center='+lat+','+lng+'&zoom=14&amp;size=304x250&scale=2&amp;sensor=false&markers=color:green|'+lat+','+lng+'&key=AIzaSyCAAjJ5FAg8NmaZ9594yQXq-t1HzcgYocs&size=279x183');
			}
			else
			{
				toast("Location could not be traced");
			}
	}).error(function () {
		alert("Error: Could not connect to Server, make sure you are connected to Network");
	});
}

   function drawMap(latlng,index) {
	   
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
			alert(index);

			var bounds = new google.maps.LatLngBounds();
        var map = new google.maps.Map(document.getElementById(index), myOptions);
        // Add an overlay to the map of current lat/lng
        var pinColor = "FE7569";
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                new google.maps.Size(40, 37),
                new google.maps.Point(0, 0),
                new google.maps.Point(12, 35));



        bounds.extend(latlng);
        var markercurr = new google.maps.Marker({
            position: latlng,
            map: map,
            title: 'Current Position!!!',
            icon: pinImage,
            shadow: pinShadow

        });
        map.fitBounds(bounds);
    }



function showTabContent_Map1(addr) {
var url="http://maps.googleapis.com/maps/api/geocode/json";
	$.getJSON(
		url, {
		//page: url,
		latlng : addr,
		sensor : 'false'
	}, function (json) {
       //console.log("SSSS"+JSON.stringify(json.results[0].address_components[3]));
		
		for(var i=0;i<json.results[0].address_components.length;i++)
		{
		console.log("SSSS"+JSON.stringify(json.results[0].address_components[i].types[0]));
		if(json.results[0].address_components[i].types[0]=='locality')
			{
        var cityname= json.results[0].address_components[i].long_name;
        if(cityarr.indexOf(cityname))
				{
			  var j = cityarr.indexOf(cityname);
			  getCityId(cityidarr[j]);
				}
			}
		}
		
		
		
		
	}).error(function () {
		alert("Error: Could not connect to Server, make sure you are connected to Network");
	});
}

function showTabContent(id, url) {
console.log("url"+url);
var tabserver='';
if(id=='rewardstore' || id=='reward-cat' || id=='reward-brand')
	{
		tabserver = "https://vijayadairy.mloyalretail.com/Rewards/";
	}
else
	{
		tabserver = "https://vijayadairy.mloyalretail.com/m/";
	}
	$.getJSON(
		tabserver+url, {
		//page: url,
		mno : user.mobile
	}, function (json) {
       console.log("SSSS"+JSON.stringify(json));
			
		renderTemplate(id, json);
	}).error(function () {
		alert("Error: Could not connect to Server, make sure you are connected to Network");
	});
}

function openInWebView(url)
	{
	
          //var ref = window.open(url, '_blank', 'location=yes,toolbar=yes');
		  cordova.ThemeableBrowser.open(url, '_blank', {
               backButtonCanClose: true,
    statusbar: {
        color: '#482a1f'
    },
    toolbar: {
        height: 75,
        color: '#482a1f'
    },
    title: {
        color: '#ffffff',
  staticText: '', 
        showPageTitle: false
    },
    backButton: {
        wwwImage: '',
        wwwImagePressed: '',
        align: 'left',
        event: ''
    },
    forwardButton: {
        wwwImage: '',
        wwwImagePressed: '',
        align: 'center',
        event: ''
    },
    closeButton: {
        wwwImage: 'img/leftMenu_back.png',
        wwwImagePressed: 'img/leftMenu_back.png',
        align: 'left',
  marginLeft: '15px',
        event: ''
    },
    customButtons: [
        {
            image: 'share',
            imagePressed: 'share_pressed',
            align: 'right',
            event: 'sharePressed'
        }
    ],
    menu: {
        image: 'menu',
        imagePressed: 'menu_pressed',
        title: 'Test',
        cancel: 'Cancel',
        align: 'right',
        items: [
           /* {
                event: 'helloPressed',
                label: 'Hello World!'
            },
            {
                event: 'testPressed',
                label: 'Test!'
            }*/
        ]
    },
    backButtonCanClose: true
}).addEventListener('backPressed', function(e) {
    //alert('back pressed');
}).addEventListener('helloPressed', function(e) {
    //alert('hello pressed');
}).addEventListener('sharePressed', function(e) {
    //alert(e.url);
}).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
    console.error(e.message);
}).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
    console.log(e.message);
});


	}


function renderTemplate(pageID, json) {
	var str = '';
	var str1 = '';
	var oth = document.getElementById("othercontent");
    var main = document.getElementById("cardcontent");

	console.log('pageID'+pageID);
	switch (pageID) {
	case 'loyalty':
				
		str += '<br/><div class="pts_new"><span>' + json.balance + '</span></div>';   
        str += '<p class="tpts">Total Points</p>';
        str += '<a href="javascript:purchaseHistory();" id="ptsEarn" class="ui-btn ui-corner-all"><img src="assets/images/earned-points.png" alt="img" class="eIcon"><span>Earned Points :' + json.earnpoints + '</span><span class="purchaseBtnTxt">My Purchase History</span></a>';
        str += '<a href="javascript:redeemHistory();" id="ptsRedeem" class="ui-btn ui-corner-all"><img src="assets/images/redeemed-points.png" alt="img" class="rIcon"><span>Redeemed Points :' + json.burnpoints + '</span><span class="purchaseBtnTxt">My Purchase History</span></span></a>';
		str += '<a href="javascript:bonusHistory();" id="ptsBonus" class="ui-btn ui-corner-all"><img src="assets/images/earned-points.png" alt="img" class="rIcon"><span>Bonus Points :' + json.bonuspoints + '</span><span class="purchaseBtnTxt">My Purchase History</span></span></a>';
		str += '<a href="javascript:expireHistory();" id="ptsExpire" class="ui-btn ui-corner-all"><img src="assets/images/redeemed-points.png" alt="img" class="rIcon"><span>Expired Points :' + json.expiredpoints + '</span><span class="purchaseBtnTxt">My Purchase History</span></span></a>';
	
		
		
		str += '<div id="purchaseHistory" style="display:none;">';
		str+='<hr><span class="phist">Purchase History</span><hr>';
		for(var i=0;i<json.data.length;i++)
		{
			str +='<table data-role="none" class="ui-responsive" id="tbl">';
			str +='<caption><span style="float:left;">EARNED POINTS <span class="ptsRed">'+json.data[i].earn+'</span></span>  <span class="cap_date">'+json.data[i].billdate+'</span></caption><tbody>';
			str +='<tr><td>'+(i+1)+'.</td><td>'+json.data[i].billnumber+'</td><td>'+json.data[i].billamount+'</td><td>'+json.data[i].earn+'</td></tr>';
			str +='</tbody></table><br/>';
		}
		str +='</div>';
		
		
		str += '<div id="redeemHistory" style="display:none;">';
		str+='<hr><span class="phist">Redeem History</span><hr>';
        for(var i=0;i<json.data.length;i++)
		{
			str +='<table data-role="none" class="ui-responsive" id="tbl">';
		    str +='<caption><span style="float:left;">REDEEM POINTS <span class="ptsRed">'+json.data[i].burn+'</span></span>  <span class="cap_date">'+json.data[i].billdate+'</span></caption><tbody>';
			str +='<tr><td>'+(i+1)+'.</td><td>'+json.data[i].billnumber+'</td><td>'+json.data[i].billamount+'</td><td>'+json.data[i].burn+'</td></tr>';
			str +='</tbody></table><br/>';
		}
	    str +='</div>';


		str += '<div id="bonusHistory" style="display:none;">';
		str+='<hr><span class="phist">Bonus History</span><hr>';
		for(var i=0;i<json.bonus.length;i++)
		{
			str +='<table data-role="none" class="ui-responsive" id="tbl">';
			str +='<caption><span style="float:left;">BONUS POINTS <span class="ptsRed">'+json.bonus[i].bonuspoints+'</span></span>  <span class="cap_date">'+json.bonus[i].createdon+'</span></caption><tbody>';
			str +='<tr><td>'+(i+1)+'.</td><td>'+json.bonus[i].bonuspoints+'</td><td>'+json.bonus[i].flag+'</td></tr>';
			str +='</tbody></table><br/>';
		}
		str +='</div>';

		str += '<div id="expireHistory" style="display:none;">';
		str+='<hr><span class="phist">Expired History</span><hr>';
		for(var i=0;i<json.expire.length;i++)
		{
			str +='<table data-role="none" class="ui-responsive" id="tbl">';
			str +='<caption><span style="float:left;">EXPIRED POINTS <span class="ptsRed">'+json.expire[i].expirepoints+'</span></span>  <span class="cap_date">'+json.expire[i].createdon+'</span></caption><tbody>';
			str +='<tr><td>'+(i+1)+'.</td><td>'+json.expire[i].expirepoints+'</td><td>'+json.expire[i].flag+'</td></tr>';
			str +='</tbody></table><br/>';
		}
		str +='</div>';

        document.getElementById("points").innerHTML=str;   
		
		
		break;

	case 'loyaltynew':
		
	    str += '<div class="p-3">';
		str += '<div class="pts"><span>' + json.balance + '</span></div>';   
        str += '<p class="tpts">Total Points</p>';

		str += '<a href="javascript:purchaseHistory();" id="ptsEarn" class="ui-btn ui-corner-all"><img src="assets/images/pointredeem.png" alt="img" class="eIcon"><span>Earned Points : ' + json.earnpoints + '</span></a>';
		str += '<a href="javascript:redeemHistory();" id="ptsRedeem" class="ui-btn ui-corner-all"><img src="assets/images/pointredused.png" alt="img" class="eIcon"><span>Redeemed Points : ' + json.burnpoints + '</span></a>';
		str += '<a href="javascript:bonusHistory();" id="ptsEarn" class="ui-btn ui-corner-all"><img src="assets/images/pointredeem.png" alt="img" class="eIcon"><span>Bonus Points : ' + json.bonuspoints + '</span></a>';
		str += '</div>';
		
		str += '<div id="purchaseHistory" style="display:none;">';
		str+='<hr><span class="phist">Earned History</span><hr>';
		for(var i=0;i<json.data.length;i++)
		{
			str +='<table data-role="none" class="ui-responsive" id="tbl">';
			str +='<caption><span style="float:left;">EARNED POINTS <span class="ptsRed">'+json.data[i].earn+'</span></span>  <span class="cap_date">'+json.data[i].billdate+'</span></caption><tbody>';
			str +='<tr><td>'+(i+1)+'.</td><td>'+json.data[i].billnumber+'</td><td>'+json.data[i].billamount+'</td><td>'+json.data[i].earn+'</td></tr>';
			str +='</tbody></table><br/>';
		}
		str +='</div>';
		
		
		str += '<div id="redeemHistory" style="display:none;">';
		str+='<hr><span class="phist">Redeem History</span><hr>';
        for(var i=0;i<json.redeem.length;i++)
		{
			str +='<table data-role="none" class="ui-responsive" id="tbl">';
		    str +='<caption><span style="float:left;">REDEEM POINTS <span class="ptsRed">'+json.redeem[i].redeempoints+'</span></span>  <span class="cap_date">'+json.redeem[i].billdate+'</span></caption><tbody>';
			str +='<tr><td>'+(i+1)+'.</td><td>'+json.redeem[i].redeempoints+'</td><td>'+json.redeem[i].billnumber+'</td></tr>';
			str +='</tbody></table><br/>';
		}
	    str +='</div>';


		str += '<div id="bonusHistory" style="display:none;">';
		str+='<hr><span class="phist">Bonus History</span><hr>';
		for(var i=0;i<json.bonus.length;i++)
		{
			str +='<table data-role="none" class="ui-responsive" id="tbl">';
			str +='<caption><span style="float:left;">BONUS POINTS <span class="ptsRed">'+json.bonus[i].bonuspoints+'</span></span>  <span class="cap_date">'+json.bonus[i].createdon+'</span></caption><tbody>';
			str +='<tr><td>'+(i+1)+'.</td><td>'+json.bonus[i].bonuspoints+'</td><td>'+json.bonus[i].flag+'</td></tr>';
			str +='</tbody></table><br/>';
		}
		str +='</div>';

        document.getElementById("points").innerHTML=str;   
		
		
		break;

	case 'specials':
		console.log(JSON.stringify(json));
		
		if(json.length == 0)
		{
			str = 'No New Offers Found';
		}
		else
		{
			for (var i=0;i<json.length;i++ )
			{
			
			 console.log('Video:'+json[i].AdVideoURL);
			  if(json[i].AdVideoURL=='' || json[i].AdVideoURL==null  || json[i].AdVideoURL=='null')
				{
				   str += '<div class="specials7"><div><h3>'+json[i].AdName+'</h3><p>'+json[i].AdDesc+'</p><img src='+SERVER+json[i].AdImgURL+'  style="width: 90%;height: auto;padding: 5px;text-align: center;margin: 0 auto;display: block;"></img><br/><hr/></div></div>';
			 
			    }
				else
				{
					 console.log('Img:'+json[i].AdVideoURL);
					 str += '<div class="specials7"><div><h3>'+json[i].AdName+'</h3><p>'+json[i].AdDesc+'</p><video width="320" height="240" controls="controls" poster='+SERVER+json[i].AdImgURL+' onClick=this.play();><source src='+SERVER+json[i].AdVideoURL+'  this.play();/></video><br/><hr/></div></div>';
				}
			}
		}
        
		document.getElementById("spec").innerHTML=str;  
		
		break;
	case 'coupons':
		str = '';


        if (json.data.length == 0) 
		 {
                str = '<span style="text-align:center;margin: 0 auto;display: block;">No Coupons Found</span>';
         }
		else
		 {
		   for(var i=0;i<json.data.length;i++)
		{
            str += '<div class="px-3 pb-3">';

            if(json.data[i].couponstatus == 'Active')
            {
                str += '<div class="coupon active">';
            }
            else
            {
                str += '<div class="coupon inactive">';
            }


			str += '<div class="d-flex align-items-center justify-content-between">';
			str += '<div class="w-80">';
			str += '<h2 class="coupon_code">'+json.data[i].couponcode+'</h2>';
			str += '<h3 class="validity">Valid Till : <span>'+json.data[i].validtill+'</span></h3>';
			str += '<h3 class="coupon_no">Coupon Detail : '+json.data[i].offername+'</h3>';
			str += '<a href="#tnc">T&amp;C* </a>';
			str += '<div class="coupon_state"></div>';
		    str += '</div>';
			str += '<div class="w-20">';
			str += '<div class="qr_code"><img src="https://chart.googleapis.com/chart?chs=80x80&cht=qr&chl='+json.data[i].couponcode+'&choe=UTF-8" alt="" /></div>';
			str += '</div>';
			str += '</div>';

            str += '</div>';
			str += '</div>';
		
		}
		}
		//str += '</ul>';
		document.getElementById("rewards").innerHTML=str;
		break;

	case 'inbox':
		
		console.log('json'+JSON.stringify(json));
		
		str +=' <ul id="MsgUl" class="messages">';
		for(var i=0;i<json.length;i++ )
		{

			str += '<li>';
			str += '<div class="msg_img">';
			str += '<img src="assets/images/open.png" alt="" class="msgImg"/>';
			str += '</div>';
			str += '<div class="MsgBlk">';
			str += '<div class="MsgBdr">';
			str += '<span class="msghdr">DM-ARVDRY</span>';
			str += '<span class="msgTime">'+json[i].msgtime+'</span>';
			str += '<span class="msgDate">' + json[i].msgdate + '</span>';
			str += '</div>';
			str += '<div class="msg_body">';
			str += '<span class="msgTxt">'+json[i].msg+'</span>';
			str += '</div>';
			str += '</div>';
			str += '</li>';
	
		}
		
		str +='</ul>';
		document.getElementById("message").innerHTML=str;
		break;


		case 'centre':
   //console.log('inside centre');
      console.log('json'+JSON.stringify(json));
  
  str += '<ul data-role="listview" data-autodividers="false" data-filter="true" data-inset="false" class="ul_locator_sub" id="ul_locator_sub">';
  for (var i=0;i<json.length;i++ )
  {
   var storecontact=json[i].storephone;
   var custcare=json[i].CustomerCare;
   if(storecontact==null)
    storecontact='';
   if(custcare==null)
    custcare='';

   if(json[i].storename.indexOf('Email Admin')==0 || json[i].storename.indexOf('ONLINE')==0 || json[i].storename.indexOf('online')==0 || json[i].storename.indexOf('Paytm App Store')==0 || json[i].storename.indexOf('ShortCode')==0 || json[i].storename.indexOf('Mobile App')==0 || json[i].storename.indexOf('Paytm Store')==0|| json[i].storename.indexOf('MicroSite')==0|| json[i].storename.indexOf('test')==0)
				continue;
   
  
      str += '<li data-icon="false" class="storeList"><h3 class="storeName">'+json[i].storename+','+json[i].storelocation+'</h3><span class="callout1">'+json[i].storeaddress+'</span><br/><br/>';
   if(storecontact!='')
   {
   str += '<a href="tel:'+storecontact+'" data-role="button" class="ui-btn ui-icon-phone ui-btn-icon-left" rel="external" style="background: #ffffff; border: #ffffff; color: #999;font-weight: normal;  font-size: 13px;">'+storecontact+'</a>';
   }
  if(custcare!='')
   {
   str +='<a href="tel:'+custcare+'" data-role="button" class="ui-btn ui-icon-phone ui-btn-icon-left" rel="external" style="background: #ffffff; border: #ffffff; color: #999;font-weight: normal;  font-size: 13px;">'+json[i].CustomerCare+'</a>';
   }

  //str +='<div  id=map-canvas'+i+' style="height:250px;width:95%;margin: 0 auto;">';

  str +='</li>';



  
  
  //alert(str);
  //str += '<li data-icon="false" style="background:#eeeeee;margin-top: 5px;margin-bottom: 5px;">'+json[i].storename+','+json[i].storelocation+'<br/><span class="callout1">'+json[i].storeaddress+'</span><br/><br/><a href="tel:'+json[i].storephone+'\'" data-role="button" class="ui-btn ui-icon-phone ui-btn-icon-left" rel="external">'+json[i].storephone+'</a><a href="javascript:showTabContent_Map(\''+json[i].storeaddress+'\');" data-role="button" class="ui-btn ui-icon-location ui-btn-icon-left" rel="external">Map</a></li>';
        //str += '<li data-icon="false"><span class="callout-date1">'+json[i].storename+', '+json[i].storelocation+'</span><br/><span class="callout1">'+json[i].storeaddress+'</span><br/><div class="ui-grid-a"><div class="ui-block-a"><a href="tel:'+json[i].storephone+'" class="ui-btn ui-icon-phone ui-btn-icon-left" rel="external">'+json[i].storephone+'</a></div><div class="ui-block-b"><a href="#" class="ui-btn ui-icon-location ui-btn-icon-left" rel="external">Map</a></div></div></li>';
  //str += '<div class="center-box"><div class="callout-date1">'+json[i].storename+', '+json[i].storelocation+'</div><div class="callout1">'+json[i].storeaddress+'<br/><a href="tel:'+json[i].storephone+'" class="ui-btn ui-icon-phone ui-btn-icon-left" data-role="button" rel="external">'+json[i].storephone+'</a></div></div>';
  
  }
  //str +='<div  id=map-canvas'+i+' style="height:250px;width:250px;">';
  str += '</ul>';
  
  document.getElementById("stor").innerHTML=str;

	  /*for (var i=0;i<json.length;i++ )
	  {
			if(json[i].storename.indexOf('Email Admin')==0 || json[i].storename.indexOf('ONLINE')==0 || json[i].storename.indexOf('online')==0 || json[i].storename.indexOf('Paytm App Store')==0 || json[i].storename.indexOf('ShortCode')==0 || json[i].storename.indexOf('Mobile App')==0 || json[i].storename.indexOf('Paytm Store')==0|| json[i].storename.indexOf('MicroSite')==0|| json[i].storename.indexOf('test')==0)
			continue;

			var lat1  = checkforundefined(json[i].storelatitude);
			var long1 = checkforundefined(json[i].storelongitude);
			var add   = lat1+','+long1;
	   

		   showTabContent_Map_latlong(lat1,long1,i);
	  }*/
	   
	 $('#ul_locator_sub').listview();

  break;
		
	case 'defstore':
		//console.log('inside default store'+user.def_store);
	     console.log('json'+JSON.stringify(json));
		//str +='<div  style="text-align:center;width:100%;"><img src="img/c-logo.png" width="137" height="44" /></div>';
		str += '<h2 align="center" style=\"color:#ff0000;font-size:14px;font-weight:normal;\">Default Store : '+user.def_store+'</h2>';
		str += '<a href="#citylist" data-role="button" data-theme="reset" class="ios">View All Stores</a>';
		str += '<h3 align="center" style=\"color:#ff0000;font-size:14px;font-weight:normal;\">Other Stores in your city</h3><h3></h3>';
		//$("#" + pageID + " .ui-content").html(str);
		$("#" + pageID + " .ui-content").html(str+$.render[pageID](json));
		$("a[data-role='button']").button();
		break;
	case 'citylist':
		//console.log('inside citylist');
	    console.log('json'+JSON.stringify(json));
		
        str += '<ul data-role="listview" data-autodividers="false" data-filter="true" data-inset="false" class="ul_locator" id="ul_locator">';
		for (var i=0;i<json.data.length;i++ )
		{
			if(json.data[i].cityid!='9')
			{
				cityidarr[i]=json.data[i].cityid;
				cityarr[i]=json.data[i].cityname;
				//str +='<a href="javascript:getCityId('+json.data[i].cityid+');" data-role="button"  data-theme="reset" class="ios">'+json.data[i].cityname+'</a>'
				str += '<li data-icon="false"><a href="javascript:getCityId('+json.data[i].cityid+');" class="ui-btn ui-icon-location ui-btn-icon-left ui-shadow ui-corner-all">'+json.data[i].cityname+'</a></li>';
			}
		}
		str += '</ul>';
		document.getElementById("stor").innerHTML=str;
		  
        $('#ul_locator').listview();
		//$("a[data-role='button']").button();
		break;

	case 'merchandise':
	  console.log(JSON.stringify(json));
	  
	  /*str += '<h3>Merchandise</h3>';


	  for (var i=0;i<json.length;i++ )
	  {
			
	   str += '<div><div><h3>'+json[i].AdName+'</h3><p>'+json[i].AdDesc+'</p><video width="320" height="240"  poster='+json[i].AdImgURL+' onClick=this.play();><source src='+SERVER+json[i].AdVideoURL+'  this.play();/></video><br/><hr/> <a href="#" data-role="button" id="forgot_button">Order</a></div></div>';

	  }


	  $("#" + pageID + " .ui-content").html(str);*/
	  break;
case 'categorylist':
   console.log(JSON.stringify(json));

  //str = str +'<div class="subheading_t" style="font-size:14px;"><div style="color:#555555;">Welcome '+user.firstname+'</div><div class="submenu_button_right" ><img src="img/coupons.png" style="height:26px;width:auto;"></div></div>';
  str +='<img src="img/rstore.png" style="width:97%;height:auto;"><br/>';
  //str +='<div id="rss_desc1"><ul>';
 // str +='<ul>';
  // for (var i=0;i<json.length;i++ )
  //{
  //str +='<li><a href="javascript:getCatDetails('+json[i].Catid+');" data-theme="reset" class="ios" style="background: url(../img/shop_categoryList.png);height: 78px;color:#000;">'+json[i].CatName+'</a></li>';
  //str +='<li class="s_cn"><a href="javascript:getCatDetails('+json[i].Catid+');" style="background-image: url(../img/s_cn.png);color:#000;text-align:center;">'+json[i].CatName+'</a></li>';
  //}
 // str +='</ul>';
  //str +='</ul></div>';
  $("#" + pageID + " .ui-content").html(str);

  $("a[data-role='button']").button();
   break;
	  case 'rewardsmain':
		
		 $("#" + pageID + " .ui-content").html(str);
		break;
	  case 'viewcart':
		
		//str += '<div class="cartinfo">You have '+json.cartdata.length+' items in your cart</div>';
		
		str += '<ul data-role="listview" data-autodividers="false" data-filter="true" data-inset="false" class="ul_locator_sub" id="cartlist">';
        for (var i=0;i<json.cartdata.length;i++ )
		{
		
		
		str += '<li data-icon="delete" data-iconpos="right" style="background:#eeeeee;margin-top: 5px;margin-bottom: 5px;line-height:90px;"><img src='+json.cartdata[i].url+' style="width: 100px;height: 100px;padding: 5px;"/>'+json.cartdata[i].BrandName+' Offer,Cost:Rs. '+json.cartdata[i].BrandValue+'<br/><span class="callout1">'+json.cartdata[i].BrandDescription+'</span></li>';
        																																					   
																																							   
		
		//	str +='<li><div class="li-img"><img src='+json.cartdata[i].url+' /></div><div class="li-text"><h4 class="li-head">'+json.cartdata[i].BrandName+' Offer,Cost:Rs. '+json.cartdata[i].BrandValue+'</h4><br/><p class="li-sub">'+json.cartdata[i].BrandDescription+'</p></div></li>';
            
		}
		str += '</ul>';
		
		str += '<br clear="all" /><a href="#" data-role="button" id="view_cart" class="btnclass">Redeem</a>';
		console.log("str herrrrrr"+str);
		oth.innerHTML=str; oth.style.display = 'block';  
		 $('#cartlist').listview();
		 $('#view_cart').button();
		break;

	case 'rewardstore':
    
  
       
	  jsonary = json.data;
  
  // str += '<div class="ui-content rsbanner"><span class="vouchers"><a href=\'javascript:addincart('+i+');\' id='+i+'><img src="img/get_voucher.png" class="vouchers" id="vouchers"'+i+'/></a></span><img src="img/featured.png" class="rs_b1" /></div>';
          
  for (var i=0;i<json.data.length;i++ )
  {

   if(json.data[i].BrandDescription=='Featured')
   {
   
   str += '<div class="ui-content rsbanner"><a href=\'javascript:addincart('+i+');\' id='+i+'><div class="cartbx">Add to Cart</div></a><br/><img src='+json.data[i].url+' class="rs_b1" /></div>';
   }
   else
   {

   
   //str += '<div class="ui-content rs_msg"><a href=\'javascript:addincart('+i+');\' id='+i+'><div class="cartbx">Add to Cart</div></a><br/><img src="http://portico.mloyalengage.com/'+json.data[i].brand_logo+'" class="rs_b2"></div>';
   str += '<div class="ui-content rs_msg"><img src="" class="rs_b2"><div class="amount_date"> <b>Rs. '+json.data[i].gift_voucher_value+'</b><br/>Valid Thru : '+json.data[i].end_date+'</div></div>';
   
   str += '<div class="ui-grid-a msg_cont"><div><img src="'+SERVER1+json.data[i].brand_logo+'" class="img_blogo1"></div><div class="ui-block-a wid20"></div>';
   

   str += '<div class="ui-block-b wid80"><div class="ui-grid-a"><div class="ui-block-a wid60"><span class="headergjw">'+json.data[i].brand_name+' </span><br/>';
   str += '<span class="sub1header">Rewards Manager </span><br/><span class="sub2header">Friday at 10:40 am </span><br/></div>';
   str += '<div class="ui-block-b wid40"><div class="flt_rght">';
   //str += '<a href="javascript:likeMessage_rewards(\''+json.data[i].brand_id+'\',\''+i+'\');" data-role="button"><span id="likingrewards'+i+'"><img src="img/msg_up.png"></span></a>';
   str += '<span><a href="javascript:shareMessage(\''+json.data[i].brand_description+'\');" data-role="button"><img src="img/msg_share.png"></a></span>';
   str += '</div></div></div><hr class="style-one">';
   str += '<div class="ui-grid-solo"><div class="ui-block"><span class="paratxt">'+json.data[i].brand_description;
   str += '</span></div></div></div></div>';
   str += '<div class="ui-grid-solo msg_like_comt"><div class="rs_lk_cmt">';
 //  str += '<span class="msg_lke"><a href=\'javascript:addincart('+i+');\' id='+i+'><img src="img/get_voucher.png" id="vouchers"'+i+'/></a></div></div></div></div><br/><br/>';
   str += '<span class="msg_lke"><a href=\'javascript:getVoucher('+json.data[i].gv_id+','+json.data[i].gift_voucher_value+');\' id='+i+'><img src="img/get_voucher.png" id="vouchers"'+i+'/></a></div></div></div></div><br/><br/>';
   }

 
  }
  //str +='Coming Soon';
  
   oth.innerHTML=str; oth.style.display = 'block';  
    break;
 case 'reward-cat':
   str +='<ul data-role="listview" id="ul_reward-cat" class="ul_shop" data-icon="false" data-iconpos="none">';
   for(var i=0;i<json.data.length;i++)
  {
            str +='<li class="lt_shop" data-theme="a" data-icon="false" data-iconpos="none"><a href="javascript:showcatbrands('+json.data[i].catid+');" class="lt_shop_a"><h2>'+json.data[i].catname+'</h2></a></li>';
  }
 str +='</ul>';
 //str +='Coming Soon';
    $("#" + pageID + " .ui-content").html(str);
    $('#ul_reward-cat').listview();
   break;
   case 'reward-brand':
   for (var i=0;i<json.data.length;i++ )
  {

   if(json.data[i].BrandDescription=='Featured')
   {
   
   str += '<div class="ui-content rsbanner"><a href=\'javascript:addincart('+i+');\' id='+i+'><div class="cartbx">Add to Cart</div></a><br/><img src='+json.data[i].url+' class="rs_b1" /></div>';
   }
   else
   {

   
   //str += '<div class="ui-content rs_msg"><a href=\'javascript:addincart('+i+');\' id='+i+'><div class="cartbx">Add to Cart</div></a><br/><img src="http://portico.mloyalengage.com/'+json.data[i].brand_logo+'" class="rs_b2"></div>';
   str += '<div class="ui-content rs_msg"><img src="" class="rs_b2"><span class="amount_date"> <b>Rs. '+json.data[i].gift_voucher_value+'</b><br/>Valid Thru : '+json.data[i].end_date+'</span></div>';
   
   str += '<div class="ui-grid-a msg_cont"><div><img src="'+SERVER1+json.data[i].brand_logo+'" class="img_blogo1"></div><div class="ui-block-a wid20"></div>';
   

   str += '<div class="ui-block-b wid80"><div class="ui-grid-a"><div class="ui-block-a wid60"><span class="headergjw">'+json.data[i].brand_name+' </span><br/>';
   str += '<span class="sub1header">Rewards Manager </span><br/><span class="sub2header">Friday at 10:40 am </span><br/></div>';
   str += '<div class="ui-block-b wid40"><div class="flt_rght">';
  // str += '<a href="javascript:likeMessage_rewards(\''+json.data[i].brand_id+'\',\''+i+'\');" data-role="button"><span id="likingrewards'+i+'"><img src="img/msg_up.png"></span></a>';
   str += '<span><a href="javascript:shareMessage(\''+json.data[i].brand_description+'\');" data-role="button"><img src="img/msg_share.png"></a></span>';
   str += '</div></div></div><hr class="style-one">';
   str += '<div class="ui-grid-solo"><div class="ui-block"><span class="paratxt">'+json.data[i].brand_description;
   str += '</span></div></div></div></div>';
   str += '<div class="ui-grid-solo msg_like_comt"><div class="rs_lk_cmt">';
   //str += '<span class="msg_lke"><a href=\'javascript:addincart('+i+');\' id='+i+'><img src="img/get_voucher.png" id="vouchers"'+i+'/></a></div></div></div></div><br/><br/>';
   str += '<span class="msg_lke"><a href=\'javascript:getVoucher('+json.data[i].gv_id+','+json.data[i].gift_voucher_value+');\' id='+i+'><img src="img/get_voucher.png" id="vouchers"'+i+'/></a></div></div></div></div><br/><br/>';
   }

 
  }
            $("#" + pageID + " .ui-content").html(str);
   break;
			
    case 'socialwall_youtube':
		
		//str += '<a href=\"javascript:loadDataGal(\''+gallery_cat+'\');\" data-role=\"button\" data-theme=\"reset\" class=\"ios\"><span><img src=\"img/cheer/refresh.png\" /></span></a></div>';
		
		for (var i=0;i<json.length;i++ )
		{
			//console.log(JSON.stringify(json[i]));
        if(json[i].link!='')
			{

			//console.log(json[i].link[1].href);
			//console.log(json[i].link[1].href.indexOf("videos/")+7);

			//console.log(json[i].link[1].href.substring(json[i].link[1].href.indexOf("videos/")+7,json[i].link[1].href.indexOf("/related")));
			

			 str1="http://www.youtube.com/embed/"+json[i].link[1].href.substring(json[i].link[1].href.indexOf("videos/")+7,json[i].link[1].href.indexOf("/related"));
			 //console.log(str1);
			
			
				
			   	str += '<div id="rss_desc"><div><span style=\"color:#F39E34;font-size:12px;font-weight:bold;\">'+json[i].title.t+'</span><HR>';
				
				
					str +='<iframe width="95%" height="240" src='+str1+' frameborder="0" allowfullscreen=""></iframe>';
					str +='<br/>'+json[i].content.t;
					
				 
				  str += '</div></div>';
				
				
			}
		}

		
        document.getElementById("contensocial").innerHTML=str;
		break;
		case 'socialwall_facebook':
		for (var i = 0; i < json.data.length; i++)
            {

                if (json.data[i].link != '')
                {
                    var fbid=json.data[i].id;
                    
                    
                    
                    var first_part=fbid.substr(0,fbid.indexOf('_'));
                     
                     var sec_part=fbid.substr(fbid.indexOf('_')+1,fbid.length);
                    
                    
                    var linkfbpost='https://www.facebook.com/'+first_part+'/posts/'+sec_part;
                   
                    
                    
				
				var msg=json.data[i].message;
				if(msg=='' || msg=='undefined' || msg==null || msg=='null')
					{
						msg='';
					}
		
				var lk='';
				if(json.data[i].likes)
				{
					lk= json.data[i].likes.data.length;
				}
				else
				{
					lk= '0';
				}
				

				str+='<div class="ui-grid-solo">';
				str+='<div class="ui-block">';
				str+='<ul class="facebookFeed">';
				str+='<li>';
				str+='<div class="f_feedCon"><div class="f_feed_hdr">';
				//str+='<div class="f_hdr_img"><img src="images/social/profile.jpg" id="f_profile" alt="profile"></div>';
				//<!--<div class="f_hdr_time" id="f_hdr_time">'+jQuery.timeago(json.data[i].updated_time)+'</div>-->
				//str+='<div class="f_hdr_txt"><span class="f_hdr_title" id="f_hdr_title">'+json.data[i].from.name+'</span><br/><span class="f_hdr_desc" id="f_hdr_desc">'+json.data[i].from.category+'</span></div>';
				if(typeof json.data[i].picture !== "undefined" && json.data[i].picture != null)
					{
					str+='<div class="f_feed_bdy"><img src='+json.data[i].picture+' id="f_banner" alt="banner"></div>';
					}
				str+='<div class="f_feed_bdy"><p id="fb_msg">'+msg+'</p></div>';
				str+='<div class=f_feed_ftr><hr class=hori /><div class=f_bdy_lcs><span><img src=img/like.jpg onClick=javascript:openBrowser(\''+linkfbpost+'\');>Like</span><span><img src=img/comment.jpg onClick=javascript:openBrowser(\''+linkfbpost+'\');>Comment</span><span><img src=img/share.jpg onClick=javascript:openBrowser(\''+linkfbpost+'\');>Share</span></div>';
				str+='</div>';
				str+='</li>';
				str+='</ul>';
				str+='</div>';
				str+='</div>';

                }
            }

			document.getElementById("FACEBOOK").innerHTML = str;
            
            break;

		case 'socialwall_twitter':
		for (var i = 0; i < json.length; i++)
            {

               


					str+='<ul class="facebookFeed">';
					str+='<li>';
					str+='<div class="y_feedCon">';
					str+='<div class="ui-grid-a">';
					str+='<div class="ui-block-a" style="width:25%;"><img src="img/twitter.png" alt="twitter" class="y_video"></div>';
					str+='<div class="ui-block-b" style="width:75%;padding-left:10px;">';
					str+='<div class="y_hdr_title">'+json[i].user.name+'</div>';
					//str+='<div class="y_hdr_desc">'+json[i].user.description+'</div>';
					try{
					str+='<div class="f_feed_bdy"><img src='+json[i].entities.media[0].media_url+' id="f_banner" alt="banner" onClick=javascript:openBrowser(\''+json[i].entities.urls.url+'\');></div>';
					}
					catch(err){}
					str+='<div class="y_hdr_desc">'+json[i].text+'</div>';
					//str+='<div class=f_bdy_likes>'+json[i].user.followers_count+' Followers</div>';
					str+='</div></div></div></li></ul>';

                
            }

            document.getElementById("TWITTER").innerHTML = str;

            break;

		case 'socialwall_pinterest':
		console.log(JSON.stringify(json));
		for (var i=0;i<json.length;i++ )
		{
				console.log(json[i].name);
				str+='<ul class="facebookFeed">';
				str+='<li>';
				str+='<div class="f_feedCon"><div class="f_feed_hdr">';
				str+='<div class="f_hdr_txt"><span class="f_hdr_title" id="f_hdr_title">'+brandname+'</span><br/><span class="f_hdr_desc" id="f_hdr_desc">'+json[i].board.name+'<br>'+json[i].desc+'</span></div>';
				str +='<div class="ui-grid-solo"><div class="ui-block"><img src="'+json[i].src+'" ></div></div>';
				str+='</div>';
				str+='</li>';
				str+='</ul>';
		}
        
        
        document.getElementById("PINTEREST").innerHTML=str;
		break;
		case 'socialwall_tumblr':
		console.log(JSON.stringify(json));
		for (var i=0;i<json.length;i++ )
		{
        
         if(json[i].link!='')
			{
		
				str += '<div id="rss_desc"><div><img src="img/ddsmall.jpg"><div style=\"margin: -50px 5px 20px 60px;\"><span style=\"color:#F39E34;font-size:12px;font-weight:bold;\">'+json[i].title+'</span><br/><span style="font-size:11px;color:#999999;"></span></div><HR><div style=\"margin: 10px 10px 10px -20px;\" class="content-responsive">'+json[i].description+'</div><HR><a href=\"javascript:playvideo(\''+json[i].link+'\');\" data-role=\"button\" data-theme=\"reset\" class=\"ios\"><div class=\"see-all\">See All</div></a></div></div>';
				
		
			}
		}
        
        document.getElementById("contensocial").innerHTML=str;
		break;

		case 'socialwall_instagram':

		var json = JSON.parse(json)
		var length = JSON.stringify(json.images.length);

		//console.log('instagram: '+JSON.stringify(json));

		for (var i = 0; i < length; i++)
        {
				str+='<ul class="facebookFeed">';
				str+='<li>';
				str+='<div class="f_feedCon"><div class="f_feed_hdr">';
				//str+='<div class="f_hdr_img"><img src="images/social/profile.jpg" id="f_profile" alt="profile"></div>';
				str+='<div class="f_hdr_txt"><span class="f_hdr_title" id="f_hdr_title">'+json.full_name+'</span><br/>';
				//str+='<span class="f_hdr_desc" id="f_hdr_desc">'+json.images[i].node.edge_media_to_caption.edges[0].node.text+'</span></div>';
				str +='<img style="border: 1px solid #cccccc;text-align: center;width: 98%;height: auto;" src="'+json.images[i].node.display_url+'" />';
				str+='<div class=f_bdy_likes>'+json.images[i].node.edge_liked_by.count+' Likes</div>';
				str+='</div>';
				str+='</li>';
				str+='</ul>';

		}

        document.getElementById("INSTAGRAM").innerHTML = str;

        break;
		
		case 'popuppage4':

       
		for(var i=0;i<json.data.length;i++)
		
		{

		str += '<ul data-role="listview" data-inset="true" class="listPpup ui-listview ui-listview-inset ui-corner-all ui-shadow" data-icon="false">';
		str += '<li class="ui-li-has-thumb ui-first-child ui-last-child"><a href="#" class="ui-btn"><img src="img/rstar.jpg"/>';
		str += '<h2>'+json.data[i].offername+'</h2><p>Coupon Code : '+json.data[i].couponcode+'</p></a>';
		str += '</li></ul>';
               
		
		}
		 $("#" + pageID + " .ui-content").html(str);
		break;
		


	}
}


function renderTemplatedetail(pageID) {
var str = '';



	switch (pageID) {
		
		case 'aboutus':

			console.log('cardname:-'+user.firstname+' '+user.lastname);
			document.getElementById("cardname").innerHTML = user.firstname+' '+user.lastname;
		    var uuu='';
			for(var i=0;i<user.id.length;i++)
		    {
             if(i%4==2)
				{
				 uuu = uuu + user.id.charAt(i) +'  ';
				}
			 else
				{
				 uuu = uuu + user.id.charAt(i);
				}
			}
			
			var mobileqr = '';
			if(user.mobile==null || user.mobile=='' || user.mobile=='undefined')
			{
				mobileqr = 'Guest';
			}
			else
		    {
				mobileqr = user.mobile;
			}

		    document.getElementById("cardid").innerHTML = uuu;
		    //document.getElementById("valid").innerHTML = 'Valid Thru:'+user.validity;
			document.getElementById("tpoint").innerHTML = user.balance;
			document.getElementById("barimg").innerHTML = '<img src="https://quickchart.io/qr?text='+mobileqr+'&size=80&margin=2" class="img-responsive" />';

			if(user.membership_slab=='1' || user.membership_slab=='')
            {
               document.getElementById('silverslab').className = '';
               document.getElementById('goldslab').className = '';
			   document.getElementById('platinumslab').className = '';
		       //document.getElementById('diamondslab').className = '';

		       document.getElementById('silverslab').className = 'active';
			   document.getElementById("mType").innerHTML = 'Silver Member';
            }
            else if(user.membership_slab=='2')
            {
               document.getElementById('silverslab').className = '';
               document.getElementById('goldslab').className = '';
			   document.getElementById('platinumslab').className = '';
		       //document.getElementById('diamondslab').className = '';

		       document.getElementById('goldslab').className = 'active';
			   document.getElementById("mType").innerHTML = 'Gold Member';
            }
			else if(user.membership_slab=='3')
            {
               document.getElementById('silverslab').className = '';
               document.getElementById('goldslab').className = '';
			   document.getElementById('platinumslab').className = '';
		       //document.getElementById('diamondslab').className = '';

		       document.getElementById('platinumslab').className = 'active';
			   document.getElementById("mType").innerHTML = 'Platinum Member';
            }
        

			break;

		case 'page-card':
			
			document.getElementById("barcontent").innerHTML='<img src="img/batch_mem.png" class="batch_mem"><span class="mem_wel_msg">Hi '+user.firstname+'!</span><span><img src="img/pro_btn.png" class="mem_acc_icon"></span><a href="javascript:showLoyalty();"><span class="myacc">My Account</span></a>';
			//document.getElementById("welcomehome").innerHTML = 'Welcome '+user.firstname+' '+user.lastname;
		    document.getElementById("cardname").innerHTML = user.firstname+' '+user.lastname;
			var uuu='';
			for(var i=0;i<user.id.length;i++)
		    {
             if(i%4==2)
				{
				 uuu = uuu + user.id.charAt(i) +'  ';
				}
			 else
				{
				 uuu = uuu + user.id.charAt(i);
				}
			}
		    document.getElementById("cardid").innerHTML = uuu;
		    document.getElementById("valid").innerHTML = 'Valid Thru:'+user.validity;
			var ustr = user.balance;
			var tstr = '';
			if(ustr.length<=8)
		   {
             for (var k=0;k<(8-ustr.length); k++)
			{
			tstr += '<span class="bdrht" style="">0</span>';
			}
		   }
			for (var j=0;j<ustr.length; j++)
			{
			tstr += '<span class="bdrht" style="">'+ustr.charAt(j)+'</span>';
			}
			
			document.getElementById("tpoint").innerHTML = tstr;
			document.getElementById("barimg").innerHTML = '<img src="http://delhidaredevilsadda.com/barcode.php?text='+user.mobile+'" style="padding:5px;border: solid 1px #ffffff;border-radius: 1px;background:#ffffff;" />';

			document.getElementById("headername").innerHTML='Membership';
			 
			break;


			case 'page-card-punch':
			
			


						document.getElementById("barcontentpunch").innerHTML='<img src="img/batch_mem.png" class="batch_mem"><span class="mem_wel_msg">Hi '+user.firstname+'!</span><span><img src="img/pro_btn.png" class="mem_acc_icon"></span><a href="javascript:showLoyalty();"><span class="myacc">My Account</span></a>';
			//document.getElementById("welcomehome").innerHTML = 'Welcome '+user.firstname+' '+user.lastname;
		    document.getElementById("cardnamepunch").innerHTML = user.firstname+' '+user.lastname;
			var pstr='<span style="color:#ffffff;"><br><br>';
			console.log("user.visit_frequency)"+user.visit_frequency);
            //user.visit_frequency='2';
			console.log("parseInt(user.visit_frequency)"+parseInt(user.visit_frequency));
			 for (var k1=0;k1<parseInt(user.visit_frequency); k1++)
			{
			pstr += '<img src="img/star11.png"/>';
			}
			 for (var k1=0;k1<10-parseInt(user.visit_frequency); k1++)
			{
			pstr += '<img src="img/star.png"/>';
			}
			pstr +='</span>'
			console.log("pstr"+pstr);



            document.getElementById("card_punches").innerHTML =pstr;
			var uuu='';
			for(var i=0;i<user.id.length;i++)
		    {
             if(i%4==2)
				{
				 uuu = uuu + user.id.charAt(i) +'  ';
				}
			 else
				{
				 uuu = uuu + user.id.charAt(i);
				}
			}
		   
			var ustr = user.balance;
			var tstr = '';
			if(ustr.length<=8)
		   {
             for (var k=0;k<(8-ustr.length); k++)
			{
			tstr += '<span class="bdrht" style="">0</span>';
			}
		   }
			for (var j=0;j<ustr.length; j++)
			{
			tstr += '<span class="bdrht" style="">'+ustr.charAt(j)+'</span>';
			}
			
			document.getElementById("tpointpunch").innerHTML = tstr;
			
			document.getElementById("headernamepunch").innerHTML='Membership';
			break;

		    case 'shop':
            str +='<ul data-role="listview" id="ul_shop" class="ul_shop" data-icon="false" data-iconpos="none">';
            str +='<li class="lt_shop" data-theme="a" data-icon="false" data-iconpos="none"><a href="javascript:showshoplinks(\'S1\');" class="lt_shop_a"><h2>Khazana</h2></a></li>';
            str +='</ul>';
			
            $("#" + pageID + " .ui-content").html(str);
    $('#ul_shop').listview();
   break;
  
	}
	}





function shareMessagefb(msg)
{
	//window.plugins.socialsharing.share(msg,'Gini & Jony');
	window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(msg, null /* img */, null /* url */, brandname, function() {console.log('share ok')}, function(errormsg){alert(errormsg)})
}

function shareMessagetw(msg)
{
	//window.plugins.socialsharing.share(msg,'Gini & Jony');
      window.plugins.socialsharing.shareViaTwitter(msg);
}
function shareMessage(msg)
{
	window.plugins.socialsharing.share(msg,brandname);
}

var map;
var geocoder;

    function InitializeMap(lat,longt,ind) 
	{

		var lat = parseFloat(lat);
        var lng = parseFloat(longt);

        var myOptions =
        {
            zoom: 15,
            center: {
				lat: lat,
				lng: lng
			},
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        map = new google.maps.Map(document.getElementById("map-canvas"+ind), myOptions);

    }

    function showTabContent_Map_latlong(lat,longt,i) 
	{
 
        //geocoder = new google.maps.Geocoder();
        InitializeMap(lat,longt,i);

        /*geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });

            }
            else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });*/

    }

function checkforundefined(str)
{
    if(typeof str==undefined || str=='undefined'|| str==null || str=='null')
    {
        str='';
    }
        return str;
}

function showTabContentRSS(id, url) {
  if(url==json_fb)
	{

  $.getJSON(
     url, {
     
       }, function (json) {

      
         renderTemplate(id, json);

     

          localStorage.setItem('facebook_arvinddairy',JSON.stringify(json.item));
     

    

       }).error(function () {
		 try{
			 renderTemplate(id,JSON.parse(localStorage.getItem('facebook_arvinddairy')));
		 }catch(err)
		   {
         alert("Error: Could not connect to Server, make sure you are connected to Network");
		   }
        }
   );
 
}
if(url==RSS_youtube)
{

  $.getJSON(
     url, {
     
       }, function (json) {

      
         renderTemplate(id, json.feed.entry);

     

          localStorage.setItem('youtube_arvinddairy',JSON.stringify(json.feed.entry));
     

    

       }).error(function () {
		   try{
			 renderTemplate(id,JSON.parse(localStorage.getItem('youtube_arvinddairy')));
		   }
		   catch(err)
		   {
         alert("Error: Could not connect to Server, make sure you are connected to Network");
		   }
        }
   );


}
else if(url==RSS_twitter)
{


  $.ajax({
                url: url,
                type: 'GET',
                timeout: 50000,
				dataType: 'json',
                success: function (data, textStatus, xhr) {

				console.log(JSON.stringify(data));
				renderTemplate(id, data);

			
            //  localStorage.setItem('twitter',JSON.stringify(json.responseData.feed.entries));
            localStorage.setItem('twitter_arvinddairy', JSON.stringify(data));
                },
                error: function (xhr, textStatus, errorThrown) {
					var err = eval("(" + xhr.responseText + ")");

					alert(err.Message);

                  try {
				} catch (err)
				{
					renderTemplate(id, JSON.parse(localStorage.getItem('twitter_arvinddairy')));
					//alert('here in catch');
				}
            //alert("Oops network error!!Please try again");
                }
            });


}
else if(url==RSS_pinterest)
{

 
  $.getJSON(
     url, {
     
       }, function (json) {

      
         renderTemplate(id, json.body);
			
     
		  console.log(JSON.stringify(json.body));
          localStorage.setItem('pinterest_arvinddairy',JSON.stringify(json.body));
       

    

       }).error(function () {
		   try{
			    renderTemplate(id,JSON.parse(localStorage.getItem('pinterest_arvinddairy')));
		   }catch(err)
		   {
         alert("Error: Could not connect to Server, make sure you are connected to Network");
		   }
        }
   );
 

}
else if(url==RSS_tumblr)
{

 
  $.getJSON(
     url, {
     
       }, function (json) {

      
         //renderTemplate(id, json.responseData.feed.entries);
			renderTemplate(id, json.channel.item);
     

        //  localStorage.setItem('twitter',JSON.stringify(json.responseData.feed.entries));
       localStorage.setItem('tumblr_arvinddairy',JSON.stringify(json.channel.item));

    

       }).error(function () {
		   try{
			   renderTemplate(id,JSON.parse(localStorage.getItem('tumblr_arvinddairy')));
		   }catch(err)
		   {
         alert("Error: Could not connect to Server, make sure you are connected to Network");
		   }
        }
   );


}
else if(url==RSS_instagram)
{

 
  $.getJSON(
     url, {
     
       }, function (json) {

      
         //renderTemplate(id, json.responseData.feed.entries);
			renderTemplate(id, json.user);
     

        //  localStorage.setItem('twitter',JSON.stringify(json.responseData.feed.entries));
       localStorage.setItem('instagram_arvinddairy',JSON.stringify(json.user));

    

       }).error(function () {
		   try{
			   renderTemplate(id,JSON.parse(localStorage.getItem('instagram_arvinddairy')));
		   }catch(err)
		   {
         alert("Error: Could not connect to Server, make sure you are connected to Network");
		   }
        }
   );


}



 
}
//newfeedback
function changeRate(element)
{

	//var tImage = document.getElementById('rate_img');

	if(element=='b_icon1')
	{
		$("#b_icon1").css('opacity','1');
		$("#b_icon2").css('opacity','0.4');
		$("#b_icon3").css('opacity','0.4');
		$("#b_icon4").css('opacity','0.4');
		$("#b_icon5").css('opacity','0.4');
		rating='1';
		document.getElementById("fdbk_text").innerHTML='Poor';
		//tImage.src = 'assets/images/rating_img.png';

		setTimeout(function(){
            $("#feedbackpop").popup();
			$("#feedbackpop").popup("open");
			$('#feedfrm').show();
		}, 1000);
	}
	else if(element=='b_icon2')
	{
		$("#b_icon1").css('opacity','1');
		$("#b_icon2").css('opacity','1');
		$("#b_icon3").css('opacity','0.4');
		$("#b_icon4").css('opacity','0.4');
		$("#b_icon5").css('opacity','0.4');
		rating='2';
		document.getElementById("fdbk_text").innerHTML='Fair';
		
		setTimeout(function(){
            $("#feedbackpop").popup();
			$("#feedbackpop").popup("open");
			$('#feedfrm').show();
		}, 1000);
	}
	else if(element=='b_icon3')
	{
		$("#b_icon1").css('opacity','1');
		$("#b_icon2").css('opacity','1');
		$("#b_icon3").css('opacity','1');
		$("#b_icon4").css('opacity','0.4');
		$("#b_icon5").css('opacity','0.4');
		rating='3';
		document.getElementById("fdbk_text").innerHTML='Good';

		setTimeout(function(){
            $("#feedbackpop").popup();
			$("#feedbackpop").popup("open");
			$('#feedfrm').show();
		}, 1000);
	}
	else if(element=='b_icon4')
	{
		$("#b_icon1").css('opacity','1');
		$("#b_icon2").css('opacity','1');
		$("#b_icon3").css('opacity','1');
		$("#b_icon4").css('opacity','1');
		$("#b_icon5").css('opacity','0.4');
		rating='4';
		document.getElementById("fdbk_text").innerHTML='Awesome';
		setTimeout(function(){
            $("#feedbackpop").popup();
			$("#feedbackpop").popup("open");
			$('#feedfrm').show();
		}, 1000);
	}
	else if(element=='b_icon5')
	{
		$("#b_icon1").css('opacity','1');
		$("#b_icon2").css('opacity','1');
		$("#b_icon3").css('opacity','1');
		$("#b_icon4").css('opacity','1');
		$("#b_icon5").css('opacity','1');
		rating='5';
		document.getElementById("fdbk_text").innerHTML='Excellent';
		setTimeout(function(){
            $("#feedbackpop").popup();
			$("#feedbackpop").popup("open");
			$('#feedfrm').show();
		}, 1000);
	}
	else
	{
		rating='0';
	}
}

function rateFeed(){
	console.log("Rating:"+rating+" by:"+user.mobile);
}

$(document).on('pageshow', '#feedback', function (event, ui) {

	//$('#feed_mobile').val(user.mobile);
	//loadLocation();

});

function submitFeedback_1()
{
	toast('Thanks for submitting your valuable feedback.');
	$.mobile.changePage( "#homepage", { transition: "none"} );
	resetFeeds();
}

function submitFeedback()
{

 var service=$('input[name="service"]:checked').val();
 var product=$('input[name="product"]:checked').val();
 var offers=$('input[name="offers"]:checked').val();
 var store_atmosphere=$('input[name="store_atmosphere"]:checked').val();

 var comments = $('#feed_comments').val();


 /*if(service==''){
		  toast('Please enter mandatory fields!');
		}
 else{*/

   $.ajax({
   url: SERVER+'feedback_json.asp',
    type: 'GET',
    timeout: 50000,
    dataType: 'html',
    data: {

				'MobileNo': user.mobile,
				'FirstName': '',
				'LastName': '',
				'EmailId': '',       
				'StoreId': '',    
				'Var1': service,   
				'Var2': product,     
				'Var3': offers,
				'Var4': store_atmosphere,    
				'Var5': '',      
				'Var6': '',     
				'Var7': '',        
				'Var8': '',             
				'Var9': '',
				'Var10': '',
				'Var11': '',           
				'Var12': '',
				'Var13': comments,
				'Var14': '',
				'Var15': '',
				'Var16': '',
				'Var17': '',
				'Var18': '',
				'Var19': '',
				'Var20': ''	
					
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				toast('Thanks for submitting your valuable feedback.');

				$.mobile.changePage( "#homepage", { transition: "none"} );

                resetFeeds();
    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 //}

}

function resetFeeds()
{

	$('#feed_comments').val('');
	$('input[name="service"]').attr('checked', false);
	$('input[name="service"]').prop('checked',false);
	$('input[name="product"]').attr('checked', false);
	$('input[name="product"]').prop('checked',false);
	$('input[name="offers"]').attr('checked', false);
	$('input[name="offers"]').prop('checked',false);
	$('input[name="store_atmosphere"]').attr('checked', false);
	$('input[name="store_atmosphere"]').prop('checked',false);
}


function playvideo(url)
{
	
	//window.plugins.videoPlayer.play("https://www.youtube.com/watch?v=en_sVVjWFKk");
	openInWebView(url); 

}


function mobilecoupon()
{
	var mainpop = document.getElementById('mainpop'); 
    mainpop.style.display = 'none';
	var smallImage = document.getElementById('getbarimage');
    smallImage.style.display = 'none';
	var smallImage1 = document.getElementById('getmobcoupon');
    smallImage1.style.display = 'block';
	$.ajax({
			url: SERVER+'get_active_voucher_api.asp',
			type: 'GET',
			timeout: 30000,
		  	data: {
				
				mobileno: user.mobile,
				
							
			},
			success: function(data, textStatus, xhr) {

				//console.log("Anoop"+url);
				
				
				
				if (data.indexOf("Success")>=0)
				{
					   
					   
						smallImage1.innerHTML = '<div>You will shortly receive a sms with your mobile coupon</div>';
						

				}
			
	
				
				
			},
			error: function(xhr, textStatus, errorThrown) {
				$('#login-msg').html('Could not connect to Server, make sure you are connected to Internet');
			}
		});
		
	
}

function showRewards1(){
	try{
		popupCloseRight1.remove();
	}catch(err) 
	{	}
		showRewards();
}


function showHome(){
 $.mobile.changePage( "#page-card", { transition: "none"} ); 
 var oth = document.getElementById("othercontent");
 var main = document.getElementById("cardcontent");  
 oth.style.display = 'none';
 main.style.display = 'block';
 try{
	$( "#left-panel" ).panel( "close" );
	}catch(err) 
	{	}
	
 document.getElementById("barcontent").innerHTML='<img src="img/batch_mem.png" class="batch_mem"><span class="mem_wel_msg">Hi '+user.firstname+'!</span><span><img src="img/pro_btn.png" class="mem_acc_icon"></span><a href="javascript:showLoyalty();"><span class="myacc">My Account</span></a>';
 document.getElementById("headername").innerHTML='Membership';	
}

function showHome1(){
	//document.getElementById("profilepts").innerHTML=user.balance;
	if(user.firstname=='undefined' || user.firstname=='null' || user.firstname==null || user.firstname==''){
		document.getElementById("profilenm").innerHTML= 'Welcome Guest!';
		document.getElementById("profilenm1").innerHTML='Guest';
	}else{
		document.getElementById("profilenm").innerHTML= 'Welcome '+user.firstname+'!';
		document.getElementById("profilepts").innerHTML=user.balance+' Points';
		document.getElementById("profilenm1").innerHTML=user.firstname;
		document.getElementById("profilepts1").innerHTML=user.balance+' Points';
		if(parseInt(user.balance)<=10000){
			document.getElementById("category_img").src="img/Silver_icon.png";
		}
		else if(parseInt(user.balance)<=20000){
			document.getElementById("category_img").src="img/gold.png";
		}
		else{
			document.getElementById("category_img").src="img/platinum.png";
		}
	}
 $.mobile.changePage( "#homepage", { transition: "none"} ); 

 try{
	$( "#left-panel" ).panel( "close" );
	}catch(err) 
	{	}
	

}

function successHandler (result) {
	//alert('Callback Success! Result = '+result)
	}
function errorHandler(error) {
	 //alert(error);
	}

function receivedEvent(id) {
       

 var push = PushNotification.init({ "android": {"senderID": "1007552296317"}});
                     push.on('registration', function(data) {
                     
					 reg_id=data.registrationId;
                     });
          
                     push.on('notification', function(data) {
						alert(data.message);
					 
						//showInbox();
                     });
          
                     push.on('error', function(e) {
						//alert(e);
                     }
					);
    }

function getContacts(){


 try{
 var optFilter = new ContactFindOptions();
 optFilter.filter = "";  // to return all contacts
 optFilter.multiple = true; // return multiple results
 var fields = [navigator.contacts.fieldType.name,navigator.contacts.fieldType.phoneNumbers];
 
 // get all contacts
 navigator.contacts.find(fields,gcsSuccess, gcsError, optFilter);
 }
 catch(err)
 {
     txt="There was an error loading contacts.\n\n"; 
     txt+="Error description: " + err.message + "\n\n"; 
    // alert(txt); 
    
 }
}

/* get all contacts success */
function gcsSuccess(contacts){
 
 //alert("Contact sync start"+contacts.length);
 if( contacts.length != 0 ){
  // get formatted names and sort
  var names = new Array();
  var contactnos = new Array();
  
  
  for(var i=0; i<contacts.length; ++i){


   if( contacts[i].phoneNumbers == null )
            continue;

   
   
               
           
            
 

   
   if(contacts[i].name){
    var pname = contacts[i].displayName != null ? contacts[i].displayName: "No name";
     names.push(pname);
    
    }

   // display phone numbers
     if (contacts[i].phoneNumbers){
                              var pNumber = contacts[i].phoneNumbers[0].value; 
      
          contactnos.push(pNumber);
     

     }
   
  }
  names.sort();


  
 var contactstr='<label for="choosefrnd" class="select">Choose Friend:</label><select name="choosefrnd" id="choosefrnd"  onchange="if (this.selectedIndex) doSomething(this.selectedIndex);">';
  for(var i=0; i<names.length; ++i){
   contactstr += '<option value='+contactnos[i]+'>'+names[i]+'</option>';
  }
   contactstr += '</select>';

   //alert(contactstr);
   document.getElementById("allContacts").innerHTML=contactstr;

 } else document.getElementById("allContacts").innerHTML='No Contact';
}

/* get all contacts error */
function gcsError(contactError){
 navigator.notification.alert('Contacts Error');
}

function getContactno(i)
{
$('#search-mobile').val(phonenos.get(i));

}
function doSomething(str)
{
 
 var e = document.getElementById("choosefrnd");
    var strmob = e.options[e.selectedIndex].value;

 $('#giftmno').val(strmob);
 
}
function addincart(i)
{
	ids.push(i);
	cart.cartdata.push({ 
   "index":i,
   "url" : "https://vijayadairy.mloyalretail.com/"+jsonary[i].brand_logo,
   "BrandId" : jsonary[i].brand_id,
   "BrandName" : jsonary[i].brand_name,
   "BrandValue" : jsonary[i].gift_voucher_value,
   "BrandDescription":jsonary[i].brand_description,
   "Validity":jsonary[i].end_date,
    });
   
  indexary.push(jsonary[i].brand_id);
  
  $('#cartval').html(ids.length);
}


 $(document).on('tap', '#view_cart', function (e, ui) {

        checkout();
 
 
});


function checkout(){
   var offers='';
  for (var i=0;i<cart.cartdata.length;i++ )
  {
        offers = offers + cart.cartdata[i].BrandId + ',';
  }
  
        offers = offers.substring(0,offers.length-1);

  $.ajax({
    url: 'https://vijayadairy.mloyalretail.com/Rewards/complete.asp',
    type: 'GET',
    timeout: 50000,
    dataType: 'text', //xml/html/script/json/jsonp
    data: {'mobileno': user.mobile, 'offers': offers,'redeemval':'0'},
    success: function(data, textStatus, xhr) {
   
	
    var $popUp = $("<div/>").popup({
        dismissible: false,
        theme: "b",
        overlyaTheme: "b",
        transition: "pop"
    }).on("popupafterclose", function () {
        //remove the popup when closing

        $(this).remove();
        ids.length = 0;
		cart.cartdata.length = 0;
		indexary.length = 0;
		showHome();
		
		
		
        
    }).css({
            'width': '270px',
            'height': '200px',
            'padding': '5px',
			'text-shadow':'none',
			//'background': '#58b7e4 url(\'../img/background-1024x600.jpg\') 50% 50% no-repeat fixed'
			'background': '#3B7BEE'
    });
    //create a title for the popup
    $("<h2/>", {
        text: "Response!"
    }).appendTo($popUp);

    //create a message for the popup

		 $("<p/>", {
		
				 text: data+'\n'
		

		 }).appendTo($popUp);
	
  
    //create a back button
    $("<a>", {
        text: "Close",
            "data-rel": "back"
    }).buttonMarkup({
        inline: false,
        mini: false,
        theme: "b",
        icon: "back"
    }).appendTo($popUp);

    $popUp.popup('open').trigger("create");
    	
    },
    error: function(xhr, textStatus, errorThrown) {
	
	
	alert('Could not connect to Server, make sure you are connected to Internet');
   
    }
  });
 
}

function getVoucher(id,val){

  
  
  $.ajax({
    url: 'https://vijayadairy.mloyalretail.com/Rewards/complete.asp',
    type: 'GET',
    timeout: 50000,
    dataType: 'text', //xml/html/script/json/jsonp
    data: {'mobileno': user.mobile, 'offers': id,'redeemval':val},
    success: function(data, textStatus, xhr) {
   
	
    var $popUp = $("<div/>").popup({
        dismissible: false,
        theme: "b",
        overlyaTheme: "b",
        transition: "pop"
    }).on("popupafterclose", function () {
        //remove the popup when closing

        $(this).remove();
        ids.length = 0;
		cart.cartdata.length = 0;
		indexary.length = 0;
		showHome();
		
		
		
        
    }).css({
            'width': '270px',
            'height': '200px',
            'padding': '5px',
			'text-shadow':'none',
			//'background': '#58b7e4 url(\'../img/background-1024x600.jpg\') 50% 50% no-repeat fixed'
			'background': '#3B7BEE'
    });
    //create a title for the popup
    $("<h2/>", {
        text: "Response!"
    }).appendTo($popUp);

    //create a message for the popup

		 $("<p/>", {
		
				 text: data+'\n'
		

		 }).appendTo($popUp);
	
  
    //create a back button
    $("<a>", {
        text: "Close",
            "data-rel": "back"
    }).buttonMarkup({
        inline: false,
        mini: false,
        theme: "b",
        icon: "back"
    }).appendTo($popUp);

    $popUp.popup('open').trigger("create");
    	
    },
    error: function(xhr, textStatus, errorThrown) {
	
	
	alert('Could not connect to Server, make sure you are connected to Internet');
   
    }
  });
 
}

function showPOPup()
{

	var $popUp = $("<div/>").popup({
        dismissible: false,
        theme: "b",
        overlyaTheme: "b",
        transition: "pop"
    }).on("popupafterclose", function () {
        //remove the popup when closing

        $(this).remove();
        ids.length = 0;
		cart.cartdata.length = 0;
		indexary.length = 0;
		showHome();
		
		
		
        
    }).css({
            'width': '270px',
            'height': '200px',
            'padding': '5px',
			'text-shadow':'none',
			//'background': '#58b7e4 url(\'../img/background-1024x600.jpg\') 50% 50% no-repeat fixed'
			'background': '#3B7BEE'
    });
    //create a title for the popup
    $("<h2/>", {
        text: "Response!"
    }).appendTo($popUp);

    //create a message for the popup

		 $("<p/>", {
		
				 text: 'Please wait...'+'\n'
		

		 }).appendTo($popUp);
	
  
    //create a back button
    

    $popUp.popup('open').trigger("create");

}


function giftfriend(){
  var to_mob=$('#giftmno').val();
  var val=$('#giftpt').val();
  $.ajax({
    url: 'https://vijayadairy.mloyalretail.com/m/gift_points_api.asp',
    type: 'GET',
    timeout: 50000,
    dataType: 'text', //xml/html/script/json/jsonp
    data: {'mobileno': user.mobile, 'tomobileno': to_mob,'gift_points':val},
    success: function(data, textStatus, xhr) {
   
	
    var $popUp = $("<div/>").popup({
        dismissible: false,
        theme: "b",
        overlyaTheme: "b",
        transition: "pop"
    }).on("popupafterclose", function () {
        //remove the popup when closing

        $(this).remove();
        ids.length = 0;
		cart.cartdata.length = 0;
		indexary.length = 0;
		showHome();
		
		
		
        
    }).css({
            'width': '270px',
            'height': '200px',
            'padding': '5px',
			'text-shadow':'none',
			//'background': '#58b7e4 url(\'../img/background-1024x600.jpg\') 50% 50% no-repeat fixed'
			'background': '#3B7BEE'
    });
    //create a title for the popup
    $("<h2/>", {
        text: "Response!"
    }).appendTo($popUp);

    //create a message for the popup

		 $("<p/>", {
		
				 text: data+'\n'
		

		 }).appendTo($popUp);
	
  
    //create a back button
    $("<a>", {
        text: "Close",
            "data-rel": "back"
    }).buttonMarkup({
        inline: false,
        mini: false,
        theme: "b",
        icon: "back"
    }).appendTo($popUp);

    $popUp.popup('open').trigger("create");
    	
    },
    error: function(xhr, textStatus, errorThrown) {
	
	
	alert('Could not connect to Server, make sure you are connected to Internet');
   
    }
  });
 
}

function showRecharge()
{

	var $popUp = $("<div/>").popup({
        dismissible: false,
        theme: "b",
        overlayTheme: "b",
        transition: "pop"
    }).on("popupafterclose", function () {
        //remove the popup when closing

        
		
		
        
    }).css({
            'width': '270px',
            'height': '200px',
            'padding': '5px',
			'text-shadow':'none',
			//'background': '#58b7e4 url(\'../img/background-1024x600.jpg\') 50% 50% no-repeat fixed'
			'background': '#3B7BEE'
    });
    //create a title for the popup
    $("<h2/>", {
        text: "Response!"
    }).appendTo($popUp);

    //create a message for the popup

		 $("<p/>", {
		
				 text: 'Coming Soon...'+'\n'
		

		 }).appendTo($popUp);
	
  
    //create a back button
    //create a back button
    $("<a>", {
        text: "Close",
            "data-rel": "back"
    }).buttonMarkup({
        inline: false,
        mini: false,
        theme: "b",
        icon: "back"
    }).appendTo($popUp);

    $popUp.popup('open').trigger("create");

}

function RewardsNA()
{

	var $popUp = $("<div/>").popup({
        dismissible: false,
        theme: "b",
        overlayTheme: "b",
        transition: "pop"
    }).on("popupafterclose", function () {
        //remove the popup when closing

        
		
		
        
    }).css({
            'width': '270px',
            'height': '200px',
            'padding': '5px',
			'text-shadow':'none',
			//'background': '#58b7e4 url(\'../img/background-1024x600.jpg\') 50% 50% no-repeat fixed'
			'background': '#69534A'
    });
    //create a title for the popup
    $("<h2/>", {
        text: "Response!"
    }).appendTo($popUp);

    //create a message for the popup

		 $("<p/>", {
		
				 text: 'RewardStore is coming soon.\n'
		

		 }).appendTo($popUp);
	
  
    //create a back button
    //create a back button
    $("<a>", {
        text: "Close",
            "data-rel": "back"
    }).buttonMarkup({
        inline: false,
        mini: false,
        theme: "b",
        icon: "back"
    }).appendTo($popUp);

    $popUp.popup('open').trigger("create");

}

$(document).bind('keydown', function(event) {

  if (event.keyCode == 27) { // 27 = 'Escape' keyCode (back button)
    event.preventDefault();
  }
});

function shareApp()
{
	window.plugins.socialsharing.share('Hi, Join Arvind Dairy Foods.', null, 'https://taghash.co/shareimg/arvinddairy.jpg', 'https://vijayadairy.mloyalretail.com/mapp');
}

function rateApp()
{
	var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
		 if (deviceType=='iPad' || deviceType=='iPhone') 
			 {
                //window.open('itms-apps://itunes.apple.com/us/app/domainsicle-domain-name-search/id511364723?ls=1&mt=8'); // or itms://
				window.open('http://180.179.202.114:82/mloyaliphone.jsp?brandname='+brandname);
			 } 
		 else if (deviceType=='Android') 
			 {
               window.open("market://details?id=com.mobiquest.arvinddairy","_system");
				//window.open('http://180.179.202.114:82/mloyalandroid.jsp?brandname='+brandname);
             }
		else if (deviceType=='BlackBerry')
			{
                //window.open('http://appworld.blackberry.com/webstore/content/<applicationid>');
				window.open('http://180.179.202.114:82/mloyalbb.jsp?brandname='+brandname);
            }
}

// onSuccess Geolocation
    //
    function onGeoSuccess(position) {
       /* var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + new Date(position.timestamp)          + '<br />';*/
	 var latlng = position.coords.latitude+','+position.coords.longitude;
	 showTabContent_Map1(latlng);
							
    }

    // onError Callback receives a PositionError object
    //
    function onGeoError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

function getNearStores(){
     navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
	 
}

function showPopuppage4(){
$.mobile.changePage( "#popuppage4", { transition: "slide"} ); 
	showTabContent('popuppage4', 'cpns_history_json.asp');
	
	
}

function showshoplinks(str)
{
 $.mobile.changePage( "#innershop", {transition: "flip"} );
 var the_height = ($(window).height() - $(this).find('[data-role="header"]').height());
 var the_width = $(window).width();
 var str1='';
	if(str=='S1')
	{
	//openInWebView('http://www.damilano.com/women');
	str1='<embed src="http://skrestaurants.com/brandpage.aspx?bid=1" width='+the_width+' height='+the_height+' /></embed>';
	}
	else if(str=='S2')
	{
	str1='<embed src="http://skrestaurants.com/brandpage.aspx?bid=5" width='+the_width+' height='+the_height+' /></embed>';
	//openInWebView('http://www.damilano.com/men');
	}
	else if(str=='S3')
	{
	str1='<embed src="http://skrestaurants.com/brandpage.aspx?bid=7" width='+the_width+' height='+the_height+' /></embed>';
	//openInWebView('http://www.damilano.com/leather-accessories');
	}
	else if(str=='S4')
	{
	str1='<embed src="http://skrestaurants.com/brandpage.aspx?bid=9" width='+the_width+' height='+the_height+' /></embed>';
	//openInWebView('http://www.damilano.com/business-essentials');
	}
	else if(str=='S5')
	{
	str1='<embed src="http://skrestaurants.com/brandpage.aspx?bid=11" width='+the_width+' height='+the_height+' /></embed>';
	//openInWebView('http://www.damilano.com/travel');
	}
	else if(str=='S6')
	{
	str1='<embed src="http://skrestaurants.com/brandpage.aspx?bid=4" width='+the_width+' height='+the_height+' /></embed>';
	//openInWebView('http://www.damilano.com/home-195');
	}
	else if(str=='S7')
	{
	str1='<embed src="http://skrestaurants.com/brandpage.aspx?bid=6" width='+the_width+' height='+the_height+' /></embed>';
	//openInWebView('http://www.damilano.com/');
	}
    else if(str=='S8')
	{
	str1='<embed src="http://skrestaurants.com/brandpage.aspx?bid=8" width='+the_width+' height='+the_height+' /></embed>';
	//openInWebView('http://www.damilano.com/');

	}
	else if(str=='S9')
	{
	str1='<embed src="http://skrestaurants.com/brandpage.aspx?bid=10" width='+the_width+' height='+the_height+' /></embed>';
	//openInWebView('http://www.damilano.com/');
	}
    else if(str=='S10')
	{
	str1='<embed src="http://skrestaurants.com/brandpage.aspx?bid=12" width='+the_width+' height='+the_height+' /></embed>';
	//openInWebView('http://www.damilano.com/');

	}

	document.getElementById("barcontentinnershop").innerHTML='<img src="img/batch_mem.png" class="batch_mem"><span class="mem_wel_msg">Hi '+user.firstname+'!</span>';
    $("#innerdata").html(str1);
 //$("#innershop .ui-content").html(str1);
}

function showFbNew_1()
{
	var ref = window.open('https://www.facebook.com/arvinddairyGroup', '_blank');
}

function showTwitterNew_1()
{
	var ref = window.open('https://twitter.com/arvinddairyGroup', '_blank');
}

function showInstagramNew_1()
{
	var ref = window.open('https://www.instagram.com/arvinddairy_group', '_blank');
}


function showFbNew(){

	$("#navBdr_twitter").css('display', 'none');
    $("#navBdr_facebook").css('display', 'block');
    $("#navBdr_pinterest").css('display', 'none');
    $("#navBdr_instagram").css('display', 'none');

	$("#TWITTER").css('display', 'none');
    $("#FACEBOOK").css('display', 'block');
    $("#INSTAGRAM").css('display', 'none');
    $("#PINTEREST").css('display', 'none');

	$.mobile.changePage( "#socialpg", { transition: "none"} ); 
	//showTabContentRSS('socialwall_facebook', json_fb);
	
}

function showTwitterNew(){

	$("#navBdr_twitter").css('display', 'block');
    $("#navBdr_facebook").css('display', 'none');
    $("#navBdr_pinterest").css('display', 'none');
    $("#navBdr_instagram").css('display', 'none');

	$("#TWITTER").css('display', 'block');
    $("#FACEBOOK").css('display', 'none');
    $("#INSTAGRAM").css('display', 'none');
    $("#PINTEREST").css('display', 'none');

	$.mobile.changePage( "#socialpg", { transition: "none"} ); 
	showTabContentRSS('socialwall_twitter', RSS_twitter);
    
}

function showInstagramNew(){

	$("#navBdr_twitter").css('display', 'none');
    $("#navBdr_facebook").css('display', 'none');
    $("#navBdr_pinterest").css('display', 'none');
    $("#navBdr_instagram").css('display', 'block');

	$("#TWITTER").css('display', 'none');
    $("#FACEBOOK").css('display', 'none');
    $("#INSTAGRAM").css('display', 'block');
    $("#PINTEREST").css('display', 'none');
	
	$.mobile.changePage( "#socialpg", { transition: "none"} ); 
	//showTabContentRSS('socialwall_instagram', RSS_instagram);

	$.instagramFeed({
		'username': 'arvinddairy',
		'get_raw_json': true,
		'callback': displayInstagram
	});
   
  
}

function displayInstagram(json)
{
	//console.log('instagram1:'+json);

	renderTemplate('socialwall_instagram',json);
}

function showYoutubeNew(){

    openInWebView('https://www.youtube.com/');
  
}

function showPinterestNew(){
	
	$("#navBdr_twitter").css('display', 'none');
    $("#navBdr_facebook").css('display', 'none');
    $("#navBdr_pinterest").css('display', 'block');
    $("#navBdr_instagram").css('display', 'none');

	$("#TWITTER").css('display', 'none');
    $("#FACEBOOK").css('display', 'none');
    $("#INSTAGRAM").css('display', 'none');
    $("#PINTEREST").css('display', 'block');

	$.mobile.changePage( "#socialpg", { transition: "none"} );
	showTabContentRSS('socialwall_pinterest', RSS_pinterest);
	
}


function showShop()
{
    //openInWebView('https://www.arvinddairy.in/');
	var ref = window.open('https://www.arvinddairy.in/', '_blank');
   
}

function showShop11()
{

    $.mobile.changePage( "#feedback", { transition: "none"} );
   
}

function loadLocation()
{
   var cityid='';
   $.ajax({
   
   url: SERVER+'store_locator_json.asp',
   type: 'GET',
   timeout: 50000,
    dataType: 'json',
    data: {'city': cityid},
    complete: function(xhr, textStatus) {
    },
    success: function(data, textStatus, xhr) {
  
   
        var listItems= "";
			listItems+= "<option value='0'>--Select--</option>";
        for (var i = 0; i < data.length; i++)
			{
				if(data[i].storename.indexOf('Email Admin')==0 || data[i].storename.indexOf('ONLINE')==0 || data[i].storename.indexOf('online')==0 || data[i].storename.indexOf('Paytm App Store')==0 || data[i].storename.indexOf('ShortCode')==0 || data[i].storename.indexOf('Mobile App')==0 || data[i].storename.indexOf('Paytm Store')==0|| data[i].storename.indexOf('MicroSite')==0|| data[i].storename.indexOf('test')==0)
				continue;

                listItems+= "<option value='" + data[i].storeid + "'>" + data[i].storename + "</option>";
             } 
      
	  $("#bill_loc").html(listItems);
   
   
    },
    error: function(xhr, textStatus, errorThrown) {
 
    }
  });
	 
	 
}

function drawMap(latlng,index) {
    
        var myOptions = {
            zoom: 2,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP 
        };
   

   var bounds = new google.maps.LatLngBounds();
        var map = new google.maps.Map(document.getElementById('map-canvas'+index), myOptions);
        // Add an overlay to the map of current lat/lng
        var pinColor = "FE7569";
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                new google.maps.Size(40, 37),
                new google.maps.Point(0, 0),
                new google.maps.Point(12, 35));



        bounds.extend(latlng);
        var markercurr = new google.maps.Marker({
            position: latlng,
            map: map,
            title: 'Current Position!!!',
            icon: pinImage,
            shadow: pinShadow

        });
        map.fitBounds(bounds);
    }

function purchaseHistory()
{
	var pop = document.getElementById('purchaseHistory');

	if(pop.style.display=='block')
	{
		pop.style.display = 'none';
	}
    else
	{
		pop.style.display = 'block';
		var pop1 = document.getElementById('redeemHistory');
		var pop2 = document.getElementById('bonusHistory');
		pop1.style.display = 'none';
		pop2.style.display = 'none';
	}
}

function redeemHistory()
{
	var pop = document.getElementById('redeemHistory');
	if(pop.style.display=='block')
	{
		pop.style.display = 'none';
	}
    else
	{
		pop.style.display = 'block';
		var pop1 = document.getElementById('purchaseHistory');
		var pop2 = document.getElementById('bonusHistory');
		pop1.style.display = 'none';
		pop2.style.display = 'none';
	}
}

function bonusHistory()
{
	var pop = document.getElementById('bonusHistory');
	if(pop.style.display=='block')
	{
		pop.style.display = 'none';
	}
    else
	{
		pop.style.display = 'block';
		var pop1 = document.getElementById('purchaseHistory');
		var pop2 = document.getElementById('redeemHistory');
		pop1.style.display = 'none';
		pop2.style.display = 'none';
	}
}

var toast = function (msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h5>" + msg + "</h5></div>")
            .css({display: "block",
                opacity: 0.97,
                position: "fixed",
                padding: "7px",
                "text-align": "center",
                width: "270px",
                background: "#3295cd",
                "text-shadow": "none",
                "color": "#ffffff",
                left: ($(window).width() - 284) / 2,
                top: $(window).height() / 2})
            .appendTo($.mobile.pageContainer).delay(1500)
            .fadeOut(400, function () {
                $(this).remove();
            });
}

var toast2 = function (msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h5>" + msg + "</h5></div>")
            .css({display: "block",
                opacity: 0.97,
                position: "fixed",
                padding: "7px",
                "text-align": "center",
                width: "270px",
                background: "#3295cd",
                "text-shadow": "none",
                "color": "#ffffff",
                left: ($(window).width() - 284) / 2,
                top: $(window).height() / 2})
            .appendTo($.mobile.pageContainer).delay(1500)
            .fadeOut(1400, function () {
                $(this).remove();
            });
}


function capturePhoto1()
{
    
			$("input[type=file]").trigger("click");
		
}

$("input[type=file]").change(function(){
			
    
    var aFormData = new FormData();
    
  // alert($("input[type=file]")[0].files[0]);

    aFormData.append("filename", $("input[type=file]")[0].files[0]);
    
    

	aFormData.append("mobile", localStorage.getItem("usernamearvinddairy"));
    aFormData.append("brand", "arvinddairy");
     

	
	$.ajax(
    {
      url         : "http://103.25.128.61:9296/mloyalfileupload/fileupload1.php",
      type        : "POST",
      contentType : false,
      processData : false,
      data        : aFormData,
      success     : 
        function(data)
        {

		  toast("Your picture has been updated..Please reload page to see changes");
   
         document.getElementById("cardImagemenu").src='https://taghash.co/mloyalfileupload/uploads/arvinddairy_'+localStorage.getItem("usernamearvinddairy")+'.jpg';
      //   document.getElementById("cardImage").src='http://103.25.128.61:9296/mloyalfileupload/uploads/arvinddairy_'+localStorage.getItem("usernamearvinddairy")+'.jpg';
        }
    });

	

});


function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

	

    return http.status != 404;

}

function tokenHandler(result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    reg_id = result;
    localStorage.setItem("deviceid",reg_id);
    //alert(reg_id);
}

function openBrowser(url)
 {
	
          //var ref = window.open(url, '_blank', 'location=yes,toolbar=yes');
		  cordova.ThemeableBrowser.open(url, '_blank', {
               backButtonCanClose: true,
    statusbar: {
        color: '#482a1f'
    },
    toolbar: {
        height: 75,
        color: '#482a1f'
    },
    title: {
        color: '#ffffff',
  staticText: '', 
        showPageTitle: false
    },
    backButton: {
        wwwImage: '',
        wwwImagePressed: '',
        align: 'left',
        event: ''
    },
    forwardButton: {
        wwwImage: '',
        wwwImagePressed: '',
        align: 'center',
        event: ''
    },
    closeButton: {
        wwwImage: 'img/leftMenu_back.png',
        wwwImagePressed: 'img/leftMenu_back.png',
        align: 'left',
  marginLeft: '15px',
        event: ''
    },
    customButtons: [
        {
            image: 'share',
            imagePressed: 'share_pressed',
            align: 'right',
            event: 'sharePressed'
        }
    ],
    menu: {
        image: 'menu',
        imagePressed: 'menu_pressed',
        title: 'Test',
        cancel: 'Cancel',
        align: 'right',
        items: [
           /* {
                event: 'helloPressed',
                label: 'Hello World!'
            },
            {
                event: 'testPressed',
                label: 'Test!'
            }*/
        ]
    },
    backButtonCanClose: true
}).addEventListener('backPressed', function(e) {
    //alert('back pressed');
}).addEventListener('helloPressed', function(e) {
    //alert('hello pressed');
}).addEventListener('sharePressed', function(e) {
    //alert(e.url);
}).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
    console.error(e.message);
}).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
    console.log(e.message);
});


}

function logoutApp()
{
	localStorage.removeItem("usernamearvinddairy");
	localStorage.removeItem("passwordarvinddairy");
	localStorage.removeItem("profiledone_arvinddairy");
	localStorage.removeItem("cattype_ad");
	
    user.mobile='';

	$.mobile.changePage('#selectcategorypage');
}

function capturePhotopopup()
{
	$("#popupforPic").popup();
	$("#popupforPic").popup("open");
}

function capturePhotonew()
{
	//$("#popupforPic").popup("close");

	if(user.mobile==null || user.mobile=='')
	{
		$.mobile.changePage( "#myaccount", { transition: "none"} );
		toast('Login to upload image..');
	}
	else
	{
		navigator.camera.getPicture(uploadPhoto, onFail, { quality: 40,destinationType: navigator.camera.DestinationType.FILE_URI });
	}
}

function uploadFromGallery() 
{
	//$("#popupforPic").popup("close");

	if(user.mobile==null || user.mobile=='')
	{
		$.mobile.changePage( "#myaccount", { transition: "none"} );
		toast('Login to upload image..');
	}
	else
	{
		navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,destinationType: navigator.camera.DestinationType.FILE_URI,sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
	}

}

function uploadPhoto(imageURI) {

				//$("#wait").css("display", "block");

				toast('Uploading photo..Please wait');

				//document.getElementById("upload_btn").disabled = true;

				var b_Image = document.getElementById('cardImagemenu');
				b_Image.style.display = 'block';
				b_Image.src = imageURI;


				var options = new FileUploadOptions();
				options.fileKey="file";
				var fName='arvinddairy_'+user.mobile;
				options.fileName= fName;
				options.mimeType="image/jpeg";
				options.mimeType="image/png";
				//filenm='http://taghash.co/viviana/uploads/'+options.fileName;
				filenm=options.fileName+".jpg";
				var params = {};
				params.value1 = "test";
				params.value2 = "param";
            
                options.params = params;

				var ft = new FileTransfer();

				ft.upload(imageURI, encodeURI("https://taghash.co/mloyalfileupload/fileupload1.php"), win, fail, options, true);
			}

			function win(r) {
				toast('Photo uploaded sucessfully');
			}

			function fail(error) {
				toast("There was an error uploading image");
			}

function onFail(message)
{
	toast('Failed because: ' + message);
}

function showpass1(str)
{

  //var input = $("#password_myacc");
  var input = $('#'+str+'');

  if (input.attr("type") === "password") 
  {
      input.attr("type", "text");
  } 
  else 
  {
      input.attr("type", "password");
  }
}

/* new */

function getCodeBoxElement(index) {
        return document.getElementById('codeBox' + index);
      }
      function onKeyUpEvent(index, event) {
        const eventCode = event.which || event.keyCode;
        if (getCodeBoxElement(index).value.length === 1) {
          if (index !== 6) {
            getCodeBoxElement(index+ 1).focus();
          } else {
            getCodeBoxElement(index).blur();
            // Submit code
            console.log('submit code ');
          }
        }
        if (eventCode === 8 && index !== 1) {
          getCodeBoxElement(index - 1).focus();
        }
      }
      function onFocusEvent(index) {
        for (item = 1; item < index; item++) {
          const currentElement = getCodeBoxElement(item);
          if (!currentElement.value) {
              currentElement.focus();
              break;
          }
        }
      }	
      function getDealerCodeBoxElement(index) {
        return document.getElementById('dealercodeBox' + index);
      }
      function onDealerKeyUpEvent(index, event) {
        const eventCode = event.which || event.keyCode;
        if (getDealerCodeBoxElement(index).value.length === 1) {
          if (index !== 6) {
            getDealerCodeBoxElement(index+ 1).focus();
          } else {
            getDealerCodeBoxElement(index).blur();
            // Submit code
            console.log('submit code ');
          }
        }
        if (eventCode === 8 && index !== 1) {
          getDealerCodeBoxElement(index - 1).focus();
        }
      }
      function onDealerFocusEvent(index) {
        for (item = 1; item < index; item++) {
          const currentElement = getDealerCodeBoxElement(item);
          if (!currentElement.value) {
              currentElement.focus();
              break;
          }
        }
      }	
	
	 function addFields_old(){
			  
			  $(".my_order_form").append(`<div class="my_order_row d-flex align-items-center justify-content-between mt-20">
					  	<div class="sel_brand">
							<select name="" id="" data-role="none">
								<option value="">SELECT BRAND</option>
								<option value="">BRAND 1</option>
								<option value="">BRAND 2</option>
								<option value="">BRAND 3</option>
								<option value="">BRAND 4</option>
							</select>  
						</div>
					  	<div class="sel_qty">
							 <button  onclick="addProduct(this)" class="spinner_button plus" data-role="none"></button>	
							<input type="number" min="0" class="sel_b_qty" placeholder="QUANTITY" data-role="none">
							<button  onclick="removeProduct(this)" data-role="none" class="spinner_button minus" ></button>	
						 </div>
					  </div>`)
		  }
		
			
			 $(document).on('pageshow', "#showroom_details", function(){

          $("#showroom-gallery").lightSlider().destroy();

                  $("#showroom-gallery").lightSlider({          
              //pager: false,
          item:1,
          
          thumbItem:5,
          
          gallery:true,
          
          pager:false,
          auto:false,
          freeMove:false,
          controls:true,
                  onSliderLoad: function() {
                      $('#showroom-gallery').removeClass('cS-hidden');

                }  
        }); 

        
        });
    
			
			$(document).on('pageshow', "#scan_history", function() {
				$("#scan_cards").lightSlider({					
        			//pager: false,
					item:1.3,
					slideMargin:10,
					speed:1000,
					gallery:true,
					pause:3500,
					pager:false,
					auto:true,
					freeMove:false,
					controls:false,
					gallery:false,
                	onSliderLoad: function() {
                    	$('#scan_cards').removeClass('cS-hidden');
                }  
				}); 
			  });
			         
				$(document).on("pageshow", "#slidepage", function() {
					var slider = 	$('#sliderA').lightSlider({
					item:1,
					slideMargin:0,
					speed:1000,
					gallery:false,
					pause:800,
					pager:true,
					auto:false,
					freeMove:true,
					loop:false,
					controls:false,
                	onSliderLoad: function() {
                    	$('#sliderA').removeClass('cS-hidden');
                }  
				});  
				
					$("#nextBtn_slider").on("click", function(){
						var total_slide = slider.getTotalSlideCount();
						var current_slide = slider.getCurrentSlideCount();
						if (total_slide!=current_slide) {
							slider.goToNextSlide();
						}						
						else {
							$.mobile.changePage( "#login_pg", { transition: "flip"} );
						}
						
						
					})
					
				});
			$(document).on("pageshow", "#scan_redeem", function(){
				setTimeout(function(){				
					$("#scan_details").popup("open", {
					  positionTo: "window"
					});
				}, 10);
			})
			$(document).on("pageshow", "#scan_gift", function(){
				setTimeout(function(){				
					$("#scan_details_gift").popup("open", {
					  positionTo: "window"
					});
				}, 10);
			})
	
			$(document).on("pageshow", function(){				
				setTimeout(function(){
					$("#sidebar").show();
					$("#sidebar").enhanceWithin().panel();
				},1000)				
			})
      
       $('input[type=radio][name=input_email_statement]').change(function() {
        if (this.value == 'selectduration') {
           $("#dateduration").show();
        }
        else {
            $("#dateduration").hide();
        }
    });
//
//	$('input[type=radio][name=filter_transaction]').change(function() {
//        
//		   if(localStorage.getItem("usermtype_goldmedal")=='Retailer')
//		       
//		   else		   	   
//            $("#filter_panel").toggle();
//        
//    });
//	$('input[type=radio][name=filter_transaction1]').change(function() {
//        
//			getdealer_retailertrans(this.value);
//            $("#filter_panel1").toggle();
//        
//    });
	
	 function getCodeBoxElement(index) {
        return document.getElementById('codeBox' + index);
      }
      function onKeyUpEvent(index, event) {
        const eventCode = event.which || event.keyCode;
        if (getCodeBoxElement(index).value.length === 1) {
          if (index !== 6) {
            getCodeBoxElement(index+ 1).focus();
          } else {
            getCodeBoxElement(index).blur();
            // Submit code
            console.log('submit code ');
          }
        }
        if (eventCode === 8 && index !== 1) {
          getCodeBoxElement(index - 1).focus();
        }
      }
      function onFocusEvent(index) {
        for (item = 1; item < index; item++) {
          const currentElement = getCodeBoxElement(item);
          if (!currentElement.value) {
              currentElement.focus();
              break;
          }
        }
      }	
      function getDealerCodeBoxElement(index) {
        return document.getElementById('dealercodeBox' + index);
      }
      function onDealerKeyUpEvent(index, event) {
        const eventCode = event.which || event.keyCode;
        if (getDealerCodeBoxElement(index).value.length === 1) {
          if (index !== 6) {
            getDealerCodeBoxElement(index+ 1).focus();
          } else {
            getDealerCodeBoxElement(index).blur();
            // Submit code
            console.log('submit code ');
          }
        }
        if (eventCode === 8 && index !== 1) {
          getDealerCodeBoxElement(index - 1).focus();
        }
      }
      function onDealerFocusEvent(index) {
        for (item = 1; item < index; item++) {
          const currentElement = getDealerCodeBoxElement(item);
          if (!currentElement.value) {
              currentElement.focus();
              break;
          }
        }
      }	
	
	 function addFields_old(){
			  
			  $(".my_order_form").append(`<div class="my_order_row d-flex align-items-center justify-content-between mt-20">
					  	<div class="sel_brand">
							<select name="" id="" data-role="none">
								<option value="">SELECT BRAND</option>
								<option value="">BRAND 1</option>
								<option value="">BRAND 2</option>
								<option value="">BRAND 3</option>
								<option value="">BRAND 4</option>
							</select>  
						</div>
					  	<div class="sel_qty">
							 <button  onclick="addProduct(this)" class="spinner_button plus" data-role="none"></button>	
							<input type="number" min="0" class="sel_b_qty" placeholder="QUANTITY" data-role="none">
							<button  onclick="removeProduct(this)" data-role="none" class="spinner_button minus" ></button>	
						 </div>
					  </div>`)
		  }
		
			
			 $(document).on('pageshow', "#showroom_details", function(){

          $("#showroom-gallery").lightSlider().destroy();

                  $("#showroom-gallery").lightSlider({          
              //pager: false,
          item:1,
          
          thumbItem:5,
          
          gallery:true,
          
          pager:false,
          auto:false,
          freeMove:false,
          controls:true,
                  onSliderLoad: function() {
                      $('#showroom-gallery').removeClass('cS-hidden');

                }  
        }); 

        
        });
    
			
			$(document).on('pageshow', "#scan_history", function() {
				$("#scan_cards").lightSlider({					
        			//pager: false,
					item:1.3,
					slideMargin:10,
					speed:1000,
					gallery:true,
					pause:3500,
					pager:false,
					auto:true,
					freeMove:false,
					controls:false,
					gallery:false,
                	onSliderLoad: function() {
                    	$('#scan_cards').removeClass('cS-hidden');
                }  
				}); 
			  });
			         
				$(document).on("pageshow", "#slidepage", function() {
					var slider = 	$('#sliderA').lightSlider({
					item:1,
					slideMargin:0,
					speed:1000,
					gallery:false,
					pause:800,
					pager:true,
					auto:false,
					freeMove:true,
					loop:false,
					controls:false,
                	onSliderLoad: function() {
                    	$('#sliderA').removeClass('cS-hidden');
                }  
				});  
				
					$("#nextBtn_slider").on("click", function(){
						var total_slide = slider.getTotalSlideCount();
						var current_slide = slider.getCurrentSlideCount();
						if (total_slide!=current_slide) {
							slider.goToNextSlide();
						}						
						else {
							$.mobile.changePage( "#login_pg", { transition: "flip"} );
						}
						
						
					})
					
				});
			$(document).on("pageshow", "#scan_redeem", function(){
				setTimeout(function(){				
					$("#scan_details").popup("open", {
					  positionTo: "window"
					});
				}, 10);
			})
			$(document).on("pageshow", "#whatsnew", function(){
				var _owl2 = $(".whats_new_slider");
					_owl2.owlCarousel({
						items:1,
						loop:false,
						margin:0,
						//merge:true,
						nav:false,
						dots:false,
						autoplay:true,
						autoWidth:false,
						navText: ['<','>']
					});
				
			})
			$(document).on("pageshow", "#product_launch", function(){
				var _owl2 = $(".whats_new_slider");
					_owl2.owlCarousel({
						items:1,
						loop:false,
						margin:0,
						//merge:true,
						nav:false,
						dots:false,
						autoplay:false,
						autoWidth:false,
						navText: ['<','>']
					});
				
			})
			$(document).on("pageshow", "#scan_gift", function(){
				setTimeout(function(){				
					$("#scan_details_gift").popup("open", {
					  positionTo: "window"
					});
				}, 10);
			})
	
			$(document).on("pageshow", function(){				
				setTimeout(function(){
					$("#sidebar").show();
					$("#sidebar").enhanceWithin().panel();
				},1000)				
			})
      
       $('input[type=radio][name=input_email_statement]').change(function() {
        if (this.value == 'selectduration') {
           $("#dateduration").show();
        }
        else {
            $("#dateduration").hide();
        }
    });
//
//	$('input[type=radio][name=filter_transaction]').change(function() {
//        
//		   if(localStorage.getItem("usermtype_goldmedal")=='Retailer')
//		       
//		   else		   	   
//            $("#filter_panel").toggle();
//        
//    });
//	$('input[type=radio][name=filter_transaction1]').change(function() {
//        
//			getdealer_retailertrans(this.value);
//            $("#filter_panel1").toggle();
//        
//    });
	
	 function toggleDD(e){
            //console.log(e);
            //e.stopPropagation();          
            $(e).toggleClass("open");
            $(e).next(".sub_menu").slideToggle();
        }
	
		function removeProduct(e){
			e.parentNode.querySelector('input[type=number]').stepDown();		
		}
		function addProduct(e){
			e.parentNode.querySelector('input[type=number]').stepUp();
		}

	function gotomembership()
	{

		$("#message").css('display', 'none');
		$("#membership").css('display', 'block');
		$("#rewards").css('display', 'none');
		$("#points").css('display', 'none');

		//$("#sidebar").panel("close");
		renderTemplatedetail('aboutus');
		$.mobile.changePage( "#my_membership", { transition: "none"} );	
		$("#contest_tabs").tabs( "option", "active", 0 );		
	}


	function gotomessages()
	{
		$("#message").css('display', 'block');
		$("#membership").css('display', 'none');
		$("#rewards").css('display', 'none');
		$("#points").css('display', 'none');

		//$('a[href="#weekly"]').trigger("click");	
		//$("#sidebar").panel("close")
		$.mobile.changePage( "#my_membership", { transition: "none"} );
		showTabContent('inbox', 'msg_history_json.asp');
		$("#contest_tabs").tabs( "option", "active", 1 );
	}
	
	function gotopoints()
	{

		$("#message").css('display', 'none');
		$("#membership").css('display', 'none');
		$("#rewards").css('display', 'none');
		$("#points").css('display', 'block');

		//$('a[href="#monthly"]').trigger("click");	
		//$("#sidebar").panel("close")
		$.mobile.changePage( "#my_membership", { transition: "none"} );
		showTabContent('loyaltynew', 'points_history_json.asp');
		$("#contest_tabs").tabs( "option", "active", 2 );
	}
	function gotorewards()
	{

		$("#message").css('display', 'none');
		$("#membership").css('display', 'none');
		$("#rewards").css('display', 'block');
		$("#points").css('display', 'none');

		//$('a[href="#monthly"]').trigger("click");	
		//$("#sidebar").panel("close")
		$.mobile.changePage( "#my_membership", { transition: "none"} );
		showTabContent('coupons', 'cpns_history_json.asp');
		$("#contest_tabs").tabs( "option", "active", 3 );
	}
	
	$("#toggleFilter").on("click", function() {
		//console.log("filter");
		$(".overlay").fadeIn("fast");
		$("#filter_panel").slideToggle("fast");
	})
	$("#filterClose").on("click", function() {
		$("#filter_panel").slideToggle("fast");
		$(".overlay").fadeOut("fast");
	})
	$(".overlay").on("click", function(){
		$(".overlay").fadeOut("fast");
		$("#filter_panel").slideUp("fast");
		$("#filter_panel1").slideUp("fast");
		$("#filter_panel2").slideUp("fast");
	});
	
	function showpass() {
  		var x = document.getElementById("reg_pass");
	  	if (x.type === "password") {
			x.type = "text";
		  } else {
			x.type = "password";
		  }
		}

	function showpass11() {
  		var x = document.getElementById("login_pass");
	  	if (x.type === "password") {
			x.type = "text";
		  } else {
			x.type = "password";
		  }
		}


$(document).on("pageshow", "#homepage", function(){
	$(".noti_trans").on("click", ".noti_btn", function(){		
		$("#filter_panel").slideDown("fast");
		$(".overlay").fadeIn("fast");		
	})
	
	$("#filterClose").on("click", function() {
		$("#filter_panel").slideUp("fast");		
		$(".overlay").fadeOut("fast");
	})
	$(".overlay").on("click", function(){
		$(".overlay").fadeOut("fast");
		$("#filter_panel").slideUp("fast");
	});
	$(".close_panel").on("click", function(){
		$(".overlay").fadeOut("fast");
		$(".notification_stacks").remove();
		$("#filter_panel").slideUp("fast");
	});
	
	//$(".notification_stacks").remove();
    listCategoryhomepage();
	setProfilepic_border();
})

$(document).on("pageshow", "#transactions", function(){
	$(".overlay").fadeOut("fast");
	$("#filter_panel1").slideUp("fast");
	$("#toggleFilter1").on("click", function() {
			$(".overlay").fadeIn("fast");
			$("#filter_panel1").slideDown("fast");
		})
		$("#filterClose1").on("click", function() {
			$("#filter_panel1").slideUp("fast");
			$(".overlay").fadeOut("fast");
		})
		$(".overlay").on("click", function() {
			$("#filter_panel1").slideUp("fast");
			$(".overlay").fadeOut("fast");
		})
	
		
	})

$(document).on("pageshow", "#products", function(){
	$(".overlay").fadeOut("fast");
	$("#sort_panel").slideUp("fast");
	$("#toggleSort").on("click", function() {
			$(".overlay").fadeIn("fast");
			$("#sort_panel").slideDown("fast");
		})
		$("#sortClose").on("click", function() {
			$("#sort_panel").slideUp("fast");
			$(".overlay").fadeOut("fast");
		})
		$(".overlay").on("click", function() {
			$("#sort_panel").slideUp("fast");
			$(".overlay").fadeOut("fast");
		})
	
	$(".product_categories").on("click", "a", function(){			
			$(".product_categories a").removeClass("active")
			$(this).addClass("active")
		})
	})

$(document).on("pageshow", "#requestStatement", function(){
	$(".overlay").fadeOut("fast");
	$("#filter_panel2").slideUp("fast");
	$("#toggleFilter2").on("click", function() {
			$(".overlay").fadeIn("fast");
			$("#filter_panel2").slideDown("fast");
		})
		$("#filterClose2").on("click", function() {
			$("#filter_panel2").slideUp("fast");
			$(".overlay").fadeOut("fast");
		})
		$(".overlay").on("click", function() {
			$("#filter_panel2").slideUp("fast");
			$(".overlay").fadeOut("fast");
		})
	$('input[type=radio][name=input_email_statement]').change(function() {
			if(this.value == 'selectduration') {
				$("#dateduration").show();
			} else {
				$("#dateduration").hide();
			}
		});
	})

 function toggleDD(e){
            //console.log(e);
            //e.stopPropagation();          
            $(e).toggleClass("open");
            $(e).next(".sub_menu").slideToggle();
        }
function slide_this(e){
	$(e).toggleClass("open");
	$(e).next(".faq_text").slideToggle("fast");
}

function gotoContactus()
{
	$.mobile.changePage( "#contactus", { transition: "none"} );
}
function gotoFaqs()
{
	$.mobile.changePage( "#faqs", { transition: "none"} );
}
function showSocial()
{
	$.mobile.changePage( "#social", { transition: "none"} );
}

/* catalogoe woo */


function showCategorysharenew()
{
    
	'use strict';	
	   $.ajax({
		 url: SERVER_m+'getcat/getloccatsall/'+gbrd,
		 type: 'GET',
		 timeout: 50000,
		 dataType: 'json',
		 data: { },

		success: function(data, textStatus, xhr) {
					 
				console.log('JSONDATA:'+JSON.stringify(data));
				if(data.length>0)
				{
				var str = '';
                var str1 = '';

				for(var i=0;i<data.length;i++)
				{

					
					var catimg = data[i].imagefolder;
					if(typeof catimg == undefined ||typeof catimg == 'undefined' || catimg == null || catimg == 'null' || catimg == '')
                    {
                        //catimg = 'assets/images/no-img.jpg';    
                    }

                    if(typeof data[i].subcategory==undefined || typeof data[i].subcategory=="undefined" || data[i].subcategory==undefined || data[i].subcategory==null || data[i].subcategory=='' || data[i].subcategory=='null')
                    {
						str +='<div class="primary_block" id="catdiv'+data[i].id+'">';
						str +='<a href="javascript:showProductShare(\''+data[i].id+'\',\''+data[i].name+'\');" class="what_new_item ui-link">';
						str +='<div class="item_img"><img src='+catimg+' class="img-responsive" alt=""/></div>';
						str +='<div class="item_brief">';
						str +='<h4>'+data[i].name+'</h4>';
						str +='</div>';
						str +='</a>';
						//str +='<div class="ui-grid-a social_share_list"><div class="ui-block-a"> <img src="assets/images/wapp.png" class="img-responsive" onclick="javascript:shareProductsCat(\''+data[i].id+'\',\''+data[i].name+'\',\''+catimg+'\');"></div><div class="ui-block-a"> <img src="assets/images/fb.png" class="img-responsive" onclick="javascript:shareProductsCatFb(\''+data[i].id+'\',\''+data[i].name+'\',\''+catimg+'\');"></div></div>';
					    str +='</div>';

                    }
                    else
                    {

						str +='<div class="primary_block" id="catdiv'+data[i].id+'">';
						str +='<a href="javascript:toggleDivnew(\'catinnerdiv'+data[i].id+'\', \'catdiv'+data[i].id+'\');" class="what_new_item ui-link">';
						str +='<div class="item_img"><img src='+catimg+' class="img-responsive" alt=""/></div>';
						str +='<div class="item_brief">';
						str +='<h4>'+data[i].name+'</h4>';
						str +='</div>';
						str +='<div class="plus minus"></div>';
						str +='</a>';
						//str +='<div class="ui-grid-a social_share_list"><div class="ui-block-a"> <img src="assets/images/wapp.png" class="img-responsive" onclick="javascript:shareProductsCat(\''+data[i].id+'\',\''+data[i].name+'\',\''+catimg+'\');"></div><div class="ui-block-a"> <img src="assets/images/fb.png" class="img-responsive" onclick="javascript:shareProductsCatFb(\''+data[i].id+'\',\''+data[i].name+'\',\''+catimg+'\');"></div></div>';
					    str +='</div>';


						str+='<div id="catinnerdiv'+data[i].id+'" class="catinnerhdr">';
						str+='</div>';


						addSubcategory(data[i].id);

                    }

				}

			document.getElementById("shopzone").innerHTML=str;

			$.mobile.changePage('#share');

		}
		else
		{
			document.getElementById('title_error').innerHTML='Category List';

			document.getElementById('failqty').innerHTML='Start by adding categories and products';

			

			$.mobile.changePage('#failpage');
		}
				

				
                
		},
		error: function(xhr, textStatus, errorThrown) {
					toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
	  });

}

function addSubcategory_old(catid)
{
	'use strict';	
	   $.ajax({
		 url: SERVER_m+'getcat/getloccatsall/'+gbrd,
		 type: 'GET',
		 timeout: 50000,
		 dataType: 'json',
		 data: { },

		success: function(data, textStatus, xhr) {
					 
				//console.log('JSONDATA:'+JSON.stringify(data));

				var str='';
				str+= '<div class="subdiv">';
				str+= '<ul>';
                
				for(var i=0;i<data.length;i++)
				{
				    if(data[i].id==catid)
					{

						for(var k=0;k<data[i].subcategory.length;k++)
						{

							var catimg = data[i].subcategory[k].imagefolder;
							if(typeof catimg == undefined ||typeof catimg == 'undefined' || catimg == null || catimg == 'null' || catimg == '')
							{
							     catimg = 'assets/images/no-img.jpg';    
							}

			

							str +='<div class="primary_block" id="catdiv'+data[i].subcategory[k].id+'">';

							if(data[i].subcategory[k].id=='10100291' || data[i].subcategory[k].id=='10100292')
							{
								
								str +='<a href="#" class="what_new_item ui-link">';
							}
							else
							{
								str +='<a href="javascript:showProductShare(\''+data[i].subcategory[k].id+'\',\''+data[i].subcategory[k].name+'\');" class="what_new_item ui-link">';
							}
							


							str +='<div class="item_img"><img src='+catimg+' class="img-responsive" alt=""/></div>';
							str +='<div class="item_brief">';
							str +='<h4>'+data[i].subcategory[k].name+'</h4>';
							str +='</div>';
							//str +='<div class="plus minus"></div>';
							str +='</a>';

							str +='<div class="ui-grid-a social_share_list_new"><div class="ui-block-a"> <img src="assets/images/wapp.png" class="img-responsive" onclick="javascript:shareProductsCat(\''+data[i].subcategory[k].id+'\',\''+data[i].subcategory[k].name+'\',\''+catimg+'\');"></div><div class="ui-block-a"> <img src="assets/images/fb.png" class="img-responsive" onclick="javascript:shareProductsCatFb(\''+data[i].subcategory[k].id+'\',\''+data[i].subcategory[k].name+'\',\''+catimg+'\');"></div></div>';
							

							str +='</div>';
					
						}
					}
					
				}

				str+='</ul>';
				str+='<div>';
				
				document.getElementById("catinnerdiv"+catid).innerHTML=str;
        
        
                
		},
		error: function(xhr, textStatus, errorThrown) {
					toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
	  });
}

function showProductShare(cid,cname)
{  
	'use strict';	

	   var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";


    //$('body').addClass('ui-loading');
	document.getElementById("cat_header").innerHTML='<span>'+cname+'</span>';
	$.mobile.changePage( "#products");
	   
	var shopcmsurl = SERVER_m;

    console.log(cid);
				
	var str='';
	
	   $.ajax({
		 url: SERVER_m+'getcat/getitems/'+gbrd+'/'+cid,
		 type: 'GET',
		 timeout: 50000,
		 dataType: 'json',
		 data: { },

		success: function(data, textStatus, xhr) {
					 
				console.log('ProductsData:'+JSON.stringify(data));
				var str = '';
                localStorage.setItem("ProductsData",JSON.stringify(data));
				var totlength = data.length;
				console.log('totlength....'+totlength);

                var i=0;

				while(i<totlength)
				{

					str +='<div class="ui-grid-a list">';
						console.log('index'+i);
						console.log(data[i]);
						console.log('i%2'+i%2);

					if(i%2==0)
					{
					
					var imgurl= data[i].itemcode;
					var imgurlmain= imgurl.trim();
				



                    var img_str_json=JSON.stringify(data[i].images).replace(/"/g, '');
                    // var img_str_json=JSON.stringify(img_str);

                    var pr_img = '';
				    if(typeof data[i].images == undefined ||typeof data[i].images == 'undefined' || data[i].images == null || data[i].images == 'null' || data[i].images == '')
                    {
                        pr_img = 'assets/images/no-img.jpg';
                    }
					else
					{
						pr_img = data[i].images[0];
					}

                    
        			str +='<div class="ui-block-a ">';
            		str +='<div class="shop-thumb">';
					str +='<div class="social_share">';
                    //str +='<a href="javascript:addtowish(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+i+'\',\''+data[i].size+'\');" class="ui-link"><img src="assets/images/like_icon.png" alt=""></a>';
                   // str +='<a href="javascript:shareProduct(\''+data[i].images[0]+'\')" class="ui-link"><img src="assets/images/share_icon.png" alt=""></a>';
				   //str +='<label class="container"><input type="checkbox" name="share_pr" value="'+data[i].itemcode+'#'+data[i].itemname+'#'+data[i].description+'#'+data[i].images[0]+'" class="shareapp"><span class="checkmark"></span></label>';
                
					str +='</div>';
                	str +='<a href="javascript:showshopdetail(\''+data[i].itemcode+'\');">';
                    str +='<img src="'+pr_img+'" class="img-responsive"/></a>';
                   // str +='<img src="'+shopcmsurl+'uploads/products/'+imgurlmain+'.jpg" class="humbleLightbox img-responsive" alt=""/></a>';
                    str +='<div class="description">';
                	var sz = data[i].size;
                    if(typeof sz == undefined ||typeof sz == 'undefined' || sz == null || sz == 'null')
                    {
                       str +='<h3 class="product_name">'+data[i].itemname+'</h3>';     
                    }
                    else
                    {
                        str +='<h3 class="product_name">'+data[i].itemname+ '-'+ data[i].size+'</h3>';
                    }
                    str +='<h2 class="price">INR '+numberWithCommas(data[i].mrp)+'</h2>';
					//str +='<table><tr><td>Qty:</td><td><input type="number" data-role="none" min="1" name="qty'+i+'" id="qty'+i+'" value="1" title="Qty" class="qty"></td></tr>';
                    //str +='</table>';
                 

                   var description=data[i].description;
                    if(data[i].productyoutubelink!=null &&  data[i].productyoutubelink!='' )
                    	description='Product Video\n'+data[i].productyoutubelink+'\n'+description;
                    console.log(description);
                 

                   /*str +=' <div class=\"ui-grid-b\ social_share_list">';
                  str +='<div class=\"ui-block-a\">  <img src=\"assets/images/other.png\" class=\"img-responsive\"   onclick="javascript:shareProductsOther(\''+data[i].itemcode+'\',\''+data[i].itemname.trim()+'\',\''+description.trim().replace(/\"/g, "").replace(/[\n\r]/g, '\\n')+'\',\''+pr_img+'\');"/>  </div>';
                 if(deviceType=='Android')
                 str +=' <div class=\"ui-block-b\"> <img src=\"assets/images/fb.png\" class=\"img-responsive\"  onclick="javascript:shareProductsFb(\''+data[i].itemcode+'\',\''+data[i].itemname.trim()+'\',\''+description.trim().replace(/\"/g, "").replace(/[\n\r]/g, '\\n')+'\',\''+pr_img+'\');"/></div>';
               
                 if(deviceType=='Android')
                 str +=' <div class=\"ui-block-c\"> <img src=\"assets/images/wapp.png\" class=\"img-responsive\"  onclick="javascript:shareProducts(\''+data[i].itemcode+'\',\''+data[i].itemname.trim()+'\',\''+description.trim().replace(/\"/g, "").replace(/[\n\r]/g, '\\n')+'\',\''+pr_img+'\');"/></div>';
                else
                	 str +=' <div class=\"ui-block-c\"> <img src=\"assets/images/wapp.png\" class=\"img-responsive\"  onclick="javascript:shareProductsios(\''+data[i].itemcode+'\',\''+data[i].itemname.trim()+'\',\''+description.trim().replace(/\"/g, "").replace(/[\n\r]/g, '\\n')+'\',\''+pr_img+'\');"/></div>';
                
                str +='</div>';*/


                //    str +='<div><button onclick="javascript:shareProducts(\''+data[i].itemcode+'\',\''+data[i].itemname.trim()+'\',\''+data[i].description.trim()+'\',\''+data[i].images[0]+'\');" class="add_to_cart" data-role="none">Share</button></div>';
					str +='</div>';
					str +='</div>';
                
					str +='</div>';
					}


                    console.log(data[(i+1)]);
                    
					if(typeof data[(i+1)] !='undefined')
					{
                        
					if((i+1)%2==1)
					{
					
					var imgurl= data[i+1].itemcode;
					var imgurlmain= imgurl.trim();
                    

                    var img_str_json1=JSON.stringify(data[i+1].images).replace(/"/g, '');
                    //var img_str_json=JSON.stringify(img_str);


					var pr_img = '';
				    if(typeof data[i+1].images == undefined ||typeof data[i+1].images == 'undefined' || data[i+1].images == null || data[i+1].images == 'null' || data[i+1].images == '')
                    {
                        pr_img = 'assets/images/no-img.jpg';    
                    }
					else
					{
						pr_img = data[i+1].images[0];
					}

					str +='<div class="ui-block-b">';
            		str +='<div class="shop-thumb">';
					str +='<div class="social_share">';
                    //str +='<a href="javascript:addtowish(\''+data[i+1].itemcode+'\',\''+data[i+1].id+'\',\''+data[i+1].itemname+'\',\''+data[i+1].mrp+'\',\''+(i+1)+'\',\'qty'+(i+1)+'\',\''+data[i+1].size+'\');" class="ui-link"><img src="assets/images/like_icon.png" alt=""></a>';
					//str +='<a href="javascript:shareProduct(\''+data[i+1].images[0]+'\')" class="ui-link"><img src="assets/images/share_icon.png" alt=""></a>';
					//str +='<label class="container"><input type="checkbox" name="share_pr" value="'+data[i+1].itemcode+'#'+data[i+1].itemname+'#'+data[i+1].description+'#'+data[i+1].images[0]+'" class="shareapp"><span class="checkmark"></span></label>';
                
                    str +='</div>';
					str +='<a href="javascript:showshopdetail(\''+data[i+1].itemcode+'\');">';
                    //str +='<img src="'+shopcmsurl+'uploads/products/'+imgurlmain+'.jpg" class="humbleLightbox img-responsive" alt=""/>';
                    str +='<img src="'+pr_img+'" class="img-responsive"/></a>';
                    str +='<div class="description">';
                	var sz = data[i+1].size;
                    if(typeof sz == undefined ||typeof sz == 'undefined' || sz == null || sz == 'null')
                    {
                       str +='<h3 class="product_name">'+data[i+1].itemname+'</h3>';     
                    }
                    else
                    {
                        str +='<h3 class="product_name">'+data[i+1].itemname+ '-'+ data[i+1].size+'</h3>';
                    }
                    str +='<h2 class="price">INR '+numberWithCommas(data[i+1].mrp)+'</h2>';
					//str +='<table><tr><td>Qty:</td><td><input type="number" data-role="none" min="1" name="qty'+(i+1)+'" id="qty'+(i+1)+'" value="1" title="Qty" class="qty"></td></tr>';
                    //str +='</table>';

                     var description=data[i+1].description;
                    if(data[i+1].productyoutubelink!=null &&  data[i+1].productyoutubelink!='' )
                    	description='Product Video\n'+data[i+1].productyoutubelink+'\n'+description;


                     /*str +=' <div class=\"ui-grid-b\ social_share_list">';
                  str +='<div class=\"ui-block-a\">  <img src=\"assets/images/other.png\" class=\"img-responsive\"   onclick="javascript:shareProductsOther(\''+data[i+1].itemcode+'\',\''+data[i+1].itemname.trim()+'\',\''+description.trim().replace(/\"/g, "").replace(/[\n\r]/g, '\\n')+'\',\''+pr_img+'\');"/>  </div>';
                  if(deviceType=='Android')
                 str +=' <div class=\"ui-block-b\"> <img src=\"assets/images/fb.png\" class=\"img-responsive\"   onclick="javascript:shareProductsFb(\''+data[i+1].itemcode+'\',\''+data[i+1].itemname.trim()+'\',\''+description.trim().replace(/\"/g, "").replace(/[\n\r]/g, '\\n')+'\',\''+pr_img+'\');"/></div>';
                 if(deviceType=='Android')
                 str +=' <div class=\"ui-block-c\"> <img src=\"assets/images/wapp.png\" class=\"img-responsive\"  onclick="javascript:shareProducts(\''+data[i+1].itemcode+'\',\''+data[i+1].itemname.trim()+'\',\''+description.trim().replace(/\"/g, "").replace(/[\n\r]/g, '\\n')+'\',\''+pr_img+'\');"/></div>';
                else
                	 str +=' <div class=\"ui-block-c\"> <img src=\"assets/images/wapp.png\" class=\"img-responsive\"  onclick="javascript:shareProductsios(\''+data[i+1].itemcode+'\',\''+data[i+1].itemname.trim()+'\',\''+description.trim().replace(/\"/g, "").replace(/[\n\r]/g, '\\n')+'\',\''+pr_img+'\');"/></div>';
                

                str +='</div>';*/
				 // str +='<div><button onclick="javascript:shareProducts(\''+data[i+1].itemcode+'\',\''+data[i+1].itemname.trim()+'\',\''+data[i+1].description.trim()+'\',\''+data[i+1].images[0]+'\');" class="add_to_cart" data-role="none">Share</button></div>';
                    str +='</div>';
					str +='</div>';
                
					str +='</div>';
					}
					}
					str +='</div>';

					i=i+2;
					
				}
				
				document.getElementById("prdctlist").innerHTML=str;
				

				
		},
		error: function(xhr, textStatus, errorThrown) {
					toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
	  });

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

function shareProducts1()
{
    var favorite = [];

    var description='';

   // var shopurl=shopcmsurl+'welcome/getProductDetails/5/'+icode+'/'+gbrd+'/'+user.store_id;

    
//var i=1;
    $("input:checkbox[name=share_pr]:checked").each(function() {
       
      // url=url+encodeURI($(this).val())+"%0D%0A";
        
       // var fileTransfer = new FileTransfer();
        var wdata = $(this).val();

       

        var dt=wdata.split('#');

        var shopurl=SERVER_m+'welcome/getProductDetails/5/'+dt[0]+'/'+gbrd+'/'+user.store_id;

       console.log(shopurl);


        

       // var shopurl=SERVER+'welcome/getProductDetails/5/'+dt[0]+'/'+gbrd+'/'+user.store_id;


        description=description+dt[2]+'\n\n'+shopurl+'\n\n';

        
        favorite.push(dt[3]);

        
        });

     if(favorite.length>0){
    
      window.plugins.socialsharing.shareWithOptions({
                      subject: 'Share and Buy',
                      message: description,
                      url: '',
                      files: favorite
                    },
                    function() {console.log('share ok')},
                    function(errormsg){ alert("Error: " + errormsg)}
            );
     }
     else
     {
        alert('Please select items');
     }

     



    
  }

function shareProductsCatFb(catcode,catname,iimage)
{


  var shopurl=BITLYS+'welcome/showShop/'+gbrd+'/'+user.store_code+'/'+catcode;
  console.log('shopurl:'+shopurl);
   fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
   headers: {
        'Authorization': 'Bearer dc30a71f9c5c9ba1ffb4afbe04bcabd2c284729f',
        'Content-Type': 'application/json'
    },
   body: JSON.stringify({ "long_url": shopurl, "domain": "bit.ly", "group_guid": "Bk65hnCRG29" })
}).then(function(response) {
return response.json();
}).then(function(json) {

console.log(json.link);

 var des=json.link;

   try{
     window.plugins.socialsharing.shareViaFacebook
     (null,iimage, null,
      function() {document.getElementById('simages').src='assets/images/verify_icon.png';shareDescriptionFb(''+des+'');}, 
      function(errormsg){alert(errormsg)});
	
	}
	catch(ex)
	{
		toast("Sharing not supported!");
		$('#sharepop').remove();
	}


});

	 
      
       

   
/*

	   showPOPup();
	   var imgshared=false;
	
	//return false;
	
       var shopurl=SERVER+'welcome/getProductDetails/5/'+icode+'/'+user.store_id+'/'+user.id;

       console.log(shopurl);
       var des=description+'\n'+shopurl;


        try{
     window.plugins.socialsharing.shareViaWhatsApp
     ('',iimage, null,
      function() {document.getElementById('simages').src='assets/images/verify_icon.png';alert('Image shared successfull..Sharing description');shareDescription(''+des+'')}, 
      function(errormsg){alert(errormsg)});
	
	}
	catch(ex)
	{
		toast("Sharing not supported!");
		$('#sharepop').remove();
	}

    */



	
}

function shareProductsCat(catcode,catname,iimage)
{


//https://mliveshare.com/welcome/showShop/97FEECAD-72B0-4FA9-AF12-DC2C719C8657/1/2049
//var apiKey = 'dc30a71f9c5c9ba1ffb4afbe04bcabd2c284729f';
//	var username = 'anoop@mobiquest.com';

var shopurl=BITLYS+'welcome/showShop/'+gbrd+'/'+user.store_code+'/'+catcode;
       console.log('shopurl:'+shopurl);
	   //console.log('iimage:'+iimage);



       fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
   headers: {
        'Authorization': 'Bearer dc30a71f9c5c9ba1ffb4afbe04bcabd2c284729f',
        'Content-Type': 'application/json'
    },
   body: JSON.stringify({ "long_url": shopurl, "domain": "bit.ly", "group_guid": "Bk65hnCRG29" })
}).then(function(response) {
return response.json();
}).then(function(json) {

 try{
 	console.log(json.link);
	 window.plugins.socialsharing.shareWithOptions({
                      subject:catname,
                      message: catname,
                      url: json.link,
                      files: [iimage],
                      chooserTitle: 'WhatsApp', // Android only, you can override the default share sheet title
  					  appPackageName: 'com.whatsapp', // Android only, you can provide id of the App you want to share with
                    },
                    function() {console.log('share ok');},
                    function(errormsg){ alert("Error: " + errormsg)}
            );
	}
	catch(ex)
	{
//$('#sharepop').remove();
	}
});

      

}

function shareProducts(icode,iname,description,iimage)
{

	

	 
      

       var shopurl=BITLYS+'welcome/getProductDetails/5/'+icode+'/'+gbrd+'/'+user.store_code;
       console.log('shopurl:'+shopurl);



       fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
   headers: {
        'Authorization': 'Bearer dc30a71f9c5c9ba1ffb4afbe04bcabd2c284729f',
        'Content-Type': 'application/json'
    },
   body: JSON.stringify({ "long_url": shopurl, "domain": "bit.ly", "group_guid": "Bk65hnCRG29" })
}).then(function(response) {
return response.json();
}).then(function(json) {

      console.log(json.link);
      try{
	 window.plugins.socialsharing.shareWithOptions({
                      subject: iname,
                      message: description,
                      url: json.link,
                      files: [iimage],
                      chooserTitle: 'WhatsApp', // Android only, you can override the default share sheet title
  					  appPackageName: 'com.whatsapp', // Android only, you can provide id of the App you want to share with
                    },
                    function() {console.log('share ok');},
                    function(errormsg){ alert("Error: " + errormsg)}
            );
	}
	catch(ex)
	{
//$('#sharepop').remove();
	}
  });
       
/*
   


	   showPOPup();
	   var imgshared=false;
	
	//return false;
	
     //  var shopurl=SERVER+'welcome/getProductDetails/5/'+icode+'/'+user.store_id+'/'+user.id;

       console.log(shopurl);
       var des=description+'\n'+shopurl;


        try{
     window.plugins.socialsharing.shareViaWhatsApp
     ('',iimage, null,
      function() {document.getElementById('simages').src='assets/images/verify_icon.png';alert('Image shared successfull..Sharing description');shareDescription(''+des+'')}, 
      function(errormsg){alert(errormsg)});
	
	}
	catch(ex)
	{
		toast("Sharing not supported!");
		$('#sharepop').remove();
	}

    */



	
  }

function shareProductsios(icode,iname,description,iimage)
{

	 
      
       

   


	   showPOPup();
	   var imgshared=false;
	
	//return false;
	
       var shopurl=BITLYS+'welcome/getProductDetails/5/'+icode+'/'+gbrd+'/'+user.store_code;

       console.log(shopurl);




       fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
   headers: {
        'Authorization': 'Bearer dc30a71f9c5c9ba1ffb4afbe04bcabd2c284729f',
        'Content-Type': 'application/json'
    },
   body: JSON.stringify({ "long_url": shopurl, "domain": "bit.ly", "group_guid": "Bk65hnCRG29" })
}).then(function(response) {
return response.json();
}).then(function(json) {
	console.log(json.link);
       var des=description+'\n'+json.link;


        try{
     window.plugins.socialsharing.shareViaWhatsApp
     ('',iimage, null,
      function() {document.getElementById('simages').src='assets/images/verify_icon.png';shareDescription(''+des+'')}, 
      function(errormsg){alert(errormsg)});
	
	}
	catch(ex)
	{
		toast("Sharing not supported!");
		$('#sharepop').remove();
	}

    
  });


	
  }


function shareProductsFb(icode,iname,description,iimage)
{


	   showPOPup();

	   
       var shopurl=BITLYS+'welcome/getProductDetails/5/'+icode+'/'+gbrd+'/'+user.store_code;

       console.log(shopurl);

          fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
   headers: {
        'Authorization': 'Bearer dc30a71f9c5c9ba1ffb4afbe04bcabd2c284729f',
        'Content-Type': 'application/json'
    },
   body: JSON.stringify({ "long_url": shopurl, "domain": "bit.ly", "group_guid": "Bk65hnCRG29" })
}).then(function(response) {
return response.json();
}).then(function(json) {
    console.log(json.link);
       var des=description+'\n'+json.link;


        try{
     window.plugins.socialsharing.shareViaFacebook
     (null,iimage, null,
      function() {document.getElementById('simages').src='assets/images/verify_icon.png';shareDescriptionFb(''+des+'');}, 
      function(errormsg){alert(errormsg)});
	
	}
	catch(ex)
	{
		toast("Sharing not supported!");
		$('#sharepop').remove();
	}


});


	
  }

function shareProductsOther(icode,iname,description,iimage)
{


	 
       var shopurl=BITLYS+'welcome/getProductDetails/5/'+icode+'/'+gbrd+'/'+user.store_code;

       console.log(shopurl);

          fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
   headers: {
        'Authorization': 'Bearer dc30a71f9c5c9ba1ffb4afbe04bcabd2c284729f',
        'Content-Type': 'application/json'
    },
   body: JSON.stringify({ "long_url": shopurl, "domain": "bit.ly", "group_guid": "Bk65hnCRG29" })
}).then(function(response) {
return response.json();
}).then(function(json) {
	console.log(json.link);
    
      try{
	 window.plugins.socialsharing.shareWithOptions({
                      subject: iname,
                      message: description,
                      url: json.link,
                      files: [iimage]
                    },
                    function() {console.log('share ok');},
                    function(errormsg){ alert("Error: " + errormsg)}
            );
	}
	catch(ex)
	{

	}

       

   });
   



	
  }




function shareDescription(desc)
{

	  try{
     window.plugins.socialsharing.shareViaWhatsApp
     (
      desc,
      null,
      null,
      function() {document.getElementById('sdesc').src='assets/images/verify_icon.png';$('#sharepop').remove();}, 
      function(errormsg){alert(errormsg)}
      );
	
	}
	catch(ex)
	{
		toast("Sharing not supported!");
		//$('#sharepop').remove();
	}
}

function shareDescriptionFb(desc)
{

	  try{
     window.plugins.socialsharing.shareViaFacebook
     (
      desc,
      null,
      null,
      function() {document.getElementById('sdesc').src='assets/images/verify_icon.png';$('#sharepop').remove();}, 
      function(errormsg){alert(errormsg)}
      );
	
	}
	catch(ex)
	{
		toast("Sharing not supported!");
		//$('#sharepop').remove();
	}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function formatName(str)
{
	if(typeof str==undefined || str=='undefined'|| str==null || str=='null' || str=='')
    {
        str='#';
    }
        return str;
}

function removeHash(str)
{
	return str.replace('#','');
}

function showScan()
{
   cordova.plugins.barcodeScanner.scan(
			   function (result) {

					//$.mobile.changePage( "#homepage", {transition: "none"} );

					if(result.cancelled == true)
				    {
						toast('Scanning canceled');
				    }
					else
				    {

						var bcode=result.text;
						var bcodenew = bcode.trim();
						showScanpage(bcodenew);

					}

			  },
			  function (error) {
				  alert("Scanning failed: " + error);
			  },
			  {
				  preferFrontCamera : false, // iOS and Android
				  showFlipCameraButton : true, // iOS and Android
				  showTorchButton : true, // iOS and Android
				  torchOn: false, // Android, launch with the torch switched on (if available)
				  saveHistory: true, // Android, save scan history (default false)
				  prompt : "Place the code inside the scan area", // Android
				  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
				  formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
				  orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
				  disableAnimations : true, // iOS
				  disableSuccessBeep: false // iOS and Android
			  }
		   );

}

function showScanpage(itemcode)
{

	$.ajax({
		url: SERVER2+'issue_qr_item_points.asp',
		type: 'GET',
		timeout: 50000,
		dataType: 'json',
		data: {'apiuid': 'MLOYALAPI','apipswd':'Ml0yalAP!2o21','mobileno': user.mobile,'itmcode': itemcode,'scode': 'HO-001' },
		complete: function(xhr, textStatus) {
	   //called when complete
		}, success: function(data, textStatus, xhr) {

		//console.log(JSON.stringify(data));


			if(data.error.length>=1)
			{
				toast(data.error);
			}
			else
			{
				toast(data.data);
				$.mobile.changePage( "#homepage", { transition: "none"} );
		   
			}
		},
		error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
	  });
}

$(document).on('pageshow', '#transactions', function (event, ui) {
    get_transactions_details();
});

function get_transactions_details()
{
	
	  $.ajax({
		url: SERVER2+'get_transactions_details_json_api.asp',
		type: 'GET',
		timeout: 50000,
		dataType: 'json',
		data: {'apiuid': 'MLOYALAPI','apipswd':'Ml0yalAP!2o14','mobileno': user.mobile },
		complete: function(xhr, textStatus) {
	   //called when complete
		}, success: function(data, textStatus, xhr) {

		console.log(JSON.stringify(data));

			var str='';

			if(data.data[0].msg=='No Records Found.')
			{
				toast('No Records Found.');
			}
			else
			{
				 for (var i = 0; i < data.data.length; i++)
				 {	
					
				
					    str += '<div class="recent_transfer">';
					    //str += '<div class="recent_transfer_header pl-4 pr-4">'+data.data[i].BillDate+'</div>';
					    str += '<div class="recent_block pl-4 pr-4">';
                        
						if(data.data[i].TransType == 'Revoke')
					    {
							str += '<div class="recent_user_icon"> <img src="assets/images/pointredeem.png" class="img-responsive" alt=""/> </div>';
							str += '<div class="recent_user_details">';						
							str += '<p class="recent_detail_text ">Points Revoked from arvinddairy Industries</p>';
						}
						else if(data.data[i].TransType == 'Redeem')
						{
							str += '<div class="recent_user_icon"> <img src="assets/images/pointredused.png" class="img-responsive" alt=""/> </div>';
							str += '<div class="recent_user_details">';						
							str += '<p class="recent_detail_text ">Points Redeemed from arvinddairy Industries</p>';
						}
						else
						{
							str += '<div class="recent_user_icon"> <img src="assets/images/pointredeem.png" class="img-responsive" alt=""/> </div>';
							str += '<div class="recent_user_details">';						
							str += '<p class="recent_detail_text ">Points Earned from arvinddairy Industries</p>';
					    }

						str += '<p class="recent_date">'+data.data[i].BillDate+'</p>';
						str += '<p class="recent_date">Invoice No. : '+data.data[i].BillNumber+'</p>';
						str += '<p class="recent_date">Bill Amount : '+data.data[i].BillAmount+'</p>';
						str += '</div>';
						str += '<div class="recent_user_points"><h2 class="text_green">'+data.data[i].Points+'<span>Points</span></h2></div>';						
					    str += '</div>';
				        str += '</div>';
				 }

				 document.getElementById('transfersret').innerHTML=str;

			}
		},
		error: function(xhr, textStatus, errorThrown) {

		}
	  });
}

function submitPaytm()
{

  var userid = $('#kyc_paytm_id').val();
  var amount = $('#kyc_paytm_amount').val();

	if(userid=='')
	{
		toast("Please enter UPI ID/Paytm Wallet Number");
	}
	else if(amount=='' || amount=='0' )
	{
		toast("Please enter points to redeem");
	}
    else if((parseFloat(amount)) > parseFloat(user.balance))
	{
		toast('Points redeemeed cannot be greater than point balance');
	}
	else
	{

	   if(userid.indexOf("@")>=0)
	   {

		  $.ajax({
			url: "https://taghash.co/grati/arvinddairy/send.php",
		    type: 'POST',
		    timeout: 7000,
		    dataType: 'json',
		    data:JSON.stringify({
			      "upiid": userid,
				  "amount": amount
            }),
		    beforeSend: function (xhr) {

		     	$("#wait").css("display","block");

            },
		    complete: function(xhr, textStatus) {
		    	$("#wait").css("display","none");
		    },
			success: function(data, textStatus, xhr) {
			 
			 console.log("data:"+JSON.stringify(data));

			        if(data.response.status=='ACCEPTED')
					{
						toast('Request accepted');
						burnpoints(amount);
					}
					else
					{
						toast('Request failed');
					}

					$.mobile.changePage( "#homepage", { transition: "none"} );
                    
			 },
			error: function(xhr, textStatus, errorThrown) {
				 toast('Could not connect to Server, make sure you are connected to Internet');
				}
		});
       }
	   else
	   {
		   if(userid.length!=10)
		   {
				toast('Please enter valid mobile no.');
		   }
		   else
		   {

			   $.ajax({
				url: "https://taghash.co/grati/arvinddairy/send.php",
				type: 'POST',
				timeout: 7000,
				dataType: 'json',
				data:JSON.stringify({
					  "mobileno": userid,
					  "amount": amount
				}),
				beforeSend: function (xhr) {

					$("#wait").css("display","block");

				},
				complete: function(xhr, textStatus) {
					$("#wait").css("display","none");
				},
				success: function(data, textStatus, xhr) {
				 
				 console.log("data:"+JSON.stringify(data));

					if(data.response.status=='ACCEPTED')
					{
						toast('Request accepted');
						burnpoints(amount);
					}
					else
					{
						toast('Request failed');
					}

					$.mobile.changePage( "#homepage", { transition: "none"} );
				 
						
				 },
				error: function(xhr, textStatus, errorThrown) {
					 toast('Could not connect to Server, make sure you are connected to Internet');
					}
			});

		  }

	   }
	}

}

function burnpoints(redeempoints)
{

 var refbillno =  'gdrj'+Math.floor((Math.random() * 100000) + 1);

 $.ajax({
   url: SERVER2+'burn_points_json_api.asp',
   type: 'GET',
   timeout: 50000,
   dataType: 'json',
   data: {'apiuid':'MLOYALAPI','apipswd':'Ml0yalAP!2o14','redeem_points': redeempoints, 'mobileno': user.mobile, 'ref_bill_number': refbillno, 'scode': 'HO-001', 'send': '1'},
   complete: function(xhr, textStatus) {
   //called when complete
    },
    success: function(data, textStatus, xhr) {
    console.log('JSONDATA'+JSON.stringify(data));
      
	 /*if(data.data.length>=1)
	 {
		 toast(data.data);
	 }
	 else
	 {
		 toast(data.error);
	 }*/
   
  
    },
    error: function(xhr, textStatus, errorThrown) {
		//toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });
 

}

function savecategory()
{
	var cattype = $('#select_role').val();
	
	console.log(cattype);

	if(typeof cattype==undefined || cattype=='undefined'|| cattype==null|| cattype=='null' || cattype=='')
	{
		toast('Please select category type');
	}
	else
	{
		localStorage.setItem('cattype_ad',cattype);

		if(cattype=='distributor')
		{
			$.mobile.changePage( "#login_pg", { transition: "none"} );
			$('#cashopt').css('display','block');

		}
		else
	    {
			$.mobile.changePage( "#boothoperator_pg", { transition: "none"} );
			$('#cashopt').css('display','none');
		}	
    

	}
}

$(document).on('pageshow', '#rewardPage', function (event, ui) {

    showRewards_new();
    
});

function showRewards_new()
{

	  $.ajax({
		 url: SERVER3+'categories_json_api.asp',
		 type: 'GET',
		 timeout: 50000,
		 dataType: 'json',
		 data: { },

		 success: function(data, textStatus, xhr) {
					 
					 
				//console.log('JSONDATA:'+JSON.stringify(data));
				var str = '';
				//str +='<div class="primary_section">';
				//str +='<div class="primary_section_inner pt-30">';
					
				for(var i=0;i<data.data.length;i++)
				{
		
					str +='<a href="javascript:toggleDiv(\'catpro'+data.data[i].catid+'\', \'catbtn'+data.data[i].catid+'\')" class="primary_block text-decoration_none bg-grey d-block" id="catbtn'+data.data[i].catid+'">';
					//str +='<a href="javascript:showProductsold(\''+data.data[i].catid+'\',\''+data.data[i].catname+'\');" class="points_bal_btn p_0">';	
					str +='<div class="points_bal_btn p_0 right">';	
					str +='<div class="points_bal">';
					str +='<h4><strong>'+data.data[i].catname+'</strong></h4>';
					str +='</div>';						
					str +='<div class="points_arrow"><img src="assets/images/arrow_green.png" class="img-responsive" alt=""></div>';
					str +='</div>';
				  	str +='</a>';
					str +='<div id="catpro'+data.data[i].catid+'"  class="reward_content"></div>';

					addProducts(data.data[i].catid,data.data[i].catname);
					
				}
				//str +='</div>';	
				//str +='</div>';

				document.getElementById("rewards_div").innerHTML=str;	
				//$.mobile.changePage( "#reward_store", { transition: "none"} );
				     
		},
		error: function(xhr, textStatus, errorThrown) {
			    toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
	  });
	 

}

function toggleDiv(str,tg)
{
    $('#'+tg+'').find(".right").toggleClass("down");
   // $(".catinnerhdr").slideUp("fast");
	$('#'+str+'').slideToggle("fast");
   // $(".catheader").removeClass("bg_toggle");
    //$('#'+tg+'').toggleClass("bg_toggle");
}

function toggleDivnew(str,tg)
{
    $('#'+tg+'').find(".minus").toggleClass("plus");
   // $(".catinnerhdr").slideUp("fast");
	$('#'+str+'').slideToggle("fast");
   // $(".catheader").removeClass("bg_toggle");
    $('#'+tg+'').toggleClass("bg_toggle");
}


function addProducts_r(catid,catname)
{
	 
	   $.ajax({
		 url: SERVER3+'brands_json_api.asp',
		 type: 'GET',
		 timeout: 50000,
		 dataType: 'json',
		 data: { 'cat_id': catid },
		 success: function(data, textStatus, xhr) {
					 
				//console.log('ProductsData:'+JSON.stringify(data));
				
				var str = '<div class="reward_section d-flex align-items-start justify-content-between flex-wrap p-3">';

				for(var i=0;i<data.data.length;i++)
				{
					var surl=SERVER3+'all_products_json.asp?cat_id='+catid+'&b_id='+data.data[i].brand_id;
							
				
							var pointval='';
							var pointdate='';
							var product_id='';
							var gvcode='';

								   $.ajax({
									 url: surl,
									 type: 'GET',
									 timeout: 50000,
									 dataType: 'json',
									 async:false,
									 success: function(data1, textStatus, xhr) {

										console.log(JSON.stringify(data1));
											
											
											if(data1.data.length!=0)
											{
												pointval = data1.data[0].GiftVoucherValue;
												gvcode=data1.data[0].GiftVoucherCode;
												pointdate=data1.data[0].GiftVoucherEndDate;
												product_id=data1.data[0].ProductId;
											}
											else
											{
												pointval='';
												gvcode='';
												pointdate='';
											}

											//console.log(pointval);

								
											
									},
									error: function(xhr, textStatus, errorThrown) {
												toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
									}
								  });

                                    

									var bname=data.data[i].brand_name.replace(/["']/g, '');
									var bdesc=data.data[i].brand_description.replace(/["']/g, '');
									var blogo=data.data[i].brand_logo.replace(/\\/g, "/");
									var brand_id=data.data[i].brand_id;
									   

									if(pointval!='')
									{
										str +='<a class="reward_block" href="javascript:showRewardDetails(\''+product_id+'\',\''+blogo+'\',\''+bname+'\',\''+bdesc+'\',\''+pointval+'\',\''+brand_id+'\',\''+pointdate+'\',\''+gvcode+'\')">';
									}
									else
									{
										str +='<a class="reward_block">';
									}
									str +='<div class="reward_img"><img src='+data.data[i].brand_logo+' class="img-responsive" alt=""></div>';
									str +='<div class="reward_brief">';
									str +='<p>'+data.data[i].brand_name+'</p>';
									str +='<p>VoucherValue:'+pointval+'</p>';
									str +='</div>';
									str +='</a>';


											/*var bname=data.data[i].brand_name.replace(/["']/g, '');
											var bdesc=data.data[i].brand_description.replace(/["']/g, '');
											var blogo=data.data[i].brand_logo.replace(/\\/g, "/");
											var brand_id=data.data[i].brand_id;
											str +='<div class="primary_block bb1">';
											if(pointval!=''){
												str +='<a href="javascript:showRewardDetails(\''+product_id+'\',\''+blogo+'\',\''+bname+'\',\''+bdesc+'\',\''+pointval+'\',\''+brand_id+'\')" class="reward_item">';						
											}
											else
											{
												str +='<a href="" class="reward_item">';						
											
											}
											str +='	<div class="reward_img"><img src='+data.data[i].brand_logo+' class="img-responsive" alt=""/></div>';
											str +='	<div class="reward_brief">';
											str +='	<p>'+data.data[i].brand_name+'</p>';
											if(pointval!=''){
											str +='	<h2 class="item_rewards">'+pointval+'<span >Points</span></h2>';
											}
											else
											{
												str +='	<h4>Product Not Available<span></span></h4>';
											}

											str +='	</div>';
											str +='</a>';
											str +='</div>';*/
					
				}

				str +='</div>';
				document.getElementById("catpro"+catid).innerHTML=str;
                
		},
		error: function(xhr, textStatus, errorThrown) {
					toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
	  });
}

function showRewardDetails(bid,blogo,bname,bdesc,gvalue,brandid,pointdate,gvcode)
{
	

	
	/*document.getElementById("reward_division").style.display = 'block';
	document.getElementById("gift_division1").style.display = 'none';
	document.getElementById("pro_input_box").style.display = 'none';
		
	

	document.getElementById("pro_txt").innerHTML=bname;

    document.getElementById('pro_img').innerHTML= '<img src='+blogo+' class="img-responsive" alt="brandlogo"/>';

	document.getElementById("pro_desc").innerHTML='<h3 class="text-primary mt-0">Description</h3><p>'+bdesc+'</p>';

	document.getElementById("pro_points").innerHTML= gvalue+'<span>Points</span>';

	document.getElementById("select_qty").innerHTML = '<select id="detailqty" data-role="none" onchange="javascript:changepointval(\''+this.value+'\',\''+gvalue+'\');"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>';

	 document.getElementById("rewlink").onclick = function() {
				redeemProduct(bid,brandid,gvalue);
				return false;
		 };
    document.getElementById("giftlink1").onclick = function() {
				sendOTP(bid);
				return false;
		 };
    localStorage.setItem('gval',gvalue);*/
    document.getElementById("rw_header").innerHTML = bname;

	document.getElementById("rw_date").innerHTML = 'Valid Till : '+pointdate;

	document.getElementById("rw_coupon-box").innerHTML = '<input type="text" id="coupon_code_input" data-role="none" class="coupon_code_input_2" value="' + gvcode + '">';

	$.mobile.changePage( "#reward_details", { transition: "none"} );



}

function copyTxt()
{
		var input = $('#coupon_code_input').val();
		if (navigator.clipboard) {
    navigator.clipboard.writeText(input).then(() => {
      console.log('Copied to clipboard successfully.');
    }, (err) => {
      console.log('Failed to copy the text to clipboard.', err);
    });
  } else if (window.clipboardData) {
    window.clipboardData.setData("Text", input);
  }
}

function setProfilepic_border()
{
	   var mcls = document.getElementById("home_user_pic").classList;

		    if(user.membership_slab=='1' || user.membership_slab=='')
            {
               mcls.add("silver_bdr");
            }
            else if(user.membership_slab=='2')
            {
               mcls.add("gold_bdr");
            }
			else if(user.membership_slab=='3')
            {
               mcls.add("platinum_bdr");
            }
}


// new shop section 

function showMainCategory()
{
 

	var loc= localStorage.getItem('selectedstorearvinddairy');
	//console.log('loc:'+loc);
	if( loc!='null' && loc!=null )
	{

	'use strict';	
	   $.ajax({

		 url: shopcmsurl+'getcat/getloccats/'+loc,
		 type: 'GET',
		 timeout: 70000,
		 dataType: 'json',
		 data: { },

		success: function(data, textStatus, xhr) {
					 
			  //console.log(data);
			  //var str1 = '<h3>Categories</h3>';
			  var str1 = '<div class="cate_section">';
			  
			  for (var i = 0; i < data.length; i++)
			  {

				var cat_img = '';
				if(typeof data[i].image == undefined ||typeof data[i].image == 'undefined' || data[i].image == null || data[i].image == 'null' || data[i].image == '' )
                {
					cat_img = 'assets/images/no-img-bg.jpg';
                }
			    else
				{
					cat_img = data[i].image;
				}
				 
				
                str1 += '<a href="javascript:showHomepage(\''+data[i].id+'\',\''+data[i].name+'\',\''+checkforundefined_gst(data[i].gst)+'\');" class="cate_block">';
				//str1 += '<a href="javascript:showHomepage(\'menuh'+data[i].id+'\',\''+data[i].name+'\',\''+checkforundefined_gst(data[i].gst)+'\');" class="cate_block">';
                str1 += '<img src="'+cat_img+'">';
				str1 +='<h3 class="main_cat_heading" id="menuh'+data[i].id+'">'+toTitleCase(data[i].name)+'</h3>';
				str1 += '</a>';
              } 

			  str1+= '</div>';


			 document.getElementById("main_cate").innerHTML=str1;

			 $.mobile.changePage( "#categoriesPage_new");

                
		},
		error: function(xhr, textStatus, errorThrown) {
			    toast('Network error..Please Reload');
		}
	  });

                
      var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];
				
				var items=0;
				for(var i=0;i<mylist.length;i++)
				{
					var elem = mylist[i].split('|');
					items += parseInt(elem[4]);
				}


                /*$('#noofitems_prod').text(items);
				$('#noofitems_prod1').text(items);
				$('#noofitems_prod2').text(items);
				$('#noofitems_main').text(items);
				$('#noofitems_cart').text(items);
				$('#noofitems_cart1').text(items);
				$('#noofitems_prod_detail').text(items);*/


    }
	else
	{
		//document.getElementById("main_cate").innerHTML='<div class="emptycart"><img style="max-width: 60px;" src="assets/images/bq.jpg"></div><div class="emptycart" >Your area is not serviceable</div>';
	}

}

function showHomepage(id,catname,gst)
{
	$.mobile.changePage( "#productspg");
	hideloader();
	showCategory_new(id,catname,gst);

}

function showCategory_new(id,catname,gst)
{
    var str1 = '';
	var str2 = '<ul>';

	str2+='<li><a href=javascript:showdiv(\'sub'+id+'\'); style="color:#b63f35; font-weight:600">'+checkforundefined(catname)+'</a></li>';
					//str2+='<li><a href=javascript:showdiv(\'menuh_2'+data[i].id+'\'); style="color:#b63f35; font-weight:600">'+checkforundefined(data[i].name)+'</a></li>';
					str2+= '<span id="menuh_side'+id+'"></span>';
	str2+= '</ul>';


	str1 +='<h3 class="menu_heading_cat" id="menuh'+id+'">'+toTitleCase(catname)+'</h3>';
					str1 +='<div class="menu_thread" id="sub'+id+'"></div>';


	//document.getElementById("menu_items").innerHTML=str2;
	document.getElementById("menusection").innerHTML=str1;

    addSubcategory(id,catname,gst);

			  setTimeout(function(){
			$('.recommened_carousel').owlCarousel({
				items:2,
				loop:true,
				margin:10,
				dots:false,
				merge:true,
				autoplayTimeout:5000,
				autoplaySpeed:700,
				autoplay:true
			});
		},100)

			     
				 
      var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];
				
				var items=0;
				for(var i=0;i<mylist.length;i++)
				{
					var elem = mylist[i].split('|');
					items += parseInt(elem[4]);
				}


              /*$('#noofitems_prod').text(items);
				$('#noofitems_prod1').text(items);
				$('#noofitems_prod2').text(items);
				$('#noofitems_main').text(items);
				$('#noofitems_cart').text(items);
				$('#noofitems_cart1').text(items);
				$('#noofitems_prod_detail').text(items);*/
}

function addSubcategory(catid,catname,gst)
{

	var loc= localStorage.getItem('selectedstorearvinddairy');

	'use strict';	
	   $.ajax({
		 url: shopcmsurl+'getcat/getcategory/'+catid+'/'+loc,
		 type: 'GET',
		 timeout: 55000,
		 dataType: 'json',
		 data: { },

		success: function(data, textStatus, xhr) {
					 
				//console.log('JSONDATA:'+JSON.stringify(data));

				var str='';
				var str2='<ul>';


				if(data.length>0)
				{

					for(var i=0;i<data.length;i++)
					{
					   str +='<h3 class="menu_heading_cat_sub catsubbg" id="menuh_sub'+data[i].id+'" onclick="javascript:togglecatDiv(\'menuh_sub'+data[i].id+'\', \'menu'+data[i].id+'\', \''+data[i].name+'\');">'+toTitleCase(data[i].name)+'<span class="sadd_signup">+</span></h3>';
					   str +='<div class="menu_thread" id="menu'+data[i].id+'" style="display:none;"></div>';

					   str2 +='<li><a href=javascript:showdiv(\'menuh_sub'+data[i].id+'\');>'+checkforundefined(data[i].name)+'</a></li>';
						
					}

					str2 +='</ul>';

					//console.log('str:'+str);
					
					document.getElementById("sub"+catid).innerHTML=str;
					//document.getElementById("menuh_side"+catid).innerHTML=str2;


					for(var i=0;i<data.length;i++)
					{
						addProducts(data[i].id,data[i].name,data[i].gst);
					}

				}
				else
			    {
					
					//str2 +='<li><a href=javascript:showdiv(\'sub'+catid+'\');>'+checkforundefined(catname)+'</a></li>';
					str +='<div class="menu_thread" id="menu'+catid+'" style="display:block;"></div>';


					document.getElementById("sub"+catid).innerHTML=str;

					addProducts(catid,catname,gst);
				}
				
        
        
                
		},
		error: function(xhr, textStatus, errorThrown) {
					toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
	  });
}

function showdiv (id) {
    // Handler for .ready() called.
    $('html, body').animate({
        scrollTop: ($('#'+id).offset().top- 120)
    }, 'slow');

    //$(".menu_items").height(0);


    //$(".overlay").fadeOut(300)
    //$(".overlay1").fadeOut(300)
}

function addProducts(cid,cname,gst)
{  
    
	var loc= localStorage.getItem('selectedstorearvinddairy');
	var cat_type = localStorage.getItem('cattype_ad');
	//var loc= '0';

	'use strict';	
     //$('body').addClass('ui-loading');
	//document.getElementById("cat_header").innerHTML='<span>'+cname+'</span>';
	//$.mobile.changePage( "#products");
	var mywishlist = JSON.parse(localStorage.getItem("mywishlistitemarvinddairy"))||[];
	var mycartlist = JSON.parse(localStorage.getItem("shoppingcartitemarvinddairy"))||[];
    var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];

			
	var str='';
	globalcid = cid;
	globalcname = cname;
	   $.ajax({
		 url: shopcmsurl+'getcat/getitems/'+loc+'/'+cid+'/'+cat_type,
		 type: 'GET',
		 timeout: 55000,
		 dataType: 'json',
		 data: { },

		success: function(data, textStatus, xhr) {

			//console.log('ProductsData:'+JSON.stringify(data));
				
			var str = '<div class="menu_content"><ul>';

			var totlength = data.length;
            //console.log('totlength....'+totlength);

			if(totlength==0)
			{
				str+='<div class="noprdct">No Products Found</div>';
				//document.getElementById("prdctlist").innerHTML=str;
				document.getElementById("menu"+cid).innerHTML=str;
			}
			else
			{
               // console.log('foodtype in products'+foodtype);
				for(var i=0;i<totlength;i++)
				{
					if(data[i].catid==cid)
					{


					var imgurl= data[i].images;
					var imgurlnew = data[i].images;
                    var img_str_json=data[i].images;

					if(imgurlnew=='null' || imgurlnew==null || imgurlnew=='' || imgurlnew=='undefined')
					{
						//imgurlnew = 'assets/images/No_Image_Available.jpg';
						imgurlnew = 'assets/images/no-img-bg.jpg';
					}

					var szarr = [];
					var szvalarr = [];
					var pricearr = [];
						if(data[i].variable.length>0)
						{
							for(var v=0;v<data[i].variable.length;v++)
							{
								var attr_key =data[i].variable[v].attribute_key;
								if(typeof attr_key==undefined || attr_key=='undefined'|| attr_key==null || attr_key=='null')
								{
									//attr_key='quantity';
									attr_key='please choose';
								}

								console.log('attr_key:'+attr_key);
								if(attr_key)
								{
									if(attr_key.toLowerCase() == 'please choose')
									{
										szarr=data[i].variable[v].attribute_value.split("|");
										szvalarr = data[i].variable[v].sku.split("|");
										szvalarr.push(data[i].variable[v].p_itemcode);

										pricearr = data[i].variable[v].attrprice.split("|");
										
									}
								}
								
							}

						}

                    if(data[i].colum9 == null)
                    	data[i].colum9='';
                    if(foodtype=='VEG')
                    {
                    	
                    if(data[i].colum9=='green_dot' || data[i].colum9=='null' || data[i].colum9=='' || data[i].colum9=='0')
                    {
						str +='<li><div class="dish_img">';
						str +='<img src="'+imgurlnew+'" class="img-responsive" alt="" onerror=\'javascript:onImgError(this);\' onclick="javascript:showProducts_none(\''+cid+'\',\''+cname+'\',\''+gst+'\',\''+data[i].itemcode+'\')">';
						str +='</div>';
						str +='<div class="dis_desc">';
						str +='<div class="ui-grid-a">';
						str +='<div class="ui-block-a">';
						str +='<div class="itemName"><h3> <span class="meal_type">';
						if(data[i].keyingredients=='spicy')
	                    {
	                       str+='<img src="assets/images/chilli.png">';     
	                    }
						if(data[i].colum9=='green_dot')
							str +='<img src="assets/images/veg_sign.png" alt="" />';
						str +='</span>'+data[i].itemname+'</h3></div>';

						str +='<div class="itemName"><span class="meal_type_desc">'+data[i].description+'</span></div>';

						str +='</div>';
						str +='<div class="ui-block-b">';
						str +='<div class="addTowish">';
						str +='<label class="wishlist_btn">';
						str +='<input type="checkbox" data-role="none">';
						str +='<span></span>';
						str +='</label>';
						str +='</div>';
						str +='</div>';
						str +='</div>';
						/*str +='<div class="customize_check">';
						str +='<label>Half <input type="radio" data-role="none" name="customize_item" checked /></label>';
						str +='<label>Full <input type="radio" data-role="none" name="customize_item" /></label>';
						str +='</div>';*/
						str +='<div class="ui-grid-a"><div class="ui-block-a">'+
								'<div class="dish_price">&#8377; '+data[i].mrp+'</div>'+
								'</div><div class="ui-block-b">'+
								'<div class="menu_add_option" id="menu_pro'+data[i].itemcode+'">';
								if(mycartlist.indexOf(data[i].itemcode)>=0)
								{
									var j = mycartlist.indexOf(data[i].itemcode);
	                    			mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"));
	                    			var elem = mylist[j].split('|'); 	

									str += '<div class="cart_qty">'+	
										   '<button  onclick="javascript:updateshopcart(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'sub\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" data-role="none" class="spinner_button removeProduct">-</button>'+
										   '<input name="qty'+data[i].itemcode+'" id="qty'+data[i].itemcode+'" class="quantity" min="0" name="quantity" value="'+elem[4]+'" type="number" data-role="none">'+
										   '<button onclick="javascript:updateshopcart(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'add\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="spinner_button" data-role="none">+</button>'+
										   '</div>';
								}
								else
								{

								
									str += '<div class="cart_qty">'+	
									       '<button onclick="buyfromshop(this,\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+i+'\',\''+data[i].howtouse+'\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="add_btn">ADD</button><br>'+
									       '</div>';
								}
								str +='</div></div>'+
								'</div></div>'+
								'</li>';
						}
					}
					else if(foodtype=='NON-VEG')
                    {

                    	
                    if(data[i].colum9=='red_dot' || data[i].colum9=='null' || data[i].colum9=='' || data[i].colum9=='0')
                    {
						str +='<li><div class="dish_img">';
						str +='<img src="'+imgurlnew+'" class="img-responsive" alt="" onerror=\'javascript:onImgError(this);\' onclick="javascript:showProducts_none(\''+cid+'\',\''+cname+'\',\''+gst+'\',\''+data[i].itemcode+'\')">';
						str +='</div>';
						str +='<div class="dis_desc">';
						str +='<div class="ui-grid-a">';
						str +='<div class="ui-block-a">';
						str +='<div class="itemName"><h3> <span class="meal_type">';
						if(data[i].keyingredients=='spicy')
	                    {
	                       str+='<img src="assets/images/chilli.png">';     
	                    }
						if(data[i].colum9=='red_dot')
							str +='<img src="assets/images/non_veg_sign.png" alt="" />';
						str +='</span>'+data[i].itemname+'</h3></div>';

						str +='<div class="itemName"><span class="meal_type_desc">'+data[i].description+'</span></div>';
						str +='</div>';
						str +='<div class="ui-block-b">';
						str +='<div class="addTowish">';
						str +='<label class="wishlist_btn">';
						str +='<input type="checkbox" data-role="none">';
						str +='<span></span>';
						str +='</label>';
						str +='</div>';
						str +='</div>';
						str +='</div>';
						/*str +='<div class="customize_check">';
						str +='<label>Half <input type="radio" data-role="none" name="customize_item" checked /></label>';
						str +='<label>Full <input type="radio" data-role="none" name="customize_item" /></label>';
						str +='</div>';*/
						str +='<div class="ui-grid-a"><div class="ui-block-a">'+
								'<div class="dish_price">&#8377; '+data[i].mrp+'</div>'+
								'</div><div class="ui-block-b">'+
								'<div class="menu_add_option" id="menu_pro'+data[i].itemcode+'">';
								if(mycartlist.indexOf(data[i].itemcode)>=0)
								{
									var j = mycartlist.indexOf(data[i].itemcode);
	                    			mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"));
	                    			var elem = mylist[j].split('|'); 	

									str += '<div class="cart_qty">'+	
										   '<button  onclick="javascript:updateshopcart(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'sub\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" data-role="none" class="spinner_button removeProduct">-</button>'+
										   '<input name="qty'+data[i].itemcode+'" id="qty'+data[i].itemcode+'" class="quantity" min="0" name="quantity" value="'+elem[4]+'" type="number" data-role="none">'+
										   '<button onclick="javascript:updateshopcart(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'add\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="spinner_button" data-role="none">+</button>'+
										   '</div>';
								}
								else
								{
									str += '<div class="cart_qty">'+	
									       '<button onclick="buyfromshop(this,\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+i+'\',\''+data[i].howtouse+'\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="add_btn">ADD</button><br>'+
									       '</div>';
								}
								str +='</div></div>'+
								'</div></div>'+
								'</li>';
						}
					}
					else
					{
						//console.log("11111");
						str +='<li class="products_border"><div class="dish_img">';
						str +='<img src="'+imgurlnew+'" class="img-responsive" alt="" onerror=\'javascript:onImgError(this);\' onclick="javascript:showProducts_none(\''+cid+'\',\''+cname+'\',\''+gst+'\',\''+data[i].itemcode+'\')">';
						str +='</div>';
						str +='<div class="dis_desc">';
						str +='<div class="ui-grid-a">';
						str +='<div class="ui-block-a">';
						str +='<div class="itemName"><h3> <span class="meal_type">';
						if(data[i].keyingredients=='spicy')
	                    {
	                       str+='<img src="assets/images/chilli.png">';     
	                    }
						if(data[i].colum9=='green_dot')
							str +='<img src="assets/images/veg_sign.png" alt="" />';
						else if(data[i].colum9=='red_dot')
							str +='<img src="assets/images/non_veg_sign.png" alt="" />';
						str +='</span>'+data[i].itemname+'</h3></div>';

						str +='<div class="itemName"><span class="meal_type_desc">'+data[i].description+'</span></div>';
						str +='</div>';
						str +='<div class="ui-block-b">';

						/*str +='<div class="addTowish" id="imgwish_div'+data[i].id+'">';
						str +='<label class="wishlist_btn">';



						if(data[i].mrp.indexOf("/")>=0)
						{
							data[i].mrp = data[i].mrp.substring(0,data[i].mrp.indexOf("/"));
							data[i].mrp = data[i].mrp.trim();
						}



						if(mywishlist.indexOf(data[i].itemname)>=0)
						{
							str +='<img src="assets/images/wishlist_icon_active.png" id="imgwish'+data[i].id+'" class="wishlist_btn2" onclick="remfromwish2(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qtydet_wish'+i+'\',\''+data[i].howtouse+'\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" />';
						}
						else 
						{
							str +='<img src="assets/images/wishlist_icon1.png" id="imgwish'+data[i].id+'" class="wishlist_btn2" onclick="addtowish(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qtydet_wish'+i+'\',\''+data[i].howtouse+'\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" />';
						}
						str +='</label>';
						str +='</div>';*/

						str +='</div>';
						str +='</div>';

						//if(szarr)
						console.log(szarr.length);
						if(szarr.length>0)
						{
							/*
							str +='<div class="customize_check">';
							for(var j=0;j<szarr.length;j++)
							{
								varlbl = szarr[j];
								if(varlbl.indexOf(data[i].itemname)>=0)
									varlbl = varlbl.replace(data[i].itemname, "");
								str +='<label>'+varlbl+'<input type="radio" data-role="none" name="customize_item" onchange="javascript:searchbyitemcodebyid(\''+encodeURIComponent(szvalarr[j])+'\');"/></label>';
								//str +='<label>Full <input type="radio" data-role="none" name="customize_item" /></label>';
							}
							str +='</div><br>';
							*/
							var itemmatch=data[i].itemcode;
							
							for(var j=0;j<szarr.length;j++)
							{
								varlbl = szvalarr[j];
								if(mycartlist.indexOf(varlbl)>=0)
									{
										itemmatch = varlbl;
										
									}

							}
							str +='<div class="ui-grid-a"><div class="ui-block-a">'+
								//'<div class="dish_price">&#8377; '+data[i].mrp+'</div>'+
								'<div class="dish_price_cust">Customizable</div>'+
								'</div><div class="ui-block-b">'+
								'<div class="menu_add_option" id="menu_pro'+data[i].itemcode+'">';
								if(mycartlist.indexOf(itemmatch)>=0)
								{
									var j = mycartlist.indexOf(itemmatch);
	                    			mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"));
	                    			var elem = mylist[j].split('|'); 	

									/*str += '<div class="cart_qty">'+	
										   '<button  onclick="javascript:updateshopcart(\''+itemmatch+'\',\''+data[i].id+'\',\''+itemnamematch+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'sub\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" data-role="none" class="spinner_button removeProduct">-</button>'+
										   '<input name="qty'+itemmatch+'" id="qty'+itemmatch+'" class="quantity" min="0" name="quantity" value="'+elem[4]+'" type="number" data-role="none">'+
										   '<button onclick="javascript:updateshopcart(\''+itemmatch+'\',\''+data[i].id+'\',\''+itemnamematch+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'add\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="spinner_button" data-role="none">+</button>'+
										   '</div>';*/

									str += '<div class="cart_qty">'+	
										   '<button  onclick="javascript:updateshopcart(\''+elem[0]+'\',\''+elem[1]+'\',\''+elem[2]+'\',\''+elem[3]+'\',\''+i+'\',\'qty'+elem[0]+'\',\''+elem[5]+'\',\'sub\',\''+elem[6]+'\',\''+elem[7]+'\',\''+elem[10]+'\');" data-role="none" class="spinner_button removeProduct">-</button>'+
										   '<input name="qty'+elem[0]+'" id="qty'+elem[0]+'" class="quantity" min="0" name="quantity" value="'+elem[4]+'" type="number" data-role="none">'+
										   '<button onclick="javascript:updateshopcart(\''+elem[0]+'\',\''+elem[1]+'\',\''+elem[2]+'\',\''+elem[3]+'\',\''+i+'\',\'qty'+elem[0]+'\',\''+elem[5]+'\',\'add\',\''+elem[6]+'\',\''+elem[7]+'\',\''+elem[10]+'\');" class="spinner_button" data-role="none">+</button>'+
										   '</div>';
								}
								else
								{
                
									
						            str += '<div class="cart_qty_bshop">'+	
									       '<button onclick="javascript:showVarshop(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+szarr+'\',\''+szvalarr+'\',\''+pricearr+'\')" class="add_btn">ADD</button><br>'+
									       '</div>';

						            
								}
								str +='</div></div>';
								str +='</div>';
						}
						else
						{
							str +='<div class="ui-grid-a"><div class="ui-block-a">'+
								'<div class="dish_price">&#8377; '+data[i].mrp+'</div>'+
								'</div><div class="ui-block-b">'+
								'<div class="menu_add_option" id="menu_pro'+data[i].itemcode+'">';
								if(mycartlist.indexOf(data[i].itemcode)>=0)
								{
									var j = mycartlist.indexOf(data[i].itemcode);
	                    			mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"));
	                    			var elem = mylist[j].split('|'); 	

									str += '<div class="cart_qty">'+	
										   '<button  onclick="javascript:updateshopcart(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'sub\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" data-role="none" class="spinner_button removeProduct">-</button>'+
										   '<input name="qty'+data[i].itemcode+'" id="qty'+data[i].itemcode+'" class="quantity" min="0" name="quantity" value="'+elem[4]+'" type="number" data-role="none">'+
										   '<button onclick="javascript:updateshopcart(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'add\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="spinner_button" data-role="none">+</button>'+
										   '</div>';
								}
								else
								{
                
									var colorarr = [];
						            var colorvalarr = [];

									if(data[i].itemallowaddon=='1')
									{ 
										str += '<div class="cart_qty_bshop">'+	
									       '<button onclick="addons(this,\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+i+'\',\''+data[i].howtouse+'\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="add_btn">ADD</button><br>'+
									       '</div>';
									}
									else
									{
										str += '<div class="cart_qty_bshop">'+	
									       '<button onclick="buyfromshop(this,\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+i+'\',\''+data[i].howtouse+'\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="add_btn">ADD</button><br>'+
									       '</div>';
									}
						            
								}
								str +='</div></div>';
								str +='</div>';
						}
								str +='</div></li>';
					}
				
				}
				//str +='</div>';
				//document.getElementById("prdctlist").innerHTML=str;
				//console.log("str"+str);
				
			}
				str +='</ul></div>';
				document.getElementById("menu"+cid).innerHTML=str;
			}

		},
		error: function(xhr, textStatus, errorThrown) {
			    //toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
	  });


				

				var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];
				
				var items=0;
				for(var i=0;i<mylist.length;i++)
				{
					var elem = mylist[i].split('|');
					items += parseInt(elem[4]);
				}


              /*$('#noofitems_main').text(items);
				$('#noofitems_prod').text(items);
				$('#noofitems_prod1').text(items);
				$('#noofitems_cart').text(items);
                $('#noofitems_cart1').text(items);
				$('#noofitems_prod_detail').text(items);*/
				
		

}

function checkforundefined_gst(str)
{
    if(typeof str==undefined || str=='undefined'|| str==null || str=='null')
    {
        str='0';
    }
        return str;
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function togglecatDiv(str1,str2,catname)
{
	  var x = document.getElementById(str2);

	  if (x.style.display === "none") 
	  {
			x.style.display = "block";
			document.getElementById(str1).innerHTML=toTitleCase(catname)+'<span class="sadd_signup">-</span>';
	  } 
	  else
	  {
			x.style.display = "none";
			document.getElementById(str1).innerHTML=toTitleCase(catname)+'<span class="sadd_signup">+</span>';
	  }
}

function onImgError(source){
        source.src = "assets/images/no-img-bg.jpg";
        source.onerror = ""; 
        return true; 
    }

function buyfromshop(e,code,id,name,mrp,index,qtytxt,size,imglink,gst,cid)
{

//$("#customize_menu").slideDown();
//$(".overlay1").fadeIn();

var q =0;
try
{
e.parentNode.querySelector('input[type=number]').stepUp();

if(e.parentNode.querySelector('input[type=number]').value == 1){
e.parentNode.querySelector('.add_btn').style.display= 'none';
}

q = e.parentNode.querySelector('input[type=number]').value
}
catch(e)
{

q=1;

}



//console.log('from qtytxt:'+q);
var stocknotavail = false;
if(typeof q !='undefined')
{
try{
$('#qty'+code+'').val(q);
$('#qtydet'+code+'').val(q);
}catch(err){}
var amt=parseInt(mrp)*parseInt(q);
if(typeof gst !='undefined')
{
amt = amt + amt*gst/100;
}
var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];
var myaddonlist = JSON.parse(localStorage.getItem("addoncartarvinddairy"));
//console.log('addonlist'+myaddonlist);
var selvar='';
try{
selvar = $('#variable'+code).val();
if(typeof selvar ==undefined)
{
selvar = $('#variabledet'+code).val();
}

var addonstr = '';
var tmpprice = 0;

for(var j=0;j<myaddonlist.length;j++)
{
var tmpobj = myaddonlist[j].split('|');
//console.log('tmpobj:'+tmpobj);
if(tmpobj[0]==code)
{
	
	if(addonstr!='')
	addonstr = addonstr + '$' +tmpobj[2];
	else
	addonstr = tmpobj[2];

	//console.log(addonstr);

	var items = tmpobj[2].split('@');

	tmpprice = parseInt(tmpprice) + parseInt(items[1]);
	//alert('addonstr inside...'+addonstr);
	//alert('tmpprice inside...'+tmpprice);
}
//alert('addonstr...'+addonstr);
//alert('tmpprice...'+tmpprice);
}
try{
var varprod = selvar.split('-');
}
catch(r)
{

}
mrp = parseInt(varprod[1]) + parseInt(tmpprice);
//mrp = varprod[1];
document.getElementById('priceblk'+code).innerHTML = '&#8377; '+mrp;

//alert('3333');
/*var selarr = selvar.split('$');

for(var s=0;s<selarr.length;s++){
console.log('selarr..................'+selarr[s]);
if(selarr[s].indexOf('stock-')>=0)
{
var stock = selarr[s].split('-');
//alert('stock....'+stock[1]);
if(parseInt(stock[1])==0 || (parseInt(stock[1]) < parseInt(q)))
{
document.getElementById('outofstock'+code).innerHTML = 'Out of Stock';
document.getElementById('outofstockdet'+code).innerHTML = 'Out of Stock';
stocknotavail = true;
}
else if(parseInt(stock[1])<=10)
{
document.getElementById('outofstock'+code).innerHTML = 'Limited Stock';
document.getElementById('outofstockdet'+code).innerHTML = 'Limited Stock';
}
else
{
document.getElementById('outofstock'+code).innerHTML = '';
document.getElementById('outofstockdet'+code).innerHTML = '';
}
}
else if(selarr[s].indexOf('mrp-')>=0)
{
var price = selarr[s].split('-');
console.log('222'+price);
mrp = price[1];
document.getElementById('priceblk'+code).innerHTML = '&#x20B9; '+mrp;
}
}*/
//console.log('selvar'+selvar);
}catch(err)
{
//alert('3333'+err.toString());
}

if(stocknotavail==false)
{
toast('Item added to cart');
//$("#viewCart").animate({height: "initial"}, 300);
	setTimeout(function(){
		var _menu_height = $(".menu_bottom").outerHeight();
		$(".middle_content").css({paddingBottom: _menu_height}, 300)
	},1000)


if(mylist.indexOf(code+'|'+id+'|'+name+'|'+mrp+'|'+q+'|'+size+'|'+imglink+'|'+gst+'|'+selvar+'|'+addonstr+'|'+cid)==-1)
{
mylist.push(code+'|'+id+'|'+name+'|'+mrp+'|'+q+'|'+size+'|'+imglink+'|'+gst+'|'+selvar+'|'+addonstr+'|'+cid);

//alert(JSON.stringify(mylist));
/*var temporder = localStorage.getItem('temporderid');
if(typeof temporder == undefined || temporder == null)
temporder='';
if(temporder=='')
{
$.ajax({
url: shopcms+'apis/add/cartlist/'+brand_id, //login.php
type: 'GET',
timeout: 50000,
dataType: 'json', //xml/html/script/json/jsonp
data: {'mobile': user.mobile, 'code': code, 'id': id, 'name': name, 'mrp': mrp, 'qty': q, 'size': size},
complete: function(xhr, textStatus) {
//called when complete
},
success: function(data, textStatus, xhr) {
//alert('JSONDATA'+JSON.stringify(data));
var temporderid=data.order_id;
//alert(temporderid);
localStorage.setItem('temporderid',temporderid);
},
error: function(xhr, textStatus, errorThrown) {

toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
}
});
}
else
{
$.ajax({
url: shopcms+'apis/add/cartlist/'+brand_id, //login.php
type: 'GET',
timeout: 50000,
dataType: 'json', //xml/html/script/json/jsonp
data: {'mobile': user.mobile, 'code': code, 'id': id, 'name': name, 'mrp': mrp, 'qty': q, 'size': size, 'order_id': temporder},
complete: function(xhr, textStatus) {
//called when complete
},
success: function(data, textStatus, xhr) {
//console.log('JSONDATA'+JSON.stringify(data));
var temporderid=data.order_id;
localStorage.setItem('temporderid',temporderid);
},
error: function(xhr, textStatus, errorThrown) {

toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
}
});
}*/

}
localStorage.setItem("shoppingcartarvinddairy",JSON.stringify(mylist));
//console.log('in buyfromshop'+JSON.stringify(mylist));
var mycartlist = JSON.parse(localStorage.getItem("shoppingcartitemarvinddairy"))||[];
if(mycartlist.indexOf(code)==-1)
mycartlist.push(code);
localStorage.setItem("shoppingcartitemarvinddairy",JSON.stringify(mycartlist));
var pstr ='';
var pdetstr ='';

if(mycartlist.indexOf(code)>=0)
	{

	console.log('111:'+code);
		var j = mycartlist.indexOf(code);
	    mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"));
	    var elem = mylist[j].split('|'); 	
		pstr += '<div class="cart_qty">'+	
				'<button  onclick="javascript:updateshopcart(\''+code+'\',\''+id+'\',\''+name+'\',\''+mrp+'\',\''+index+'\',\'qty'+code+'\',\''+size+'\',\'sub\',\''+imglink+'\',\''+gst+'\',\''+cid+'\');" data-role="none" class="spinner_button removeProduct">-</button>'+
				'<input name="qty'+code+'" id="qty'+code+'" class="quantity" min="0" name="quantity" value="1" type="number" data-role="none">'+
				'<button onclick="javascript:updateshopcart(\''+code+'\',\''+id+'\',\''+name+'\',\''+mrp+'\',\''+index+'\',\'qty'+code+'\',\''+size+'\',\'add\',\''+imglink+'\',\''+gst+'\',\''+cid+'\');" class="spinner_button" data-role="none">+</button>'+
				'</div>';
		pdetstr += '<div class="cart_qty">'+	
				'<button  onclick="javascript:updateshopcart(\''+code+'\',\''+id+'\',\''+name+'\',\''+mrp+'\',\''+index+'\',\'qty'+code+'\',\''+size+'\',\'sub\',\''+imglink+'\',\''+gst+'\',\''+cid+'\');" data-role="none" class="spinner_button removeProduct">-</button>'+
				'<input name="qtydet'+code+'" id="qtydet'+code+'" class="quantity" min="0" name="quantity" value="1" type="number" data-role="none">'+
				'<button onclick="javascript:updateshopcart(\''+code+'\',\''+id+'\',\''+name+'\',\''+mrp+'\',\''+index+'\',\'qty'+code+'\',\''+size+'\',\'add\',\''+imglink+'\',\''+gst+'\',\''+cid+'\');" class="spinner_button" data-role="none">+</button>'+
				'</div>';
	}
else
	{
		pstr += '<div class="cart_qty">'+	
				'<button onclick="buyfromshop(this,\''+itemcode+'\',\''+id+'\',\''+itemname+'\',\''+mrp+'\',\''+index+'\',\'qty'+code+'\',\''+size+'\',\''+imglink+'\',\''+gst+'\',\''+cid+'\');" class="add_btn">ADD</button>'+
				'</div>';
		pdetstr += '<div class="cart_qty">'+	
				'<button onclick="buyfromshop(this,\''+itemcode+'\',\''+id+'\',\''+itemname+'\',\''+mrp+'\',\''+index+'\',\'qty'+code+'\',\''+size+'\',\''+imglink+'\',\''+gst+'\',\''+cid+'\');" class="add_btn">ADD</button>'+
				'</div>';		
	}
$('#menu_pro'+code+'').html(pstr);
$('#menu_prodet'+code+'').html(pdetstr);

//var items = mylist.length;

var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];
		var items=0;
			for(var i=0;i<mylist.length;i++)
			{
				var elem = mylist[i].split('|');
				items += parseInt(elem[4]);
			}


/*$('#noofitems_prod').text(items);
$('#noofitems_prod1').text(items);
$('#noofitems_main').text(items);
$('#noofitems_cart').text(items);
$('#noofitems_cart1').text(items);
$('#noofitems_prod_detail').text(items);*/

$.mobile.changePage( "#productspg");



//showcartPopup();

//hidecustomizeMenu();

}
}

}

function updateshopcart(code,id,name,mrp,index,qtytxt,size,acttype,imglink,gst,cid)
{


var q = $('#'+qtytxt).val();
var myaddonlist = JSON.parse(localStorage.getItem("addoncartarvinddairy"))||[];

if(typeof q !='undefined')
{
if(parseInt(q)<1)
q = 0;
if(acttype=='add')
q = parseInt(q)+1;
else if(acttype=='sub')
q = parseInt(q)-1;
else
q = parseInt(q);
if(parseInt(q)<1)
q = 0;


$('#'+qtytxt+'').val(q);
try{
$('#qty'+code+'').val(q);
$('#qtydet'+code+'').val(q);
}catch(err){}
var stocknotavail = false;
var selvar;
try{
selvar = $('#variable'+code).val();
//alert(selvar);
var addonstr = '';
var tmpprice = 0;
//alert('2222');
for(var j=0;j<myaddonlist.length;j++)
{
var tmpobj = myaddonlist[j].split('|');
//alert('tmpobj'+tmpobj);
if(tmpobj[0]==code)
{
if(addonstr!='')
addonstr = addonstr + '$' +tmpobj[2];
else
addonstr = tmpobj[2];

var items = tmpobj[2].split('@');

tmpprice = parseInt(tmpprice) + parseInt(items[1]);
//alert('addonstr inside...'+addonstr);
//alert('tmpprice inside...'+tmpprice);
}
//alert('addonstr...'+addonstr);
//alert('tmpprice...'+tmpprice);
}
var varprod = selvar.split('-');
mrp = parseInt(varprod[1]) + parseInt(tmpprice);
document.getElementById('priceblk'+code).innerHTML = '&#x20B9; '+mrp;
/* var selarr = selvar.split('$');
for(var s=0;s<selarr.length;s++){
if(selarr[s].indexOf('stock-')>=0)
{
var stock = selarr[s].split('-');
//alert('stock....'+stock[1]);
if(parseInt(stock[1])==0 || (parseInt(stock[1])<parseInt(q)))
{
document.getElementById('outofstock'+code).innerHTML = 'Out of Stock';
stocknotavail = true;
}
else if(parseInt(stock[1])<=10)
{
document.getElementById('outofstock'+code).innerHTML = 'Limited Stock';
}
}
else if(selarr[s].indexOf('mrp-')>=0)
{
var price = selarr[s].split('-');
mrp = price[1];
document.getElementById('priceblk'+code).innerHTML = '&#x20B9; '+mrp;
}
}*/

}catch(err)
{}
//console.log('stocknotavail'+stocknotavail);
if(stocknotavail == false)
{
//console.log('selvar'+selvar);
updatecart(code,id,name,mrp,qtytxt,size,imglink,gst,selvar,cid);
toast('Item updated in cart');
}
}



}

function updatecart(code,id,name,mrp,qtytxt,size,imglink,gst,variable,cid)
{
    
 var qt =  $('#'+qtytxt+'').val();

 //console.log('qqqqqqq:'+qt);

 
 
 var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];
 var mycartlist = JSON.parse(localStorage.getItem("shoppingcartitemarvinddairy"))||[];
 var myaddonlist = JSON.parse(localStorage.getItem("addoncartarvinddairy"))||[];
 for(var i=0;i<mylist.length;i++)
	{
	 var elem = mylist[i];
     var selvar;
     var addonstr = '';
    var tmpprice = 0;
	 if(elem.indexOf(id+'|'+name+'|'+mrp)>=0)
		{
	
    try{
	selvar = $('#variable'+code).val();
    if(typeof selvar ==undefined)
    {
     selvar = $('#variabledet'+code).val();   
    }
	
    //alert('2222');
    for(var j=0;j<myaddonlist.length;j++)
         	{
         		var tmpobj = myaddonlist[j].split('|');
         		//alert('tmpobj in update'+tmpobj);
         	    if(tmpobj[0]==code)
				{
					if(addonstr!='')
						addonstr = addonstr + '$' +tmpobj[2];
					else
						addonstr = tmpobj[2];

					var items = tmpobj[2].split('@');
					
					tmpprice = parseInt(tmpprice) + parseInt(items[1]); 
					//alert('addonstr inside...'+addonstr);
				    //alert('tmpprice inside...'+tmpprice);
				}
				//alert('addonstr...'+addonstr);
				//alert('tmpprice...'+tmpprice);
			}
			var varprod = selvar.split('-');
			//mrp = varprod[1];
			mrp = parseInt(varprod[1]) + parseInt(tmpprice);
			document.getElementById('priceblk'+code).innerHTML = '&#x20B9; '+mrp;
     }catch(err){}
        mylist.splice(i, 1);
        //mycartlist.splice(i, 1);


        //if(parseInt(qt)>0)
        //{
        var elems = elem.split('|');
		mylist.push(elems[0]+'|'+elems[1]+'|'+elems[2]+'|'+elems[3]+'|'+qt+'|'+elems[5]+'|'+elems[6]+'|'+elems[7]+'|'+variable+'|'+addonstr+'|'+cid);
        //mycartlist.push(elems[0]);
        //}
	    localStorage.setItem("shoppingcartarvinddairy",JSON.stringify(mylist));
	     localStorage.setItem("shoppingcartitemarvinddairy",JSON.stringify(mycartlist));

	    
		}
	
	

	var elemitem = mycartlist[i];
	if(elemitem.indexOf(code)>=0)
		{
		mycartlist.splice(i, 1);
		if(mycartlist.indexOf(code)==-1)
		mycartlist.push(code);
	    localStorage.setItem("shoppingcartitemarvinddairy",JSON.stringify(mycartlist));
	
		}
	}

	//var items = mylist.length;

	var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];
		var items=0;
			for(var i=0;i<mylist.length;i++)
			{
				var elem = mylist[i].split('|');
				items += parseInt(elem[4]);
			}



/*$('#noofitems_main').text(items);
$('#noofitems_cart').text(items);
$('#noofitems_cart1').text(items);*/

//viewcart();
//showcartPopup();

}

function roundoff(elem)
{
   elem = Math.round(parseFloat(elem) * 100) / 100;
   return elem;
}

function viewcart()
{

var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];
//resetsavedAddloc();

var str = '';
var total_amt=0;
var id_str=''
var totaltax=0;
var deliverycharge=0;
var discount=0;
//alert(mylist.length);
if(mylist.length>0)
{
for(var i=0;i<mylist.length;i++)
	{
					//alert(mylist[i]);
					var elem = mylist[i].split('|');

		if(elem[4]!='0')
		{
					
                    var tax = 0;
					console.log('elem[7]:'+elem[7])
                    if(typeof elem[7] != 'undefined' && elem[7] != 'null' && elem[7] != null && elem[7] != 'undefined')
                    {

                     tax = (elem[3]*elem[4])*elem[7]/100;
                     //total_amt=total_amt+tax;  
                     totaltax = totaltax + tax; 

                    }
					var imgurl= elem[0];
					var imgurlmain= imgurl.trim();
                    
					try{
					if(elem[9].indexOf('$')>=0)
					elem[9] = elem[9].replaceAll('$','|');
					}catch(err){}
					var varprod = elem[8].split('-');
                    
					var elem2_new =  elem[2].replace(/[^\w\s]/gi, '');
					var elem9_new =  elem[9].replace('-', '');

					if(elem[9]=='')
					{
						id_str=id_str+elem2_new+ '-'+ elem[5]+ '-'+ elem[4]+ '-'+ elem[3]+ '-'+ tax+ '-'+ elem[0]+ '-'+ elem9_new+',';
						total_amt=total_amt+elem[3]*elem[4];
						//alert('1111111'+id_str);
					}
					else
					{	
						id_str=id_str+elem2_new+ '-'+ elem[5]+ '-'+ elem[4]+ '-'+ elem[3]+ '-'+ tax+ '-'+ elem[0]+ '-'+ elem9_new+',';
						total_amt=total_amt+elem[3]*elem[4];
						//console.log('varprod[1]:'+varprod[1]);
						//console.log('elem[9]:'+elem[9]);
                        
						/* calculating addons price & tax starts*/
						var addons_price = 0;
						var addons_tax = 0;
						$.each(elem[9].split('|'), function(key, value){
							
							addons_price = parseFloat(addons_price) + parseFloat(value.split('@')[1]);

						});
						//console.log('addons_price:'+addons_price);
						if(typeof elem[7] != 'undefined' && elem[7] != 'null' && elem[7] != null && elem[7] != 'undefined')
						{

							addons_tax = addons_price*elem[7]/100;

						}
						//console.log('addons_tax:'+addons_tax);

						total_amt = parseFloat(total_amt)+parseFloat(addons_price);
						totaltax = parseFloat(totaltax)+parseFloat(addons_tax);

						/* calculating addons price & tax ends */

						
					}
					localStorage.setItem("id_strarvinddairy",id_str);

                    var psizetext=elem[5];
					if(psizetext=='null' || psizetext==null )
					{
						psizetext='';
					}
					else
					{
						psizetext='-'+psizetext;
					}
					try{
					if(elem[9].indexOf('|')>=0)
					{
					elem[9] = elem[9].replaceAll('|',',');
					}
					elem[9] = elem[9].replaceAll('@',' - &#8377; ');
					}catch(err){
						//alert(err.toString());
					}

				


					str +='<div class="cart_item">'+
						'<div class="cart_item_header">'+
							'<div class="cart_item_name">'+
								'<div class="cart_item_inner">';
					if(elem[6] == 'green_dot')
						str +='<img src="assets/images/veg_sign.png" alt="" />';
					else if(elem[6]  == 'red_dot')
						str +='<img src="assets/images/non_veg_sign.png" alt="" />';
					str += elem[2]+'</div>';
					str +='<div class="cart_qty">';   				
				    str +='<button onclick="javascript:updateshopcart2(\''+elem[0]+'\',\''+elem[1]+'\',\''+elem[2]+'\',\''+elem[3]+'\',\''+i+'\',\'qtycart'+elem[0]+'\',\''+elem[5]+'\',\'sub\',\''+elem[6]+'\',\''+elem[7]+'\',\''+elem[8]+'\');" data-role="none" class="spinner_button">-</button>';
					str +='<input class="quantity" min="1" name="qtycart'+elem[0]+'" id="qtycart'+elem[0]+'" value="'+elem[4]+'" type="number" data-role="none" readonly>';
					str +='<button onclick="javascript:updateshopcart2(\''+elem[0]+'\',\''+elem[1]+'\',\''+elem[2]+'\',\''+elem[3]+'\',\''+i+'\',\'qtycart'+elem[0]+'\',\''+elem[5]+'\',\'add\',\''+elem[6]+'\',\''+elem[7]+'\',\''+elem[8]+'\');" data-role="none" class="spinner_button">+</button>';
					str +='</div>';
                    str +='<div class="cart_del" onclick="javascript:remfromshop(\''+elem[0]+'\',\''+elem[1]+'\',\''+elem[2]+'\',\''+elem[3]+'\',\''+i+'\',\'qtycart'+elem[0]+'\',\''+elem[5]+'\',\''+elem[6]+'\',\''+elem[7]+'\',\''+elem[8]+'\');">';
					str +='<img src="assets/images/delete_icon.png" class="img-responsive" alt="Delete Icon">';
					str +='</div>';	
					str+='<div class="cart_item_price">&#8377; '+elem[3]+'</div>';
                    str +='</div>';

					if(elem[9]=='')
					{
						str +='<div class="menu_add_option_cart">';
						str +='</div>';
					}
					else
					{
						str +='<div class="menu_add_option_cart">['+elem[9]+']';
						str +='</div>';
					}

					str +='</div>';
					str +='</div>';


					
		}

					

                
	}	

				   /*str+='<div class="coupon_block">';
					str+='<div class="coupon_block_inner">';
						str+='<div data-role="collapsible" data-icon="false" data-inset="false" data-iconpos="right">';
							str+='<h4>Redeem Points (<span id="tpts">'+user.balance+'</span> Available)</h4>';
							str+='<div class="coupon_form d_flex justify_between">';
								str+='<div class="width65">';
									str+='<input type="text" name="rvalue" id="rvalue" data-role="none" class="coupon_control" placeholder="Enter Points" val="0">';
								str+='</div>';
								str+='<div class="width30">';
									str+='<a href="javascript:redeemValue();" class="btn_coupon">APPLY</a>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div id="rform"  data-icon="false" data-inset="false" data-iconpos="right" style="display: none">';
							str+='<h4>Enter OTP</h4>';
							str+='<div class="coupon_form d_flex justify_between">';
								str+='<div class="width65">';
									str+='<input type="text" name="otp" id="otp" data-role="none" class="coupon_control" placeholder="Enter OTP">';
								str+='</div>';
								str+='<div class="width30">';
									str+='<a href="javascript:redeemNow();" class="btn_coupon">Redeem Now</a>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';


					str+='<div class="coupon_block">';
					str+='<div class="coupon_block_inner">';
						str+='<div data-role="collapsible" data-icon="false" data-inset="false" data-iconpos="right">';
							str+='<h4>Redeem Coupon </h4>';
							str+='<div class="coupon_form d_flex justify_between">';
								str+='<div class="width65">';
									str+='<input type="text" name="couponcode" id="couponcode" data-role="none" class="coupon_control" placeholder="Enter Coupon Code" val="0">';
								str+='</div>';
								str+='<div class="width30">';
									str+='<a href="javascript:redemcoupon();" class="btn_coupon">APPLY</a>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='</div>';*/

					
	               /* if(parseFloat(total_amt)<=5000)
					{
						deliverycharge='52.5';
					}
					else
					{
						deliverycharge='0';
					}	*/
					
	var famt = parseFloat(total_amt)+parseFloat(totaltax)+parseFloat(deliverycharge)-parseFloat(discount);

	//console.log('famt:'+famt);

	var gst_half =  roundoff(parseFloat(totaltax)/2);
	
	str+='<div class="cart_check mt-40">'+
		 '<div class="cart_inner">'+
		 '<div class="inner_text">Net Amount:</div>'+
		 '<div class="inner_price">&#8377; '+roundoff(total_amt)+'</div>'+
		 '</div></div>';
	str+='<div class="cart_check">'+
		 '<div class="cart_inner">'+
		 '<div class="inner_text">CGST:</div>'+
		 '<div class="inner_price">&#8377; '+gst_half+'</div>'+
		 '</div></div>';
	str+='<div class="cart_check">'+
		 '<div class="cart_inner">'+
		 '<div class="inner_text">SGST:</div>'+
		 '<div class="inner_price">&#8377; '+gst_half+'</div>'+
		 '</div></div>';
	str+='<div class="cart_check">'+
		 '<div class="cart_inner">'+
		 '<div class="inner_text">Delivery Charge:</div>'+
		 '<div class="inner_price">&#8377; '+roundoff(deliverycharge)+'</div>'+
		 '</div></div>';
	str+='<div class="cart_check">'+
		 '<div class="cart_inner">'+
		 '<div class="inner_text">Discount:</div>'+
		 '<div class="inner_price">&#8377; '+roundoff(discount)+'</div>'+
		 '</div></div>';
	/*str+='<div class="cart_check">'+
		 '<div class="cart_inner">'+
		 '<div class="inner_text">Points Redeemed:</div>'+
		 '<div class="inner_price">&#8377; <span id="redcost">'+roundoff(discount)+'</span></div>'+
		 '</div></div>';*/
    str+='<div class="cart_check">'+
		 '<div class="cart_inner">'+
		 '<div class="inner_text">Cart Total:</div>'+
		 '<div class="inner_price">&#8377; <span id="totcost">'+roundoff(famt)+'</span></div>'+
		 '</div></div>';

	
	/*str+='<br><div class="add_instruction">'+
								'<p>Any request for the restaurant</p>'+
								'<a href="javascript:addInstruction()" class="edit_btn"><img src="assets/images/edit_icon.png" class="img-responsive" alt=""></a>'+
							'</div>'+
							'<div id="Instruction" style="display: none">'+
								'<div class="special_instructions">'+
									'<input type="text" id="special_instructions" placeholder="Add Special Instruction" data-role="none" class="form-control">'+
								'</div>'+
							'</div>';*/

	//str+='<br><div class="text-center">'+
	//'<a href="#home" data-role="none" class="btn_primary sbt_location">Add More</a>'+
						//'<a href="javascript:getpaymentmethod();" data-role="none" class="btn_primary sbt_location">Confirm Order</a>'+
					//'</div>';

			str+='<div class="text-center mt-20">'+
				'<a href="javascript:checkviewcart_add();" data-role="none" class="cartpage_btn">PROCEED</a>'+
			'</div>';

			
    
}
else
{
	str+='<div class="emptycart"><img style="max-width: 60px;" src="assets/images/thumb_img7.png"> </div>';
	str+='<div class="emptycart" >Your Cart is Empty </div>';
	str+='<div class="emptycart" style="color: #848181;font-size: 14px;>Looks like you have not added any items yet.</div>';


	//$('#paysection').css('display','none');

	//hidecartPopup();
	
}
document.getElementById("cartmain").innerHTML=str;
//document.getElementById("cart_header").innerHTML="My Cart";
$.mobile.changePage( "#my_cart");	

//$(".overlay").fadeIn(300);
//$("#cart_main").slideDown("fast");

localStorage.setItem('totalamtarvinddairy',total_amt);
localStorage.setItem('payableamtarvinddairy',famt);	
localStorage.setItem('taxarvinddairy',totaltax);	
localStorage.setItem('deliverychargearvinddairy',deliverycharge);
localStorage.setItem('discountarvinddairy',discount);


//updateDelieverysection();

//updateRecendations();
	
clearPaytype();

}

function clearPaytype()
{

	//localStorage.setItem('paymenttypearvinddairy','paytm');

	$('#paytmopt').css('background-color','#ffffff');
	$('#cashopt').css('background-color','#ffffff');
	localStorage.removeItem("paymenttypearvinddairy");
}

function showVarshop(code,id,name,gender,organic,pricearr)
{
	document.getElementById("customize_menu").innerHTML='';	
					 
	if(gender!='')
	{
		gender=gender.split(',');
		organic=organic.split(',');
		price=pricearr.split(',');
		//console.log('quantity'+gender);
			var str = '';


								str += '<div class="customize_header">';
								str += '<h3>Size</h3>';
								//str += '<h3>&#8377; '+mrp+'</h3>';
								str += '<h4 class="item_brief"><span id="addonprice"></span></h4>';
								str += '</div>';									
								str += '<div class="customize_inner">';

								str += '<div class="customize_item">';

								for(var i=0;i<gender.length;i++)
								{

									//str += '<p class="item_brief">'+data[i].addongroup.addongroup_name+'(Select upto '+data[i].addon_item_selection_max+' item/items)</p>';

									

								        varlbl = gender[i];
								        if(varlbl.indexOf(name)>=0)
									    varlbl = varlbl.replace(name, "");

										if(varlbl=='')
										{
											varlbl = gender[i];
										}
									     
										str += '<label>';
										str += '<div class="addon_left">';
										str += '<input type="radio" name="addon'+id+'_'+code+'" id="addon'+organic[i]+'_'+code+'" value="'+organic[i]+'" onchange="javascript:searchbyitemcodebyid(\''+encodeURIComponent(organic[i])+'\');" data-role="none" data-role="none">';
										str += '<div class="custom_radio"></div>';
										str += '<span>'+varlbl+'</span>';
										str += '</div>';
										str += '<div class="addon_right">&#8377;  '+price[i]+'</div>';
									    str += '</label>';


									

								}

								str += '</div>';
									
								//str += '<div class="cust_footer">';
								//str += '<div class="cart_qty" style="border: none !important">';		   				
								//str += '<button  onclick="removeProduct(this)" data-role="none" class="spinner_button removeProduct">-</button>';
								//str += '<input class="quantity" min="0" name="quantity" value="0" type="number" data-role="none">';
								//str+= '<button  onclick="addToCart(this)" class="spinner_button" data-role="none">+</button>';
								//str += '</div>';
								//str += '<button class="custo_btn" onclick="javascript:buyfromshop(this,\''+code+'\',\''+id+'\',\''+name+'\',\''+mrp+'\',\''+index+'\',\''+qtytxt+'\',\''+size+'\',\''+imglink+'\',\''+gst+'\',\''+cid+'\');">ADD</button>';
							    str += '</div>';
								str += '</div>';

	}
					document.getElementById("customize_menu").innerHTML=str;


					customizeMenu();

				
    
}

function customizeMenu() 
{
		//$(".customize_menu").slideDown("fast");
		$("#customize_menu").slideDown("fast");
		$(".overlay").fadeIn(300);
}

function hidecustomizeMenu()
{
	document.getElementById("customize_menu").innerHTML= '';

		$("#customize_menu").slideUp("fast");
		//$(".overlay").fadeIn(300);
}

var itemdata = [];
//var itemdata = JSON.parse(localStorage.getItem("addoncartarvinddairy"))||[];

function addons(e,code,id,name,mrp,index,qtytxt,size,imglink,gst,cid)
{
	/*var selvar;
    try{
	selvar = $('#variable'+code).val();
    if(typeof selvar ==undefined)
    {
     selvar = $('#variabledet'+code).val();   
    }
    //console.log(selvar);
	}catch(err)
	{

	}
    var selarr = selvar.split('$');*/

	itemdata = JSON.parse(localStorage.getItem("addoncartarvinddairy"))||[];


	document.getElementById("customize_menu").innerHTML= '';


	var loc= localStorage.getItem('selectedstorearvinddairy');

	$.ajax({
		 url: shopcmsurl+'getcat/getaddonitemsbyitc/'+code+'/'+loc,
		 type: 'GET',
		 timeout: 50000,
		 dataType: 'json',
		 data: { },

		success: function(data, textStatus, xhr) {
					 
			//console.log('VariationsData:'+JSON.stringify(data));
			var str = '';


								str += '<div class="customize_header">';
								str += '<h3>'+name+'<a href="javascript:hidecustomizeMenu()"><span class="sadd_signup">X</span></a></h3>';
								str += '<h3 style="font-family: sans-serif;">&#8377; '+mrp+'</h3>';
								str += '<h4 class="item_brief"><span id="addonprice"></span></h4>';
								str += '</div>';									
								str += '<div class="customize_inner">';

								var addon_item_selection_max = data.length;
								//str += '<p class="item_brief">(Select upto '+addon_item_selection_max+' item/items)</p>';

								str += '<div class="customize_item">';


								for(var i=0;i<data.length;i++)
								{

									  str += '<label>';
									  str += '<div class="addon_left">';
									  str += '<input type="checkbox" name="addon'+data[i].addon_base_itemid+'" id="addon'+data[i].addonitemid+'_'+code+'" value="'+data[i].addon_base_itemid+'|'+data[i].addonitemid+'|'+data[i].addonitem_name+'@'+data[i].addonitem_price+'" data-role="none" onclick="javascript:chkclicked(\''+addon_item_selection_max+'\',\''+data[i].addon_base_itemid+'\',\''+data[i].addonitemid+'\',\''+data[i].addonitem_name+'\',\''+data[i].addonitem_price+'\',\''+mrp+'\')" data-role="none">';
									  str += '<div class="custom_radio"></div>';
									  str += '<span>'+data[i].addonitem_name+'</span>';
									  str += '</div>';
									  str += '<div class="addon_right">&#8377;  '+data[i].addonitem_price+'</div>';
									  str += '</label>';

								}
								
								str += '</div>';
								str += '<div class="cust_footer_addon">';
								str += '<div class="cart_qty" style="border: none !important">';		   				
								//str += '<button  onclick="removeProduct(this)" data-role="none" class="spinner_button removeProduct">-</button>';
								//str += '<input class="quantity" min="0" name="quantity" value="0" type="number" data-role="none">';
								//str+= '<button  onclick="addToCart(this)" class="spinner_button" data-role="none">+</button>';
								str += '</div>';
								str += '<button class="custo_btn_addon" onclick="javascript:buyfromshop(this,\''+code+'\',\''+id+'\',\''+name+'\',\''+mrp+'\',\''+index+'\',\''+qtytxt+'\',\''+size+'\',\''+imglink+'\',\''+gst+'\',\''+cid+'\');">ADD</button>';
							    str += '</div>';
								str += '</div>';

			
					document.getElementById("customize_menu").innerHTML=str;

					customizeMenu();

				},
		error: function(xhr, textStatus, errorThrown) {
					toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
	  });
    
}

function chkclicked(addon_item_selection_max,itemcode,itemid,itemname,itemprice,prodprice)
{
            
            //console.log('itemdata:'+itemdata);

			var total = $("input[name='addon"+itemcode+"']:checked").length;
           
            var id = "addon"+itemid+'_'+itemcode;

			console.log('id:'+id);

            if(parseInt(total) <= parseInt(addon_item_selection_max)) { 
	            if($("#"+id).prop("checked"))
	            {
	                itemdata.push($("#"+id).val());
	                
	            }else
	            {
	                if(itemdata.indexOf($("#"+id).val())!=-1)
	                {
	                    itemdata.splice(itemdata.indexOf($("#"+id).val()),1);
	                        //$(this).val();
	                }
	            }
	           
				
	            //alert(itemdata);
				
	        }else{
	        	$("#"+id).prop("checked",false);
	        	toast("You can add maximum "+ addon_item_selection_max + " addons");
	        }

			localStorage.setItem("addoncartarvinddairy",JSON.stringify(itemdata));

}

function buyfromshop1(code,id,name,mrp,index,qtytxt,size,imglink,gst)
{
	$("#addonpop").popup("open");
	buyfromshop(code,id,name,mrp,index,qtytxt,size,imglink,gst);
}
function checkitemsel(maxAllowed,groupid,itemcode,itemid,itemname,itemprice,prodprice)
{
	//alert('maxitems'+maxitems+'..............groupid'+groupid);
	var myaddonlist = JSON.parse(localStorage.getItem("addoncartarvinddairy"))||[];
	var segmentprice=prodprice;
	var segmentnames='';
	 $("input[name='addon"+groupid+"']").change(function () {
      var cnt = $("input[name='addon"+groupid+"']:checked").length;
      if (cnt > maxAllowed) 
      {
         $(this).prop("checked", "");
         alert('No more items can be chosen');
     }
     
            
  });
	  $("input[name='addon"+groupid+"']:checked").each( function () {
         	/*for(var j=0;j<myaddonlist.size;j++)
         	{
         		var tmpobj = myaddonlist[j];
         	    if(tmpobj.indexOf(itemcode+'|'+groupid)>=0)
				{
				myaddonlist.splice(j, 1);
				}
			}*/
        if(myaddonlist.indexOf(itemcode+'|'+groupid+'|'+itemid+'|'+itemname+'@'+itemprice)==-1)
        {
        	//alert('segmentprice'+segmentprice+'....itemprice..'+itemprice);
   			myaddonlist.push(itemcode+'|'+groupid+'|'+itemid+'|'+itemname+'@'+itemprice);
   			segmentprice = parseInt(segmentprice) + parseInt(itemprice);
   			segmentnames = segmentnames + itemname + ',';
   			//alert(segmentnames);
        }
        //alert('segmentnames..'+segmentnames+'...segmentprice............'+segmentprice);
        //alert('myaddonlist..'+JSON.stringify(myaddonlist));
        localStorage.setItem("addoncartarvinddairy",JSON.stringify(myaddonlist));
        //document.getElementById("addonprice").innerHTML=document.getElementById("addonprice").outerHTML+ segmentnames+ ':' +segmentprice;
   		
   });
}

function updateshopcart2(code,id,name,mrp,index,qtytxt,size,acttype,imglink,gst,cid)
{
/*e.parentNode.querySelector('input[type=number]').stepDown();

if(e.parentNode.querySelector('input[type=number]').value < 1){
e.parentNode.parentNode.querySelector('.add_btn').style.display= 'block';
}

var q = e.parentNode.querySelector('input[type=number]').value;
*/
 var q = $('#'+qtytxt).val();

 var myaddonlist = JSON.parse(localStorage.getItem("addoncartarvinddairy"))||[];
 if(typeof q !='undefined')
 {
	if(parseInt(q)<1)
	q = 0;
	if(acttype=='add')
	q = parseInt(q)+1;
	else if(acttype=='sub')
	q = parseInt(q)-1;
	else
	q = parseInt(q);
	if(parseInt(q)<1)
	q = 0;

	console.log('q:'+q);

	if(q !='0')
	{

	$('#'+qtytxt+'').val(q);
	try{
	$('#qty'+code+'').val(q);
	$('#qtydet'+code+'').val(q);
	}catch(err){}
	var stocknotavail = false;
	var selvar;
	try{
	selvar = $('#variable'+code).val();
	//alert(selvar);
	var addonstr = '';
	var tmpprice = 0;
	//alert('2222');
	for(var j=0;j<myaddonlist.length;j++)
	{
	var tmpobj = myaddonlist[j].split('|');
	//alert('tmpobj'+tmpobj);
	if(tmpobj[0]==code)
	{
	if(addonstr!='')
	addonstr = addonstr + '$' +tmpobj[2];
	else
	addonstr = tmpobj[2];

	var items = tmpobj[2].split('@');

	tmpprice = parseInt(tmpprice) + parseInt(items[1]);
	//alert('addonstr inside...'+addonstr);
	//alert('tmpprice inside...'+tmpprice);
	}
	//alert('addonstr...'+addonstr);
	//alert('tmpprice...'+tmpprice);
	}
	var varprod = selvar.split('-');
	mrp = parseInt(varprod[1]) + parseInt(tmpprice);
	document.getElementById('priceblk'+code).innerHTML = '&#x20B9; '+mrp;
	/* var selarr = selvar.split('$');
	for(var s=0;s<selarr.length;s++){
	if(selarr[s].indexOf('stock-')>=0)
	{
	var stock = selarr[s].split('-');
	//alert('stock....'+stock[1]);
	if(parseInt(stock[1])==0 || (parseInt(stock[1])<parseInt(q)))
	{
	document.getElementById('outofstock'+code).innerHTML = 'Out of Stock';
	stocknotavail = true;
	}
	else if(parseInt(stock[1])<=10)
	{
	document.getElementById('outofstock'+code).innerHTML = 'Limited Stock';
	}
	}
	else if(selarr[s].indexOf('mrp-')>=0)
	{
	var price = selarr[s].split('-');
	mrp = price[1];
	document.getElementById('priceblk'+code).innerHTML = '&#x20B9; '+mrp;
	}
	}*/

	}catch(err)
	{}
	//console.log('stocknotavail'+stocknotavail);
	if(stocknotavail == false)
	{
	//console.log('selvar'+selvar);
	updatecart2(code,id,name,mrp,qtytxt,size,imglink,gst,selvar,cid);
	toast('Item updated in cart');
	}

   }
   else
   {
	   toast('Minimum qty 1 required')
   }
  }
}

function updatecart2(code,id,name,mrp,qtytxt,size,imglink,gst,variable,cid)
{
    
 var qt =  $('#'+qtytxt+'').val();
 
 var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];
 var mycartlist = JSON.parse(localStorage.getItem("shoppingcartitemarvinddairy"))||[];
 var myaddonlist = JSON.parse(localStorage.getItem("addoncartarvinddairy"))||[];
 for(var i=0;i<mylist.length;i++)
	{
	 var elem = mylist[i];
     var selvar;
     var addonstr = '';
    var tmpprice = 0;
	 if(elem.indexOf(id+'|'+name+'|'+mrp)>=0)
		{
	
    try{
	selvar = $('#variable'+code).val();
    if(typeof selvar ==undefined)
    {
     selvar = $('#variabledet'+code).val();   
    }
	
    //alert('2222');
    for(var j=0;j<myaddonlist.length;j++)
         	{
         		var tmpobj = myaddonlist[j].split('|');
         		//alert('tmpobj in update'+tmpobj);
         	    if(tmpobj[0]==code)
				{
					if(addonstr!='')
						addonstr = addonstr + '$' +tmpobj[2];
					else
						addonstr = tmpobj[2];

					var items = tmpobj[2].split('@');
					
					tmpprice = parseInt(tmpprice) + parseInt(items[1]); 
					//alert('addonstr inside...'+addonstr);
				    //alert('tmpprice inside...'+tmpprice);
				}
				//alert('addonstr...'+addonstr);
				//alert('tmpprice...'+tmpprice);
			}
			var varprod = selvar.split('-');
			//mrp = varprod[1];
			mrp = parseInt(varprod[1]) + parseInt(tmpprice);
			document.getElementById('priceblk'+code).innerHTML = '&#x20B9; '+mrp;
     }catch(err){}
        mylist.splice(i, 1);
        mycartlist.splice(i, 1);
        if(parseInt(qt)>0)
        {
        var elems = elem.split('|');
		mylist.push(elems[0]+'|'+elems[1]+'|'+elems[2]+'|'+elems[3]+'|'+qt+'|'+elems[5]+'|'+elems[6]+'|'+elems[7]+'|'+variable+'|'+addonstr+'|'+cid);
        mycartlist.push(elems[0]);
        }
	    localStorage.setItem("shoppingcartarvinddairy",JSON.stringify(mylist));
	     localStorage.setItem("shoppingcartitemarvinddairy",JSON.stringify(mycartlist));

	    /* $.ajax({
   url: shopcms+'apis/update/cartlist/'+brand_id, //login.php
   type: 'GET',
   timeout: 50000,
    dataType: 'json', //xml/html/script/json/jsonp
    data: {'mobile': user.mobile, 'code': elems[0], 'mrp': elems[3], 'qty': qt, 'size': elems[5], 'order_id': localStorage.getItem('temporderid')},
    complete: function(xhr, textStatus) {
   //called when complete
    },
    success: function(data, textStatus, xhr) {
    //console.log('JSONDATA'+JSON.stringify(data));
    var temporderid=data.order_id;
    localStorage.setItem('temporderid',temporderid);
    },
    error: function(xhr, textStatus, errorThrown) {
  
		  toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  }); */
		}
	var elemitem = mycartlist[i];
	if(elemitem.indexOf(code)>=0)
		{
		mycartlist.splice(i, 1);
		if(mycartlist.indexOf(code)==-1)
		mycartlist.push(code);
	    localStorage.setItem("shoppingcartitemarvinddairy",JSON.stringify(mycartlist));
	
		}
	}

	//var items = mylist.length;

	var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];
		var items=0;
			for(var i=0;i<mylist.length;i++)
			{
				var elem = mylist[i].split('|');
				items += parseInt(elem[4]);
			}


//console.log('items'+items);
/*$('#noofitems_prod').text(items);
$('#noofitems_prod1').text(items);
$('#noofitems_main').text(items);
$('#noofitems_cart').text(items);
$('#noofitems_cart1').text(items);*/

viewcart();
//showcartPopup();

// document.getElementById('tamt').value=parseInt(price)+parseInt(document.getElementById(qty).value)*parseInt(price);
  //document.getElementById('tamt').value=parseInt(document.getElementById(qty).value)*parseInt(price);
}

function remfromshop(code,id,name,mrp,index,qtytxt,size,imglink,gst,variable)
{
	var q =  $('#'+qtytxt+'').val();
	var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];
	//var myaddonlist = JSON.parse(localStorage.getItem("addoncartarvinddairy"))||[];
	
	
	for(var i=0;i<mylist.length;i++)
	{
		//alert('inside mylist');
		//var  i = mylist.indexOf(code+'|'+id+'|'+name+'|'+mrp+'|'+q+'|'+size+'|'+imglink+'|'+gst+'|'+variable);
		var tmpstr = mylist[i];
		if(tmpstr.indexOf(code+'|'+id+'|'+name+'|'+mrp+'|'+q+'|'+size+'|'+imglink+'|'+gst+'|'+variable)>=0)
		{
		mylist.splice(i, 1);
		localStorage.setItem("shoppingcartarvinddairy",JSON.stringify(mylist));
        toast('Item removed from cart');

        /*for(var j=0;j<myaddonlist.length;j++)
         	{
         		var tmpobj = myaddonlist[j].split('|');
         		//alert('tmpobj'+tmpobj);
         	    if(tmpobj[0]==code)
				{
					//alert('tmpobj inside'+tmpobj);
					myaddonlist.splice(j, 1);
					
				}
				
			}
			localStorage.setItem("addoncartarvinddairy",JSON.stringify(myaddonlist));*/
         
     }
	}


	var myaddonlist = JSON.parse(localStorage.getItem("addoncartarvinddairy"))||[];
	var myaddonlist1 = JSON.parse(localStorage.getItem("addoncartarvinddairy_new"))||[];
	for(var j=0;j<myaddonlist.length;j++)
	{
			var tmpobj = myaddonlist[j].split('|');
			if(tmpobj[0]!=code)
			{

				myaddonlist1.push(myaddonlist[j]);

			}
	}

	//localStorage.setItem("addoncartarvinddairy_new",JSON.stringify(myaddonlist1));
	localStorage.setItem("addoncartarvinddairy",JSON.stringify(myaddonlist1));

	//var itemdata = JSON.parse(localStorage.getItem("addoncartarvinddairy"))||[];
	
	var mycartlist = JSON.parse(localStorage.getItem("shoppingcartitemarvinddairy"))||[];
	var  j = mycartlist.indexOf(code);
		mycartlist.splice(j, 1);
	localStorage.setItem("shoppingcartitemarvinddairy",JSON.stringify(mycartlist));
	
	//var items = mylist.length;

	var items=0;
	for(var i=0;i<mylist.length;i++)
	{
		var elem = mylist[i].split('|');
		items += parseInt(elem[4]);
	}

				/*$('#noofitems_prod').text(items);
				$('#noofitems_prod1').text(items);
				$('#noofitems_prod2').text(items);
				$('#noofitems_main').text(items);
				$('#noofitems_cart').text(items);
				$('#noofitems_cart1').text(items);
				$('#noofitems_prod_detail').text(items);*/
viewcart();
}

function addInstruction(){
				$("#Instruction").slideToggle("fast")
			}

function checkviewcart_add()
{

	if(user.mobile==null || user.mobile=='')
	{
		$.mobile.changePage( "#login_pg", { transition: "none"} ); 
	}
	else
	{

		var paytype = localStorage.getItem('paymenttypearvinddairy');
		if(typeof paytype!=undefined && paytype!=null)
		{
			getviewcart();
			setminDate();
		}
		else
		{
			toast('Please select Mode of Payment');
		}
	}
}

function getviewcart()
{
        var paytype = localStorage.getItem('paymenttypearvinddairy');
		if(paytype=='paytm')
		{

			localStorage.setItem('pointsredeemarvinddairy','0');
			$('#billing_phone').val(checkforundefined(localStorage.getItem('usernamearvinddairy')));
			$('#txtfirstname').val(checkforundefined(localStorage.getItem('firstname')));
			$('#txtlastname').val(checkforundefined(localStorage.getItem('lastname')));
			$('#billing_email').val(checkforundefined(localStorage.getItem('emailid')));
			$.mobile.changePage( "#addresspg");
			
		}
		else if(paytype=='cash')
		{
			
			localStorage.setItem('pointsredeemarvinddairy','0');
			$('#billing_phone').val(checkforundefined(localStorage.getItem('usernamearvinddairy')));
			$('#txtfirstname').val(checkforundefined(localStorage.getItem('firstname')));
			$('#txtlastname').val(checkforundefined(localStorage.getItem('lastname')));
			$('#billing_email').val(checkforundefined(localStorage.getItem('emailid')));
			$.mobile.changePage( "#addresspg");

		}
        
}

function setviewcart(paytype)
{
    localStorage.setItem('paymenttypearvinddairy',paytype);

    if(paytype=="cash")
    {
        $('#cashopt').css('background-color','#89bbd5');
        $('#cashopt').css('text-shadow','none');
        $('#paytmopt').css('background-color','#ffffff');
        
    }
    else if(paytype=="paytm")
    {
        $('#paytmopt').css('background-color','#89bbd5');
        $('#paytmopt').css('text-shadow','none');
        $('#cashopt').css('background-color','#ffffff');
        
    }
}

function checkviewcart()
{

	if(user.mobile==null || user.mobile=='')
	{
		$.mobile.changePage( "#login_pg", { transition: "none"} ); 
	}
	else
	{
			var result = confirm("Are you confirm to place the order ?");

			if(result)
			{
				submitpayment();
			}
			else
			{
				// do nothing
			}
		
	}


}

function submitpayment()
{

 var products = localStorage.getItem("id_strarvinddairy");
 var totamt = localStorage.getItem('totalamtarvinddairy');
 var payamt =  localStorage.getItem('payableamtarvinddairy');
 var ptsredeem = localStorage.getItem('pointsredeemarvinddairy');
 var paytype = localStorage.getItem('paymenttypearvinddairy'); 
  if(paytype == undefined || paytype == null)
	 paytype='';
 var discount =  localStorage.getItem('discountarvinddairy');
 var deliverycharge =  localStorage.getItem('deliverychargearvinddairy');
 var tax =  localStorage.getItem('taxarvinddairy');

 var cat_type = localStorage.getItem('cattype_ad');

 var location1 = localStorage.getItem("selectedstorearvinddairy");
 if(location1==undefined || location1 ==null)
	 location1 = localStorage.getItem("selectedareaarvinddairy");

 /*var fname= checkforundefined(localStorage.getItem('firstname'));
 var lname= checkforundefined(localStorage.getItem('lastname'));
 var email= checkforundefined(localStorage.getItem('emailid'));
 var phone= checkforundefined(localStorage.getItem('usernamearvinddairy'));
 var address1= checkforundefined(localStorage.getItem('u_addr1'));
 var address2= checkforundefined(localStorage.getItem('u_addr2'));
 var city= checkforundefined(localStorage.getItem('u_city'));
 var state= checkforundefined(localStorage.getItem('u_state'));
 var pcode = checkforundefined(localStorage.getItem('u_pin'));*/

 var fname=$('#txtfirstname').val();
 var lname=$('#txtlastname').val();
 var email=$('#billing_email').val();
 var phone=$('#billing_phone').val();
 var address1=$('#billing_address_1').val();
 var address2=$('#billing_address_2').val();
 var city=$('#billing_city').val();
 var state=$('#billing_state').val();
 var pcode=$('#billing_postcode').val();

 var couponcode= checkforundefined(localStorage.getItem("couponcodearvinddairy"));
 

 var deliverytype = localStorage.getItem("deliverytypearvinddairy");

 var cdate = $('#cdate').val();
 var cslot = $('#cslot').val();
 
/*if(localStorage.getItem("selectedareaarvinddairy")!=undefined && localStorage.getItem("selectedareaarvinddairy") !=null)
{
	deliverytype='delivery';
}
else 
{
	deliverytype='pickup';
}*/

 var mandate=false;

 if(deliverytype== 'delivery')
 {
	 //if(fname=='' || lname=='' || email=='' || phone==''|| address1=='' || city=='' || state=='' || pcode=='' || products=='' || payamt=='' || paytype=='')
	 if(fname=='' || lname=='' || email=='' || phone=='' || products=='' || payamt=='' || paytype=='')
	 {
		  mandate=true;
	 }
     else 
	 { 
		 mandate=false;
	 }
 }
 else if(deliverytype== 'pickup')
 {
	if(fname=='' || lname=='' || email=='' || phone==''|| address1=='' || city=='' || products=='' || payamt=='' || paytype=='')
	{
		  mandate=true;
	}
    else 
	{ 
        mandate=false;
    }
 }
 if(mandate)
 {
		  toast('Please check for mandatory details');
		  //viewcart();
 }
 else
 {
 	    
  $.ajax({
    url: shopcmsurl+'checkout',
    type: 'GET',
    timeout: 50000,
    data: {
                'products': products,
				'totamt': totamt,
				'payamt': payamt,
				'ptsredeem': ptsredeem,       
				'paytype': paytype,  
				'discount': discount, 
				'deliverycharge': deliverycharge,	
				'tax': tax,	
				'fname': fname,    
				'lname': lname,
                'email': email,   
				'phone': phone,    
				'address1': address1,
                'address2': address2,
                'city': city,    
				'state': state,
                'postalcode': pcode,
				'coupon_code': couponcode,
                'deviceId': localStorage.getItem("deviceid"),
                'deviceType': deviceType,
                'deliverytype': deliverytype,
				'user_type': cat_type,
                'location': location1,
				'delivery_date': cdate,
				'deliverytime': cslot
					
			},
   
    success: function(data, textStatus, xhr) {

		console.log('JSONDATA 1:'+JSON.stringify(data));

		if(data.indexOf("<style")>0)
		{
			data = data.substring(0, data.indexOf("<style"));
		}
			data = data.replace(/^\s+|\s+$/g,'');
		//console.log('after removing style JSONDATA:'+JSON.stringify(data));
		var str1 = '';
        data=JSON.parse(data);

		console.log('JSONDATA 2:'+JSON.stringify(data));

       /* if(data.url=='')
        {
			str1 = 'Thank you for placing order. Order id is '+data.order_id+'. Waiting for order confirmation.';
			$("#thankyoupage .ui-content").html(str1);
			$.mobile.changePage( "#home", { transition: "none"} );

			toast('Thank you for placing order. Order id is '+data.order_id+'. Waiting for order confirmation.');   
        }
        else
        {*/
       
		if(paytype == 'cash')
        {
			$('#pay_confirm_pop').popup();
			resetcsData();
			if(deliverytype== 'pickup')
			{
			 document.getElementById("pdiv").innerHTML='Your Pickup has been Confirmed.';
			 document.getElementById("pickupcode").innerHTML='Pickup Code : '+data.order_id;

			}
			else
			{
			 document.getElementById("pdiv").innerHTML='Your Order has been Confirmed.';
			 document.getElementById("pickupcode").innerHTML='Order Id : '+data.order_id;	
			}
			$('#pay_confirm_pop').popup("open");
        
		}
		else
		{

			var the_height = ($(window).height() - $(this).find('[data-role="header"]').height());
			var the_width = $(window).width();
			var purl=data.url;
			//var porderid=data.order_id;
            //openBrowser11(purl,porderid,deliverytype);

			openBrowser11(purl);
		}
       // }
        /*localStorage.removeItem('addoncartarvinddairy');
        localStorage.removeItem('shoppingcartarvinddairy');
        localStorage.removeItem('shoppingcartitemarvinddairy');
		localStorage.removeItem("id_strarvinddairy");
		localStorage.removeItem("totalamtarvinddairy");
		localStorage.removeItem("payableamtarvinddairy");
		localStorage.removeItem("pointsredeemarvinddairy");
		localStorage.removeItem("paymenttypearvinddairy");
		localStorage.removeItem("discountarvinddairy");
		localStorage.removeItem("couponcodearvinddairy");
		localStorage.removeItem("deliverychargearvinddairy");
		localStorage.removeItem("selectedstorearvinddairy");
		localStorage.removeItem("selectedareaarvinddairy");*/
		
        var items = 0;
        /*$('#noofitems_shop').text(items);
		$('#noofitems_prod').text(items);
		$('#noofitems_prod1').text(items);
		$('#noofitems_prod2').text(items);
		$('#noofitems_main').text(items);
		$('#noofitems_cart').text(items);
		$('#noofitems_cart1').text(items);
		$('#noofitems_prod_detail').text(items);
        $('#noofitems_pay').text(items);
	    $('#noofitems_prod_detail').text(items);
		$('#txtfirstname').val('');
		$('#txtfirstname').val('');
		$('#billing_email').val('');
		$('#billing_phone').val('');
		$('#billing_address_1').val('');
		$('#billing_address_2').val('');
		$('#billing_city').val('');
		$('#billing_state').val('');
		$('#billing_postcode').val('');
        var items = 0;*/

       

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 } 
 }

 function openBrowser11_none(url,inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode)
 {
		var ref = window.open(url, '_blank');

		ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
		ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
		ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
		ref.addEventListener('exit', function(event) { checkStatus_new(inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode); });
 }

function openBrowser11(url,inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode)
{

	var ref = cordova.InAppBrowser.open(url, '_blank', 'location=no');

	ref.addEventListener('exit', function (event) {
		     
			checkStatus_new(inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode);
	});
}

 function openBrowser11_new(url,inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode)
 {
	 
    var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
       				
    if(deviceType=='null')
         deviceType='Android';
    
    if (deviceType == 'iPad' || deviceType == 'iPhone')
	{
                 
			cordova.ThemeableBrowser.open(url, '_blank', {
					   backButtonCanClose: true,
			statusbar: {
				color: '#3295cd'
			},
			toolbar: {
				height: 70,
				color: '#3295cd'
			},
			title: {
				color: '#ffffff',
				staticText: '', 
				showPageTitle: false
			},
			backButton: {
				wwwImage: '',
				wwwImagePressed: '',
				align: 'left',
				event: 'backPressed'
			},
			forwardButton: {
				wwwImage: '',
				wwwImagePressed: '',
				align: 'center',
				event: ''
			},
			closeButton: {
				wwwImage: 'assets/images/back_btn_br3.png',
				wwwImagePressed: 'assets/images/back_btn_br3.png',
				align: 'left',
				marginLeft: '30px',
				event: 'closePressed'
			},
			customButtons: [
				{
					image: 'share',
					imagePressed: 'share_pressed',
					align: 'right',
					event: 'sharePressed'
				}
			],
			menu: {
				image: 'menu',
				imagePressed: 'menu_pressed',
				title: 'Test',
				cancel: 'Cancel',
				align: 'right',
				items: [
				   /* {
						event: 'helloPressed',
						label: 'Hello World!'
					},
					{
						event: 'testPressed',
						label: 'Test!'
					}*/
				]
			},
			backButtonCanClose: true
		}).addEventListener('backPressed', function(e) {
			checkStatus_new(inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode);
		}).addEventListener('closePressed', function(e) {
			checkStatus_new(inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode);
		}).addEventListener('helloPressed', function(e) {
			//alert('hello pressed');
		}).addEventListener('sharePressed', function(e) {
			//alert(e.url);
		}).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
			console.error(e.message);
		}).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
			console.log(e.message);
		});    

  }
  else
  {
                 
            //window.open(url, '_blank', 'location=yes'); 
            cordova.ThemeableBrowser.open(url, '_blank', {
               backButtonCanClose: true,
				statusbar: {
					color: '#3295cd'
				},
				toolbar: {
					height: 70,
					color: '#3295cd'
				},
				title: {
					color: '#ffffff',
					staticText: '', 
					showPageTitle: false
				},
				backButton: {
					wwwImage: '',
					wwwImagePressed: '',
					align: 'left',
					event: 'backPressed'
				},
				forwardButton: {
					wwwImage: '',
					wwwImagePressed: '',
					align: 'center',
					event: ''
				},
				closeButton: {
					wwwImage: 'assets/images/back_btn_br3.png',
					wwwImagePressed: 'assets/images/back_btn_br3.png',
					align: 'left',
					marginLeft: '15px',
					event: 'closePressed'
				},
				customButtons: [
					{
						image: 'share',
						imagePressed: 'share_pressed',
						align: 'right',
						event: 'sharePressed'
					}
				],
				menu: {
					image: 'menu',
					imagePressed: 'menu_pressed',
					title: 'Test',
					cancel: 'Cancel',
					align: 'right',
					items: [
					   /* {
							event: 'helloPressed',
							label: 'Hello World!'
						},
						{
							event: 'testPressed',
							label: 'Test!'
						}*/
					]
				},
				backButtonCanClose: true
			}).addEventListener('backPressed', function(e) {
				checkStatus_new(inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode);
			}).addEventListener('closePressed', function(e) {
				checkStatus_new(inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode);
			}).addEventListener('helloPressed', function(e) {
				//alert('hello pressed');
			}).addEventListener('sharePressed', function(e) {
				//alert(e.url);
			}).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
				console.error(e.message);
			}).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
				console.log(e.message);
			});
        }
       // });
   // });
    /*try{
    gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Button", "Click", "Online Shop", 1);
    }catch(error){}
    */

}

function checkStatus()
{
	
 $.ajax({
           
			url: shopcmsurl+'getcat/getordersbymobileno/'+user.mobile,
            type: 'GET',
			timeout: 300000,
            dataType: "json",
         
           complete: function(xhr, textStatus) {
		   //called when complete

		    },

			success: function(data, textStatus, xhr) {
			
			if(data[0].TXNSTATUS=='TXN_SUCCESS' && data[0].TXNID!='null' && data[0].TXNID!=null )
			{
				//localStorage.removeItem("selectedloc_arvinddairy");

			    $.mobile.changePage("#homepage", {transition: "slideup"} );
				//showPreviousOrders_2();
			  	resetcsData();
				
				//manage_sub1();
			   
			}
			  
			else
            {
            	  toast('Payment failed..');
                  $.mobile.changePage("#addresspg", {transition: "slideup"} );
            }
                
		
                    
			 },
			error: function(xhr, textStatus, errorThrown) {
				 toast('Could not connect to Server, make sure you are connected to Internet'+errorThrown);
				}
		});

}

function resetcsData()
{

    /*localStorage.removeItem('u_name1');
	localStorage.removeItem('u_addr1');
	localStorage.removeItem('u_addr2');
	localStorage.removeItem('u_city');
	localStorage.removeItem('u_state');
	localStorage.removeItem('u_pin');*/

        
		localStorage.removeItem('addoncartarvinddairy');
        localStorage.removeItem('shoppingcartarvinddairy');
        localStorage.removeItem('shoppingcartitemarvinddairy');
		localStorage.removeItem("id_strarvinddairy");
		localStorage.removeItem("totalamtarvinddairy");
		localStorage.removeItem("payableamtarvinddairy");
		localStorage.removeItem("pointsredeemarvinddairy");
		localStorage.removeItem("paymenttypearvinddairy");
		localStorage.removeItem("discountarvinddairy");
		localStorage.removeItem("taxarvinddairy");
		localStorage.removeItem("couponcodearvinddairy");
		localStorage.removeItem("deliverychargearvinddairy");
		//localStorage.removeItem("selectedstorearvinddairy");
		localStorage.removeItem("selectedareaarvinddairy");
		//localStorage.removeItem("selectedloc_arvinddairy");


		//$('#cashopt').css('background-color','#ffffff');
        //$('#paytmopt').css('background-color','#ffffff');


		//hidecartPopup();
}

function setminDate()
{
	var today = new Date();
	//today.setDate(today.getDate() + 1);


	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	var hr = today.getHours();
	var mint = today.getMinutes();

	if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    }
	if(hr<10){
        hr='0'+hr;
    } 
	if(mint<10){
        mint='0'+mint;
    }

	today = yyyy+'-'+mm+'-'+dd;
	var ctime = hr+':'+mint;

	document.getElementById("cdate").value = today;

	document.getElementById("cdate").setAttribute("min", today);


	/* setting intime to current time */
		document.getElementById("cslot").value = ctime;
	/* ends*/


}

function listCategoryhomepage()
{

	var loc= localStorage.getItem('selectedstorearvinddairy');
	
	if( loc!='null' && loc!=null )
	{

	'use strict';	
	   $.ajax({

		 url: shopcmsurl+'getcat/getloccats/'+loc,
		 type: 'GET',
		 timeout: 70000,
		 dataType: 'json',
		 data: { },

		success: function(data, textStatus, xhr) {
					 
			  //console.log(data);
			  var str1 = '';
			  var str2 = '';
			  
			  for (var i = 0; i < data.length; i++)
			  {

				var cat_img = '';
				if(typeof data[i].image == undefined ||typeof data[i].image == 'undefined' || data[i].image == null || data[i].image == 'null' || data[i].image == '' )
                {
					cat_img = 'assets/images/no-img-bg.jpg';
                }
			    else
				{
					cat_img = data[i].image;
				}
				 
				
				str1+='<a class="thumb" href="javascript:showHomepage(\''+data[i].id+'\',\''+data[i].name+'\',\''+checkforundefined_gst(data[i].gst)+'\');">';
				//str1+='<a class="thumb" href="javascript:showCategory_new2();">';
				str1+='<div class="thumb_icon"> <img src="'+cat_img+'" alt=""> </div>';
				str1+='<p>'+data[i].name+'</p>';
                str1+='</a>';

				str2+='<li><a href="javascript:showHomepage(\''+data[i].id+'\',\''+data[i].name+'\',\''+checkforundefined_gst(data[i].gst)+'\');">'+data[i].name+'</a></li>';
				//str2+='<li><a href="javascript:showCategory_new2();">'+data[i].name+'</a></li>';

              }

			  document.getElementById("product_cat_homepage").innerHTML=str1;
			  document.getElementById("product_cat_homepage_sidebar").innerHTML=str2;

                
		},
		error: function(xhr, textStatus, errorThrown) {
			    //toast('Network error..Please Reload');
		}
	  });


    }
	else
	{
		//document.getElementById("product_cat_homepage").innerHTML='<div class="emptycart"><img style="max-width: 60px;" src="assets/images/bq.jpg"></div><div class="emptycart" >Your area is not serviceable</div>';
	}

}

function sendemailstatement()
{

    var cattype = localStorage.getItem('cattype_ad');
	var stats_type ='';
	if(cattype=='biker')
	{
		stats_type = $('#retchoice_emailstats').val();
	}
	else
	{
	    stats_type = $('#retchoice_emailstats').val();
	}

	
	var email=$("#estmt :radio:checked").val();
	var fromdt ='';
	var enddt = '';
	
	if(email == 'selectduration')
	{
		fromdt = $('#durationfrom').val();
		enddt = $('#durationto').val();
		//fromdt = fromdt.getFullYear()+'-'+(fromdt.getMonth()+1)+'-'+fromdt.getDate();
    	//enddt = enddt.getFullYear()+'-'+(enddt.getMonth()+1)+'-'+enddt.getDate();
	}
	else if(email == 'last1month')
    {
    	var today = new Date();
    	var d = new Date();
    	d.setMonth(d.getMonth() - 1);
    	enddt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    	fromdt = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    }
    else if(email == 'last3months')
    {
    	var today = new Date();
    	var d = new Date();
    	d.setMonth(d.getMonth() - 3);
    	enddt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    	fromdt = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    }
    else if(email == 'last6months')
    {
    	var today = new Date();
    	var d = new Date();
    	d.setMonth(d.getMonth() - 6);
    	enddt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    	fromdt = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    }
    else if(email == 'last1year')
    {
    	var today = new Date();
    	var d = new Date();
    	d.setMonth(d.getMonth() - 12);
    	enddt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    	fromdt = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    }

    var url = SERVER2+'generate_points_history.asp';
    var mob=user.mobile;
	
	
	$.ajax({
		url: url,
		type: 'GET',
		timeout: 50000,
		data: {'mno': mob,'sdate':fromdt,'edate':enddt},
		complete: function(xhr, textStatus) {
		},
		success: function(data, textStatus, xhr) {
		console.log(JSON.stringify(data));
			//$("#emailstatementpop").enhanceWithin().popup();
			//$('#emailstatementpop').popup();
			/*$('#emailstatementpop').popup("open", {
										  transition:"pop"
										  });

			$("#statementdownload").attr("href", "javascript:openpdf('"+data+"');");*/

			toast('The statement you requested has been sent to your registered email id.');

		  
		},
		error: function(xhr, textStatus, errorThrown) {
	 
		}
	  });
}

function showPreviousOrders()
{
	if(user.mobile==null || user.mobile=='')
	{
		 $.mobile.changePage( "#login_pg", { transition: "none"} );
		 toast('Please login to proceed.');
	}
	else
	{
		$.mobile.changePage( "#my_orders", { transition: "none"} ); 
		var str = '';

	     $.ajax({
                url: shopcmsurl+'getcat/getallordersbymobileno/'+user.mobile,
                type: 'GET',
                dataType:'json',
                timeout: 50000,
                data: { },
                success: function (data, textStatus, xhr) {
              

                var str ='';
				    str +='<div class="repeat_section pt-20">';

                for(var i=0;i<data.length;i++)
                {

                    var item_str = '';

					data[i].item = data[i].item.replaceAll(",$", "");


					$.each(data[i].item.split(','), function(key, value){

						if(value)
						{
							
							var main   =  value.split('-')[0];
							var main_qty   =  value.split('-')[2];
							var main_mrp   =  value.split('-')[3];
							var addons =  value.split('-')[6];

							var itemwise_grandtotal = roundoff(parseFloat(main_qty*main_mrp));


							try{
							if(addons.indexOf('|')>=0)
							{
								addons = addons.replaceAll('|',',');
							}
								addons = addons.replaceAll('@',' - &#8377; ');
							}catch(err){
								//alert(err.toString());
							}

							item_str += main;
							item_str += '<br>Qty:'+main_qty+'<br>Mrp:'+main_mrp+'<br>Item Total:'+itemwise_grandtotal+'<br><br>';

							if(addons!='')
							{
								item_str += '[ '+addons+' ]';
							}
							else
						    {
								item_str += '';
							}
						}

					});
					
					str +='<div class="item_product reorder_item">';
					str +='<div class="item_orders">';
					str +='<div class="dis_desc">';
					str +='<h3 class="order_outlet_name">Orded ID #'+data[i].reference_no+'</h3>';
					str +='<p class="item_brief2">Items</p>';
					str +='<h3>'+item_str+'</h3>';
					str +='<p class="item_brief2">Ordered On</p>';
					str +='<h3>'+data[i].created+'</h3>';
					str +='<p class="item_brief2">Amount</p>';
					str +='<div class="ui-grid-a">';
					str +='<div class="ui-block-a">';
					str +='<div class="dish_price">Rs.'+data[i].amount+' </div>';
					str +='</div>';
					str +='</div>';
					str +='</div>';
					str +='</div>';
					str +='<div class="reorder_item_footer">';
                    
					var order_sts ='';

                    if(data[i].pckg_status=='1')
					{
						order_sts ='Accepted and delivery pending';
					}
					else if(data[i].pckg_status=='2')
					{
						order_sts ='Order delivered';
					}
					else if(data[i].pckg_status=='3')
					{
						order_sts ='Order Rejected/Cancelled';
					}
					else if(data[i].pckg_status=='4')
					{
						order_sts ='Order Dispatched';
					}

					str +='<p>'+order_sts+'</p>';


					str +='</div>';
					str +='</div>';
					

                }

				str +='</div>';

                document.getElementById("orderlist").innerHTML = str;
				
                },
                error: function (xhr, textStatus, errorThrown) {

				var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);

                  
                }
            });
		
	}
}

var searchname ='';

function showCategory_new2()
{
    $.mobile.changePage( "#productspg");
	//var loc= localStorage.getItem('selectedstorearvinddairy');
	var loc= gbrd;

	'use strict';	
	   $.ajax({

		 url: shopcmsurl+'getcat/getloccats/'+loc,
		 type: 'GET',
		 timeout: 50000,
		 dataType: 'json',
		 data: { },

		success: function(data, textStatus, xhr) {
					 
			 
				
			  var str = '';
			  var strcat = '';
			  var str1 = '';
			  var str2 = '<ul>';
       
			  str+='<div class="recommened_carousel owl-carousel owl-theme">';

			  for (var i = 0; i < data.length; i++)
			  {
				{

					var cat_img = '';
					if(typeof data[i].image == undefined ||typeof data[i].image == 'undefined' || data[i].image == null || data[i].image == 'null' || data[i].image == '' )
					{
						cat_img = 'assets/images/no-img.png';    
					}
					else
					{
						cat_img = data[i].image;
					}

					str+='<div class="item_product1">';
					str+='<div class="dish_img1" onclick=javascript:showdiv(\'menuh'+data[i].id+'\');>';
					str+='<img src="'+cat_img+'" class="img-responsive" alt="">';
					str+='</div>';
					str+='<div class="dis_desc">';
					str+='<h3>'+checkforundefined(data[i].name)+'</h3>';
					str+='</div>';
					str+='</div>';


					strcat+='<a href="javascript:showdiv(\'menuh'+data[i].id+'\');">';
						strcat+='<div class="d-flex justify-content-center align-items-center flex-column">';
							strcat+='<div class="category_img">';
								strcat+='<img src="'+cat_img+'" alt="">';
							strcat+='</div>';
							strcat+='<span>'+checkforundefined(data[i].name)+'</span>';
						strcat+='</div>';						
					strcat+='</a>';


					str1 +='<h2 class="menu_heading_cat" id="menuh'+data[i].id+'">'+data[i].name+'</h2>';
					str1 +='<div class="menu_thread" id="sub'+data[i].id+'"></div>';
					//str1 +='<div class="menu_thread" id="menu'+data[i].id+'"></div>';


					str2+='<li><a href=javascript:showdiv(\'menuh'+data[i].id+'\');>'+checkforundefined(data[i].name)+'</a></li>';


			     }
				 

              } 

			  str+='</div>';
			  str2+= '</ul>';


			  setTimeout(function(){
			$('.recommened_carousel').owlCarousel({
				items:2,
				loop:true,
				margin:10,
				dots:false,
				merge:true,
				autoplayTimeout:5000,
				autoplaySpeed:700,
				autoplay:true
			});
		},100)

			     document.getElementById("categ_list").innerHTML=strcat;
				 //document.getElementById("menu_items").innerHTML=str2;
				 document.getElementById("menusection").innerHTML=str1;

				for(var i=0;i<data.length;i++)
				{
					addSubcategory2(data[i].id,data[i].name,data[i].gst);

				}
                
		},
		error: function(xhr, textStatus, errorThrown) {
			    toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
	  });

                
      var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];
				
				var items=0;
				for(var i=0;i<mylist.length;i++)
				{
					var elem = mylist[i].split('|');
					items += parseInt(elem[4]);
				}


                $('#noofitems_prod').text(items);
				$('#noofitems_prod1').text(items);
				$('#noofitems_prod2').text(items);
				$('#noofitems_main').text(items);
				$('#noofitems_cart').text(items);
				$('#noofitems_cart1').text(items);
				$('#noofitems_prod_detail').text(items);
}

function addSubcategory2(catid,catname,gst)
{

	var loc= localStorage.getItem('selectedstorearvinddairy');

	'use strict';	
	   $.ajax({
		 url: shopcmsurl+'getcat/getcategory/'+catid+'/'+loc,
		 type: 'GET',
		 timeout: 55000,
		 dataType: 'json',
		 data: { },

		success: function(data, textStatus, xhr) {
					 
				//console.log('JSONDATA:'+JSON.stringify(data));

				var str='';
				var str2='<ul>';


				if(data.length>0)
				{

					for(var i=0;i<data.length;i++)
					{
					   str +='<h3 class="menu_heading_cat_sub catsubbg" id="menuh_sub'+data[i].id+'" onclick="javascript:togglecatDiv(\'menuh_sub'+data[i].id+'\', \'menu'+data[i].id+'\', \''+data[i].name+'\');">'+toTitleCase(data[i].name)+'<span class="sadd_signup">+</span></h3>';
					   str +='<div class="menu_thread" id="menu'+data[i].id+'" style="display:none;"></div>';

					   str2 +='<li><a href=javascript:showdiv(\'menuh_sub'+data[i].id+'\');>'+checkforundefined(data[i].name)+'</a></li>';
						
					}

					str2 +='</ul>';

					//console.log('str:'+str);
					
					document.getElementById("sub"+catid).innerHTML=str;
					//document.getElementById("menuh_side"+catid).innerHTML=str2;


					for(var i=0;i<data.length;i++)
					{
						addProducts_new2(data[i].id,data[i].name,data[i].gst);
					}

				}
				else
			    {
					
					//str2 +='<li><a href=javascript:showdiv(\'sub'+catid+'\');>'+checkforundefined(catname)+'</a></li>';
					str +='<div class="menu_thread" id="menu'+catid+'" style="display:block;"></div>';


					document.getElementById("sub"+catid).innerHTML=str;

					addProducts_new2(catid,catname,gst);
				}
				
        
        
                
		},
		error: function(xhr, textStatus, errorThrown) {
					toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
	  });
}

function addProducts_new2(cid,cname,gst)
{  
    
	var loc= localStorage.getItem('selectedstorearvinddairy');
	var cat_type = localStorage.getItem('cattype_ad');
	//var loc= '0';

	'use strict';	
     //$('body').addClass('ui-loading');
	//document.getElementById("cat_header").innerHTML='<span>'+cname+'</span>';
	//$.mobile.changePage( "#products");
	var mywishlist = JSON.parse(localStorage.getItem("mywishlistitemarvinddairy"))||[];
	var mycartlist = JSON.parse(localStorage.getItem("shoppingcartitemarvinddairy"))||[];
    var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];

			
	var str='';
	globalcid = cid;
	globalcname = cname;
	   $.ajax({
		 url: shopcmsurl+'getcat/getitems/'+loc+'/'+cid+'/'+cat_type,
		 type: 'GET',
		 timeout: 55000,
		 dataType: 'json',
		 data: { },

		success: function(data, textStatus, xhr) {

			//console.log('ProductsData:'+JSON.stringify(data));
				
			var str = '<div class="menu_content"><ul>';

			var totlength = data.length;
            //console.log('totlength....'+totlength);

			if(totlength==0)
			{
				str+='<div class="noprdct">No Products Found</div>';
				//document.getElementById("prdctlist").innerHTML=str;
				document.getElementById("menu"+cid).innerHTML=str;
			}
			else
			{
               // console.log('foodtype in products'+foodtype);
				for(var i=0;i<totlength;i++)
				{
					if(data[i].catid==cid)
					{


					var imgurl= data[i].images;
					var imgurlnew = data[i].images;
                    var img_str_json=data[i].images;

					if(imgurlnew=='null' || imgurlnew==null || imgurlnew=='' || imgurlnew=='undefined')
					{
						//imgurlnew = 'assets/images/No_Image_Available.jpg';
						imgurlnew = 'assets/images/no-img-bg.jpg';
					}

					var szarr = [];
					var szvalarr = [];
					var pricearr = [];
						if(data[i].variable.length>0)
						{
							for(var v=0;v<data[i].variable.length;v++)
							{
								var attr_key =data[i].variable[v].attribute_key;
								if(typeof attr_key==undefined || attr_key=='undefined'|| attr_key==null || attr_key=='null')
								{
									//attr_key='quantity';
									attr_key='please choose';
								}

								console.log('attr_key:'+attr_key);
								if(attr_key)
								{
									if(attr_key.toLowerCase() == 'please choose')
									{
										szarr=data[i].variable[v].attribute_value.split("|");
										szvalarr = data[i].variable[v].sku.split("|");
										szvalarr.push(data[i].variable[v].p_itemcode);

										pricearr = data[i].variable[v].attrprice.split("|");
										
									}
								}
								
							}

						}

                    if(data[i].colum9 == null)
                    	data[i].colum9='';
                    if(foodtype=='VEG')
                    {
                    	
                    if(data[i].colum9=='green_dot' || data[i].colum9=='null' || data[i].colum9=='' || data[i].colum9=='0')
                    {
						str +='<li><div class="dish_img">';
						str +='<img src="'+imgurlnew+'" class="img-responsive" alt="" onerror=\'javascript:onImgError(this);\' onclick="javascript:showProducts_none(\''+cid+'\',\''+cname+'\',\''+gst+'\',\''+data[i].itemcode+'\')">';
						str +='</div>';
						str +='<div class="dis_desc">';
						str +='<div class="ui-grid-a">';
						str +='<div class="ui-block-a">';
						str +='<div class="itemName"><h3> <span class="meal_type">';
						if(data[i].keyingredients=='spicy')
	                    {
	                       str+='<img src="assets/images/chilli.png">';     
	                    }
						if(data[i].colum9=='green_dot')
							str +='<img src="assets/images/veg_sign.png" alt="" />';
						str +='</span>'+data[i].itemname+'</h3></div>';

						str +='<div class="itemName"><span class="meal_type_desc">'+data[i].description+'</span></div>';

						str +='</div>';
						str +='<div class="ui-block-b">';
						str +='<div class="addTowish">';
						str +='<label class="wishlist_btn">';
						str +='<input type="checkbox" data-role="none">';
						str +='<span></span>';
						str +='</label>';
						str +='</div>';
						str +='</div>';
						str +='</div>';
						/*str +='<div class="customize_check">';
						str +='<label>Half <input type="radio" data-role="none" name="customize_item" checked /></label>';
						str +='<label>Full <input type="radio" data-role="none" name="customize_item" /></label>';
						str +='</div>';*/
						str +='<div class="ui-grid-a"><div class="ui-block-a">'+
								'<div class="dish_price">&#8377; '+data[i].mrp+'</div>'+
								'</div><div class="ui-block-b">'+
								'<div class="menu_add_option" id="menu_pro'+data[i].itemcode+'">';
								if(mycartlist.indexOf(data[i].itemcode)>=0)
								{
									var j = mycartlist.indexOf(data[i].itemcode);
	                    			mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"));
	                    			var elem = mylist[j].split('|'); 	

									str += '<div class="cart_qty">'+	
										   '<button  onclick="javascript:updateshopcart(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'sub\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" data-role="none" class="spinner_button removeProduct">-</button>'+
										   '<input name="qty'+data[i].itemcode+'" id="qty'+data[i].itemcode+'" class="quantity" min="0" name="quantity" value="'+elem[4]+'" type="number" data-role="none">'+
										   '<button onclick="javascript:updateshopcart(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'add\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="spinner_button" data-role="none">+</button>'+
										   '</div>';
								}
								else
								{

								
									str += '<div class="cart_qty">'+	
									       '<button onclick="buyfromshop(this,\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+i+'\',\''+data[i].howtouse+'\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="add_btn">ADD</button><br>'+
									       '</div>';
								}
								str +='</div></div>'+
								'</div></div>'+
								'</li>';
						}
					}
					else if(foodtype=='NON-VEG')
                    {

                    	
                    if(data[i].colum9=='red_dot' || data[i].colum9=='null' || data[i].colum9=='' || data[i].colum9=='0')
                    {
						str +='<li><div class="dish_img">';
						str +='<img src="'+imgurlnew+'" class="img-responsive" alt="" onerror=\'javascript:onImgError(this);\' onclick="javascript:showProducts_none(\''+cid+'\',\''+cname+'\',\''+gst+'\',\''+data[i].itemcode+'\')">';
						str +='</div>';
						str +='<div class="dis_desc">';
						str +='<div class="ui-grid-a">';
						str +='<div class="ui-block-a">';
						str +='<div class="itemName"><h3> <span class="meal_type">';
						if(data[i].keyingredients=='spicy')
	                    {
	                       str+='<img src="assets/images/chilli.png">';     
	                    }
						if(data[i].colum9=='red_dot')
							str +='<img src="assets/images/non_veg_sign.png" alt="" />';
						str +='</span>'+data[i].itemname+'</h3></div>';

						str +='<div class="itemName"><span class="meal_type_desc">'+data[i].description+'</span></div>';
						str +='</div>';
						str +='<div class="ui-block-b">';
						str +='<div class="addTowish">';
						str +='<label class="wishlist_btn">';
						str +='<input type="checkbox" data-role="none">';
						str +='<span></span>';
						str +='</label>';
						str +='</div>';
						str +='</div>';
						str +='</div>';
						/*str +='<div class="customize_check">';
						str +='<label>Half <input type="radio" data-role="none" name="customize_item" checked /></label>';
						str +='<label>Full <input type="radio" data-role="none" name="customize_item" /></label>';
						str +='</div>';*/
						str +='<div class="ui-grid-a"><div class="ui-block-a">'+
								'<div class="dish_price">&#8377; '+data[i].mrp+'</div>'+
								'</div><div class="ui-block-b">'+
								'<div class="menu_add_option" id="menu_pro'+data[i].itemcode+'">';
								if(mycartlist.indexOf(data[i].itemcode)>=0)
								{
									var j = mycartlist.indexOf(data[i].itemcode);
	                    			mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"));
	                    			var elem = mylist[j].split('|'); 	

									str += '<div class="cart_qty">'+	
										   '<button  onclick="javascript:updateshopcart(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'sub\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" data-role="none" class="spinner_button removeProduct">-</button>'+
										   '<input name="qty'+data[i].itemcode+'" id="qty'+data[i].itemcode+'" class="quantity" min="0" name="quantity" value="'+elem[4]+'" type="number" data-role="none">'+
										   '<button onclick="javascript:updateshopcart(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'add\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="spinner_button" data-role="none">+</button>'+
										   '</div>';
								}
								else
								{
									str += '<div class="cart_qty">'+	
									       '<button onclick="buyfromshop(this,\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+i+'\',\''+data[i].howtouse+'\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="add_btn">ADD</button><br>'+
									       '</div>';
								}
								str +='</div></div>'+
								'</div></div>'+
								'</li>';
						}
					}
					else
					{
						//console.log("11111");
						str +='<li class="products_border"><div class="dish_img">';
						str +='<img src="'+imgurlnew+'" class="img-responsive" alt="" onerror=\'javascript:onImgError(this);\' onclick="javascript:showProducts_none(\''+cid+'\',\''+cname+'\',\''+gst+'\',\''+data[i].itemcode+'\')">';
						str +='</div>';
						str +='<div class="dis_desc">';
						str +='<div class="ui-grid-a">';
						str +='<div class="ui-block-a">';
						str +='<div class="itemName"><h3> <span class="meal_type">';
						if(data[i].keyingredients=='spicy')
	                    {
	                       str+='<img src="assets/images/chilli.png">';     
	                    }
						if(data[i].colum9=='green_dot')
							str +='<img src="assets/images/veg_sign.png" alt="" />';
						else if(data[i].colum9=='red_dot')
							str +='<img src="assets/images/non_veg_sign.png" alt="" />';
						str +='</span>'+data[i].itemname+'</h3></div>';

						str +='<div class="itemName"><span class="meal_type_desc">'+data[i].description+'</span></div>';
						str +='</div>';
						str +='<div class="ui-block-b">';

						/*str +='<div class="addTowish" id="imgwish_div'+data[i].id+'">';
						str +='<label class="wishlist_btn">';



						if(data[i].mrp.indexOf("/")>=0)
						{
							data[i].mrp = data[i].mrp.substring(0,data[i].mrp.indexOf("/"));
							data[i].mrp = data[i].mrp.trim();
						}



						if(mywishlist.indexOf(data[i].itemname)>=0)
						{
							str +='<img src="assets/images/wishlist_icon_active.png" id="imgwish'+data[i].id+'" class="wishlist_btn2" onclick="remfromwish2(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qtydet_wish'+i+'\',\''+data[i].howtouse+'\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" />';
						}
						else 
						{
							str +='<img src="assets/images/wishlist_icon1.png" id="imgwish'+data[i].id+'" class="wishlist_btn2" onclick="addtowish(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qtydet_wish'+i+'\',\''+data[i].howtouse+'\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" />';
						}
						str +='</label>';
						str +='</div>';*/

						str +='</div>';
						str +='</div>';

						//if(szarr)
						//console.log(szarr.length);
						if(szarr.length>0)
						{
							/*
							str +='<div class="customize_check">';
							for(var j=0;j<szarr.length;j++)
							{
								varlbl = szarr[j];
								if(varlbl.indexOf(data[i].itemname)>=0)
									varlbl = varlbl.replace(data[i].itemname, "");
								str +='<label>'+varlbl+'<input type="radio" data-role="none" name="customize_item" onchange="javascript:searchbyitemcodebyid(\''+encodeURIComponent(szvalarr[j])+'\');"/></label>';
								//str +='<label>Full <input type="radio" data-role="none" name="customize_item" /></label>';
							}
							str +='</div><br>';
							*/
							var itemmatch=data[i].itemcode;
							
							for(var j=0;j<szarr.length;j++)
							{
								varlbl = szvalarr[j];
								if(mycartlist.indexOf(varlbl)>=0)
									{
										itemmatch = varlbl;
										
									}

							}
							str +='<div class="ui-grid-a"><div class="ui-block-a">'+
								//'<div class="dish_price">&#8377; '+data[i].mrp+'</div>'+
								'<div class="dish_price_cust">Customizable</div>'+
								'</div><div class="ui-block-b">'+
								'<div class="menu_add_option" id="menu_pro'+data[i].itemcode+'">';
								if(mycartlist.indexOf(itemmatch)>=0)
								{
									var j = mycartlist.indexOf(itemmatch);
	                    			mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"));
	                    			var elem = mylist[j].split('|'); 	

									/*str += '<div class="cart_qty">'+	
										   '<button  onclick="javascript:updateshopcart(\''+itemmatch+'\',\''+data[i].id+'\',\''+itemnamematch+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'sub\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" data-role="none" class="spinner_button removeProduct">-</button>'+
										   '<input name="qty'+itemmatch+'" id="qty'+itemmatch+'" class="quantity" min="0" name="quantity" value="'+elem[4]+'" type="number" data-role="none">'+
										   '<button onclick="javascript:updateshopcart(\''+itemmatch+'\',\''+data[i].id+'\',\''+itemnamematch+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'add\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="spinner_button" data-role="none">+</button>'+
										   '</div>';*/

									str += '<div class="cart_qty">'+	
										   '<button  onclick="javascript:updateshopcart(\''+elem[0]+'\',\''+elem[1]+'\',\''+elem[2]+'\',\''+elem[3]+'\',\''+i+'\',\'qty'+elem[0]+'\',\''+elem[5]+'\',\'sub\',\''+elem[6]+'\',\''+elem[7]+'\',\''+elem[10]+'\');" data-role="none" class="spinner_button removeProduct">-</button>'+
										   '<input name="qty'+elem[0]+'" id="qty'+elem[0]+'" class="quantity" min="0" name="quantity" value="'+elem[4]+'" type="number" data-role="none">'+
										   '<button onclick="javascript:updateshopcart(\''+elem[0]+'\',\''+elem[1]+'\',\''+elem[2]+'\',\''+elem[3]+'\',\''+i+'\',\'qty'+elem[0]+'\',\''+elem[5]+'\',\'add\',\''+elem[6]+'\',\''+elem[7]+'\',\''+elem[10]+'\');" class="spinner_button" data-role="none">+</button>'+
										   '</div>';
								}
								else
								{
                
									
						            str += '<div class="cart_qty_bshop">'+	
									       '<button onclick="javascript:showVarshop(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+szarr+'\',\''+szvalarr+'\',\''+pricearr+'\')" class="add_btn">ADD</button><br>'+
									       '</div>';

						            
								}
								str +='</div></div>';
								str +='</div>';
						}
						else
						{
							str +='<div class="ui-grid-a"><div class="ui-block-a">'+
								'<div class="dish_price">&#8377; '+data[i].mrp+'</div>'+
								'</div><div class="ui-block-b">'+
								'<div class="menu_add_option" id="menu_pro'+data[i].itemcode+'">';
								if(mycartlist.indexOf(data[i].itemcode)>=0)
								{
									var j = mycartlist.indexOf(data[i].itemcode);
	                    			mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"));
	                    			var elem = mylist[j].split('|'); 	

									str += '<div class="cart_qty">'+	
										   '<button  onclick="javascript:updateshopcart(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'sub\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" data-role="none" class="spinner_button removeProduct">-</button>'+
										   '<input name="qty'+data[i].itemcode+'" id="qty'+data[i].itemcode+'" class="quantity" min="0" name="quantity" value="'+elem[4]+'" type="number" data-role="none">'+
										   '<button onclick="javascript:updateshopcart(\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+data[i].itemcode+'\',\''+data[i].howtouse+'\',\'add\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="spinner_button" data-role="none">+</button>'+
										   '</div>';
								}
								else
								{
                
									var colorarr = [];
						            var colorvalarr = [];

									if(data[i].itemallowaddon=='1')
									{ 
										str += '<div class="cart_qty_bshop">'+	
									       '<button onclick="addons(this,\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+i+'\',\''+data[i].howtouse+'\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="add_btn">ADD</button><br>'+
									       '</div>';
									}
									else
									{
										str += '<div class="cart_qty_bshop">'+	
									       '<button onclick="buyfromshop(this,\''+data[i].itemcode+'\',\''+data[i].id+'\',\''+data[i].itemname+'\',\''+data[i].mrp+'\',\''+i+'\',\'qty'+i+'\',\''+data[i].howtouse+'\',\''+imgurlnew+'\',\''+gst+'\',\''+cid+'\');" class="add_btn">ADD</button><br>'+
									       '</div>';
									}
						            
								}
								str +='</div></div>';
								str +='</div>';
						}
								str +='</div></li>';
					}
				
				}
				//str +='</div>';
				//document.getElementById("prdctlist").innerHTML=str;
				//console.log("str"+str);
				
			}
				str +='</ul></div>';
				document.getElementById("menu"+cid).innerHTML=str;
			}

		},
		error: function(xhr, textStatus, errorThrown) {
			    //toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
	  });


				

				var mylist = JSON.parse(localStorage.getItem("shoppingcartarvinddairy"))||[];
				
				var items=0;
				for(var i=0;i<mylist.length;i++)
				{
					var elem = mylist[i].split('|');
					items += parseInt(elem[4]);
				}


              /*$('#noofitems_main').text(items);
				$('#noofitems_prod').text(items);
				$('#noofitems_prod1').text(items);
				$('#noofitems_cart').text(items);
                $('#noofitems_cart1').text(items);
				$('#noofitems_prod_detail').text(items);*/
				
		

}

function showMore(desc){
	//console.log(desc);
		//$(desc).next(".more_description").slideToggle("fast");
		$(desc).toggleClass("expand");
	}

$(document).on('pageshow', '#ordernowpg', function () {
	
	     listCategoryordernowpg();
	
});


function listCategoryordernowpg()
{

	var loc= localStorage.getItem('selectedstorearvinddairy');
	
	if( loc!='null' && loc!=null )
	{

	'use strict';	
	   $.ajax({

		 url: shopcmsurl+'getcat/getloccats/'+loc,
		 type: 'GET',
		 timeout: 70000,
		 dataType: 'json',
		 data: { },

		success: function(data, textStatus, xhr) {
					 
			  //console.log(data);
			  var str1 = '';
			  //var str2 = '';
			  
			  for (var i = 0; i < data.length; i++)
			  {

				var cat_img = '';
				if(typeof data[i].image == undefined ||typeof data[i].image == 'undefined' || data[i].image == null || data[i].image == 'null' || data[i].image == '' )
                {
					cat_img = 'assets/images/no-img-bg.jpg';
                }
			    else
				{
					cat_img = data[i].image;
				}
				 
				
				str1+='<a class="thumb" href="javascript:showHomepage(\''+data[i].id+'\',\''+data[i].name+'\',\''+checkforundefined_gst(data[i].gst)+'\');">';
				//str1+='<a class="thumb" href="javascript:showCategory_new2();">';
				str1+='<div class="thumb_icon"> <img src="'+cat_img+'" alt=""> </div>';
				str1+='<p>'+data[i].name+'</p>';
                str1+='</a>';

				//str2+='<li><a href="javascript:showHomepage(\''+data[i].id+'\',\''+data[i].name+'\',\''+checkforundefined_gst(data[i].gst)+'\');">'+data[i].name+'</a></li>';
				//str2+='<li><a href="javascript:showCategory_new2();">'+data[i].name+'</a></li>';

              }

			  document.getElementById("ordernowpg_div").innerHTML=str1;

                
		},
		error: function(xhr, textStatus, errorThrown) {
			    //toast('Network error..Please Reload');
		}
	  });


    }
	else
	{
		//document.getElementById("product_cat_homepage").innerHTML='<div class="emptycart"><img style="max-width: 60px;" src="assets/images/bq.jpg"></div><div class="emptycart" >Your area is not serviceable</div>';
	}

}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('');
}

function authenticate_dist()
{

 var uname = $('#username').val();
 var pwd = $('#password_myacc').val();

 if(uname=='' || pwd==''){
  toast('Please enter Username/password');
 }else{
  

 $.ajax({
    url: SERVER2+'login_json_api.asp',
    type: 'GET',
    timeout: 50000,
    dataType: 'json',
    data: {'apiuid':'MLOYALAPI','apipswd':'Ml0yalAP!2o14','userid': uname, 'pswd': pwd},
    complete: function(xhr, textStatus) {
   //called when complete
    },
    success: function(data, textStatus, xhr) {

	   console.log('JSONDATA'+JSON.stringify(data));
	   
	   if(data.data.length=='1')
	   {

	   		    var list = data.data[0].route_codes.split(',');
				var listItems = "<option value='' disabled='disabled' style='background-color:#3E3E3E;color:#000000;' selected='selected'>-Select Route-</option>";
				for (var i = 0; i < list.length; i++) 
				{

					routeID = list[i];
					Route = list[i];

					

					
					  listItems += "<option value='" + routeID + "'>"+routeID+"</option>";
					  
					
				}

				$("#dist_routecode").html(listItems);


		submit_storecode(data.data[0].store_code);

		$('#username').val('');
		$('#password_myacc').val('');
	   
	   }
	   else
	   {
		toast('Authentication failed');
	   }

    },
    error: function(xhr, textStatus, errorThrown) {
		toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });
  

 }
}

function submit_storecode(scode)
{

	var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    
	var mydate = year+'-'+month+'-'+day;

    $.ajax({

		 url: SERVER2+'get_transactions_details_by_store_json_api.asp',
		 type: 'GET',
		 timeout: 70000,
		 dataType: 'json',
		 data: {'apiuid':'MLOYALAPI','apipswd':'Ml0yalAP!2o14','scode': scode, 'sdate': mydate, 'edate': mydate},

		success: function(data, textStatus, xhr) {
					 
			  //console.log(data);


			if(data.data[0].msg=='No Records Found.')
			{
				toast('No Records Found.');
			}
			else
			{


				$("#submit_storecode_route_btn").attr("href", "javascript:submit_storecode_route('"+scode+"');");
 
			    $.mobile.changePage("#dist_route_pg");
			}

                
		},
		error: function(xhr, textStatus, errorThrown) {
			    //toast('Network error..Please Reload');
		}
	  });
}

function submit_storecode_route(scode)
{

	var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    
	var mydate = year+'-'+month+'-'+day;
    
	var boothcode = $('#dist_boothcode').val();
	var shift2 = $('#am_pm2').val();
	var routecode = $('#dist_routecode').val();

	//console.log(routecode);
    if(boothcode=='')
	{
		toast('Please enter booth code');
	}
	else if(routecode=='' || routecode==undefined || routecode==null)
	{
		toast('Please select route');
	}
	else
	{

     $.ajax({
		 url: SERVER2+'get_transactions_details_by_store_json_api.asp',
		 type: 'GET',
		 timeout: 70000,
		 dataType: 'json',
		 data: {'apiuid':'MLOYALAPI','apipswd':'Ml0yalAP!2o14','scode': scode,'route': routecode, 'shift': shift2, 'sdate': mydate, 'edate': mydate},

		success: function(data, textStatus, xhr) {
					 
			  //console.log(data);

			  var str = '';

			  for (var i = 0; i < data.data.length; i++)
			  {       
                     
                   if(data.data[i].BoothCode == boothcode)
				   {

				        var BoothMobile = '';

                        str+='<div class="ptx_booth">';

						str+='<div class="cart_check mt-10">'+
							 '<div class="cart_inner">'+
							 '<div class="inner_text">Booth Code:</div>'+
							 '<div class="inner_price">'+data.data[i].BoothCode+'</div>'+
							 '</div></div>';
						str+='<div class="cart_check">'+
							 '<div class="cart_inner">'+
							 '<div class="inner_text">Mobile:</div>'+
							 '<div class="inner_price">'+BoothMobile+'</div>'+
							 '</div></div>';
						str+='<div class="cart_check">'+
							 '<div class="cart_inner">'+
							 '<div class="inner_text">Inv No:</div>'+
							 '<div class="inner_price">'+data.data[i].BillNumber+'</div>'+
							 '</div></div>';
						str+='<div class="cart_check">'+
							 '<div class="cart_inner">'+
							 '<div class="inner_text">Amount:</div>'+
							 '<div class="inner_price">&#8377; '+data.data[i].BillAmount+'</div>'+
							 '</div></div>';

						var date1 = data.data[i].BillDate.split('-');
                                var mm1 = date1.length == 3 ? date1[1] : '';
                                var dd1 = date1.length == 3 ? date1[0] : '';
                                var yyyy1 = date1.length == 3 ? date1[2] : '';
								var newdate = yyyy1+'-'+mm1+'-'+dd1;
                                
						str+='<div class="cart_check">'+
							 '<div class="cart_inner">'+
							 '<div class="inner_text">InvDate:</div>'+
							 //'<div class="inner_price"><input type="date" id="invdate'+i+'" value="'+newdate+'"/></div>'+
						     '<div class="inner_price">'+data.data[i].BillDate+'</div>'+
							 '</div></div>';
						/*str+='<div class="cart_check">'+
							 '<div class="cart_inner">'+
							 '<div class="inner_text">Shift:</div>'+
							 '<div class="inner_price"><select name="shift_type'+i+'" id="shift_type'+i+'"><option value="AM">AM</option><option value="PM">PM</option></select></div>'+
							 '</div></div>';*/

						str+='<div class="text-center mt-20">'+
							 '<a href="javascript:gotoPaytype(\''+data.data[i].BoothCode+'\',\''+BoothMobile+'\',\''+data.data[i].BillNumber+'\',\''+i+'\',\''+data.data[i].BillAmount+'\',\''+data.data[i].BillId+'\',\''+data.data[i].RouteCode+'\');" data-role="none" class="cartpage_btn">Submit</a>'+
							 '</div>';

						str+='</div>';
			      }

              }

			  document.getElementById("boothdiv").innerHTML=str;

			  $.mobile.changePage("#boothhomepage");

			  clearPaytype();

                
		},
		error: function(xhr, textStatus, errorThrown) {
			    //toast('Network error..Please Reload');
		}
	  });
	}
}

function submit_boothcode()
{
    var bcode =  $('#booth_code_input').val();
	var shift = $('#am_pm').val();

    if(shift=='AM')
	{
		var dt = new Date();
		var dt1 = formatDate(dt);
		//console.log('dt1'+dt1);

		var d = new Date();
		    d.setDate(d.getDate() - 1);
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
		
		var mydate = year+'-'+month+'-'+day;

	}
	else
	{

		var dt = new Date();
		var dt1 = formatDate(dt);
		//console.log('dt1'+dt1);

		var d = new Date();
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
		
		var mydate = year+'-'+month+'-'+day;

	}

	console.log(mydate);

	if(bcode=='')
	{
		toast('Please enter booth code.');
	}
	else
	{

     $.ajax({
		 url: SERVER2+'get_transactions_details_by_boothcode_json_api.asp',
		 //url:'http://180.179.198.149:8086/http://regidairy.in/sales/invoice_details.php?userid=paytmkmu&password=kmu@2022ptm&ddate='+dt1+'&shift='+shift,
		 type: 'GET',
		 timeout: 70000,
		 dataType: 'json',
		 data: {'apiuid':'MLOYALAPI','apipswd':'Ml0yalAP!2o14','booth': bcode,'shift': shift, 'sdate': mydate, 'edate': mydate},

		success: function(data, textStatus, xhr) {
					 
			  //console.log(data);

			  var str = '';

			  for (var i = 0; i < data.data.length; i++)
			  {

				  if(data.data[i].BoothCode==bcode)
				  {

					  var BoothMobile = '';

                        str+='<div class="ptx_booth">';

						str+='<div class="cart_check mt-10">'+
							 '<div class="cart_inner">'+
							 '<div class="inner_text">Booth Code:</div>'+
							 '<div class="inner_price">'+data.data[i].BoothCode+'</div>'+
							 '</div></div>';
						str+='<div class="cart_check">'+
							 '<div class="cart_inner">'+
							 '<div class="inner_text">Mobile:</div>'+
							 '<div class="inner_price">'+BoothMobile+'</div>'+
							 '</div></div>';
						str+='<div class="cart_check">'+
							 '<div class="cart_inner">'+
							 '<div class="inner_text">Inv No:</div>'+
							 '<div class="inner_price">'+data.data[i].BillNumber+'</div>'+
							 '</div></div>';
						str+='<div class="cart_check">'+
							 '<div class="cart_inner">'+
							 '<div class="inner_text">Amount:</div>'+
							 '<div class="inner_price">&#8377; '+data.data[i].BillAmount+'</div>'+
							 '</div></div>';

						var date1 = data.data[i].BillDate.split('-');
                                var mm1 = date1.length == 3 ? date1[1] : '';
                                var dd1 = date1.length == 3 ? date1[0] : '';
                                var yyyy1 = date1.length == 3 ? date1[2] : '';
								var newdate = yyyy1+'-'+mm1+'-'+dd1;
                                
						str+='<div class="cart_check">'+
							 '<div class="cart_inner">'+
							 '<div class="inner_text">InvDate:</div>'+
							 //'<div class="inner_price"><input type="date" id="invdate'+i+'" value="'+newdate+'"/></div>'+
						     '<div class="inner_price">'+data.data[i].BillDate+'</div>'+
							 '</div></div>';
						/*str+='<div class="cart_check">'+
							 '<div class="cart_inner">'+
							 '<div class="inner_text">Shift:</div>'+
							 '<div class="inner_price"><select name="shift_type'+i+'" id="shift_type'+i+'"><option value="AM">AM</option><option value="PM">PM</option></select></div>'+
							 '</div></div>';*/

						str+='<div class="text-center mt-20">'+
							 '<a href="javascript:gotoPaytype(\''+data.data[i].BoothCode+'\',\''+BoothMobile+'\',\''+data.data[i].BillNumber+'\',\''+i+'\',\''+data.data[i].BillAmount+'\',\''+data.data[i].BillId+'\',\''+data.data[i].RouteCode+'\');" data-role="none" class="cartpage_btn">Submit</a>'+
							 '</div>';

						str+='</div>';
				  }

              }

			  if(str.trim()=='')
				  str+='No transactions found';

			  document.getElementById("boothdiv").innerHTML=str;

			  $.mobile.changePage("#boothhomepage");

			  clearPaytype();

                
		},
		error: function(xhr, textStatus, errorThrown) {
			    //toast('Network error..Please Reload');
		}
	  });
	}
}


function gotoPaytype(boothcode,mobile,invno,index,BillAmount,bill_id,routecode)
{

	
		$.mobile.changePage( "#my_cart", { transition: "none"} );

		if(BillAmount.toString().indexOf(".")>=0)
		{
			BillAmount  = parseFloat(BillAmount).toFixed(2);
		}

        var str='';

				str+='<div class="form-group points_form py-3">'+
					'<label>Mobile No</label>'+
					'<input type="tel" id="payment_mob_no" value="'+mobile+'" placeholder="Mobile No" data-role="none" maxlength="10" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" />'+
				'</div>';

		str+='<div class="form-group mt-20">'+
						'<a href="javascript:checkviewcart_new(\''+invno+'\',\''+BillAmount+'\',\''+bill_id+'\',\''+boothcode+'\',\''+routecode+'\');" class="btn btn_primary ui-link">Submit</a>'+
					'</div>';

		document.getElementById("cartmain").innerHTML=str;
}

function checkviewcart_new(invno,amnt,bill_id,boothcode,routecode)
{
	var mobile =  $('#payment_mob_no').val();

	var paytype = localStorage.getItem('paymenttypearvinddairy'); 
    if(paytype == undefined || paytype == null)
	 paytype='';

	var billno_tmp = Math.floor((Math.random() * 100000000000) + 1);

	if(mobile=='')
	{
		toast('Please enter mobile no.');
	}
	else if(paytype=='')
	{
		 toast('Please check for payment type');
			  //viewcart();
	}
    else
	{

	$.ajax({
      url: shopcmsurl+'checkout',
      type: 'GET',
      timeout: 50000,
      data: {
                'products': '',
				'totamt': amnt,
				'payamt': amnt,
				'ptsredeem': '0',       
				'paytype': paytype,
				'invoiceid': billno_tmp,
				'discount': '0', 
				'deliverycharge': '0',	
				'tax': '0',
				'fname': 'Test',
				'lname': 'Test',
                'email': '',   
				'phone': mobile,    
				'address1': '',
                'address2': invno,
				'ship_name': boothcode,
				'ship_address': bill_id,
				'ship_city': routecode,
                'city': '',    
				'state': '',
                'postalcode': '',
				'coupon_code': '',
                'deviceId': '',
                'deviceType': deviceType,
                'deliverytype': 'delivery',
                'location': ''
					
			},
   
    success: function(data, textStatus, xhr) {

		console.log('JSONDATA 1:'+JSON.stringify(data));

		if(data.indexOf("<style")>0)
		{
			data = data.substring(0, data.indexOf("<style"));
		}
			data = data.replace(/^\s+|\s+$/g,'');
		//console.log('after removing style JSONDATA:'+JSON.stringify(data));
		var str1 = '';
        data=JSON.parse(data);

		console.log('JSONDATA 2:'+JSON.stringify(data));
       
		if(paytype == 'cash')
        {

			if(data.success == true )
			{
				$('#pay_confirm_pop').popup();
				resetcsData();
				
				document.getElementById("pdiv").innerHTML='Your Order has been Confirmed.';
				document.getElementById("pickupcode").innerHTML='Order Id : '+data.order_id;	
				
				$('#pay_confirm_pop').popup("open");
                
				var txns_id = '';
				var txns_sts = 'TXN_SUCCESS';
				update_bill_payment_status(boothcode,bill_id,mobile,paytype,txns_id,txns_sts,routecode);
			}
			else
			{
				toast('transaction failed');
			}
		}
		else
		{
				/*document.getElementById("qrdiv").innerHTML = '<img src="data:image/jpeg;base64,'+data.body.image+'" style="padding:5px;" height="355px" />';
				$.mobile.changePage( "#qrpage", { transition: "none"} );
                var pay_type='online';
				setTimeout(function(){
					checkforpayment_atinterval(invno,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode);
				},31000);
				resetcsData();*/


				var the_height = ($(window).height() - $(this).find('[data-role="header"]').height());
				var the_width = $(window).width();
				var purl=data.url;
				//var porderid=data.order_id;
				//openBrowser11(purl,porderid,deliverytype);
                var pay_type='online';
				openBrowser11(purl,invno,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode);

		}

       

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });
	}
}

function checkviewcart_old(invno,amnt,bill_id,boothcode,routecode)
{
	var mobile =  $('#payment_mob_no').val();

	var paytype = localStorage.getItem('paymenttypearvinddairy'); 
    if(paytype == undefined || paytype == null)
	 paytype='';

	var billno_tmp = Math.floor((Math.random() * 10000000) + 1)

	if(mobile=='')
	{
		toast('Please enter mobile no.');
	}
	else if(paytype=='')
	{
		 toast('Please check for payment type');
			  //viewcart();
	}
    else
	{

	$.ajax({
      url: shopcmsurl+'checkout',
      type: 'GET',
      timeout: 50000,
      data: {
                'products': '',
				'totamt': amnt,
				'payamt': amnt,
				'ptsredeem': '0',       
				'paytype': paytype,
				'invoiceid': billno_tmp,
				'discount': '0', 
				'deliverycharge': '0',	
				'tax': '0',
				'fname': 'Test',    
				'lname': 'Test',
                'email': '',   
				'phone': mobile,    
				'address1': '',
                'address2': invno,
                'city': '',    
				'state': '',
                'postalcode': '',
				'coupon_code': '',
                'deviceId': '',
                'deviceType': deviceType,
                'deliverytype': 'delivery',
                'location': ''
					
			},
   
    success: function(data, textStatus, xhr) {

		console.log('JSONDATA 1:'+JSON.stringify(data));

		if(data.indexOf("<style")>0)
		{
			data = data.substring(0, data.indexOf("<style"));
		}
			data = data.replace(/^\s+|\s+$/g,'');
		//console.log('after removing style JSONDATA:'+JSON.stringify(data));
		var str1 = '';
        data=JSON.parse(data);

		console.log('JSONDATA 2:'+JSON.stringify(data));
       
		if(paytype == 'cash')
        {

			if(data.success == true )
			{
				$('#pay_confirm_pop').popup();
				resetcsData();
				
				document.getElementById("pdiv").innerHTML='Your Order has been Confirmed.';
				document.getElementById("pickupcode").innerHTML='Order Id : '+data.order_id;	
				
				$('#pay_confirm_pop').popup("open");
                
				var txns_id = '';
				var txns_sts = 'TXN_SUCCESS';
				update_bill_payment_status(boothcode,bill_id,mobile,paytype,txns_id,txns_sts,routecode);
			}
			else
			{
				toast('transaction failed');
			}
		}
		else
		{
			console.log(data.body.resultInfo.resultStatus);

			if(data.body.resultInfo.resultStatus=='FAILURE')
			{
				toast(data.body.resultInfo.resultMsg);
			}
			else
			{

				document.getElementById("qrdiv").innerHTML = '<img src="data:image/jpeg;base64,'+data.body.image+'" style="padding:5px;" height="355px" />';
				$.mobile.changePage( "#qrpage", { transition: "none"} );

                var pay_type='online';
				setTimeout(function(){
					checkforpayment_atinterval(invno,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode);
				},31000);


				resetcsData();

			}
		}

       

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });
	}
}


function checkforpayment_atinterval(inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode)
{
	$.ajax({
           
			url: shopcmsurl+'checkout/txnstatus/'+billno_tmp,
            type: 'GET',
			timeout: 300000,
            dataType: "json",
         
           complete: function(xhr, textStatus) {
		   //called when complete

		    },

			success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));
			
				if(data.body.resultInfo.resultStatus=='TXN_FAILURE' || data.body.resultInfo.resultStatus=='PENDING')
				{
					setTimeout(function(){
					checkforpayment_atinterval2(inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode);
					},40000);
				}
				else
				{
					toast2(data.body.resultInfo.resultMsg);
					//$.mobile.changePage( "#selectcategorypage", { transition: "none"} );
					$.mobile.changePage( "#dist_route_pg", { transition: "none"} );
                    
                    var txns_id = checkforundefined(data.body.txnId);
					var txns_sts = checkforundefined(data.body.resultInfo.resultStatus);

					update_bill_payment_status(boothcode,bill_id,mobile,pay_type,txns_id,txns_sts,routecode);
				}
                    
			 },
			error: function(xhr, textStatus, errorThrown) {
				 //toast('Could not connect to Server, make sure you are connected to Internet'+errorThrown);
				}
		});

}

function checkforpayment_atinterval2(inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode)
{

	$.ajax({
           
			url: shopcmsurl+'checkout/txnstatus/'+billno_tmp,
            type: 'GET',
			timeout: 300000,
            dataType: "json",
         
           complete: function(xhr, textStatus) {
		   //called when complete

		    },

			success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));
			
				if(data.body.resultInfo.resultStatus=='TXN_FAILURE' || data.body.resultInfo.resultStatus=='PENDING')
				{
					setTimeout(function(){
					checkforpayment_atinterval3(inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode);
					},40000);
				}
				else
				{
					toast2(data.body.resultInfo.resultMsg);
					//$.mobile.changePage( "#selectcategorypage", { transition: "none"} );
					$.mobile.changePage( "#dist_route_pg", { transition: "none"} );
                    
					var txns_id = checkforundefined(data.body.txnId);
					var txns_sts = checkforundefined(data.body.resultInfo.resultStatus);

					update_bill_payment_status(boothcode,bill_id,mobile,pay_type,txns_id,txns_sts,routecode);
				}
                
		
                    
			 },
			error: function(xhr, textStatus, errorThrown) {
				 //toast('Could not connect to Server, make sure you are connected to Internet'+errorThrown);
				}
		});

}

function checkforpayment_atinterval3(inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode)
{

	$.ajax({
           
			url: shopcmsurl+'checkout/txnstatus/'+billno_tmp,
            type: 'GET',
			timeout: 300000,
            dataType: "json",
         
           complete: function(xhr, textStatus) {
		   //called when complete

		    },

			success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));
			
				if(data.body.resultInfo.resultStatus=='TXN_FAILURE' || data.body.resultInfo.resultStatus=='PENDING')
				{
					toast('Transaction timeout. Please try again');
					$.mobile.changePage( "#boothhomepage", { transition: "none"} );
				}
				else
				{
					toast2(data.body.resultInfo.resultMsg);
					//$.mobile.changePage( "#selectcategorypage", { transition: "none"} );
					$.mobile.changePage( "#dist_route_pg", { transition: "none"} );

					
					var txns_id = checkforundefined(data.body.txnId);
					var txns_sts = checkforundefined(data.body.resultInfo.resultStatus);

					update_bill_payment_status(boothcode,bill_id,mobile,pay_type,txns_id,txns_sts,routecode);
				}
                
		
                    
			 },
			error: function(xhr, textStatus, errorThrown) {
				 //toast('Could not connect to Server, make sure you are connected to Internet'+errorThrown);
				}
		});

}

function update_bill_payment_status(boothcode,bill_id,mobile,paytype,txn_id,txn_sts,routecode)
{

 $.ajax({
   url: SERVER2+'update_bill_payment_status_api.asp',
   type: 'GET',
   timeout: 50000,
   dataType: 'json',
   data: {'apiuid':'MLOYALAPI','apipswd':'Ml0yalAP!2o14','booth_code': boothcode, 'billid': bill_id, 'mobileno': mobile, 'mode_of_payment': paytype, 'TransactionId': txn_id, 'transaction_status': txn_sts, 'route_code': routecode},
   complete: function(xhr, textStatus) {
   //called when complete
    },
    success: function(data, textStatus, xhr) {

         console.log('JSONDATA'+JSON.stringify(data));
      
		 /*if(data.data.length>=1)
		 {
			 toast(data.data);
		 }
		 else
		 {
			 toast(data.error);
		 }*/
    },
    error: function(xhr, textStatus, errorThrown) {
		//toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

}

function checkStatus_new(inv_id,bill_id,boothcode,billno_tmp,mobile,pay_type,routecode)
{
	$.ajax({
           
			url: shopcmsurl+'checkout/txnstatus2/'+billno_tmp,
            type: 'GET',
			timeout: 300000,
            dataType: "json",
         
           complete: function(xhr, textStatus) {
		   //called when complete

		    },

			success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));
			
				if(data.body.resultInfo.resultStatus=='TXN_SUCCESS')
				//if(data[0].TXNSTATUS=='TXN_SUCCESS' && data[0].TXNID!='null' && data[0].TXNID!=null )
				{
                    toast2('Transaction successful');
					//var txns_id = checkforundefined(data.body.txnId);
					//var txns_sts = checkforundefined(data.body.resultInfo.resultStatus);
					//update_bill_payment_status(boothcode,bill_id,mobile,pay_type,txns_id,txns_sts,routecode);

					resetcsData();

					$.mobile.changePage("#dist_route_pg", {transition: "slideup"} );

				}
				else
				{
					toast2('Transaction failed');
					$.mobile.changePage("#boothhomepage", {transition: "slideup"} );
				}
                    
			 },
			error: function(xhr, textStatus, errorThrown) {
				 //toast('Could not connect to Server, make sure you are connected to Internet'+errorThrown);
				}
		});

}