import React, { useRef, useEffect, useState } from 'react'
import '../../styles/Shop.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ApiClient from '../../api/ApiRoutes';
import defaultImg from '../../images/defaultImg.png'
import { useTranslation } from 'react-i18next';

// import { toast } from "react-toastify";

export default function Shop({ id, businessName }) {

  const [productsList, setProductsList] = useState([]);
  const { t, i18n } = useTranslation();

  const getUserData = JSON.parse(localStorage.getItem('token'));

  const isAdmin = () => {
    if (getUserData) {
      return getUserData.business.includes(id);
    }
    return false;
  }

  useEffect(() => {
    const getResult = async () => {
      //get all products of shop of the business from mongodb
      ApiClient.getAllProducts(id)
        .then((res) => setProductsList(res.data))
        .catch((err) => console.log(err));
    };
    getResult();
  }, [id]);

  const name = useRef("");
  const description = useRef("");
  const price = useRef(0);
  const [image, setImage] = useState([]);
  const [removeProduct, setRemoveProduct] = useState("")

  //Admin Permissions
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = (id) => {
    setRemoveProduct(id);
    setShow2(true);
  }

  const handleOpenWidget = async () => {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dk5mqzgcv',
      uploadPreset: 'xw93prxe'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        setImage({ id: result.info.public_id, url: result.info.url });
      }
    }
    )
    //open widget
    myWidget.open();
  }

  const addProduct = async () => {
    //Checks not empty
    if (name.current.value !== "" && price.current.value !== "") {
      const newProduct = {
        id: 'id' + (new Date()).getTime(),
        name: name.current.value,
        description: description.current.value,
        price: price.current.value,
        image: image
      }

      ApiClient.addNewProduct(id, newProduct)
        .then((res) => console.log('Added new product'))
        .catch((err) => console.log(err));
      setProductsList(oldArray => [...oldArray, newProduct]);
      name.current.value = ""
      description.current.value = ""
      price.current.value = ""
      handleClose();
    }
  }

  const handleRemoveProduct = async () => {
    ApiClient.removeProductFromShop(id, removeProduct)
      .then((res) => {
        const newArray = productsList.filter(obj => obj.id !== removeProduct);
        setProductsList(newArray)

        handleClose2();
      })
      .catch((err) => console.log(err));
  }

  const handleAddToCart = async (product) => {
    //User connected
    if (getUserData) {
      product.businessName = businessName;
      product.quantity = 1;
      ApiClient.increaseQuantity(getUserData._id, product)
        .then((res) => {
          console.log(res);
          alert(t('AddedToCart'));
          // toast.success(`${product.name} added to cart`, {
          //   position: "bottom-left",
          // });
        })
        .catch((err) => console.log(err));

    } else {
      alert('You need to login');
    }
  }

  return (
    <>
      {
        isAdmin() ?
          <>
            <Button variant="btn btn-warning" onClick={handleShow}>
              <b>{t("AdminPermissions")}</b>
            </Button>
          </>
          :
          null
      }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='m-auto'>
          <h5><b>{t('AddProductToShop')}</b></h5>
        </Modal.Header>
        <Modal.Body>
          <div className='body-admin-container'>
            <input
              className={`input-style ${i18n.language === 'he' ? 'text-right' : null}`}
              type='text'
              placeholder={t('ProductName')}
              required
              ref={name}
              maxLength='14'
            />
            <br></br>
            <textarea
              className={`textarea-style ${i18n.language === 'he' ? 'text-right' : null}`}
              type='textarea'
              placeholder={t('Description')}
              required
              ref={description}
              maxLength='45'
            />
            <br></br>
            <input
              className={`input-style ${i18n.language === 'he' ? 'text-right' : null}`}
              type='number'
              placeholder={t('Price')}
              required
              ref={price}
              min='1'
              max='6'
            />

            <div
              id='upload-widget'
              className='cloudinary-button'
              onClick={() => handleOpenWidget()}>
              {t('SelectPhotoToProduct')}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('Close')}
          </Button>
          <Button variant="btn btn-success" onClick={addProduct}>{t('Add')}</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='m-auto'>
          <h5>{t('RemoveProduct')}</h5>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            {t('Close')}
          </Button>
          <Button variant="btn btn-danger" onClick={handleRemoveProduct}>{t('Remove')}</Button>
        </Modal.Footer>
      </Modal>

      <div className="products">

        {productsList?.map((product, index) =>
          <div key={index} className="product">
            <h3>{product.name}</h3>
            <img src={product.image.length !== 0 ? product.image.url : defaultImg} alt={product.name} />
            <div className="details">
              <span>{product.description}</span>
              <span className="price">₪{product.price}</span>
            </div>
            <button onClick={() => handleAddToCart(product)}>{t('AddToCart')}</button>
            {
              isAdmin() ?
                <button className="btn btn-danger btn-delete" onClick={() => handleShow2(product.id)}>X</button>
                :
                null
            }
          </div>
        )}
      </div>
    </>
  )
}
