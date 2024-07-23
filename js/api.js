let itemList = document.getElementById("name");
let img = document.getElementById("pic");

const dogList = () => {
    fetch('https://dog.ceo/api/breeds/list/all').then((res) =>{

    return res.json();
    
}).then(list => {

            let listMsg = list.message;

            for (const key in listMsg) {
            
                if (listMsg[key].length === 0) {
                
                    itemList.innerHTML += `<li class="item-list" onclick="return imageList('${key}')">
                                    <a href="#" class="act">
                                        <span>${key}</span>
                                    </a>
                            </li>`;
                } else {
                    let subList = `<ul class="dropdown-menu">`;
                    listMsg[key].forEach(sub => {
                        subList += `<li>
                                    <a href="javascript:void(0)">
                                        <span>${sub}</span>
                                    </a>
                                </li>`
                    });
                    subList += `</ul>`;
                    itemList.innerHTML += `<li class="item-list" onclick="return imageList('${key}')"><a href="javascript:void(0)" class="dropdown pos-relative act">${key}</a> ${subList}</li>`
                }
            }

        })
        .catch((err) => {
            console.log("404 ERROR", err);
        });
};

dogList();

const imageList = (breed) => {
    fetch(`https://dog.ceo/api/breed/${breed}/images`).then((res) =>{

        return res.json();

    }).then((images) => {
            const imgList = images.message;
            img.innerHTML = "";

            imgList.forEach((imageUrl) => {
                img.innerHTML += `<div class="w-3"
                            style="margin: 5px; max-width: 100%; max-height:100%;object-fit:cover;">
                        <img src="${imageUrl}" alt="" width="100%" height="100%">
                        </div>`;
            });
        })
        .catch((err) => {
            console.log("Error", err);
        });
};