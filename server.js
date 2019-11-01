const express = require('express');
const projectDb = require('./data/helpers/projectModel');
const actionDb = require('./data/helpers/actionModel');

const server = express();

server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

server.use(express.json());

//PROJECT OPERATIONS

server.get('/projects', (req, res) => {
	// console.log(req.query, req.body, req.params.id);
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

server.get('/projects/:id', (req, res) => {
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

server.post('/projects', (req, res) => {
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

server.put('/projects/:id', (req, res) => {
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

server.delete('/projects/:id', (req, res) => {
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

//ACTION OPERATIONS
server.get('/projects/:id1/actions', (req, res) => {
	projectDb
		.getProjectActions(req.params.id1)
		.then(db => {
			res.status(200).json(db);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: 'Error when retrieving action information.'
			});
		});
});

server.get('/projects/:id1/actions/:id2', (req, res) => {
	projectDb
		.getProjectActions(req.params.id1)
		.then(db => {
			let matcher = db.find(item => item.id === Number(req.params.id2));
			res.status(200).json(matcher);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: 'Error when retrieving action information.'
			});
		});
});

server.post('/projects/:id/actions', (req, res) => {
	const info = { project_id: req.params.id, ...req.body };
	actionDb
		.insert(info)
		.then(db => {
			res.status(201).json(info);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: 'Error when creating action information.'
			});
		});
});

server.put('/projects/:id1/actions/:id2', (req, res) => {
	const id = req.params.id1;
	const info = { project_id: id, ...req.body };
	projectDb
		.getProjectActions(req.params.id1)
		.then(db => {
			let matcher = db.find(item => item.id === Number(req.params.id2));
			let matcherStr = matcher.id.toString();
			actionDb
				.update(matcherStr, info)
				.then(db2 => {
					res.status(200).json(info);
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({
						error: 'Error when updating action information.'
					});
				});
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: 'Error when updating action information.'
			});
		});
});

server.delete('/projects/:id1/actions/:id2', (req, res) => {
	const id = req.params.id1;
	projectDb
		.getProjectActions(id)
		.then(db => {
			let matcher = db.find(item => item.id === Number(req.params.id2));
			let matcherStr = matcher.id.toString();
			actionDb
				.remove(matcherStr)
				.then(db2 => {
					res.status(200).json(db2);
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({
						error: 'Error when removing action information.'
					});
				});
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: 'Error when removing action information.'
			});
		});
});

module.exports = server;
