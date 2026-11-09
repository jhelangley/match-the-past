const events = [
    {
        "date": "1452-10-02",
        "title": "Richard III born",
        "description": "The future king was born at Fotheringhay Castle. His remains were rediscovered beneath a Leicester car park in 2012."
    },
    {
        "date": "1457-01-28",
        "title": "Henry VII born",
        "description": "Born at Pembroke Castle, Henry Tudor would establish the Tudor dynasty after defeating Richard III at Bosworth."
    },
    {
        "date": "1473-02-19",
        "title": "Nicolaus Copernicus born",
        "description": "The Polish astronomer later proposed a Sun-centred model of the planetary system, challenging the prevailing geocentric account."
    },
    {
        "date": "1478-02-07",
        "title": "Thomas More born (traditional date)",
        "description": "The humanist author of Utopia later became Henry VIII’s lord chancellor and was executed for refusing the royal supremacy."
    },
    {
        "date": "1485-08-22",
        "title": "Battle of Bosworth Field; Richard III dies; Henry VII becomes king",
        "description": "Henry Tudor defeated Richard III in a decisive battle of the Wars of the Roses. Richard was the last English king to die in battle."
    },
    {
        "date": "1485-12-15",
        "title": "Catherine of Aragon born",
        "description": "Catherine of Aragon was born during a period of major political, religious and cultural change in Europe. This date places the figure within the wider Tudor-era chronology."
    },
    {
        "date": "1486-09-19",
        "title": "Arthur, Prince of Wales, born",
        "description": "Arthur, Prince of Wales, was born during a period of major political, religious and cultural change in Europe. This date places the figure within the wider Tudor-era chronology."
    },
    {
        "date": "1489-07-02",
        "title": "Thomas Cranmer born",
        "description": "Thomas Cranmer was born during a period of major political, religious and cultural change in Europe. This date places the figure within the wider Tudor-era chronology."
    },
    {
        "date": "1489-11-29",
        "title": "Margaret Tudor born",
        "description": "Margaret Tudor was born during a period of major political, religious and cultural change in Europe. This date places the figure within the wider Tudor-era chronology."
    },
    {
        "date": "1491-06-28",
        "title": "Henry VIII born",
        "description": "Henry VIII was born during a period of major political, religious and cultural change in Europe. This date places the figure within the wider Tudor-era chronology."
    },
    {
        "date": "1500-02-24",
        "title": "Charles V of Spain born",
        "description": "Charles V of Spain was born during a period of major political, religious and cultural change in Europe. This date places the figure within the wider Tudor-era chronology."
    },
    {
        "date": "1501-09-27",
        "title": "Catherine of Aragon arrives in England",
        "description": "This event belongs to the turbulent Tudor and Elizabethan era, when religious reform, diplomacy and dynastic politics were closely intertwined."
    },
    {
        "date": "1501-11-14",
        "title": "Catherine of Aragon married Arthur, Prince of Wales",
        "description": "Dynastic marriages could determine alliances, inheritance and succession across European courts. Such unions were often as politically significant as they were personal."
    },
    {
        "date": "1502-04-02",
        "title": "Arthur, Prince of Wales, died",
        "description": "The death was part of the changing political and cultural landscape of sixteenth-century Europe. Its consequences depended on the individual’s position and connections."
    }];
    
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
    
    
    
    const getEvents = (number) => {
        let sortedArray = []
        for (let i = 0; i < number; i++) {
            randomIndex = Math.floor(Math.random() * events.length)
            
            // TO DO - implement a check that the event is unique in the table
            
            sortedArray.push(events[randomIndex])
        }
        
        return { sortedArray: sortedArray, shuffledArray: shuffle(sortedArray) }
    };
    
    const { sortedArray, shuffledArray } = getEvents(4)
    console.log(sortedArray)
    console.log(shuffledArray)
    
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
            correctAnswer.innerHTML += `<li>${event.title}</li`
        })
    }
    
    
    
    renderEvents(shuffledArray)
    
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