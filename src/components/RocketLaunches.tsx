import React, { useEffect, useState } from "react";
import { getAllLaunches } from "../APICalls/getLaunchInfo";
import { LaunchData } from "../Interfaces/RocketLaunches";
import spaceXLogo from "../Images/spacex_logo_square.png";
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";

export default function RocketLaunches(): JSX.Element {
  const [launches, setLaunches] = useState<Array<LaunchData>>([]);
  const history = useHistory();

  useEffect(() => {
    getAllLaunches(setLaunches);
  }, []);

  const getDetails = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.id) {
      // Extract the flight number information from cell id.
      const flightNum = e.currentTarget.id.split('=')[1];
      history.push(`/launch/${flightNum}`);
    }
  }

  const createLaunchList = () => {
    const JSXElements: JSX.Element[] = [];
    if (launches) {
      for (let i = 0; i < launches.length; i++) {
        // Using moment for quick and cleaner formatting along with the timezone info.
        const launchDate = moment(launches[i].launchDate);
        // The timezone is based on the local computer's timezone.
        const tzAbbr = moment().tz(moment.tz.guess()).format('z');
        const status = launches[i].upcoming ? 'Upcoming' : (launches[i].launchSuccess ? 'Successful' : 'Failed');

        JSXElements.push(
          <div
            id={`flight=${launches[i].flightNum}`}
            className='LaunchCell'
            key={i}
            onClick={getDetails}
          >
            <div className='MissionCell'>
              <img
                className='MissionPatch'
                src={launches[i].patchImageLink ? launches[i].patchImageLink : spaceXLogo}
                alt={`Mission patch for rocket launch number ${i}`}
              />
              <div className='MissionDetail'>
                <p className='MissionName'> {launches[i].missionName} </p>
                <p className='LaunchDate'> 
                  {launchDate.format('ddd, DD MMM YYYY HH:mm:ss ') + tzAbbr}
                </p>
              </div>
            </div>
            <p className={`Status ${status}`}> {status} </p>
          </div>
        );
      }
    }
    return JSXElements;
  }

  return(
    <div className="App">
      {createLaunchList()}
    </div>
  );
}
