const today = new Date();
let sep_control = false;

function GetInfor() {
  const newName = document.getElementById("cityInput");
  const cityName = document.getElementById("cityName");
  cityName.innerText = String(newName.value);

  // fetch weather api key
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
      newName.value +
      "&appid=42322c7325fb1149d38536f24afb3767"
  )
    .then((Response) => Response.json())
    .then((data) => {
      //   console.log(data);

      //filter today data and other data
      const todayData = [];
      const otherDate = [];
      // console.log(data.list);

      if (data.list) {
        data.list.forEach((element) => {
          const day = new Date(element.dt_txt);
          const hour = day.getHours();

          //   console.log(day.getDay());
          if (today.getDay() === day.getDay()) {
            todayData.push(element);
          } else {
            // console.log("hour :" + hour);
            if (hour === 6) {
              otherDate.push(element);
            }
          }
        });

        if (otherDate.length < 5) {
          sep_control = true;
        }

        //current weather update
        document.getElementById("mainDate").innerText =
          "( " + todayData[0].dt_txt.split(" ")[0] + " )";

        document.getElementById("mainTemp").innerText =
          "Temp: " + Number(todayData[0].main.temp - 273.15).toFixed(1) + " C°";

        document.getElementById("mainWeather").innerText =
          todayData[0].weather[0].description;

        document.getElementById("mainHumidity").innerText =
          "Humidity: " + todayData[0].main.humidity + "%";

        document.getElementById("mainWindSpeed").innerText =
          "Wind: " + todayData[0].wind.speed + " MPH";
      }
      // console.log(todayData);
      // console.log(otherDate);

      //get the min tempreture  values for each day)

      for (i = 0; i < 5; i++) {
        if (sep_control) {
          if (i === 0) {
            document.getElementById("day" + (i + 1) + "Min").innerHTML =
              "Min " +
              Number(todayData[i].main.temp_min - 273.15).toFixed(1) +
              "C°";
          } else {
            document.getElementById("day" + (i + 1) + "Min").innerHTML =
              "Min " +
              Number(otherDate[i - 1].main.temp_min - 273.15).toFixed(1) +
              "C°";
          }
        } else {
          document.getElementById("day" + (i + 1) + "Min").innerHTML =
            "Min " +
            Number(otherDate[i].main.temp_min - 273.15).toFixed(1) +
            "C°";
        }
      }
      //get max tempretur value for the day
      for (i = 0; i < 5; i++) {
        if (sep_control) {
          if (i === 0) {
            document.getElementById("day" + (i + 1) + "Max").innerHTML =
              "Max " +
              Number(todayData[i].main.temp_max - 273.15).toFixed(1) +
              "C°";
          } else {
            document.getElementById("day" + (i + 1) + "Max").innerHTML =
              "Max " +
              Number(otherDate[i - 1].main.temp_max - 273.15).toFixed(1) +
              "C°";
          }
        } else {
          document.getElementById("day" + (i + 1) + "Max").innerHTML =
            "Max " +
            Number(otherDate[i].main.temp_max - 273.15).toFixed(1) +
            "C°";
        }
      }
      // get icons
      for (i = 0; i < 5; i++) {
        if (sep_control) {
          if (i === 0) {
            document.getElementById("img" + (i + 1)).src =
              " http://openweathermap.org/img/wn/" +
              todayData[i].weather[0].icon +
              "@2x.png";
          } else {
            document.getElementById("img" + (i + 1)).src =
              " http://openweathermap.org/img/wn/" +
              otherDate[i - 1].weather[0].icon +
              "@2x.png";
          }
        } else {
          document.getElementById("img" + (i + 1)).src =
            " http://openweathermap.org/img/wn/" +
            otherDate[i].weather[0].icon +
            "@2x.png";
        }
      }

      for (i = 0; i < 5; i++) {
        if (sep_control) {
          document.getElementById("day" + (i + 1)).innerHTML =
            weekday[checkDay(i)];
        } else {
          document.getElementById("day" + (i + 1)).innerHTML =
            weekday[checkDay(i + 1)];
        }
      }
      //   console.log(data);
      newName.value = "";
    });
}

function wetherScreen() {
  document.getElementById("cityInput").value = "london";
  GetInfor();
}

// const d = new Date();
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// function to get the correct integer for the index of days array
function checkDay(day) {
  if (day + today.getDay() > 6) {
    return day + today.getDay() - 7;
  } else {
    return day + today.getDay();
  }
}

// console.log(sep_control);