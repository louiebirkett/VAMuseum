// API stuff
let results;



async function searchVA() {
    hideResults();

    const userInput = document.getElementById('userInput').value;
    console.log('user input:', userInput);

    try {
        const response = await fetch(`https://api.vam.ac.uk/v2/objects/search?q=${userInput}&data_profile=full`);
        const data = await response.json();
        const noImage = 'images/noimage.jpg';

        console.log(data);

        for (var i = 0; i < data.records.length; i++) {
            const obj = {
                title: data.records[i]._primaryTitle || 'no title provided',
                thumbnail: data.records[i]._images._primary_thumbnail,
                imgId: data.records[i]._primaryImageId,
                description: data.records[i].physicalDescription || 'no description provided',
                
            };

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

                const imageTitle = document.createElement('th');
                const objectTitle = document.createElement('th');
                const detailTitle = document.createElement('th');
                const detailCell = document.createElement('td');

                imageTitle.textContent = 'Image';
                objectTitle.textContent = 'Title';
                detailTitle.textContent = 'Description';
                detailCell.classList.add('detail');
                detailCell.textContent = obj.description;

                const moreButton = document.createElement('button');
                moreButton.classList.add('moreButton');
                moreButton.setAttribute('onclick', `createCard(${JSON.stringify(obj)})`);
                moreButton.textContent = 'More';

                detailCell.appendChild(moreButton);

                row.appendChild(imageCell);
                row.appendChild(titleCell);
                row.appendChild(detailCell);
                table.appendChild(objectTitle);
                table.appendChild(imageTitle);
                table.appendChild(detailTitle);
                table.appendChild(row);

                document.querySelector('.container').appendChild(table);
            }
        }
    } catch (error) {
        console.error("Error with Promise - Your code isn't working", error);
    }
}

function createCard(obj) {
    var imageUrl = 'https://framemark.vam.ac.uk/collections/' + obj.imgId + '/full/400,400/0/default.jpg';
    if (obj.imgId == null) { imageUrl = 'images/noImageBig.png'}

    const card = document.getElementById('objCard');
    card.style.display = 'flex';

    card.innerHTML = '';

    const cardContent = document.createElement('div');
    cardContent.classList.add('cardBG');

    const cardImg = document.createElement('img');
    cardImg.classList.add('cardImg');
    cardImg.src = imageUrl;
    cardContent.appendChild(cardImg);

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('cardTitle')
    cardTitle.textContent = obj.title;
    cardContent.appendChild(cardTitle);

    const cardDescription = document.createElement('p');
    cardDescription.classList.add('cardDescription');
    cardDescription.textContent = obj.description;
    cardContent.appendChild(cardDescription);

    card.appendChild(cardContent);

    
    card.addEventListener('click', () => { // Add event listener to close the card when clicked
        card.style.display = 'none';
    });
}


function hideResults(){
    try{ // hide the results when button is pressed
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
