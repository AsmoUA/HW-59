import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';

const port = 8000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));
// app.get('/', (req, res) => {
//   res.send('<h1>Welcome to our shop</h1>');
// });

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.get('/product', (req, res) => {
    const title = req.query?.title || 'Product';
    const price = req.query?.price || '';
    res.render('product', { product_title: title, product_price: price });
//   res.send(`<h1>${title}</h1><h2>For just ${price}</h2>`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
