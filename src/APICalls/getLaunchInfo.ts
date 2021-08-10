import { LaunchData, RocketData } from "../Interfaces/RocketLaunches";

const getAllLaunches = (setLaunches: React.Dispatch<React.SetStateAction<LaunchData[]>>) => {
  const url = 'https://api.spacexdata.com/v3/launches';
  fetch(url)
  .then((res) => {
    if (res) {
      return res.json();
    } else {
      throw new Error('Failed to fetch rocket launch information from spaceX.');
    }
  })
  .then((data) => {
    const newLaunchData = [];
    for (let i=0; i < data.length; i++) {
      newLaunchData.push({
        flightNum: data[i].flight_number,
        missionName: data[i].mission_name,
        launchDate: data[i].launch_date_utc,
        patchImageLink: data[i].links.mission_patch_small,
        launchSuccess: data[i].launch_success,
        upcoming: data[i].upcoming,
      });
    }
    setLaunches(newLaunchData);
  })
  .catch((err) => {
    console.log(err);
  })
};

const getRocketData = (flightNum: string, setRocket: React.Dispatch<React.SetStateAction<RocketData>>) => {
  const url = `https://api.spacexdata.com/v3/launches/${flightNum}`;
  fetch(url)
  .then((res) => {
    if (res) {
      return res.json();
    } else {
      throw new Error(`Failed to fetch rocket launch information for flight ${flightNum} from spaceX.`);
    }
  })
  .then((data) => {
    const rocket = data.rocket;
    // Identify if any of the components of the rocket's been reused.
    let reused = false;
    for (let core of rocket.first_stage.cores) {
      reused = reused || core.reused;
    }
    for (let payload of rocket.second_stage.payloads) {
      reused = reused || payload.reused;
    }

    setRocket({
      rocketName: rocket.rocket_name,
      rocketType: rocket.rocket_type,
      reused: reused,
    });
  })
  .catch((err) => {
    console.log(err);
  })
};

export { getAllLaunches, getRocketData };
