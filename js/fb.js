window.checkLoginState = () => {
  console.log("LOGIN", arguments)
  FB.getLoginStatus(function(response) {
    console.log(response);
    if (response.status == 'connected') {
      FB.api('/me/photos', function(response) {
        console.log('Successful login for: ' + response);
      });
    }
  });
}