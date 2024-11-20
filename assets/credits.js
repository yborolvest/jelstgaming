let credits = 0;

function Credits(){
    UpdateCredits().then(r => {
        return credits;
    });
}

async function UpdateCredits(){
    try {
        const response = await fetch('/api/credits/' + uuid);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        credits = data.credits;
    } catch (error) {
        console.error('Failed to update credits:', error);
    }
}

async function SetCredits(amount){
    try {
        const response = await fetch('/api/credits/' + uuid, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount})
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        credits += amount;
    } catch (error) {
        console.error('Failed to set credits:', error);
    }
}