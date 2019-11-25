document.addEventListener("DOMContentLoaded", () => {

    // URLs
    const API_ENDPOINT = "http://localhost:3000";
    const MONSTERS_API = `${API_ENDPOINT}/monsters`;

    // global variables
    const monsterContainer = document.querySelector("#monster-container");
    const form = document.querySelector(".add-monster-form");

    // fetch monsters promise
    function getMonsters() {
        return fetch(MONSTERS_API)
        .then(response => response.json())
    }

    // get monsters and render them
    getMonsters().then(function(monsters) {
        monsters.forEach(function(monster) {
            renderMonster(monster);
        })
    })

    // render a monster
    function renderMonster(monster) {
        let h2 = document.createElement("h2");
        h2.innerText = monster.name;
        
        let h4 = document.createElement("h4");
        h4.innerText = `Age: ${monster.age}`;
        
        let p = document.createElement("p");
        p.innerText = `Bio: ${monster.description}`;
        
        let div = document.createElement("div");
        div.append(h2, h4, p);

        monsterContainer.append(div);
    }

    // handle post action for new monster
    function createMonster(formData) {
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": formData.name.value,
                "age": formData.age.value,
                "description": formData.description.value
            })
        }

        return fetch(MONSTERS_API, configObj)
            .then(response => response.json())
            .then(monster => renderMonster(monster))
    }

    // listen for click event on form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        createMonster(event.target);
    })
})
