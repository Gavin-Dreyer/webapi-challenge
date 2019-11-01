const express = require('express');
const projectDb = require('./data/helpers/projectModel');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	// console.log(req.query, req.body, req.params.id);
	projectDb
		.get(req.params.id)
		.then(db => {
			res.status(200).json(db);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: 'Error when retrieving users information.'
			});
		});
});

server.get('/:id', (req, res) => {
	console.log(req.query, req.body, req.params.id);
	projectDb
		.get(req.params.id)
		.then(db => {
			res.status(200).json(db);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: 'Error when retrieving project information.'
			});
		});
});

server.post('/', (req, res) => {
	console.log(req.body);
	const info = req.body;
	projectDb
		.insert(info)
		.then(db => {
			console.log(db);
			res.status(201).json(info);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: 'Error when creating project information.'
			});
		});
});

server.put('/:id', (req, res) => {
	const id = req.params.id;
	const info = req.body;
	projectDb
		.update(id, info)
		.then(db => {
			if (db === null) {
				res.status(200).json(db);
			} else {
				res.status(200).json(info);
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: 'Error when updating project information.'
			});
		});
});

server.delete('/:id', (req, res) => {
	const id = req.params.id;
	projectDb
		.remove(id)
		.then(db => {
			console.log(db);
			res.status(200).json(db);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: 'Error when removing project information.'
			});
		});
});

module.exports = server;
