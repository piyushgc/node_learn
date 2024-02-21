const express =require('express');
const router  = express.Router();
const menu = require('./../models/menu');

router.post('/',async(req,res)=>{
    try{
        const data = req.body;
        const newMenue = new menu(data);

        const response = await newMenue.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/',async(req,res)=>{
    try{
        const data = await menu.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})


router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType=='Sweet'||tasteType=='Sour'||tasteType=='Spicy'){
           
           const response= await menu.find({taste:tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const menuId = req.params.id; // extract the id from the URL 
        const updatedmenuData = req.body; //updated data for the person

        const response = await menu.findByIdAndUpdate(menuId,updatedmenuData,{
            new : true,
            runValidators:true, //mongoose rquired field check
        })
        if(!response){
            return res.status(404).json({error:'menu not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id',async (req,res)=>{
    try{
         const menuId = req.params.id;

         const response = await menu.findByIdAndDelete(menuId );
         if(!response){
            return res.status(404).json({error : 'Invalid person Id'});
        }
        console.log('data deleted');
        res.status(200).json({message : 'Data deleted successfully'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal error'});
    }
})

module.exports = router;