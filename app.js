// API stuff





async function searchVA(){
    const userInput = document.getElementById('userInput').value; //get user input
    console.log(userInput);

    // const request = 'china'; // example search
    const response = await fetch(`https://api.vam.ac.uk/v2/objects/search?q=${userInput}`); // fetch fro  API
    const data = await response.json();

    for (var i = 0; i < data.records.length; i++){ // loops through results
        const title = data.records[i]._primaryTitle;
        const thumbnail = data.records[i]._images._primary_thumbnail;

        const markup = `<div id="results"><h1>${title}</h2> <img src='${thumbnail}'></div>`;
        document.querySelector('ul').insertAdjacentHTML('beforeend', markup);

    } 
    console.log(data);

    
    // data.records.forEach(element => {
    //     const markup = `<li>${data.records._primaryTitle}</li>`;
    //     document.querySelector('ul').insertAdjacentHTML('beforeend', markup);
        
    // });

}



