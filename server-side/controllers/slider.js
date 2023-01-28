const createError = require("../error");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Slider = require("../models/Slider");

const sliderlist = async (req, res, next) => {
    try{
        const slider = await Slider.find();
        res.status(200).json(slider);
    } catch (err){
        next(err);
    }
}

const createSlider = async (req, res, next) =>{
    try {
        const { name, link } = req.body;

        console.log(req.body)
    
        const regex = /[^a-zA-Z0-9 ]/g;
    
        let sliderUrl = name
          .toLowerCase()
          .replaceAll(regex, "")
          .replaceAll(" ", "-")
          .trim();
    
        //Check duplicate product name
        let dupSliderName = await Slider.findOne({ sliderUrl });
    
        if (dupSliderName){
            if(req.file){
                fs.unlink(req.file.path, (err)=>{
                    next(err);
                });
            }
          return next(createError(409, "Duplicate name found! Please change the name."));
        }
          
    
        // handle image upload
        let uploadedFile;
        if (req.file) {
          // Save image to cloudinary
          uploadedFile = await cloudinary.uploader.upload(req.file.path, {
            folder: "hallo_food/slider_image",
            resource_type: "image",
          });
        }
    
        const slider = new Slider({
          ...req.body,
          link,
          sliderUrl,
          img: {
            url: uploadedFile.secure_url,
            publicid: uploadedFile.public_id,
          },
        });
    
        await slider.save();
        
        if(req.file){
            fs.unlink(req.file.path, (err)=>{
                next(err)
            });
        }
    
        res.status(200).send("Slider added succesfully!");

      } catch (err) {
        next(err);
      }
}



//Update a catergory
const updateSlider = async (req, res, next) => {

    try{
        const {name, img, link} = req.body;
  
        if(!name){
            if(req.file){
              fs.unlink(req.file.path, (err)=>{
                next(err)
              })
            }
            return createError(404, "Something went wrong !!!");
        }
  
  
        const regex = /[^a-zA-Z0-9 ]/g;
  
        let sliderUrl = name
        .toLowerCase()
        .replaceAll(regex, "")
        .replaceAll(" ", "-")
        .trim();
  
        const dupSliderName = await Slider.findOne({ _id: { $ne: id}, sliderUrl})
  
        if(dupSliderName) {
            if(req.file){
              fs.unlink(req.file.path, (err)=>{
                next(err)
              })
            }
            return next(createError(409, "Duplicate name found! Please change the name."));
        }
  
  
        // handle image upload
        let uploadedFile ={
            url : img.url,
            public_id : img.publicid
        };
  
        if(req.file){
            // Delete previous one first
            await cloudinary.uploader.destroy(img.publicid);
  
            // Save image to cloudinary
            uploadedFile = await cloudinary.uploader.upload(req.file.path,{
                folder : "hallo_food/slider_image",
                resource_type: "image"
            });
  
            if(req.file){
              fs.unlink(req.file.path, (err)=>{
                next(err)
              })
            }
        }
        
        await Slider.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    link,
                    img : {
                        url : uploadedFile.secure_url,
                        publicid : uploadedFile.public_id
                    }
                }
            }
        )
  
        res.status(200).send("Slider updated successfully!")

    } catch (err){
        if(req.file){
          fs.unlink(req.file.path, (err)=>{
            next(err)
          })
        }
        next(err)
    }
  }


//Delete a product
const deleteSlider = async (req, res, next) => {
    try {
      const slider = await Slider.findById(req.params.id);

      
      if (!slider) {
        next(createError(404,"Slider not found!!!"));
      }
  
      const sliderId = slider._id;
  
      const publicid = slider.img.publicid;
  
      await cloudinary.uploader.destroy(publicid);
  
      await Slider.deleteOne({ _id: sliderId });
  
      res.status(200).send("Slider deleted succesfully!");
    } catch (err) {
      next(err);
    }
  };


//get single slider
const singleSlider = async (req, res, next) => {
    try {
      const slider = await Slider.findOne({
        _id : req.params.id
      })
  
      if (!slider) return res.status(404).send("Slider not found!");
  
      res.status(200).send(slider);
    } catch (err) {
      next(err);
    }
  };


module.exports = {
    sliderlist,
    createSlider,
    updateSlider,
    deleteSlider,
    singleSlider
}