## Details
I indexed the dataset using APIs of ElasticSearch on recipe ingredients and made a web app with NodeJS as backend.
Each user ingredient input returned a set of recipes containing that ingredient from the dataset. 
Postman, a HTTP client was used to fire GET, POST, DELETE requests.
After the implementation of ElasticSearch and NodeJS interface to run the search, I implemented the same on Docker. Objective was to make the code portable. As I began the dockerisation of ElasticSearch and NodeJS, the challenge of having two servers deployed on same docker was a key learning experience. I used the official NodeJS and Elastic docker containers(https://hub.docker.com/_/elasticsearch , https://hub.docker.com/_/node). 
Also refer to Non-Dockerised version of the search [Text-Based-Recipe-Retrieval](https://github.com/Samyak005/Text-Based-Recipe-Retrieval).

## Requirements:
Docker Desktop Application

## Instructions to Run 

Command to be run -> docker-compose -f "docker-compose.yml" up --build

On browser go to -> localhost:3000 

## Files
node_modules -> contains modules of node.js like elasticsearch

Dockerfile -> docker file 

package.json -> contains various packages used
 
package-lock.json -> contains multiple dependencies of npm 

docker-compose.yml -> official docker yml

src/
   data/
	index.js -> populates elastic with data
	recipes.json -> dataset 
   server/
   	public/
		elasticsearch.min.js
	views/
		template.html  -> html page rendered on port 3000
	index.js -> server-side node.js file 
   elastic.js -> creates index, sets mapping
   main.js -> starts server 

## Dataset
Dataset for the project was taken from Kaggle and was in JSON format.\
It is part of the repo.\
(https://www.kaggle.com/hugodarwood/epirecipes?select=full_format_recipes.json)