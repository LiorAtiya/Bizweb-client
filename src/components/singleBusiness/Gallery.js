import React, { useEffect, useState } from 'react'
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ApiClient from '../../api/ApiRoutes';
import "../../styles/Gallery.css"
import { useTranslation } from 'react-i18next';

export const Gallery = ({ id, name }) => {

  const { t, i18n } = useTranslation();

  //data of all images
  const [data, setData] = useState([]);
  const [newImage, setNewImage] = useState([]);
  const [updatedBackgroundImage, setUpdatedBackgroundImage] = useState("");
  const [removeImage, setRemoveImage] = useState("");

  useEffect(() => {
    const getResult = async () => {
      //get all images of the business from mongodb
      ApiClient.getGallery(id)
        .then((res) => setData(res))
        .catch((err) => console.log(err));
    };
    getResult();
  }, [id]);

  //Admin Permissions
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = (id) => {
    setRemoveImage(id);
    setShow2(true);
  }
  const getUserData = JSON.parse(localStorage.getItem('user-info'));

  const isAdmin = () => {
    if (getUserData) {
      return getUserData.business.includes(id);
    }
    return false;
  }

  const handleOpenWidget = async () => {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dk5mqzgcv',
      uploadPreset: 'xw93prxe'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        setNewImage({ id: result.info.public_id, url: result.info.url });
      }
    }
    )
    //open widget
    myWidget.open();
  }

  const handleOpenWidgetForBackground = async () => {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dk5mqzgcv',
      uploadPreset: 'xw93prxe'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        setUpdatedBackgroundImage(result.info.url);
      }
    }
    )

    //open widget
    myWidget.open();
  }

  const uploadImage = async () => {

    //send request to server for upload new image
    if (newImage.length !== 0) {
      ApiClient.addNewImage(id, newImage)
        .then((res) => {
          console.log(res.data)
          setData(oldArray => [...oldArray, newImage]);
          handleClose()
        })
        .catch((err) => console.log(err));
    }

    //update background image
    if (updatedBackgroundImage !== "") {
      ApiClient.updateBackgroundImage(id, updatedBackgroundImage)
        .then((res) => {
          console.log(res.data)
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    }

  }

  const handleRemoveImage = async () => {

    ApiClient.removeImageFromGallery(id, removeImage)
      .then((res) => {
        const newArray = data.filter(obj => obj.id !== removeImage);
        setData(newArray)
        handleClose2()
      })
      .catch((err) => console.log(err));
  }

  return (

    <>
      {
        isAdmin() ?
          <>
            <Button variant="btn btn-warning" onClick={handleShow}>
              <b>{t("AdminPermissions")}</b>
            </Button>
            <hr></hr>
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
          <h5>{t("AdminPermissions")}</h5>
        </Modal.Header>
        <Modal.Body className={i18n.language === 'he' ? 'text-right' : null}>
          <h6>{t('SelectPhotoToAdd')}</h6>
          <div id='upload-widget' className='cloudinary-button' onClick={() => handleOpenWidget()}>
            {t('ChooseBtn')}
          </div>
          <br /><br />
          <h6>{t('UpdateBackgroundPhoto')}</h6>
          <div id='upload-widget' className='cloudinary-button' onClick={() => handleOpenWidgetForBackground()}>
            {t('ChooseBtn')}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('Close')}
          </Button>
          <Button variant="btn btn-success" onClick={uploadImage}>{t('Upload')}</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h5>{t('RemoveImage')}</h5>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            {t('Close')}
          </Button>
          <Button variant="btn btn-danger" onClick={handleRemoveImage}>{t('Remove')}</Button>
        </Modal.Footer>
      </Modal>

      <div className='gallery-container'>
        <Row>
          {
            data.map((singleData, i) => {
              return (
                <Col size={12} sm={6} md={4} key={i}>
                  <div className="proj-imgbx">
                    <img src={singleData.url} alt={i} width="450" height="250" />
                    {
                      isAdmin() ?
                        <button className="btn btn-danger btn-delete" onClick={() => handleShow2(singleData.id)}>X</button>
                        :
                        null
                    }
                  </div>
                </Col>
              )
            })
          }
        </Row>
      </div>
    </>
  )
}
