import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Header from "./Header";


export default function Airline () {
    const [airline,setAirline] = useState({})
    const [review, setReview] = useState({})
    const { slug } = useParams()
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        const url = `/api/v1/airlines/${slug}`

        axios.get(url)
             .then(resp => {
                     setAirline(resp.data)
                     setLoaded(true)
             })
             .catch(resp => console.log(resp))
        //api/v1/airlines/united-airlines
        // airlines/united-airlines
    }, [])
    return (
        <div className="wrapper">
            <div className="column">
                {
                    loaded &&
                    <Header
                        attributes = {airline.data.attributes}
                        reviews = {airline.included}
                    />
                }

                <div className="reviews"></div>
            </div>
            <div className="column">
                <div className="review-form">[Review Form Here]</div>
            </div>
        </div>
)
}

//export default Airline