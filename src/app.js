const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const id = uuid();
  const likes = 0; 

  const repository = { id, title, url, techs, likes };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = getElementPositionById(repositories, id);
  
  if(index > -1) {
    repositories[index]['title'] = title;
    repositories[index]['url'] = url;
    repositories[index]['techs'] = techs;

    return response.status(200).json(repositories[index]);
  }
  
  return response.status(400).json();
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = getElementPositionById(repositories, id);

  if(index > -1) {
    repositories.splice(index, 1);

    return response.status(204).json();
  } 
    
  return response.status(400).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = getElementPositionById(repositories, id);

  if(index > -1) {
    repositories[index]['likes']++;

    return response.status(200).json(repositories[index]);
  }
  return response.status(400).json();
});

const getElementPositionById = (collection, id) => {
  let position = null;

  collection.filter((item, index) => {
    if(item.id === id) position = index;
  });

  return position || position === 0 ? position : -1;
};

module.exports = app;
