let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
scanner.addListener('scan', function (content) {
    console.log('Scanned content:', content);  // Debugging
    document.getElementById('voterDetails').innerText = 'Fetching voter details...';
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);  // Debugging
            const voter = data.find(voter => voter.id === content);
            if (voter) {
                if (voter.allowed) {
                    document.getElementById('voterDetails').innerText = `Voter: ${voter.name}\nStatus: Allowed to Vote`;
                    setTimeout(showModal, 2000);  // Delay before showing modal
                } else {
                    document.getElementById('voterDetails').innerText = `Voter: ${voter.name}\nStatus: Not Allowed to Vote`;
                }
            } else {
                document.getElementById('voterDetails').innerText = 'Voter not found';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('voterDetails').innerText = 'Error fetching voter data';
        });
});

Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else {
        console.error('No cameras found.');
    }
}).catch(function (e) {
    console.error(e);
});

// Modal handling
const modal = document.getElementById('modal');
const span = document.getElementsByClassName('close')[0];

function showModal() {
    modal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
