
//check if we have a current refferer saved 
const initialRefferer = localStorage.getItem('initial-refferer');
const currentReferrer = document.referrer;

//if we have no refferer set then set it in localStorage
if(initialRefferer === null && currentReferrer !== ''){
  localStorage.setItem('initial-refferer', currentReferrer)
}

//first promotor affiliate program
(function(w){w.fpr=w.fpr||function(){w.fpr.q = w.fpr.q||[];w.fpr.q[arguments[0]=='set'?'unshift':'push'](arguments);};})(window);
fpr("init", {cid:"csuay3td"}); 
fpr("click");

