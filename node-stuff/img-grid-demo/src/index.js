import "./styles.scss";
import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all';

const axios = require('axios');
const url = require('url');
let imageSpans = document.querySelectorAll(".img-wrapper");
let reqURL = 'https://api.unsplash.com/photos/?client_id=HgyIReDaPCDFba86F_F4E8ELnbcg8s3PdxWnHq292ZM';
let input = document.getElementById("searchText");
input.oninput = function () { searchImage(input.value); };
renderImage(reqURL);
function isBlank(value) {
    return (value.trim() == null ||
        value.trim() == undefined ||
        value.trim() == ' ' ||
        value.trim().length == 0);
}

function renderImage(req, flag) {
    axios({
        method: 'get',
        url: req,
        responseType: 'json'
    }).then(function (res) {
        for (let i = 0; i < 10; ++i) {
            let resText = (flag) ? res.data.results[i]  : res.data[i] ;
            imageSpans[i].innerHTML = '<img src="' + resText.urls.small+ '" alt="' + resText.alt_description + '" class="img-item" /><div class="img-overlay h6">'+resText.user.username+'</div>';

        }
    }).catch(function (error) {
        console.log("->ERRROR : " + error);
    });
}


function searchImage(query) {
    if (!isBlank(query)) {
        reqURL = 'https://api.unsplash.com/search/photos/?client_id=HgyIReDaPCDFba86F_F4E8ELnbcg8s3PdxWnHq292ZM&query=' + query;
    }
    else {
        reqURL = 'https://api.unsplash.com/photos/?client_id=HgyIReDaPCDFba86F_F4E8ELnbcg8s3PdxWnHq292ZM';
    }
    renderImage(reqURL, !isBlank(query));
}
