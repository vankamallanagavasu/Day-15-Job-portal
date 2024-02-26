document.addEventListener('DOMContentLoaded', function () {
    // Get reference to the form and job listings
    const searchForm = document.getElementById('searchForm');
    const jobListings = document.getElementById('jobListings');

    // Add event listener to the form for submission
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get user input values
        const keywords = document.getElementById('keywords').value.toLowerCase();
        const location = document.getElementById('location').value.toLowerCase();
        const company = document.getElementById('company').value.toLowerCase();

        // Filter job listings based on user input
        const filteredJobs = Array.from(jobListings.children).filter(function (job) {
            const jobTitle = job.querySelector('h3').textContent.toLowerCase();
            const jobCompany = job.querySelector('p:nth-child(2)').textContent.toLowerCase();
            const jobLocation = job.querySelector('p:nth-child(3)').textContent.toLowerCase();

            // Check if job meets the criteria
            const matchesKeywords = keywords === '' || jobTitle.includes(keywords);
            const matchesLocation = location === '' || jobLocation.includes(location);
            const matchesCompany = company === '' || jobCompany.includes(company);

            // Return true if all criteria are met
            return matchesKeywords && matchesLocation && matchesCompany;
        });

        // Display filtered job listings
        updateJobListings(filteredJobs);
    });

    // Function to update job listings displayed on the page
    function updateJobListings(jobs) {
        // Remove existing job listings from the DOM
        while (jobListings.firstChild) {
            jobListings.removeChild(jobListings.firstChild);
        }

        // Add filtered job listings back to the DOM
        jobs.forEach(function (job) {
            jobListings.appendChild(job);
        });
    }
});
