import './App.scss';
import 'bulma/bulma.sass';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Product } from './types/Product';
import { remove } from './features/products/productsSlice';
import { pinned } from './features/pinnedProduct/pinnedProductSlice';
import { NewProductForm } from './components/NewProductForm';
import { SearchForm } from './components/SearchForm';
import classNames from 'classnames';
import { useMemo } from 'react';

const App:React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products);
  const pinnedProductId = useAppSelector(state => state.pinnedProduct); 
  const searchQuery = useAppSelector(state => state.searchQuery);

  const filteredProducts = useMemo(() => products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
    || product.description.toLowerCase().includes(searchQuery.toLowerCase())),
  [products, searchQuery]);

  const handleRemoveClick = (id: number) => {
    dispatch(remove(id));

    if (pinnedProductId === id) {
      dispatch(pinned(0));
    }
  }

  return (
    <div className="App">
      <div className="container">
        <header>
          <SearchForm />
          
          {!filteredProducts.length && !!products.length && (
            <p className="help is-danger">
              Such kind of products is not on the list
            </p>
          )}
        </header>

        <main>
          {
            <div className="App-products products">
              {filteredProducts.map(({ 
                name, 
                price, 
                description, 
                imgURL, 
                id, 
              }: Product) => (
                <div 
                  className="App-productCard productCard" 
                  key={id} 
                  style={{order: id === pinnedProductId ? -1 : 0}}
                >
                  <div className="productCard__icons">
                    <div
                      className={classNames(
                        'productCard__icon productCard__icon--pin',
                        {'productCard__icon--pinned': id === pinnedProductId}
                      )}
                      
                      onClick={() => dispatch(pinned(id))}
                    ></div>

                    <div 
                      className='productCard__icon productCard__icon--cross'
                      onClick={() => handleRemoveClick(id)}
                    ></div>
                  </div>
                        
                  <div className='productCard__image-container'>
                    <img 
                      className='productCard__image' 
                      src={typeof imgURL === 'string' ? imgURL : ''} 
                      alt="product image" 
                    />
                  </div>
                  <h3 className='productCard__title'>{name}</h3>

                  <div className="productCard__price">{`$${price}`}</div>

                  <div className="productCard__description">{description}</div>
                </div>
              ))}
              {<NewProductForm />}
            </div>
          }
        </main>
      </div>
    </div>
  );
}

export default App;
