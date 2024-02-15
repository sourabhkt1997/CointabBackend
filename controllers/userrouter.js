const express=require("express")
const userrouter=express.Router()
const ExcelJS = require('exceljs');
const {User,Post}=require("../models")



// route for addthe user in database.............................................
userrouter.post("/adduser",async(req,res)=>{
    try {
        let {name,username,email,phone,website,street,suite,city,zipcode,lat,lng,companyBs,companyCatchPhrase,companyName}=req.body
        let data=await User.findOne({
            where:{
                email:email
            }
        })
        if(data){
            res.status(403).send({msg:"already in database click open button",id:data.id})
        }
        else{
            
            await User.create({
                name:name,
                username:username,
                email:email,
                phone:phone,
                website:website,
                street:street,
                suite:suite,
                city:city,
                zipcode:zipcode,
                lat:lat,
                lng:lng,
                companyName:companyName,
                companyCatchPhrase:companyCatchPhrase,
                companyBs:companyBs
            })

            res.status(200).send({msg:"added successfully",id:data.id})
        }
    } catch (error) {
        console.log(error)
        res.status(502).send({msg:`internal server error`,
        err:error})
    }
})
// .........................................................................


// route getting userdata.........................................

userrouter.get("/userpost/:id",async(req,res)=>{
    try {
        const id=req.params.id
        console.log(id)
        let data=await User.findOne({
            where:{
                id:id
            }
        })

        res.status(200).send({msg:data})
    } catch (error) {
        console.log(error)
        res.status(502).send({msg:`internal server error`,
        err:error})
    }
})
// .........................................................................


// route for bulkadding of post in database.................................
userrouter.post("/bulkadd/:userId",async(req,res)=>{
    try {
        let {posts}=req.body
        let userId=req.params.userId
     
        const convertedArray = posts.map(obj => ({
            ...obj,
            userId: parseInt(obj.userId) 
          }));

       
        if (!posts || !Array.isArray(posts)) {
            return res.status(400).send({ msg: "Invalid or missing 'post' data" });
          }
       
        
        let data=await Post.findOne({
            where:{
                userId:userId
            }
        })
        
        if(data){
            res.status(402).send({msg:"already added"}) 
        }
        else{
          Post.bulkCreate(convertedArray)
           .then(()=>{
            res.status(200).send({msg:"added successfully"}) 
           })
           .catch((error)=>{
            console.log("**",error.message,"**")
            res.status(401).send({msg:"error in adding data"}) 
           })
        }
        
    } catch (error) {
        console.log(error)
        res.status(502).send({msg:`internal server error`,
        err:error})
    }
})
// .........................................................................




//route for downloading data in to exelsheet ..............................

userrouter.get("/download/:userId",async(req,res)=>{
    try {
        const userId = req.params.userId;
        console.log(userId)
        const postData = await Post.findAll({
            where: {
              userId: userId,
            },
        });
        if(postData){
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet('Posts');
        
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'User ID', key: 'userId', width: 10 },
            { header: 'Title', key: 'title', width: 30 },
            { header: 'Body', key: 'body', width: 50 },
          ];

          postData.forEach((post) => {
            worksheet.addRow({
              id: post.id,
              userId: post.userId,
              title: post.title,
              body: post.body,
            });
          });

          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.setHeader('Content-Disposition', 'attachment; filename=posts.xlsx');

          await workbook.xlsx.write(res);

          res.end();
        }

    } catch (error) {
        console.error('Error downloading data:', error);
        res.status(502).send({msg:`internal server error`,
        err:error}) 
    }
})

// .........................................................................

// userrouter.delete('/drop-table', async (req, res) => {
//     try {
//       // Drop the table
//       await Post.drop();
  
//       res.status(200).json({ message: 'Table dropped successfully!' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });


module.exports={userrouter}