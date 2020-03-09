import React, {useState} from "react";
import {Dropdown, Button, FormControl, InputGroup, DropdownButton} from 'react-bootstrap'
import {PostData} from "../services/api";


function AddItem (props) {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");
    const [error, setError] = useState({title:false, genre:false, rating:false});

    const addItem = async () =>{
        let obj = {...error};
        if (title === ""){
            obj = Object.assign({}, obj, {title:true});
        }else {
            obj = Object.assign({}, obj, {title:false});
        }
        if(!genre){
            obj = Object.assign({}, obj, {genre:true});
        }else {
            obj = Object.assign({}, obj, {genre:false});
        }
        if(!rating){
            obj = Object.assign({}, obj, {rating:true});
        }else {
            obj = Object.assign({}, obj, {rating:false});
        }
        setError(obj);
        if (title && genre && rating){
            if (props.movieList.some(val => val.title === title)){
                alert(`The movie ${title} is already on the list!`)
            }else {
                try {
                    let newMovie =  {title:title, genre:[genre], vote_average:rating, display: false};
                    props.movieList[9] = newMovie;
                    let sortedMovies = props.movieList.sort((a, b) => b.vote_average - a.vote_average);
                    const res = await PostData({movies: sortedMovies});
                    props.getData(sortedMovies, false);
                    setError({title:false, genre:false, rating:false});
                    alert(`The movie ${title} was successfully added!`);
                    setTitle("");
                    setGenre("");
                    setRating("");
                }catch (e) {
                    console.log(e)
                }
            }
        }
    };

    const alertRating = (e)=>{
        if (e.target.value !== ''){
            if(e.target.value >0 && e.target.value <= 10){
            setRating(e.target.value)
            }else {alert('The number must be between 1-10')}
        }else {
            setRating("");
        }
    };

    return(
        <div className="add_movie">
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text className={error.title ? 'error': ''} id="basic-addon1">Title</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  // placeholder="Title"
                    value={title}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </InputGroup>

            <InputGroup className="mb-3" >
                <InputGroup.Prepend>
                    <InputGroup.Text className={error.genre ? 'error': ''} id="basic-addon">Genre</InputGroup.Text>
                </InputGroup.Prepend>
                <DropdownButton
                    onSelect={e => setGenre(e)}
                  as={InputGroup.Prepend}
                  variant="info"
                  title={genre ? genre: "Choose a genre ..."}
                  id="input-group-dropdown-1"
                >
                    {props.genres.map(val =>
                           <Dropdown.Item key={val} eventKey={val}>{val}</Dropdown.Item>)}
                </DropdownButton>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text className={error.rating ? 'error': ''} id="basic-addon1">Rating</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
              // placeholder="Rating"
                    type="number"
                    min="1.00"
                    step="0.1"
                    max="10.00"
                    aria-label="Rating"
                    value={rating}
                    aria-describedby="basic-addon1"
                    onChange={e => alertRating(e)}
                />
            </InputGroup>
            <Button onClick={addItem} >Submit</Button>
        </div>
    )
}

export default AddItem;
