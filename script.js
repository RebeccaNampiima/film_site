
let apiKey = "40f81553";
let input = document.querySelector("#input_space");
let url ="http://www.omdbapi.com/?s="
let allMovies;
function findMovies(){
    let trimmedValue = input.value.trim();
    fetch(`http://www.omdbapi.com/?s=${trimmedValue}*&apikey=${apiKey}&`)
        .then( (res) => { return res.json()} )
        .then( (data) => {

            if(data.Search == undefined)
            {
                document.getElementById("error").style.display = "block"; // the error div will be displayed and the list of movies will not be displayed
                document.querySelector(".listOfMovies").style.display = "none"; 
            }

            else{
                allMovies = data.Search;
                displaySomeMovies();
                document.getElementById("error").style.display = "none";// the error div wont be displayed
            }

        } )
        .catch( (error) => { document.getElementById("error").innerHTML = error } );

}
 


input.addEventListener("input", function() {
    
    if( input.value.length >= 3 )
        findMovies();
    else
        document.querySelector(".listOfMovies").style.display = "none"; 

    
});


function displaySomeMovies(){

    document.querySelector(".listOfMovies").style.display = "block"; 
    let html = "";
    let x;
    for( let i=0; i<allMovies.length; i++ ){
        x = allMovies[i].imdbID;
        html += `<li onclick=displayMovie("`+x+`") > ` + allMovies[i].Title + ` </li>`;
    }

    document.querySelector("#listItems").innerHTML = html;
}

let selectedMovie;
function displayMovie(id){
    input.value = "";
    document.querySelector(".listOfMovies").style.display = "none"; 
        fetch(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}&`)
    .then( (resp) => { return resp.json(); } )
    .then( (data) => {

        selectedMovie = data;
        document.getElementById("displayMovie").style.display = "block";   
        let display = `
            <h1>`+selectedMovie.Title+`</h1>
            <img src=`+selectedMovie.Poster+` alt="Poster" class="img-fluid" />             
            <p>Genre: `+selectedMovie.Genre+` </p>
            <p>Plot: `+selectedMovie.Plot+` </p>
            <p>Actors: `+selectedMovie.Actors+` </p>
            <p>Language: `+selectedMovie.Language+` </p>
            <p>Runtime: `+selectedMovie.Runtime+` </p>
            <p> Year of Release: `+selectedMovie.Released+` </p>           
            <button  type="button" class="btn btn-warning"><a href="https://www.imdb.com/title/${id}/" target="blank" >More Info </a></button>
        `;

        document.getElementById("displayMovie").innerHTML = display;
    } )
    .catch( (error) => { console.log(error); 
        document.getElementById("error").innerHTML = error
    } );

}

