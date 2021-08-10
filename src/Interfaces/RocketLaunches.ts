export interface LaunchData {
  flightNum: number,
  missionName: string,
  launchDate: string,
  patchImageLink: string,
  launchSuccess: boolean,
  upcoming: boolean,
}

export interface RocketData {
  rocketName: string,
  rocketType: string,
  reused: boolean,
}

export interface RocketDetailParam {
  flightNum: string,
}

