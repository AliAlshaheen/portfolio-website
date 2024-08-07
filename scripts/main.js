// Add event listener to the form to handle form submission
document.querySelector('form').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Show an alert message
    alert('Thank you for reaching out!');
});
