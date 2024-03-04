// API stuff

var results;

async function searchVA(){
    hideResults();

    const userInput = document.getElementById('userInput').value; //get user input
    console.log(userInput);

    // const request = 'china'; // example search
    const response = await fetch(`https://api.vam.ac.uk/v2/objects/search?q=${userInput}`); // fetch fro  API
    const data = await response.json();

    for (var i = 0; i < data.records.length; i++){ // loops through results
        const title = data.records[i]._primaryTitle;
        const thumbnail = data.records[i]._images._primary_thumbnail;

           const markup = `
           <table class="results">
           <tr>
           <td class="image"><img class="thumbnail" src="${thumbnail}" alt=""></td>
               <td class="title">${title}</td>
           </tr>
       </table>`;

        document.querySelector('.container').insertAdjacentHTML('beforeend', markup);
    } 
  
}


function hideResults(){
    try{
        const results = document.querySelectorAll('.results');
        for (i = 0; i < results.length; i++){
            results[i].style.display = 'none';
        }
    }
    catch{
        console.log('no results found');
    }
    
}




