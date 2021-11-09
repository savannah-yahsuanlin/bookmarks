const {syncAndSeed, models:{Bookmark}} = require('../db')
const app = require('express').Router();
app.use(require('method-override')('_method'))
module.exports = app

app.get('/', async(req, res, next) => {
	try{
		const bookmark = await Bookmark.findAll()
		const category = bookmark.reduce((acc, next) => {
			acc[next.category] = acc[next.category] || 0
			acc[next.category]++;
			return acc;
		}, {})
		res.send(`
			<html>
				<body>
					<h1>Bookmarks</h1>
					${Object.entries(category).map(category => `
					<li>
						<a href="/bookmark/${category[0]}">
							${category[0]}(${category[1]})
						</a>
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

app.get('/:category', async(req, res, next) => {
	try {
		const category = await Bookmark.findAll({where: {category: req.params.category}})
		res.send(`
			<html>
				<body>
					<h1>categories</h1>
					<ul>
						${category.map(category => `
							<li>
								${category.name}
							</li>
						`).join('')}
					</ul>
				</body>
			</html>
		`);
	}
	catch(ex) {
		next(ex)
	}
})

