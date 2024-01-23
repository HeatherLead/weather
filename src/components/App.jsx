import React, { useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import TButton from "./Tbutton";
import WaterIcon from "@mui/icons-material/Water";
import MoreIcon from "@mui/icons-material/More";
import SpeedIcon from "@mui/icons-material/Speed";
function App() {
  const [change, setChange] = useState();
  const [city, setCity] = useState("london");
  const [event, setEvent] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [icon, setIcon] = useState();
  const [temp, setTemp] = useState("24");
  const [humidity, setHumidity] = useState();
  const [pressure, setPressure] = useState();
  const [wind, setWind] = useState();
  const [units, setUnits] = useState("metric");
  const [un, setUn] = useState(false);

  const [des, setDes] = useState(false);
  const [hum, setHum] = useState(false);
  const [pres, setPres] = useState(false);
  const [win, setWin] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=21941ec6cbbcc691ab9923bb07a142d6&units=" +
        units +
        ""
    )
      .then((res) => {
        if (res.ok === false) {
          throw Error("unable to find city!");
        }
        return res.json();
      })
      .then((value) => {
        const Wname = value.weather[0].main;
        setName(Wname);
        const wDescription = value.weather[0].description;
        setDescription(wDescription);
        const wIcon = value.weather[0].icon;
        setIcon(wIcon);
        const wTemp = Math.round(Number(value.main.temp));
        setTemp(wTemp);
        const wHumidity = value.main.humidity;
        setHumidity(wHumidity);
        const wPressure = value.main.pressure;
        setPressure(wPressure);
        const wWind = value.wind.speed;
        setWind(wWind);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [city]);

  function submit() {
    setEvent(true);
    setChange("");
    setCity(change);
  }
  function handleChange(event) {
    const newValue = event.target.value;
    setChange(newValue);
  }

  const [wSpeed, setWspeed] = useState("m/s");
  // if (units == "metric") {
  //   setWspeed("m/s");
  // } else if (units == "imperial") {
  //   setWspeed("mi/hr");
  // }
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date().getDate();
  const point = new Date().getMonth();
  function handle(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const [click, setClick] = useState(false);
  const [click2, setClick2] = useState(false);
  const [mouse, setMouse] = useState(false);

  function Note() {
    return (
      <div
        className="  absolute  overflow-visible z-30  m-2 bg-[#26b0df] text-xs rounded-md  text-center top-1 pr-1"
        style={{ display: mouse ? "flex" : "none" }}
      >
        <p>website is depending on api so reEnter the city when unit changed</p>
      </div>
    );
  }
  function mPoint() {
    setMouse(!mouse);
  }

  function Sdropdown() {
    return (
      <form
        onClick={handle}
        className="sdropdown absolute  bg-[#abe0f2]  overflow-hidden  flex-col pr-2 rounded-lg w-1/2  border-2"
        style={{ display: click ? "block" : "none" }}
      >
        <h1 className="m-2 ml-5 font-sans flex justify-between align-middle font-bold text-left text-2xl ">
          Units{" "}
          <div onClick={mPoint} className="mr-14 self-center">
            <MoreIcon />
          </div>
        </h1>
        <h2 className=" mt-2 mb-2 ml-2  text-left  text-2xl">
          {units}
          <TButton value={un} onAdd={uHandle} />
        </h2>
      </form>
    );
  }

  function uHandle(check) {
    const uu = check;
    setUn(check);
    if (uu) {
      setUnits("imperial");
    } else {
      setUnits("metric");
    }
  }

  function desHandle(check) {
    setDes(check);
  }
  function humHandle(check) {
    setHum(check);
  }
  function presHandle(check) {
    setPres(check);
  }
  function winHandle(check) {
    setWin(check);
  }

  function Ldropdown() {
    return (
      <form
        onClick={handle}
        className="absolute bottom-9  p-2 pr-5 bg-[#abe0f2] rounded-lg w-64   flex-col border-2"
        style={{ display: click2 ? "flex" : "none" }}
      >
        <h1 className=" text-2xl mt-2  flex justify-end font-bold">
          description
          <div className="">
            <TButton value={des} onAdd={desHandle} />
          </div>
        </h1>
        <h1 className=" text-2xl mt-2  flex justify-end font-bold">
          humidity
          <div>
            <TButton value={hum} onAdd={humHandle} />
          </div>
        </h1>
        <h1 className=" text-2xl mt-2  flex justify-end font-bold">
          pressure
          <div>
            <TButton value={pres} onAdd={presHandle} />
          </div>
        </h1>
        <h1 className="text-2xl mt-2  flex justify-end font-bold">
          wind speed
          <div>
            <TButton value={win} onAdd={winHandle} />
          </div>
        </h1>
      </form>
    );
  }

  return (
    <div className="h-screen w-screen flex justify-center flex-col  items-center">
      {error && (
        <div className=" text-white text-4xl">
          {error} {window.location.reload(false)}
        </div>
      )}
      <div
        style={{ display: error ? "none" : "block" }}
        className="container relative rounded-xl w-96 h-[450px] bg-[#abe0f2]"
      >
        <div className="topHolder grid grid-cols-2  place-content-between ">
          <h1 className=" justify-start pl-3 pt-3 text-white text-2xl ">
            <span className=" text-white  pr-3">
              <LocationOnIcon fontSize="large" />
            </span>
            {city}
          </h1>
          <span
            onClick={() => {
              setClick(!click);
            }}
            className=" cursor-pointer text-right text-white pr-3 pt-3"
          >
            <SettingsIcon fontSize="large" />
            <Note />

            <Sdropdown />
          </span>
        </div>
        <div className=" p-5">
          <input
            onChange={handleChange}
            className=" ml-3 w-64  pl-2 pt-2 pb-1 rounded-lg"
            type="text"
            placeholder="Enter your City"
            value={change}
          ></input>
          <button
            className=" ml-4 w-9 h-9 bg-white rounded-lg"
            onClick={submit}
          >
            Go
          </button>
        </div>
        <div className=" m-0 grid  grid-cols-2 grid-rows-1">
          <img
            className="m-3 p-2"
            src={"https://openweathermap.org/img/wn/" + icon + "@2x.png"}
          />
          <h1 className="m-3 mt-5 pt-4 text-7xl text-white text-center">
            {temp}
            <div className="absolute translate-x-32 translate-y-[-130px]">
              <ThermostatIcon fontSize="large" />
            </div>
          </h1>
        </div>
        <h1 className="ml-12 cursor-pointer font-bold text-white text-xl">
          {name}
        </h1>
        <div className="grid mt-3 grid-cols-2 grid-rows-2">
          <h1
            style={{ display: des ? "block" : "none" }}
            className="text-white text-xl text-center"
          >
            {description}
          </h1>
          <h1
            style={{ display: win ? "block" : "none" }}
            className="text-white text-xl text-center"
          >
            <AirIcon />
            {wind + " " + wSpeed}
          </h1>
          <h1
            style={{ display: hum ? "block" : "none" }}
            className="text-white text-xl text-center"
          >
            <WaterIcon />
            {"  " + humidity + " g.m-3"}
          </h1>
          <h1
            style={{ display: pres ? "block" : "none" }}
            className="text-white text-xl text-center"
          >
            {pressure + " pa"}
          </h1>
        </div>
        <div className=" absolute m-4 ml-6 bottom-0 grid grid-cols-2  ">
          <span
            onClick={() => {
              setClick2(!click2);
            }}
            className=" text-white "
          >
            <Ldropdown />
            <AddCircleIcon fontSize="large" />
          </span>
          <h1 className=" text-white text-2xl ml-3 font-bold">
            {months[point] + "  " + date}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
