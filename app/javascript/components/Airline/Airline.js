import React, { Component, useState, useEffect, Fragment} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Header from "./Header";
import ReviewForm from "./ReviewForm";
import Review from "./Review"
import styled from "styled-components";

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
    background: #fff;
    height: 100vh;
    overflow: scroll;
    
    &:last-child {
        background: #000;
    }
`
const Main = styled.div`
    padding-left: 50px;
`


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

    const handleChange = (e) => {
        e.preventDefault()

        setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))

        console.log('review', review)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('meta[name="csrf-token"]')
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.content

        const airline_id = airline.data.id
        axios.post('/api/v1/reviews', {review, airline_id})
            .then(resp => {
                const included = [...airline.included, resp.data.data]
                setAirline({...airline, included})
                setReview({title: '', description: '', score: 0})
            })
            .catch(resp => {

            })
    }

    //set score
    const setRating = (score, e) => {
        e.preventDefault()

        setReview({...review, score})
    }

    let reviews
    if (loaded && airline.included){
        reviews = airline.included.map((item, index) => {
            return(
                <Review
                    key={index}
                    attributes={item.attributes}/>
            )
        })
    }



    return (
        <Wrapper>
            {
                loaded &&
                <Fragment>
                    <Column>
                        <Main>
                            <Header
                                attributes={airline.data.attributes}
                                reviews={airline.included}
                            />
                            {reviews}
                        </Main>
                    </Column>
                    <Column>
                        <ReviewForm
                            handleChange={handleChange}
                            handleSumbit={handleSubmit}
                            setRating={setRating}
                            attributes={airline.data.attributes}
                            review={review}/>
                    </Column>
                </Fragment>
            }
        </Wrapper>
)
}

//export default Airline