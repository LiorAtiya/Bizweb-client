
export const openWidgetUploadImage = (setPicture) => {
    var myWidget = window.cloudinary.createUploadWidget({
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            setPicture({ id: result.info.public_id, url: result.info.url });
        }
    }
    )

    //open widget
    myWidget.open();
}
