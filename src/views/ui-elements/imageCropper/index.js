import React from "react";
import Cropper from "react-easy-crop";

class ImageCropper extends React.Component{

    state = {
        crop: this.props.cropdata.crop,
        zoom: this.props.cropdata.zoom,
        aspect: this.props.cropdata.aspect,
        cropSize: this.props.cropdata.cropSize,
        image: false,
        zoomSpeed: 0.1
    }

    onCropChange = (crop) => {
        this.setState({ crop })
    }
     
    onCropComplete = async (croppedArea, crop) => {
        if (croppedArea && crop) {
            this.getCroppedImg(crop)
        }
    }

    async getCroppedImg(crop) {
        let image = await this.createImage(this.props.image);
        if(!image)
            return false;
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width * 1;
        canvas.height = crop.height * 1;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * 1,
            crop.height * 1
        )
        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                this.dataURLtoFile(reader.result, 'cropped.jpg');
                this.setState({ croppedImageUrl: reader.result })
            }
        })
    }

    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
                
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, {type:mime});
        this.props.imageHandler(dataurl, croppedImage);
    }

    onZoomChange = (zoom) => {
        this.setState({ zoom })
    }
    
    createImage = async url => {
        let data;
        await new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', error => reject(error))
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = url
            data = image;
            this.setState({ image: data })
        })
        return data;
    }

    componentWillUnmount(){
        this.state.image.removeEventListener("load", () => {})
        this.state.image.removeEventListener("error", () => {})
    }

    render() {
        return (
            <Cropper
                image={this.props.image}
                crop={this.state.crop}
                zoom={this.state.zoom}
                aspect={this.state.aspect}
                minZoom={0.5}
                maxZoom={3}
                cropShape={this.props.cropdata.cropShape}
                zoomSpeed={this.state.zoomSpeed}
                cropSize={this.state.cropSize}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
            />
        )
    }
}

export default ImageCropper;