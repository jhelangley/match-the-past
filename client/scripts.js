    
    
    // GAME STATE VARIABLES
    
    let sortedArray = [];
    let shuffledArray = [];
    let currentRound = 1
    
    // currently unused
    let roundNumber = 1;
    
    // GAME CONTROLS

    // save progress button
    const saveButton = document.querySelector('#save-button')
    saveButton.addEventListener('click', (currentRound) => saveProgress(currentRound))

    // ENTER DB QUERY HERE IN THIS FUNCTION AND THEN WE CAN REUSE IT ON ANY SAVE PROGRESS BUTTONS AROUND THE GAME
    const saveProgress = async (currentRound) => {

        console.log(`saving current level ${roundNumber} to user's account`)
    }
    
    // instructions
    const openInstructions = document.querySelector('#open-instructions');
    const instructionsDialog = document.querySelector('#instructions-dialog');
    const closeInstructions = document.querySelector('#close-instructions');
    
    openInstructions.addEventListener("click", () => instructionsDialog.showModal())
    closeInstructions.addEventListener("click", () => instructionsDialog.close())
    
    
    // success dialog
    const successDialog = document.querySelector("#success-dialog");
    const successNextLevel = document.querySelector("#success-next-level");
    const successReplayLevel = document.querySelector("#success-replay-level");
    const successSave = document.querySelector("#success-save");
    
    successNextLevel.addEventListener("click", () => {
        successDialog.close();
        // TO DO start next level
    });
    
    successReplayLevel.addEventListener("click", () => {
        successDialog.close();
        // TO DO replay current level with new cards
    });
    
    successSave.addEventListener("click", () => {
        successDialog.close();
        // TO DO save progress

        console.log(`saving current level ${roundNumber} to user's account`)
    });
    
    // failure dialog
    const failureDialog = document.querySelector("#failure-dialog");
    const failureTryAgain = document.querySelector("#failure-try-again");
    const failureReplayLevel = document.querySelector("#failure-replay-level");
    const failureSave = document.querySelector("#failure-save");
    
    failureTryAgain.addEventListener("click", () => failureDialog.close());

    failureReplayLevel.addEventListener("click", () => {
        failureDialog.close();
        // TO DO replay current level with new cards
    });
    
    failureSave.addEventListener("click", () => {
        failureDialog.close();
        // TO DO save progress

        console.log(`saving current level ${roundNumber} to user's account`)
    });
    
    // DATA FETCHING
    
    
    // this function receives the round number and requests the correct number of event cards from the database. 
    // it receives a date-ordered array from the database, which it then shuffles using our shuffle function (in the UTILITIES section)
    // it assigns each one to our game state variables declared above... we need both so we can compare the user's order to the correct order. 
    
    const getEvents = async (number) => {
        
        const response = await fetch(`http://localhost:3001/events/random/${number + 1}`)
        
        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.status}`);
        }
        
        const sortedArray = await response.json()
        
        return { sortedArray: sortedArray, shuffledArray: shuffle(sortedArray) }
    };
    
    
    
    // UTILTIES
    
    // this function receives a date-ordered array (the correct answer) and randomly shuffles the event cards.
    // it uses fisher-yates shuffle, which may occasionally result in the correct order - we can fix that down the line.
    
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
    
    
    // CARD RENDERING
    
    // this function returns a 'card' that contains all the required HTML to render it on the page.
    // it uses the HTML <template> tag, which lets us define the basic structure in index.html for use in this function, 
    // and then set the appropriate textContent for each element.
    
    // IMPORTANT: we shouldn't use .innerHTML with template literals as that can introduce scripting vulnerabilities.
    // that's why we're using <template> instead, as it reduces the lines of code needed to add all the necessary DOM nodes.
    
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
    
    
    // this function receives an array of events, goes through them with forEach() and passes each one to our EventCard function above. 
    // it should run any time the cards change in some way - e.g. the start of a round, moving cards with their arrow buttons.// each time it's called, it clears any existing HTML in the game window before re-rendering all cards. 
    // each time it's called, it clears any existing HTML in the game window before re-rendering all cards. 
    // each loop of the forEach appends the newly created event card to the game window's HTML, and that's how it's displayed on the screen.
    
    
    const renderEvents = (events) => {
        const gameWindow = document.querySelector('#game-window')
        
        // rendering correct answers at the bottom for testing purposes only -- DELETE THIS FOR PROD VERSION
        const correctAnswer = document.querySelector('#correct-answer')
        
        gameWindow.innerHTML = ""
        events.forEach((event, currentIndex) => {
            gameWindow.append(EventCard(event, currentIndex))
        })
        
        
        // rendering correct answers at the bottom for testing purposes only -- DELETE THIS FOR PROD VERSION
        correctAnswer.innerHTML = "";
        sortedArray.forEach(event => {
            correctAnswer.innerHTML += `<li>${event.title}</li>`
        })
    }
    
    
    
    
    
    // GAME INTERACTIONS
    
    // this function is passed to the direction buttons in each event card. 
    // it receives the card's current index in the shuffledArray to swap it with its previous or next neighbour 
    // (by receiving -1 for up and 1 for down as the direction argument.
    const moveCard = (currentIndex, direction) => {
        
        [shuffledArray[currentIndex + direction], shuffledArray[currentIndex]] = [shuffledArray[currentIndex], shuffledArray[currentIndex + direction]];
        renderEvents(shuffledArray)
    }
    
    // this is called when the user clicks the check answers button.
    // it uses a for loop to compare each item in the shuffledArray (user determined) and sortedArray (what we received from the API).
    // it prints the result on the screen, and also shows the dates on each card using CSS (visibility property).
    // console logs are for testing purposes only.
    
    const checkAnswers = () => {
        console.log(sortedArray)
        console.log(shuffledArray)
        
        for (let i = 0; i < sortedArray.length; i++) {
            if (sortedArray[i] !== shuffledArray[i]) {
                failureDialog.showModal();
                return false
            }
        }
        
        document.querySelector('#success').innerText = "You got it right!"
        document.querySelectorAll('.date.hidden')
        .forEach(date => date.classList.remove('hidden'))
        successDialog.showModal();
        return true
        
        
    }
    // adding the listener for the check button
    document.querySelector('#check-btn').addEventListener('click', () => checkAnswers());
    
    
    // TO DO: this function will reset the game to round 1
    const reset = () => {
        console.log("game reset")
    }
    // adding the listener for the reset button
    document.querySelector('#reset-btn').addEventListener('click', () => reset());
    
    
    
    
    // SETUP TESTING
    
    // currently just using this to render cards on the page for testing. we'll need to replace this with the full game flow.
    // number of event cards is currently hard coded here -- getEvents should eventually receive roundNumber to decide how many cards to return.
    
    const testRender = async () => {
        try {
            const events = await getEvents(3);
            
            sortedArray = events.sortedArray;
            shuffledArray = events.shuffledArray;
            
            renderEvents(shuffledArray);
        } catch (error) {
            console.error('Error loading events:', error);
        }
    };
    
    testRender();
    
    
    
    
    
    
    