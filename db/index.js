const { Sequelize, DataTypes } = require('sequelize');
const pg = require('pg')
const db = new Sequelize('postgres://localhost/bookmarks')


const Bookmark = db.define('bookmark', {
	name:{ 
		type: DataTypes.STRING
	},
	URL: {
		type: DataTypes.STRING
	},
	category: {
		type: DataTypes.STRING
	}
})


const syncAndSeed = async() => {
	await db.sync({ force: true });
	await Bookmark.create({name: 'LinkedIn', URL: 'http://www.linkedin.com',  category: 'jobs'});
	await Bookmark.create({name: 'Indeed', URL: 'http://www.indeed.com', category: 'jobs'});
	await Bookmark.create({name: 'Amazon', URL: 'http://www.amazon.com', category: 'shopping'});
	await Bookmark.create({name: 'W3C Shools - Javascript',  URL: 'https://www.w3schools.com/jsref/default.asp', category: 'coding'});
	await Bookmark.create({name: 'Target', URL: 'http://www.shopping.com', category: 'shopping'});
	await Bookmark.create({name: 'The Weeknd', URL: 'https://www.theweeknd.com/', category: 'music'});
	await Bookmark.create({name: 'Stack Overflow', URL: 'https://stackoverflow.com/', category: 'coding'});
}


module.exports = {
	db,
	syncAndSeed,
	models: {
		Bookmark
	}
}