import axios from "axios";

export async function UPLOADIMG(img) {
    const data = new FormData();
    data.append("image", img.base64);
    try {
        const response = await axios.post('https://api.imgbb.com/1/upload?key=addc56e902f5a37cd4af3334a085a503', data);
        const urlimg = await response.data.data.url;
        return urlimg;
    } catch (error) {
        console.log(error)
        return false;
    }
}
