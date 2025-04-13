const express = require("express");
const session = require("express-session")
const path = require("path")
const joi = require("joi")
const body_parser = require("body-parser") 
const mySQL = require("mysql2/promise");
const multer = require("multer");
const ftp = require("ftp")
const { brotliDecompress } = require("zlib");

const upload = multer({dest:"./uploads/"})

const app = express()

app.use(body_parser.urlencoded({
    extended:true
}))


app.use(session({
    secret:"olabode2112",
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false
    }
}));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})

app.post("/sign_up",(req,res)=>{

   
    const schema = joi.object({
        first_name : joi.string().trim().required(),
        last_name: joi.string().trim().required(),
        email:joi.string().email().trim().required(),
        password:joi.string().min(6).required()
    })

    const result = schema.validate({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email: req.body.email,
        password:req.body.password
    })

    if(result.err){
        console.log(err)
    }

   async function connect_to_database() {
    
    try {
        const db = await mySQL.createConnection({
            host:"209.159.156.150",
            user:"kreativesv_kreativesv",
            password:"SZdLvKiZF@",
            database:"kreativesv_users_database"
        })

      
        const table_name = req.body.password+"_"+"posts_table";
        const query1 = "INSERT INTO users_table(First_name,Last_name,Email,User_password) VALUES(?,?,?,?)";
        const query2 = "CREATE TABLE "+" "+table_name+" "+"(id INT  AUTO_INCREMENT PRIMARY KEY, first_name_of_poster VARCHAR(250),last_name_of_poster VARCHAR(250),post_category VARCHAR(100),text_based_post MEDIUMTEXT,date_of_post_upload DATETIME DEFAULT NOW())";
        const queryx = "INSERT INTO "+" "+table_name+" "+"(first_name_of_poster,last_name_of_poster) VALUES(?,?)"
        const values1 = [req.body.first_name,req.body.last_name,req.body.email,req.body.password];
        const value2 = [table_name]
        const valuex = [req.body.first_name,req.body.last_name]

        const [results1] = await db.execute(query1,values1);
        const [results2] = await db.execute(query2,value2)
        const [resultx] = await db.execute(queryx,valuex)

    
    } catch (err) {
        console.log(err)
    }

   }
   connect_to_database();
   res.sendFile(path.join(__dirname,"upload_profile_picture.html"))
})

app.post("/login",body_parser.urlencoded({
    extended:true
}),

(req,res)=>{
    const schema = joi.object({
        email:joi.string().email().trim().required(),
        password:joi.string().min(6).required()
    })

    const result = schema.validate({
        email: req.body.email,
        password:req.body.password
    })

    if(result.err){
        console.log(err)
    }

    async function login() {
    
        try {
            const db = await mySQL.createConnection({
                host:"209.159.156.150",
                user:"kreativesv_kreativesv",
                password:"SZdLvKiZF@",
                database:"kreativesv_users_database"
            })
    
            const query3 = "SELECT * FROM users_table WHERE Email = ? AND User_password = ?"
            const values3 = [req.body.email,req.body.password]
            const [results3] = await db.execute(query3,values3);

            if(results3.length === 0){
            res.send("This user does not exist in our database, check your login credencials: Email and password")
            }else{
            req.session.password = req.body.password
            res.sendFile(path.join(__dirname,"upload_post.html"))
            }
        
        } catch (err) {
            console.log(err)
        }
    
       }
       login();
    })
   
    app.post("/upload_post",body_parser.urlencoded({
        extended:true
    }),
    
    (req,res)=>{
        const schema = joi.object({
            post_to_upload:joi.string().trim().required(),
            post_category:joi.string().min(6).required()
        })
    
        const result = schema.validate({
            post_to_upload: req.body.post_to_upload,
            post_category:req.body.post_category
        })
    
        if(result.err){
            console.log(err)
        }
    
        async function upload_post() {
        
            try {
                const db = await mySQL.createConnection({
                    host:"209.159.156.150",
                    user:"kreativesv_kreativesv",
                    password:"SZdLvKiZF@",
                    database:"kreativesv_users_database"
                })
                
               const x =req.session.password+"_"+"posts"+"_"+"table"
               const query4 = "SELECT @max_id := MAX(id) FROM "+x;+" "
               const queryp = "SELECT @max_id_blockchain := MAX(id) FROM blockchain;" 
               const query5 =" UPDATE "+ x +" SET post_category = ?,text_based_post = ? WHERE id = @max_id"
               const queryq ="INSERT INTO blockchain(First_name_of_poster) VALUES((SELECT (first_name_of_poster) from "+ x +" WHERE id = @max_id))"
               const queryr ="UPDATE blockchain SET First_name_of_poster = (SELECT (first_name_of_poster) from "+ x +" WHERE id = @max_id), Last_name_of_poster = (SELECT (last_name_of_poster) from "+ x +" WHERE id = @max_id),Post_category = (SELECT (post_category) from "+ x +" WHERE id = @max_id),Text_based_post = (SELECT (text_based_post) from "+ x +" WHERE id = @max_id),Date_of_post_upload = (SELECT (date_of_post_upload) from "+ x +" WHERE id = @max_id) WHERE id = @max_id_blockchain"
              

               const values5 = [req.body.post_category,req.body.post_to_upload]

               const [results4] = await  db.execute(query4);
               const [resultsp] = await  db.execute(queryp);
               const [results5] = await  db.execute(query5,values5);
               const [resultsq] = await db.execute(queryq)
               const [resultsr] = await db.execute(queryr)

            
            } catch (err) {
                console.log(err)
            }
       
           }
           upload_post();
           res.send("Your post has been sucessfully uploaded")
        })

app.post("/Already_have_an_account",(req,res)=>{
    res.sendFile(path.join(__dirname,"login.html"))
})


app.post("/upload",upload.single("image"),(req,res)=>{
   let Highest_id;
    async function get_name_for_image() {
        try {
            const db = await mySQL.createConnection({
                host:"209.159.156.150",
                user:"kreativesv_kreativesv",
                password:"SZdLvKiZF@",
                database:"kreativesv_users_database"
            })
            let [resultx] = await db.execute("SELECT MAX(id) AS Highest_id FROM users_table")
            Highest_id =  String(resultx[0].Highest_id)

    }catch (err) {
        console.log(err)
    }
}

get_name_for_image();

      
    const client = new ftp()

    client.connect({
        host: "209.159.156.150",
        user:"kreativesv_kreativestackvault.com",
        password:"Olabode2112Ob@"
       
    })


    client.on("ready",()=>{
            client.put(req.file.path,Highest_id,(err)=>{
        if(err){
            console.log(err)
        }else{
            client.end()
        }
    })
      
    })


    client.on("error",(err)=>{
        console.log(err.name)
        console.log(err.message)
    })

    client.on("login",(err)=>{
        console.log("Logged in to ftp server")
    })

    
});


app.post("/Skip_uploading_profile_picture",(req,res)=>{
    res.sendFile(path.join(__dirname,"login.html"))
    
  
})

app.post("/Next",(req,res)=>{
    res.sendFile(path.join(__dirname,"login.html"))


    
})
 


app.listen(3000);