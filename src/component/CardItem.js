import React from "react";
import {
    Card,
    CardImg,
    Collapse
} from 'react-bootstrap'


function CardItem (props) {
    const displayGenre = (item) =>{
        const newData = props.sortedMovie.map(el => {
                if(el === item)
                   return Object.assign({}, el, {display: !item.display});
                return el;
            });
        props.getData(newData);
    };

    return(
        <div className="movies">
            {props.sortedMovie.map(item =>
            <Card style={{margin:"10px", width: '18rem',display:"flex", alignItems: "center"}}
                   onClick={()=> displayGenre(item)}>
                <Card.Body >
                    {item.poster_path ?
                        <CardImg className="movie_pic"
                            src={"https://image.tmdb.org/t/p/w500/"+item.poster_path} alt={item.title}/>:null}
                    <Card.Title>{item.title}</Card.Title>
                    <Collapse in={item.display}>
                        <div className='collpase'>
                            <h6>
                                Genre:
                            </h6>
                            {item.genre.map(item =>
                            <p className="movie_details">
                            {item}
                            </p>)}
                            <h6>
                                Rating:
                            </h6>
                            <p className="movie_details">
                                {item.vote_average}
                            </p>
                        </div>
                    </Collapse>
                  </Card.Body>
            </Card>)}
        </div>
    )
}

export default CardItem;
