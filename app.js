const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//渲染首頁頁面
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
//渲染餐廳詳細資訊
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantId = req.params.restaurant_id
  const restaurantInfo = restaurantList.results.find((restaurants) => {
    return restaurants.id.toString() === restaurantId.toString()
  })
  res.render('show', { restaurantInfo: restaurantInfo })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter((restaurants) => {
    return restaurants.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants })
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`)
})