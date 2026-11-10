    
/* const gameState = {

} */
    
    const shuffle = (array) => {
        const shuffled = [...array]
        let currentIndex = shuffled.length;
        
        while (currentIndex != 0) {
            
            let randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--;
            
            [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]]
        }
        
        return shuffled;
    }
    
    
    
    const getEvents = async (number) => {

        const response = await fetch('http://localhost:3001/events/random')

        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.status}`);
        }

        const sortedArray = await response.json()
        
        return { sortedArray: sortedArray, shuffledArray: shuffle(sortedArray) }
    };
    
    let sortedArray = [];
    let shuffledArray = [];
    
    const EventCard = (event, currentIndex) => {
        const template = document.querySelector("#event-card-template");
        
        // TO DO - find out how this works ...
        const card = template.content.firstElementChild.cloneNode(true);
        
        card.querySelector(".event-name").textContent = event.title;
        card.querySelector(".event-description").textContent = event.description;
        card.querySelector(".date.hidden").textContent = event.date;
        
        
        if (currentIndex == 0) {
            card.querySelector(".move-btn.up").disabled = true;
        } else {
            card.querySelector(".move-btn.up").addEventListener('click', () => moveCard(currentIndex, -1))
        }
        
        if (currentIndex == shuffledArray.length - 1) {
            card.querySelector(".move-btn.down").disabled = true;
        } else {
            card.querySelector(".move-btn.down").addEventListener('click', () => moveCard(currentIndex, 1))
        }
        
        return card;
    }
    
    const renderEvents = (events) => {
        const gameWindow = document.querySelector('#game-window')

        // rendering correct answers for testing only
        const correctAnswer = document.querySelector('#correct-answer')

        gameWindow.innerHTML = ""
        events.forEach((event, currentIndex) => {
            gameWindow.append(EventCard(event, currentIndex))
        })
        correctAnswer.innerHTML = "";
        sortedArray.forEach(event => {
            correctAnswer.innerHTML += `<li>${event.title}</li>`
        })
    }
    
    
    
    
    const moveCard = (currentIndex, direction) => {
        
        [shuffledArray[currentIndex + direction], shuffledArray[currentIndex]] = [shuffledArray[currentIndex], shuffledArray[currentIndex + direction]];
        renderEvents(shuffledArray)
    }
    
    const compareArrays = (sorted, shuffled) => {
        
    }
    
    const checkAnswers = () => {
        console.log(sortedArray)
        console.log(shuffledArray)
        
        for (let i = 0; i < sortedArray.length; i++) {
            if (sortedArray[i] !== shuffledArray[i]) {
                document.querySelector('#success').innerText = "Keep trying!"
                return false
            }
        }
        
            document.querySelector('#success').innerText = "You got it right!"
            document.querySelectorAll('.date.hidden')
                .forEach(date => date.classList.remove('hidden'))
            return true
       
        
    }
    
    document.querySelector('#check-btn').addEventListener('click', () => checkAnswers());

    const reset = () => {
        console.log("game reset")
    }

    document.querySelector('#reset-btn').addEventListener('click', () => reset());


    const testRender = async () => {
    try {
        const events = await getEvents();

        sortedArray = events.sortedArray;
        shuffledArray = events.shuffledArray;

        renderEvents(shuffledArray);
    } catch (error) {
        console.error('Error loading events:', error);
    }
};

testRender();