### Live Link: 

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/6854525g4e7s4aer54gs4sgk (Single GET)
- api/v1/users/6854525g4e7s4aer54g585ot (PATCH)
- api/v1/users/64ksjhfjsnj5545fs5fajdfh (DELETE)

#### Cow

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/6854525g4e7s4aer54gs4sgk (Single GET)
- api/v1/cows/64ksjhfjsnj5545fs5fajdfh (PATCH)
- api/v1/cows/6854525g4e7s4aer54g585ot (DELETE)

### Pagination and Filtering routes of Cows

- api/v1/cows?page=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Rajshahi
- api/v1/cows?searchTerm=Raj

#### Orders

- api/v1/orders (POST)
- api/v1/orders (GET)
