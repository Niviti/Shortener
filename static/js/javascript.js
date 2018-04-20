
// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function shortenfirst(url)
{

// Obrabiamy
regextest2 =  /https?:\\\\www.|https?:\/\/www.|www.|https?:\/\/|https?:\\/
var textab = "Ala ma kota, a kot ma Alę, Ala go kocha, a Kot ją wcale ;("
wtf = String(url.split(regextest2))
//alert("co tutja jest"+wtf)
var tryit = wtf.replace(',' , "");

return tryit
}

function checkifurl(url)
{
// Part1 uzytkownik podaje z http
var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
var regex = new RegExp(expression)

//var t = 'www.google.com';
if (url.match(regex)) {
   //to jest url
} else {
  // to nie jest url
  var list = document.getElementsByClassName("danger-box")[0];
  list.style.display = "block";
  document.getElementById("error_value").innerHTML = "Error: to nie jest url";
  return false;
}

return true;
}

function checklengthurl(url)
{
var i;
var licznik=0;
var pozycja=0;
for (i = 0; i < url.length; i++) {
      if(url[i]=="/")
      {
      licznik++;
      if(licznik==2)
      {
      pozycja=i
      }
      }
}
if(licznik<2)
{
  // to nie jest url
  var list = document.getElementsByClassName("danger-box")[0];
  list.style.display = "block";
  document.getElementById("error_value").innerHTML = "Error: Podałeś za krótki adres url nie ma co skracac, adres url powinien zawierać 2 znaki / po nazwie domeny !";
  return false;
}

var urlskrocony = url.slice(0, pozycja)

return urlskrocony
}

function SaveToDatabase(url, urlskrocony )
{
var csrftoken = getCookie('csrftoken');

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

 $.ajax({
         type : "POST",
         url: '/shortener/',
         data: {
         'url':url,
         'urlshort':urlskrocony
         },
         success : function(response){
              console.log(response);
         },
    });
}


function action()
{
// zerujemy wcześniejsze wyniki
var list = document.getElementsByClassName("danger-box")[0].style.display= "none";
document.getElementById("Result").style.display = "none";
if($('#url_one').length>0)
{
$("a").remove("#url_one");
}

// pobieramy dane z inputa
url = document.getElementById("url").value

// Sprawdzamy czy jest to adres Url
checkif = checkifurl(url)
if(checkif==false)
{
return false;
}

// sprowadzamy url do postaci  domena.pl/.../....
domena = shortenfirst(url)

// sprawdzamy długość adresu url powinien zawierac 2 znaki / po nazwie domeny
var urlskrocony = checklengthurl(domena)
if(urlskrocony==false)
{
return false
}

// wyświetlanie url skróconego
if(url[0]=='w')
{
url='https:\\'+url
}

$("<a id='url_one' href='"+url+"'> "+urlskrocony+"   </a>").appendTo("#Result")
document.getElementById("Result").style.display = "block";

SaveToDatabase(url, urlskrocony)

}

