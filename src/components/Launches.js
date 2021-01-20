import React, { Fragment, useState, useEffect } from 'react';
//import axios from 'axios';
import moment from 'moment';
import { gql,useQuery,useLazyQuery } from "@apollo/client";


//Styled components
import { LaunchPageDetails, UpcomingLaunches } from './UI/LaunchComponents';

//assets
import nopatch from '../img/nopatch.png';
import nopatch_lg from '../img/nopatch_lg.png';


const QUERY_LAUNCH_LIST = gql`
  query LaunchList {
    launches {
    upcoming
  }
  launchNext {
    upcoming
    launch_date_local
  }
  }
`;

const Launches = () => {
    const [nextLaunch, setNextLaunch] = useState({});
    const [upcomingLaunches, setUpcomingLaunches] = useState([]);
    const { loading, data } = useQuery(QUERY_LAUNCH_LIST, {  fetchPolicy: "network-only" });




            //const URL_NEXTLAUNCH = 'https://api.spacexdata.com/v4/launches/next';
            //const URL_UPCOMINGLAUNCH = 'https://api.spacexdata.com/v4/launches/upcoming';



    const CheckPatch = () => {
        try {
            if(nextLaunch.links.patch.large) return true;
        } catch {
            return false;
        }
    }

    const date = nextLaunch.date_local;

    return (
        <Fragment>
            <div className="launch-bg">
                <div className="wrapper">
                    <LaunchPageDetails>
                        <div className="launch-grid-column">
                            <h1>Next launch</h1>


                            <h3>{nextLaunch.name}</h3>
                            <div className="img-container">
                                <img className="mission-patch" src={`${(CheckPatch()) ? nextLaunch.links.patch.large : nopatch_lg}`} alt="patch of next mission"/>
                            </div>
                        </div>
                        <div className="launch-grid-column date-details">
                            <div className="launch-date-container">
                                <div className="launch-date">
                                    <span>{moment(date).format("DD/MM/YYYY")}</span>
                                    <span className="hour" >at {moment(date).format("hh:mm:ss a")}</span>
                                </div>
                                <div className="date-title"><span>Launch date</span></div>
                            </div>
                            <p className="details">{nextLaunch.details}</p>
                        </div>
                    </LaunchPageDetails>
                </div>
            </div>

            <div className="wrapper">
                <UpcomingLaunches>
                    <h1>Upcoming launches</h1>
                    {
                        upcomingLaunches.map(Launch => (
                            <div className="upc-launch-container" key={Launch.id} >
                                <div className="launch-column-1">
                                    <img width="60px" src={`${ (Launch.links.patch.small) ? Launch.links.patch.small : nopatch}`} alt="patch of mission" />
                                </div>

                                <div  className="launch-column-2">
                                    <h3>{Launch.name}</h3>
                                </div>

                                <div  className="launch-column-3">
                                    <p>{moment(Launch.date_local).format("DD / MM / YYYY")}</p>
                                    <p>{moment(Launch.date_local).format("hh:mm:ss A")}</p>
                                </div>

                            </div>

                        ))
                    }
                </UpcomingLaunches>

            </div>

        </Fragment>

     );
}



export default Launches;