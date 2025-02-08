#!/bin/bash

# Start Django server in the background
cd cashvoid-django
python3 manage.py runserver &

# Start Angular server in the background
cd ../cashvoid-angular
ng serve &

# Wait for both processes
wait 