import { useState } from "react";
import { Box, Button, IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel"
import { postContent } from "../../utilities/upload";


function UploadContents() {
    const [images, setImages] = useState([]);
    const [type, setType] = useState("image")
    const maxImageUpload = 4;
    const inputId = Math.random().toString(32).substring(2);

    const handleOnUpload = async (e) => {
        e.preventDefault();
        const orderId = sessionStorage?.selectedOrder
        images.forEach((image) => {
            postContent(orderId, image, type);
        })
        setImages([]);
    };

    const handleOnAddImage = (e) => {
        if (!e.target.files) return;
        setImages([...images, ...e.target.files]);
    };

    const handleOnRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const toggleUploadType = (e, newString) => {
        setType(newString)
    };

    return (
            <div>
                <Box sx={{display: 'flex', m: 2, fontSize: "1rem"}}>
                    最大４つまでの画像/動画を選択してアップロード
                </Box>
                <ToggleButtonGroup
                    color="primary"
                    value={type}
                    exclusive
                    onChange={toggleUploadType}
                    aria-label="type"
                    sx={{ height: "2rem"}}
                >
                    <ToggleButton sx={{ width: "4rem" }} value="image">画像</ToggleButton>
                    <ToggleButton sx={{ width: "4rem" }} value="video">動画</ToggleButton>
                </ToggleButtonGroup>
                <form action="" style={{ marginTop: "0.5rem"}}>
                    <label htmlFor={inputId}>
                        <Button variant="contained"
                            disabled={images.length >= maxImageUpload}
                            component="span"
                            style={{ width : "8rem"}}>
                            {(type === "image") ? "画像追加" : "動画追加"}
                        </Button>
                        <input id={inputId} type="file" multiple
                            onChange={(e) => handleOnAddImage(e)}
                            style={{ display: "none"}}
                        />
                    </label>
                    <Button variant="contained"
                        onClick={(e) => handleOnUpload(e)}
                        disabled={images.length < 1}
                        style={{width : "8rem", margin: "1rem"}}>
                        アップロード
                    </Button>
                    <div style={{ display: "flex"}}>
                        {images.map((image, i) => 
                        (<div key={i} style={{ position: "relative", width: "40%", margin: "0.5rem"}} >
                            <IconButton aria-label="delete image"
                                style={{
                                    postion: "absolute",
                                    top: 10,
                                    left: 10,
                                    color: "#aaa"
                                }}
                                onClick={() => handleOnRemoveImage(i)} >
                                    <CancelIcon />
                            </IconButton>
                            <img src={URL.createObjectURL(image)}
                                style={{ width: "100%"}} alt="preview" />
                        </div>))
                        }
                    </div>
                    
                </form>
            </div>
    );
}

export default UploadContents;