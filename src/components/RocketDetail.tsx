import { useEffect, useState } from "react";
import { getRocketData } from "../APICalls/getLaunchInfo";
import { RocketData, RocketDetailParam } from "../Interfaces/RocketLaunches";
import { useParams } from "react-router-dom";

export default function RocketDetail(): JSX.Element {
  // Use the flight number given in the url.
  const { flightNum } = useParams<RocketDetailParam>();

  const [rocket, setRocket] = useState<RocketData>({
    rocketName: '',
    rocketType: '',
    reused: false,
  });

  useEffect(() => {
    getRocketData(flightNum, setRocket);
  }, [flightNum]);

  const createRocketDetail = () => {
    if (rocket) {
      return(
        <div>
          <p className='RocketName'> Rocket Name: {rocket.rocketName} </p>
          <p className='RocketDetail'> Rocket Type: {rocket.rocketType} </p>
          <p className='RocketDetail'> Reused: {rocket.reused? 'YES' : 'NO'} </p>
        </div>
      );
    }
    return (
      <div> Loading... </div>
    );
  }

  return(
    <div className="RocketCell">
      {createRocketDetail()}
    </div>
  );
}