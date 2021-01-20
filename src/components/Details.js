import React, { useState, useEffect, Fragment } from 'react';
//import Axios from 'axios';
import { gql,useQuery } from "@apollo/client";
//Props
import WikiLogo from '../img/wikipedia-logo.png';

//Components
import Loader from './UI/Loader';
import Rocket from './Rocket'
import Dragon from './Dragon'
import { Description } from './UI/DetailsComponents';


export const QUERY_LAUNCH_PROFILE = gql`
  query LaunchProfile {
    launch {
      flight_number
      mission_name
      launch_year
      launch_success
      details
      launch_site {
        site_name
      }
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
      links {
        flickr_images
      }
    }
  }
`;

const Details = (props) => {

    //State
    //const [result, setResult] = useState({});
    //const [proceso, setProceso] = useState(true);
    const { loading, data } = useQuery(QUERY_LAUNCH_PROFILE, {  fetchPolicy: "cache-first" });


   // useEffect(() => {
       // const ConsultarAPI = async () => {
            //Extracting "match" of props
           // const { match } = props;

           // const URL = `https://api.spacexdata.com/v4/${match.params.project}/${match.params.id}`;
            //const response = await Axios.get(URL);
            //setResult(response.data);

           // setProceso(false);

        //}

        //if(proceso) {
       //     ConsultarAPI();
       // }

        //eslint-disable-next-line
   // }, [proceso]);

    const evaluateResult = (data) => {
        if (data) {
            if(data.type === "capsule") {
               return  <Dragon data={data} />;
            } else if (data.type === "rocket") {
                return  <Rocket data={data} />;
            } else {
                return null;
            }
        }
    }


    return (
        <Fragment>
            {
                loading
                ?
                    <Loader/>
                :
                    <div className="wrapper">
                        <div className="details-grid">
                            <Description>
                                <div className="image-project">
                                    <img src={data.LaunchProfile.flickr_images} alt={data.LaunchProfile.name}/>
                                    <div className="wikipedia">
                                        <a href={data.LaunchProfile.wikipedia}><img src={WikiLogo} alt="Wikipedia"/></a>
                                    </div>
                                </div>
                                <p>{data.LaunchProfile.description}</p>
                            </Description>
                            {evaluateResult(data.LaunchProfile)}
                        </div>
                    </div>

            }
        </Fragment>
    );
}

export default Details;