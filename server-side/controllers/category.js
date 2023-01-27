const Category = require("../models/Category");
const Product = require("../models/Product");

const categorylist = async (req, res, next) => {
    try{
        const categories = await Category.find();

        res.status(200).json(categories);

    } catch (err){
        next(err);
    }
}

const createCategory = async (req, res, next) =>{
    try{

        let name = req.body.name;

        let headerUrl = name.toLowerCase().replaceAll(" ","-");



        //Search for duplicate url of category
        let  dupUrl = await Category.find({"categoryUrl" : headerUrl});

        console.log(dupUrl);

        if(dupUrl.length) return res.status(409).send("Duplicate name found! Please change the name.");
        

        
        const category = new Category({...req.body, "categoryUrl" : headerUrl});


        await category.save();

        res.status(200).send('Category added succesfully!');

    } catch (err){
        next(err);
    }
}

//Update a catergory
const updateCategory = async (req, res, next) => {
    try{

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )

        res.status(200).send("Category updated successfully!")
    } catch (err){
        next(err)
    }
}

//Get product according to category
const getCatProduct = async (req, res, next) => {
    try{

        const category = await Category.findOne({categoryUrl : req.params.categoryUrl}).populate('products');

        res.status(200).json(category.products);


    } catch (err){
        next(err)
    }
}


module.exports = {
    categorylist,
    createCategory,
    updateCategory,
    getCatProduct
}