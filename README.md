Goldmine
========

Goldmine is a command-line utility that uses the concept of code coverage to determine what parts of libraries like jQuery are necessary for your project, and what parts are adding unneccesary bulk.

Goldmine then removes the unneccessary bits, minimizes the library, and creates a minimized script and keeps the original as backup.

Usage:

goldmine tests code library

`Running tests against code and determining usage of library...`

Created by Razzi Abuissa, Alex Brashear, and Brian Sladek for Facebook's Fall 2013 hackathon.