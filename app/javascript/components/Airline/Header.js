import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 50px 100px 50px  0;
    font-size: 20px;
    img{
        height: 60px;
        width: 60px;
        border-radius: 100%;
        border: 1px solid rgba(0,0,0,1);
        margin-bottom: -8px;
    }
`
const TotalReviews = styled.div`
    font-size: 10px;
    padding: 10px 0;
`
const TotalOutOf = styled.div`
    font-size: 10px;
    font-weight: bold;
    padding: 10px 0;
`

const Header = (props) => {
    const { name, image_url, avg_score } = props.attributes
    const total = props.reviews.length
    return (
        <Wrapper>
            <h1><img src={image_url} alt={name}/>{name}</h1>
            <div>
                <TotalReviews>{total} User Reviews</TotalReviews>
                <div className="startRating"></div>
                <TotalOutOf>{avg_score} out of 5</TotalOutOf>
            </div>
        </Wrapper>
    )
}

export default Header