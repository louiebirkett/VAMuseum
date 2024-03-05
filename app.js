// API stuff

var results;

async function searchVA(){
    hideResults();

    const userInput = document.getElementById('userInput').value; //get user input
    console.log('user input:', userInput); // log user input

    
    // const request = 'china'; // example search
    try{
        
        const response = await fetch(`https://api.vam.ac.uk/v2/objects/search?q=${userInput}&data_profile=full`); // fetch from  API
        const data = await response.json();
        const noImage = 'images/noimage.jpg'

        

        for (var i = 0; i < data.records.length; i++){ // loops through results

            const obj = { // convert results to an object
                title: data.records[i]._primaryTitle || 'no title provided',
                thumbnail: data.records[i]._images._primary_thumbnail, 

            }
            
            if (obj.thumbnail != null) {
                const table = document.createElement('table');
                table.classList.add('results');
            
                const row = document.createElement('tr');
            
                const imageCell = document.createElement('td');
                const thumbnailImage = document.createElement('img');
                thumbnailImage.classList.add('thumbnail');
                thumbnailImage.src = obj.thumbnail;
                thumbnailImage.alt = '';
                imageCell.appendChild(thumbnailImage);
            
                const titleCell = document.createElement('td');
                titleCell.classList.add('title');
                titleCell.textContent = obj.title;
            
                row.appendChild(imageCell);
                row.appendChild(titleCell);
            
                table.appendChild(row);
            
                document.querySelector('.container').appendChild(table);
            } 
            
        }       
    }
    catch{
        console.log("Error with Promise - Your code isnt working")
    }
}




function hideResults(){
    try{ // hide the resukts when button is pressed
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




