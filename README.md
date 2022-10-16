# IthacaAPTS.fyi - bigredhacks2022

## Inspiration
After living on-campus for the first two years of Cornell, it can be a daunting task for students to look for off-campus housing. In order to facilitate this process, we created a website that accumulates information about all of the off-campus housing in Cornell!

## What it does
Without having to send out a bunch of emails and visit leasing offices, IthacaAPTS.fyi  allows Cornell students to view off-campus housing related information. Current and previous tenants can upload pricing information and reviews from their off-campus living experience, and IthacaAPTS.fyi gathers and organizes the data for students to refer to when looking for housing.

## How we built it
### Frontend
We used React to build a user-friendly interface that sorts out recent lease contracts in collegetown Ithaca. We received the resources from the backend side and frontend visualizes the trend in the data.

### Backend
We used Django Rest Framework to set up the basic backend architecture of our project. We created a relational database consisting of user, apartment, and lease data models. We serialized the models and defined the necessary API endpoints.

