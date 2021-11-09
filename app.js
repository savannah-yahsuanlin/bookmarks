const {db, syncAndSeed, models:{Bookmark}} = require('./db')
const express = require('express')

const app = express()


app.use(express.urlencoded({extended: false}))
app.use(require('method-override')('_method'))

app.get('/', (req, res) => res.redirect('./bookmark'))

app.use('/bookmark', require('./routes/bookmark'))

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