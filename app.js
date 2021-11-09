const {db, syncAndSeed, models:{Bookmark}} = require('./db')
const express = require('express')
const app = express()
const router = require('express').Router();

app.get('/', (req, res) => res.redirect('./bookmarks'))
app.use(express.urlencoded({extended: false}))

app.get('/bookmarks', async(req, res, next) => {
	try{
		const bookmark = await Bookmark.findAll()
		const category = bookmark.reduce((acc, next) => {
			acc[next.category] = acc[next.category] || 0
			acc[next.category]++;
			return acc;
		}, {})
		res.send(`
			<html>
				<head>
				</head>
				<body>
					${Object.entries(category).map(category => `
					<li>
						${category[0]}(${category[1]})
					</li>
					`).join(' ')}
					</ul>
				</body>
			</html>
		`)
	}
	catch(ex) {
		next(ex)
	}
})
app.get('/bookmark/:category', async(req, res, next) => {
	try {
		const category = 
		res.send(`
			<html>
				<body>
					<h1>Bookmarks</h1>
					<ul>
						<li><a href="/"></a></li>
						<li><a href="/bookmarks">bookmarks</a></li>
					</ul>
					hello world
				</body>
			</html>
		`);
	}
	catch(ex) {
		next(ex)
	}
})

const init = async()=> {
	try  {
		await db.authenticate();
		await syncAndSeed();
  		console.log('Connection has been established successfully.');
		const port = process.env.PORT || 3000
		app.listen(port, ()=> console.log(`listening on port ${port}`)) 
	}
	catch(error){
		console.error('Unable to connect to the database:', error);
	}
}


init()