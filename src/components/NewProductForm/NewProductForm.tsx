import React, { useMemo } from "react";
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { add } from "../../features/products/productsSlice";
import classNames from "classnames";
import './NewProductForm.scss';

export const NewProductForm = React.memo(() => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products);

  const maxId = useMemo(() => {    
    if (!products.length) {
      return 1;
    }

    return Math.max(...products.map(product => product.id));
  }, [products])

  const fileReader = new FileReader();
  const [image, setImage] = useState<string | null>(null);
  const [imgURL, setImgURL] = useState<string | ArrayBuffer | null>('');
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      setImage(JSON.stringify(file));
      fileReader.readAsDataURL(file);

      fileReader.onloadend = () => {
      setImgURL(fileReader.result);
      }
    }
  }

  const [{ name, price, description }, setValues] = useState({
    name: '',
    price: 0,
    description: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    price: false,
    description: false,
  });

  const clearForm = () => {
    setValues({
      name: '',
      price: 0,
      description: '',
    })
  } 

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;
    
    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: false }));
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setErrors({
      name: !name,
      price: !price,
      description: !description,
    });

    if (!name || !price || !description) {
      return;
    }

    dispatch(add({
      name,
      price,
      description,
      image: image,
      imgURL,
      id: maxId + 1,
    }))

    clearForm();
    setImage(null);
    setImgURL('');
  }

  return (
    <form className="form" onSubmit={handleSubmit} onReset={clearForm} >
      <div>
        <label className="label" htmlFor="product-name">Product name</label>

        <div>
          <input 
          type="text"
          name="name"
          id="product-name"
          placeholder="product name"
          maxLength={30}
          value={name}
          className={classNames('input', { 'is-danger': errors.name })}
          onChange={handleChange}
          />
        </div>

        {errors.name && (
          <p className="help is-danger">
            Name is required
          </p>
        )}
      </div>

      <div>
        <label className="label" htmlFor="product-price">Product price</label>

        <div>
          <input 
          type="text"
          name="price"
          id="product-price"
          pattern="\d+"
          min={0}
          maxLength={14}
          placeholder="product price"
          className={classNames('input', { 'is-danger': errors.price })}

          value={price}
          onChange={handleChange}
          />
        </div>

        {errors.price && (
          <p className="help is-danger">
            Price is required
          </p>
        )}
      </div>

      <div className="form__input">
        <label className="label" htmlFor="product-description">
          Product description
        </label>

        <div className="control">
          <textarea
            id="product-description"
            name="description"
            placeholder="Type description here"
            rows={2}
            maxLength={40}
            className={classNames('textarea', { 'is-danger': errors.description })}
            value={description}
            onChange={handleChange}
          />
        </div>

        {errors.description && (
          <p className="help is-danger">
            Enter some description
          </p>
        )}
      </div>

      <div className="file is-link form__input">
        <label className="file-label">
          <input 
            className="file-input" 
            type="file" 
            name="image" 
            accept="image/*,.png,.jpg"
            onChange={handleFileChange}
          />
          <span className="file-cta">
            <span className="form__icon"></span>
            <span className="file-label">
              Choose a file…
            </span>
          </span>
        </label>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className="button is-link"
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  )
})
