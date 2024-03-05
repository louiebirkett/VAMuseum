// API stuff

var results;

async function searchVA(){
    hideResults();



    const userInput = document.getElementById('userInput').value; //get user input
    console.log(userInput);

    
    // const request = 'china'; // example search
    try{
        const response = await fetch(`https://api.vam.ac.uk/v2/objects/search?q=${userInput}`); // fetch from  API
        const data = await response.json();
        const noImage = 'images/noimage.jpg'

        for (var i = 0; i < data.records.length; i++){ // loops through results

            const obj = {
                title: data.records[i]._primaryTitle || 'no title provided',
                thumbnail: data.records[i]._images._primary_thumbnail, 

            }

            if (obj.thumbnail != null){
                const markup = `
                <table class="results">
                    <tr>
                    <td class="image"><img class="thumbnail" src="${obj.thumbnail}" alt=""></td>
                        <td class="title">${obj.title}</td>
                    </tr>
                </table>`;
 
                 document.querySelector('.container').insertAdjacentHTML('beforeend', markup);
            }
        }       
    }
    
    catch{
        console.log("Error with Promise - You code isnt working")
    }
}




function hideResults(){
    try{
        const results = document.querySelectorAll('.results');
        const nullResults = document.querySelectorAll('.nullResult');
        for (i = 0; i < results.length; i++){
            results[i].style.display = 'none';

        }
    }
    catch{
        console.log('no results found');
    }
    
}




