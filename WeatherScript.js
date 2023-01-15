const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = document.querySelector(".info-txt"),
inputField = document.querySelector("input");
locationBtn = document.querySelector(".get-location"),
wIcon = document.querySelector(".weather-part img"),
arrowBack = document.querySelector("header i"),
enterBtn = document.querySelector(".enter-btn");

let apikey = '2fdd407d0cbc025708e7b621802c8b79';
let api;

// INPUT LOCATION
enterBtn.addEventListener("click", () =>{
  requetApi(inputField.value)
});

inputField.addEventListener("keyup", e =>{
  if(e.key == "Enter" && inputField.value != ""){
    requetApi(inputField.value)
  }
});

//DETECT LOCATION
locationBtn.addEventListener("click", ()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess, onError)

  } else{
    alert("Таны ашиглаж буй хөтөч байршлыг илрүүлхэд тохиромжгүй байна.")
  }
});

function onSuccess(position){
  console.log(position);
  const {latitude, longitude} = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;
  fetchData();
}

function onError(error){
  infoTxt.innerText = "Байршлыг авах тохиргоог зөвшөөрнө үү";
  infoTxt.classList.add("error");
}

function requetApi(city){
  api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
  fetchData();
}

function fetchData(){
  infoTxt.innerText = "Мэдээллийг цуглуулж байна...";
  infoTxt.classList.add("pending");

  fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
  infoTxt.classList.replace("pending", "error");
  if(info.cod == "404"){
    infoTxt.innerText = `${inputField.value} гэдэг хот олдсонгүй`;
  }else if(info.cod == "400"){
    infoTxt.innerText = `Хотын нэр оруулна уу!`; 
  }
  else{
    const city = info.name;
    const country = info.sys.country;
    const {description, id} = info.weather[0];
    const {feels_like, humidity, temp} = info.main;

    if(id == 800){
      wIcon.src = "assets/clear.png";
    }else if(id >= 200 && id <=232){
      wIcon.src = "assets/storm.png";
    }else if(id >= 600 && id <=622){
      wIcon.src = "assets/snow.png";
    }else if(id >= 701 && id <=781){
      wIcon.src = "assets/mist.png";
    }else if(id >= 801 && id <=804){
      wIcon.src = "assets/cloud.png";
    }else if(id >= 300 && id <=321){
      wIcon.src = "assets/drizzle.png";
    }else if(id >= 500 && id <=531){
      wIcon.src = "assets/rain.png";
    }



    wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city}, ${country}`
    wrapper.querySelector(".feels .numb").innerText = Math.floor(feels_like);
    wrapper.querySelector(".humidity .numb").innerText = humidity;



    infoTxt.classList.remove("pending", "error");
    wrapper.classList.add("active");
    console.log(info);
  }

}

arrowBack.addEventListener("click", ()=>{
  wrapper.classList.remove("active");
});