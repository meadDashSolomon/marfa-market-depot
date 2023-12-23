# Marfa Market Depot - Backend for Fashion E-commerce Site

This project represents the backend of an e-commerce website, "Marfa Market Depot", designed to support and enhance the user experience provided by the frontend "Marfa Marketplace." This backend efficiently handles data requests and management for the questions and answers component of the Marfa Marketplace frontend.

![Node.js](https://img.shields.io/badge/Node.js-%2343853D.svg?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge) ![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![NGINX](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![New Relic](https://img.shields.io/badge/New%20Relic-%23008C99.svg?style=for-the-badge&logo=newrelic&logoColor=white)

## Table of Contents:

[Description](#Description)

[Performance-Enhancements](#Performance-Enhancements)

[Instalation](#Instalation)

[Git-Workflow](#Git-Workflow)

### Description:

As part of a collaborative project involving four software engineering students, I focused on developing the backend to support the Questions & Answers component of the frontend retail web portal.

- **Overview**: Manages requests related to product details, styles, and cart operations.
- **Ratings & Reviews**: Handles data for customer reviews, including submission and retrieval.
- **Questions & Answers**: Facilitates the Q&A section, allowing customers to ask and answer product-related questions.
- **Related Items & Comparison**: Supports retrieving data for related products and customer-built outfits.

### Performance-Enhancements

**Optimization Techniques**:

- Improved read times for questions and answers using MongoDB's aggregation pipeline, indexing, limits, and field projections.

**New Relic Monitoring**:

- Utilized New Relic for real-time performance monitoring, achieving significant improvements in response times and throughput.
- GET Questions: Response time reduced by 100%.
- GET Answers: Response time reduced by over 200%.
- Mark Question/Answer Helpful and Report Question/Answer times reduced by 75%.

**Loader.io Testing and Load Balancing with NGINX**:

- Increased RPS from 1000 to 2700 using load balancing and caching with Nginx while maintaining latency < 50ms and 0% error rate

### Further Improvements:

- try different implementations of caching

### Installation

1. Navigate to the root directory.
2. Install dependencies: `npm install`.
3. Start the server: `npm run devStart`.

### Git Workflow

1.  Create new branch
    `git checkout -b <name of branch>`
2.  ∆ code to complete ticket
3.  `git status`
4.  `git add < . . . >`
5.  `git commit`
6.  `git push origin <branch I'm pushing to remote>`
7.  `git checkout main`
8.  `git pull origin main`
9.  `git checkout <branch name>`
10. `git merge main`
11. `git push origin <branch name>`
12. Pull request
