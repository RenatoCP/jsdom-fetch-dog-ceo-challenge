const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'


function dogApi(url, fn) {
    fetch(url)
    .then(res => res.json())
    .then(json => fn(json));
}

function addImage(img) {
    let imgDiv = document.getElementById('dog-image-container');
    let newImg = document.createElement('img');
    imgDiv.appendChild(newImg);
    newImg.src = img
    newImg.style.width = '10rem'


}

function newImage(srcArray, fn) {
    srcArray.message.forEach(img => {
        addImage(img)
    })

}

function breedLi(breed) {
    let ul = document.getElementById('dog-breeds');
    let li = document.createElement('li');
    ul.appendChild(li);
    li.innerText = breed;
    li.addEventListener('click', () => {
        li.style.color = 'red'
    })
}

function listBreed(breeds) {
    for(breed in breeds.message) {
        breedLi(breed)
    }
}

function dropList() {
    let menu = document.getElementById('breed-dropdown');
    const listOfBreeds = document.querySelectorAll('#dog-breeds')

    menu.onchange = () => {
        document.querySelectorAll('#dog-breeds')["0"].innerHTML = ""
        let choice = menu.value
        fetch(breedUrl)
        .then(res => res.json())
        .then(data => {
          for(breed in data.message) {
            if (choice === breed[0]) {
              breedLi(breed)
            } else {
              continue
            }
          }
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    dogApi(imgUrl, newImage)
    dogApi(breedUrl, listBreed)
    dropList()
})