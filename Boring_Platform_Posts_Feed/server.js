const express = require("express");
const mySQL = require("mysql2/promise");
const body_parser = require("body-parser")
const session = require("express-session")
const joi = require("joi")
const ejs = require("ejs");
const path = require("path");
const ftp = require("ftp")
const app = express();
let [result1] = [0];
let supreme_array = new Array()
let comment_pictures = new Array()
let supreme_array_for_full_feed = new Array()
let comment_picturesfor_full_feed = new Array()
let supreme_array_for_completed_projects = new Array()
let comment_pictures_for_completed_projects = new Array()
let supreme_array_uncompleted_projects = new Array()
let comment_pictures_uncompleted_projects = new Array()
let supreme_array_upcoming_projects = new Array()
let comment_pictures_uncoming_projects = new Array()
let profile_pictures = new Array()
let profile_pictures_for_full_feed = new Array()
let profile_pictures_for_completed_projects = new Array()
let profile_pictures_for_uncompleted_projects = new Array()
let profile_pictures_for_upcoming_projects = new Array()
let multer = require("multer");
const upload = multer({
    dest:"./uploads"
})

app.set("view engine","ejs")
app.use(body_parser.json())
app.use(body_parser.urlencoded({
    extended:true
}))

app.use(express.static("public"))

app.use(session({
    secret:"olabode2112",
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false
    }
}));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index_for_repliers.html"))
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
        // let values_for_phase1 = [req.body.email,req.body.password]
        // let phase1 =  await db.execute("select * from  repliers_table where Email = ? and Replier_password = ?",values_for_phase1)
        let values = [req.body.first_name,req.body.last_name,req.body.email,req.body.password]

        // if(phase1[0].length > 0){
        //     res.send("This user already exixt")
        // }else{
        const result = await db.execute("INSERT INTO repliers_table(First_name,Last_name,Email,Replier_password) VALUES(?,?,?,?)",values);
        //}
    
    } catch (err) {
        console.log(err)
    }

   }
   connect_to_database();
   res.sendFile(path.join(__dirname,"login_for_repliers.html"))
})
    

app.post("/Already_have_an_account",(req,res)=>{
    res.sendFile(path.join(__dirname,"login_for_repliers.html"))
})

app.post("/login",body_parser.urlencoded({
    extended:true

}),(req,res)=>{
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

    const [result] = await db.execute("SELECT * FROM repliers_table WHERE Email = ? AND Replier_password = ?",[req.body.email,req.body.password]);
    if(result.length === 0){
    res.send("This user does not exist in our database, check your login credencials: Email and password")
    }else{
        
    let first_name = result[0].First_name;
    let last_name  = result[0].Last_name;
    let Full_name = last_name +" "+ first_name;
 
    req.session.Full_name = Full_name;
    let full_namex = req.session.Full_name

    let master_array = new Array();
    let beta_array = new Array();
    let omega_array = new Array();
    

    [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain")
    const x = result1[0].total_amount_of_rows;
    let [result2] = [0];
    let [result3] = [0];

    let slave_array = new Array()
    let [result4] = [0];
    let [result5] = [0]
    let [resultW] = [""]
  
    const z = await db.execute("delete from blockchain where Last_name_of_poster is null");
    for(let i = 0; i < x; i++){
    const [random_row] = await db.execute("SELECT * FROM blockchain  ORDER BY RAND() LIMIT 1")
    let first_name = random_row[0].First_name_of_poster;
    let last_name = random_row[0].Last_name_of_poster;
    let full_name = last_name+" "+ first_name;
    //for phase2
    [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
    [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

    //   const client0 = new ftp()
    
    // client0.connect({
    //     host: "209.159.156.150",
    //     user:"kreativesv_kreativestackvault.com",
    //     password:"Olabode2112Ob@"
       
    // })

    //  client0.on("error",(err)=>{
    //     console.log(err)
    // })


    //     for(let j = 0; j < result2.length;j++){
    //            client0.on("ready",()=>{
    //     client0.size(result2[j].Comment_content,(err,size)=>{
    //         if(err){
    //             console.log("")
                
    //         }else{
    //             client0.get(result2[j].Comment_content,(err,stream)=>{
    //         if(err){
    //             console.log(err)
    //         }else{
    //             const chunks = [];
    //             stream.on("data",(chunk)=>
    //             {
    //                 chunks.push(chunk)
    //             })


    //             stream.on("end",()=>{
    //                 const imageData = Buffer.concat(chunks)
    //                 const  imageBase64 = imageData.toString("base64")
    //                 comment_pictures.push(imageBase64)
    //                 supreme_array.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))
    //                 //remove that certaim arroy from beta array that contains result2[j].Comment_content
                    
    //             })
    //         }
    //     })
                        
    //                 }
    //             })
    //         })    
    //     }

    [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
    [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
    [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);
    master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
    beta_array.push(result2)
    omega_array.push(result3);
    slave_array.push(result4)
    

    //for phase three
    let client = new ftp();

    client.connect({
        host: "209.159.156.150",
        user:"kreativesv_kreativestackvault.com",
        password:"Olabode2112Ob@"
       
    })


    client.on("ready",()=>{
        client.get(String(result5[0].id),(err,stream)=>{
    if(err){
        console.log(err)
    }else{
        const chunks = [];
        stream.on("data",(chunk)=>
        {
            chunks.push(chunk)
        })


        stream.on("end",()=>{
            const imageData = Buffer.concat(chunks)
            const  imageBase64 = imageData.toString("base64")
            profile_pictures.push(imageBase64)
            
        })
    }
})
  
})

        client.on("error",(err)=>{
            console.log(err)
        })
        req.session.profile_pictures = profile_pictures;
   } 
 

   res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures,comment_pictures:comment_pictures,supreme_array:supreme_array});

        }

} catch (err) {
    console.log(err)
}

}
login();

})

app.get("/Already_have_an_account",(req,res)=>{
   res.sendFile(path.join(__dirname,"login_for_repliers.html"))

})

app.post("/full_feed",(req,res)=>{

    async function full_feed() {
    
        try {
    const db = await mySQL.createConnection({
        host:"209.159.156.150",
            user:"kreativesv_kreativesv",
            password:"SZdLvKiZF@",
            database:"kreativesv_users_database"
    })

    let master_array = new Array();
    let beta_array = new Array();
    let omega_array = new Array();
    
    [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain")
    const x = result1[0].total_amount_of_rows;
    let [result2] = [0];
    let [result3] = [0];

    let  slave_array = new Array()
    let [result4] = [0];
    let [result5] = [0]
    let [resultW] = [""]

    const z = await db.execute("delete from blockchain where Last_name_of_poster is null");
    for(let i = 0; i < x; i++){
    const [random_row] = await db.execute("SELECT * FROM blockchain  ORDER BY RAND() LIMIT 1")
    let first_name = random_row[0].First_name_of_poster;
    let last_name = random_row[0].Last_name_of_poster;
    let full_name = last_name+" "+ first_name;
    //for phase2
    [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
    [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

//     const client0 = new ftp()
  
//   client0.connect({
//       host: "209.159.156.150",
//       user:"kreativesv_kreativestackvault.com",
//       password:"Olabode2112Ob@"
     
//   })

//    client0.on("error",(err)=>{
//       console.log(err)
//   })


//       for(let j = 0; j < result2.length;j++){
//              client0.on("ready",()=>{
//       client0.size(result2[j].Comment_content,(err,size)=>{
//           if(err){
//               console.log("")
              
//           }else{
//               client0.get(result2[j].Comment_content,(err,stream)=>{
//           if(err){
//               console.log(err)
//           }else{
//               const chunks = [];
//               stream.on("data",(chunk)=>
//               {
//                   chunks.push(chunk)
//               })


//               stream.on("end",()=>{
//                   const imageData = Buffer.concat(chunks)
//                   const  imageBase64 = imageData.toString("base64")
//                   comment_picturesfor_full_feed.push(imageBase64)
//                   supreme_array_for_full_feed.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))
                  
//               })
//           }
//       })
                      
//                   }
//               })
//           })    
//       }



    [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
    [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
    [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);
    master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
    beta_array.push(result2)
    omega_array.push(result3);
    slave_array.push(result4) 
            }
    let full_namex = req.session.Full_name;


    //for phase three
    let client = new ftp();
   
    client.connect({
        host: "209.159.156.150",
        user:"kreativesv_kreativestackvault.com",
        password:"Olabode2112Ob@"
       
    })


    client.on("ready",()=>{
        client.get(String(result5[0].id),(err,stream)=>{
            console.log(String(result5[0].id))
    if(err){
        console.log(err)
    }else{
        const chunks = [];
        stream.on("data",(chunk)=>
        {
            chunks.push(chunk)
        })


        stream.on("end",()=>{
            const imageData = Buffer.concat(chunks)
            const  imageBase64 = imageData.toString("base64")
            profile_pictures_for_full_feed.push(imageBase64)
            
        })
    }
})
  
})

        client.on("error",(err)=>{
            console.log(err)
        })

        req.session.profile_pictures = profile_pictures_for_full_feed;

    
    res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_full_feed,supreme_array:supreme_array_for_full_feed,comment_pictures:comment_picturesfor_full_feed});
        }
        catch (err) {
    console.log(err)
    }

    }
    full_feed();

})
       
// app.post("/Completed_projects",(req,res)=>{

// async function update_completed_projects_feed() {
   

// try {
//     const db = await mySQL.createConnection({
//         host:"209.159.156.150",
//             user:"kreativesv_kreativesv",
//             password:"SZdLvKiZF@",
//             database:"kreativesv_users_database"
//     })
    
// let master_array = new Array();
// let beta_array = new Array();
// let omega_array = new Array()
// const value2 = "Completed project";
// [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain WHERE Post_category = ?",[value2])
// const x = result1[0].total_amount_of_rows;
// let [result2] = [0];
// let [result3] = [0];

// let slave_array = new Array()
// let [result4] = [0]
// let [result5] = [0];
// let [resultW] = [""]

    
// for(let i = 0; i < x; i++){
// const value = "Completed project";
// const [random_row] = await db.execute("SELECT * FROM blockchain WHERE Post_category = ? ORDER BY RAND() LIMIT 1",[value])
// let first_name = random_row[0].First_name_of_poster;
// let last_name = random_row[0].Last_name_of_poster;
// let full_name = last_name+" "+ first_name;
// console.log(first_name,last_name);
// //for phase2
// [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
// [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

// // const client0 = new ftp()

// // client0.connect({
// //   host: "209.159.156.150",
// //   user:"kreativesv_kreativestackvault.com",
// //   password:"Olabode2112Ob@"
 
// // })

// // client0.on("error",(err)=>{
// //   console.log(err)
// // })


// //   for(let j = 0; j < result2.length;j++){
// //          client0.on("ready",()=>{
// //   client0.size(result2[j].Comment_content,(err,size)=>{
// //       if(err){
// //           console.log("")
          
// //       }else{
// //           client0.get(result2[j].Comment_content,(err,stream)=>{
// //       if(err){
// //           console.log(err)
// //       }else{
// //           const chunks = [];
// //           stream.on("data",(chunk)=>
// //           {
// //               chunks.push(chunk)
// //           })


// //           stream.on("end",()=>{
// //               const imageData = Buffer.concat(chunks)
// //               const  imageBase64 = imageData.toString("base64")
// //               comment_pictures_for_completed_projects.push(imageBase64)
// //               supreme_array_for_completed_projects.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))
              
// //           })
// //       }
// //   })
                  
// //               }
// //           })
// //       })    
// //   }


// [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
// [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
// [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);

// master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
// beta_array.push(result2)
// omega_array.push(result3);
// slave_array.push(result4);
//         }
//         let full_namex = req.session.Full_name;

//         //for phase three

//     let client = new ftp();
//     let id = result5[0].id;
//     let string_id = String(id)

//     client.connect({
//         host: "209.159.156.150",
//         user:"kreativesv_kreativestackvault.com",
//         password:"Olabode2112Ob@"
       
//     })


//     client.on("ready",()=>{
//         client.get(string_id,(err,stream)=>{
//     if(err){
//         console.log(err)
//     }else{
//         const chunks = [];
//         stream.on("data",(chunk)=>
//         {
//             chunks.push(chunk)
//         })


//         stream.on("end",()=>{
//             const imageData = Buffer.concat(chunks)
//             const  imageBase64 = imageData.toString("base64")
//             profile_pictures_for_completed_projects.push(imageBase64)
            
//         })
//     }
// })
  
// })

//         client.on("error",(err)=>{
//             console.log(err)
//         })

//         req.session.profile_pictures = profile_pictures_for_completed_projects;


//     res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_completed_projects,supreme_array:supreme_array_for_completed_projects,comment_pictures:comment_pictures_for_completed_projects});
// } 
// catch (err) {
//     console.log(err)
// }
// }
// update_completed_projects_feed();
// })



// app.post("/Uncompleted_projects",(req,res)=>{

// async function update_uncompleted_projects_feed() {

// try {
//     const db = await mySQL.createConnection({
//         host:"209.159.156.150",
//         user:"kreativesv_kreativesv",
//         password:"SZdLvKiZF@",
//         database:"kreativesv_users_database"
//     })
    
//     let master_array = new Array();
//     let beta_array = new Array();
//     let omega_array = new Array()
//     const value2 = "Incomplete project";
//     [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain WHERE Post_category = ?",[value2])
//     const x = result1[0].total_amount_of_rows;
//     let [result2] = [0];
//     let [result3] = [0];
//     let [result4] = [0];
//     let [result5] = [0];
//     let [resultW] = [""]
//     let slave_array = new Array()

//     for(let i = 0; i < x; i++){
//     const value = "Incomplete project";
//     const [random_row] = await db.execute("SELECT * FROM blockchain WHERE Post_category = ? ORDER BY RAND() LIMIT 1",[value])
//     let first_name = random_row[0].First_name_of_poster;
//     let last_name = random_row[0].Last_name_of_poster;
//     let full_name = last_name+" "+ first_name;

//     //for phase2
//     [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
//     [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
//     [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

//     //   const client0 = new ftp()
    
//     // client0.connect({
//     //     host: "209.159.156.150",
//     //     user:"kreativesv_kreativestackvault.com",
//     //     password:"Olabode2112Ob@"
       
//     // })

//     //  client0.on("error",(err)=>{
//     //     console.log(err)
//     // })


//     //     for(let j = 0; j < result2.length;j++){
//     //            client0.on("ready",()=>{
//     //     client0.size(result2[j].Comment_content,(err,size)=>{
//     //         if(err){
//     //             console.log("")
                
//     //         }else{
//     //             client0.get(result2[j].Comment_content,(err,stream)=>{
//     //         if(err){
//     //             console.log(err)
//     //         }else{
//     //             const chunks = [];
//     //             stream.on("data",(chunk)=>
//     //             {
//     //                 chunks.push(chunk)
//     //             })


//     //             stream.on("end",()=>{
//     //                 const imageData = Buffer.concat(chunks)
//     //                 const  imageBase64 = imageData.toString("base64")
//     //                 comment_pictures_uncompleted_projects.push(imageBase64)
//     //                 supreme_array_uncompleted_projects.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))
                    
//     //             })
//     //         }
//     //     })
                        
//     //                 }
//     //             })
//     //         })    
//     //     }

//     [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
//     [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
//     [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);
//     master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
//     beta_array.push(result2)
//     omega_array.push(result3);
//     slave_array.push(result4);
//             }
//             let full_namex = req.session.Full_name;

//              //for phase three

//     let client = new ftp();
//     let id = result5[0].id;
//     let string_id = String(id)

//     client.connect({
//         host: "209.159.156.150",
//         user:"kreativesv_kreativestackvault.com",
//         password:"Olabode2112Ob@"
       
//     })


//     client.on("ready",()=>{
//         client.get(string_id,(err,stream)=>{
//     if(err){
//         console.log(err)
//     }else{
//         const chunks = [];
//         stream.on("data",(chunk)=>
//         {
//             chunks.push(chunk)
//         })


//         stream.on("end",()=>{
//             const imageData = Buffer.concat(chunks)
//             const  imageBase64 = imageData.toString("base64")
//             profile_pictures_for_uncompleted_projects.push(imageBase64)
            
//         })
//     }
// })
  
// })

//         client.on("error",(err)=>{
//             console.log(err)
//         })

//         req.session.profile_pictures = profile_pictures_for_uncompleted_projects;


//     res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_uncompleted_projects,supreme_array:supreme_array_uncompleted_projects,comment_pictures:comment_pictures_uncompleted_projects});


//     } 
//     catch (err) {
//     console.log(err)
//     }
//     }
//     update_uncompleted_projects_feed();
//     })
   
//     app.post("/Upcoming_projects",(req,res)=>{

//     async function update_upcoming_projects_feed() {

//     try {
//     const db = await mySQL.createConnection({
//         host:"209.159.156.150",
//         user:"kreativesv_kreativesv",
//         password:"SZdLvKiZF@",
//         database:"kreativesv_users_database"
//     })

//     let master_array = new Array();
//     let beta_array = new Array();
//     let omega_array = new Array()
//     const value2 = "Upcoming project";
//     [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain WHERE Post_category = ?",[value2])
//     const x = result1[0].total_amount_of_rows;
//     let [result2] = [0];
//     let [result3] = [0];
//     let [result4] = [0];
//     let [result5] = [0];
//     let [resultW] = [""]
//     let slave_array = new Array()


//     for(let i = 0; i < x; i++){
//     const value = "Upcoming project";
//     const [random_row] = await db.execute("SELECT * FROM blockchain WHERE Post_category = ? ORDER BY RAND() LIMIT 1",[value])
//     let first_name = random_row[0].First_name_of_poster;
//     let last_name = random_row[0].Last_name_of_poster;
//     let full_name = last_name+" "+ first_name;

//     //for phase2
//     [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
//     [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

//     //   const client0 = new ftp()
    
//     // client0.connect({
//     //     host: "209.159.156.150",
//     //     user:"kreativesv_kreativestackvault.com",
//     //     password:"Olabode2112Ob@"
       
//     // })

//     //  client0.on("error",(err)=>{
//     //     console.log(err)
//     // })


//     //     for(let j = 0; j < result2.length;j++){
//     //            client0.on("ready",()=>{
//     //     client0.size(result2[j].Comment_content,(err,size)=>{
//     //         if(err){
//     //             console.log(" ")
                
//     //         }else{
//     //             client0.get(result2[j].Comment_content,(err,stream)=>{
//     //         if(err){
//     //             console.log(err)
//     //         }else{
//     //             const chunks = [];
//     //             stream.on("data",(chunk)=>
//     //             {
//     //                 chunks.push(chunk)
//     //             })


//     //             stream.on("end",()=>{
//     //                 const imageData = Buffer.concat(chunks)
//     //                 const  imageBase64 = imageData.toString("base64")
//     //                 comment_pictures_uncoming_projects.push(imageBase64)
//     //                 supreme_array_upcoming_projects.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))
                 
//     //             })
//     //         }
//     //     })
                        
//     //                 }
//     //             })
//     //         })    
//     //     }

        
//     [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
//     [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
//     [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);
//     master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
//     beta_array.push(result2)
//     omega_array.push(result3);
//     slave_array.push(result4);
//         }
//         let full_namex = req.session.Full_name;

//     //for phase three

//     let client = new ftp();
//     let id = result5[0].id;
//     let string_id = String(id)

//     client.connect({
//         host: "209.159.156.150",
//         user:"kreativesv_kreativestackvault.com",
//         password:"Olabode2112Ob@"
       
//     })


//     client.on("ready",()=>{
//         client.get(string_id,(err,stream)=>{
//     if(err){
//         console.log(err)
//     }else{
//         const chunks = [];
//         stream.on("data",(chunk)=>
//         {
//             chunks.push(chunk)
//         })


//         stream.on("end",()=>{
//             const imageData = Buffer.concat(chunks)
//             const  imageBase64 = imageData.toString("base64")
//             profile_pictures_for_upcoming_projects.push(imageBase64)
            
//         })
//     }
// })
  
// })

//         client.on("error",(err)=>{
//             console.log(err)
//         })

//         req.session.profile_pictures = profile_pictures_for_upcoming_projects;


//     res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_upcoming_projects,supreme_array:supreme_array_upcoming_projects,comment_pictures:comment_pictures_uncoming_projects});


//     } 
//     catch (err) {
//     console.log(err)
//     }
//     }
//     update_upcoming_projects_feed();
//     })

        app.post("/Beauty_and_Fashion",(req,res)=>{

        async function Beauty_and_Fashion() {


        try {
        const db = await mySQL.createConnection({
        host:"209.159.156.150",
        user:"kreativesv_kreativesv",
        password:"SZdLvKiZF@",
        database:"kreativesv_users_database"
        })

        let master_array = new Array();
        let beta_array = new Array();
        let omega_array = new Array()
        const value2 = "Beauty and Fashion";
        [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain WHERE Post_category = ?",[value2])
        const x = result1[0].total_amount_of_rows;
        let [result2] = [0];
        let [result3] = [0];

        let slave_array = new Array()
        let [result4] = [0]
        let [result5] = [0];
        let [resultW] = [""]


        for(let i = 0; i < x; i++){
        const value = "Beauty and Fashion";
        const [random_row] = await db.execute("SELECT * FROM blockchain WHERE Post_category = ? ORDER BY RAND() LIMIT 1",[value])
        let first_name = random_row[0].First_name_of_poster;
        let last_name = random_row[0].Last_name_of_poster;
        let full_name = last_name+" "+ first_name;
        console.log(first_name,last_name);
        //for phase2
        [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

        // const client0 = new ftp()

        // client0.connect({
        //   host: "209.159.156.150",
        //   user:"kreativesv_kreativestackvault.com",
        //   password:"Olabode2112Ob@"

        // })

        // client0.on("error",(err)=>{
        //   console.log(err)
        // })


        //   for(let j = 0; j < result2.length;j++){
        //          client0.on("ready",()=>{
        //   client0.size(result2[j].Comment_content,(err,size)=>{
        //       if(err){
        //           console.log("")

        //       }else{
        //           client0.get(result2[j].Comment_content,(err,stream)=>{
        //       if(err){
        //           console.log(err)
        //       }else{
        //           const chunks = [];
        //           stream.on("data",(chunk)=>
        //           {
        //               chunks.push(chunk)
        //           })


        //           stream.on("end",()=>{
        //               const imageData = Buffer.concat(chunks)
        //               const  imageBase64 = imageData.toString("base64")
        //               comment_pictures_for_completed_projects.push(imageBase64)
        //               supreme_array_for_completed_projects.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))

        //           })
        //       }
        //   })

        //               }
        //           })
        //       })    
        //   }


        [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
        [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);

        master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
        beta_array.push(result2)
        omega_array.push(result3);
        slave_array.push(result4);
        }
        let full_namex = req.session.Full_name;

        //for phase three

        let client = new ftp();
        let id = result5[0].id;
        let string_id = String(id)

        client.connect({
        host: "209.159.156.150",
        user:"kreativesv_kreativestackvault.com",
        password:"Olabode2112Ob@"

        })


        client.on("ready",()=>{
        client.get(string_id,(err,stream)=>{
        if(err){
        console.log(err)
        }else{
        const chunks = [];
        stream.on("data",(chunk)=>
        {
        chunks.push(chunk)
        })


        stream.on("end",()=>{
        const imageData = Buffer.concat(chunks)
        const  imageBase64 = imageData.toString("base64")
        profile_pictures_for_completed_projects.push(imageBase64)

        })
        }
        })

        })

        client.on("error",(err)=>{
        console.log(err)
        })

        req.session.profile_pictures = profile_pictures_for_completed_projects;


        res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_completed_projects,supreme_array:supreme_array_for_completed_projects,comment_pictures:comment_pictures_for_completed_projects});
        } 
        catch (err) {
        console.log(err)
        }
        }
        Beauty_and_Fashion();
        })


        app.post("/Science_and_Technology",(req,res)=>{

        async function Science_and_Technology() {


        try {
        const db = await mySQL.createConnection({
        host:"209.159.156.150",
        user:"kreativesv_kreativesv",
        password:"SZdLvKiZF@",
        database:"kreativesv_users_database"
        })

        let master_array = new Array();
        let beta_array = new Array();
        let omega_array = new Array()
        const value2 = "Science and Technology";
        [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain WHERE Post_category = ?",[value2])
        const x = result1[0].total_amount_of_rows;
        let [result2] = [0];
        let [result3] = [0];

        let slave_array = new Array()
        let [result4] = [0]
        let [result5] = [0];
        let [resultW] = [""]


        for(let i = 0; i < x; i++){
        const value = "Science and Technology";
        const [random_row] = await db.execute("SELECT * FROM blockchain WHERE Post_category = ? ORDER BY RAND() LIMIT 1",[value])
        let first_name = random_row[0].First_name_of_poster;
        let last_name = random_row[0].Last_name_of_poster;
        let full_name = last_name+" "+ first_name;
        console.log(first_name,last_name);
        //for phase2
        [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

        // const client0 = new ftp()

        // client0.connect({
        //   host: "209.159.156.150",
        //   user:"kreativesv_kreativestackvault.com",
        //   password:"Olabode2112Ob@"

        // })

        // client0.on("error",(err)=>{
        //   console.log(err)
        // })


        //   for(let j = 0; j < result2.length;j++){
        //          client0.on("ready",()=>{
        //   client0.size(result2[j].Comment_content,(err,size)=>{
        //       if(err){
        //           console.log("")

        //       }else{
        //           client0.get(result2[j].Comment_content,(err,stream)=>{
        //       if(err){
        //           console.log(err)
        //       }else{
        //           const chunks = [];
        //           stream.on("data",(chunk)=>
        //           {
        //               chunks.push(chunk)
        //           })


        //           stream.on("end",()=>{
        //               const imageData = Buffer.concat(chunks)
        //               const  imageBase64 = imageData.toString("base64")
        //               comment_pictures_for_completed_projects.push(imageBase64)
        //               supreme_array_for_completed_projects.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))

        //           })
        //       }
        //   })

        //               }
        //           })
        //       })    
        //   }


        [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
        [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);

        master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
        beta_array.push(result2)
        omega_array.push(result3);
        slave_array.push(result4);
        }
        let full_namex = req.session.Full_name;

        //for phase three

        let client = new ftp();
        let id = result5[0].id;
        let string_id = String(id)

        client.connect({
        host: "209.159.156.150",
        user:"kreativesv_kreativestackvault.com",
        password:"Olabode2112Ob@"

        })


        client.on("ready",()=>{
        client.get(string_id,(err,stream)=>{
        if(err){
        console.log(err)
        }else{
        const chunks = [];
        stream.on("data",(chunk)=>
        {
        chunks.push(chunk)
        })


        stream.on("end",()=>{
        const imageData = Buffer.concat(chunks)
        const  imageBase64 = imageData.toString("base64")
        profile_pictures_for_completed_projects.push(imageBase64)

        })
        }
        })

        })

        client.on("error",(err)=>{
        console.log(err)
        })

        req.session.profile_pictures = profile_pictures_for_completed_projects;


        res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_completed_projects,supreme_array:supreme_array_for_completed_projects,comment_pictures:comment_pictures_for_completed_projects});
        } 
        catch (err) {
        console.log(err)
        }
        }
        Science_and_Technology();
        })

        app.post("/Gaming",(req,res)=>{

        async function Gaming() {


        try {
        const db = await mySQL.createConnection({
        host:"209.159.156.150",
        user:"kreativesv_kreativesv",
        password:"SZdLvKiZF@",
        database:"kreativesv_users_database"
        })

        let master_array = new Array();
        let beta_array = new Array();
        let omega_array = new Array()
        const value2 = "Gaming";
        [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain WHERE Post_category = ?",[value2])
        const x = result1[0].total_amount_of_rows;
        let [result2] = [0];
        let [result3] = [0];

        let slave_array = new Array()
        let [result4] = [0]
        let [result5] = [0];
        let [resultW] = [""]


        for(let i = 0; i < x; i++){
        const value = "Gaming";
        const [random_row] = await db.execute("SELECT * FROM blockchain WHERE Post_category = ? ORDER BY RAND() LIMIT 1",[value])
        let first_name = random_row[0].First_name_of_poster;
        let last_name = random_row[0].Last_name_of_poster;
        let full_name = last_name+" "+ first_name;
        console.log(first_name,last_name);
        //for phase2
        [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

        // const client0 = new ftp()

        // client0.connect({
        //   host: "209.159.156.150",
        //   user:"kreativesv_kreativestackvault.com",
        //   password:"Olabode2112Ob@"

        // })

        // client0.on("error",(err)=>{
        //   console.log(err)
        // })


        //   for(let j = 0; j < result2.length;j++){
        //          client0.on("ready",()=>{
        //   client0.size(result2[j].Comment_content,(err,size)=>{
        //       if(err){
        //           console.log("")

        //       }else{
        //           client0.get(result2[j].Comment_content,(err,stream)=>{
        //       if(err){
        //           console.log(err)
        //       }else{
        //           const chunks = [];
        //           stream.on("data",(chunk)=>
        //           {
        //               chunks.push(chunk)
        //           })


        //           stream.on("end",()=>{
        //               const imageData = Buffer.concat(chunks)
        //               const  imageBase64 = imageData.toString("base64")
        //               comment_pictures_for_completed_projects.push(imageBase64)
        //               supreme_array_for_completed_projects.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))

        //           })
        //       }
        //   })

        //               }
        //           })
        //       })    
        //   }


        [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
        [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);

        master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
        beta_array.push(result2)
        omega_array.push(result3);
        slave_array.push(result4);
        }
        let full_namex = req.session.Full_name;

        //for phase three

        let client = new ftp();
        let id = result5[0].id;
        let string_id = String(id)

        client.connect({
        host: "209.159.156.150",
        user:"kreativesv_kreativestackvault.com",
        password:"Olabode2112Ob@"

        })


        client.on("ready",()=>{
        client.get(string_id,(err,stream)=>{
        if(err){
        console.log(err)
        }else{
        const chunks = [];
        stream.on("data",(chunk)=>
        {
        chunks.push(chunk)
        })


        stream.on("end",()=>{
        const imageData = Buffer.concat(chunks)
        const  imageBase64 = imageData.toString("base64")
        profile_pictures_for_completed_projects.push(imageBase64)

        })
        }
        })

        })

        client.on("error",(err)=>{
        console.log(err)
        })

        req.session.profile_pictures = profile_pictures_for_completed_projects;


        res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_completed_projects,supreme_array:supreme_array_for_completed_projects,comment_pictures:comment_pictures_for_completed_projects});
        } 
        catch (err) {
        console.log(err)
        }
        }
        Gaming();
        })


        app.post("/Marketing_and_Advertising",(req,res)=>{

        async function Marketing_and_Advertising() {


        try {
        const db = await mySQL.createConnection({
        host:"209.159.156.150",
        user:"kreativesv_kreativesv",
        password:"SZdLvKiZF@",
        database:"kreativesv_users_database"
        })

        let master_array = new Array();
        let beta_array = new Array();
        let omega_array = new Array()
        const value2 = "Marketing and Advertising";
        [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain WHERE Post_category = ?",[value2])
        const x = result1[0].total_amount_of_rows;
        let [result2] = [0];
        let [result3] = [0];

        let slave_array = new Array()
        let [result4] = [0]
        let [result5] = [0];
        let [resultW] = [""]


        for(let i = 0; i < x; i++){
        const value = "Marketing and Advertising";
        const [random_row] = await db.execute("SELECT * FROM blockchain WHERE Post_category = ? ORDER BY RAND() LIMIT 1",[value])
        let first_name = random_row[0].First_name_of_poster;
        let last_name = random_row[0].Last_name_of_poster;
        let full_name = last_name+" "+ first_name;
        console.log(first_name,last_name);
        //for phase2
        [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

        // const client0 = new ftp()

        // client0.connect({
        //   host: "209.159.156.150",
        //   user:"kreativesv_kreativestackvault.com",
        //   password:"Olabode2112Ob@"

        // })

        // client0.on("error",(err)=>{
        //   console.log(err)
        // })


        //   for(let j = 0; j < result2.length;j++){
        //          client0.on("ready",()=>{
        //   client0.size(result2[j].Comment_content,(err,size)=>{
        //       if(err){
        //           console.log("")

        //       }else{
        //           client0.get(result2[j].Comment_content,(err,stream)=>{
        //       if(err){
        //           console.log(err)
        //       }else{
        //           const chunks = [];
        //           stream.on("data",(chunk)=>
        //           {
        //               chunks.push(chunk)
        //           })


        //           stream.on("end",()=>{
        //               const imageData = Buffer.concat(chunks)
        //               const  imageBase64 = imageData.toString("base64")
        //               comment_pictures_for_completed_projects.push(imageBase64)
        //               supreme_array_for_completed_projects.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))

        //           })
        //       }
        //   })

        //               }
        //           })
        //       })    
        //   }


        [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
        [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);

        master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
        beta_array.push(result2)
        omega_array.push(result3);
        slave_array.push(result4);
        }
        let full_namex = req.session.Full_name;

        //for phase three

        let client = new ftp();
        let id = result5[0].id;
        let string_id = String(id)

        client.connect({
        host: "209.159.156.150",
        user:"kreativesv_kreativestackvault.com",
        password:"Olabode2112Ob@"

        })


        client.on("ready",()=>{
        client.get(string_id,(err,stream)=>{
        if(err){
        console.log(err)
        }else{
        const chunks = [];
        stream.on("data",(chunk)=>
        {
        chunks.push(chunk)
        })


        stream.on("end",()=>{
        const imageData = Buffer.concat(chunks)
        const  imageBase64 = imageData.toString("base64")
        profile_pictures_for_completed_projects.push(imageBase64)

        })
        }
        })

        })

        client.on("error",(err)=>{
        console.log(err)
        })

        req.session.profile_pictures = profile_pictures_for_completed_projects;


        res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_completed_projects,supreme_array:supreme_array_for_completed_projects,comment_pictures:comment_pictures_for_completed_projects});
        } 
        catch (err) {
        console.log(err)
        }
        }
        Marketing_and_Advertising();
        })

        app.post("/Music",(req,res)=>{

        async function Music() {


        try {
        const db = await mySQL.createConnection({
        host:"209.159.156.150",
        user:"kreativesv_kreativesv",
        password:"SZdLvKiZF@",
        database:"kreativesv_users_database"
        })

        let master_array = new Array();
        let beta_array = new Array();
        let omega_array = new Array()
        const value2 = "Music";
        [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain WHERE Post_category = ?",[value2])
        const x = result1[0].total_amount_of_rows;
        let [result2] = [0];
        let [result3] = [0];

        let slave_array = new Array()
        let [result4] = [0]
        let [result5] = [0];
        let [resultW] = [""]


        for(let i = 0; i < x; i++){
        const value = "Music";
        const [random_row] = await db.execute("SELECT * FROM blockchain WHERE Post_category = ? ORDER BY RAND() LIMIT 1",[value])
        let first_name = random_row[0].First_name_of_poster;
        let last_name = random_row[0].Last_name_of_poster;
        let full_name = last_name+" "+ first_name;
        console.log(first_name,last_name);
        //for phase2
        [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

        // const client0 = new ftp()

        // client0.connect({
        //   host: "209.159.156.150",
        //   user:"kreativesv_kreativestackvault.com",
        //   password:"Olabode2112Ob@"

        // })

        // client0.on("error",(err)=>{
        //   console.log(err)
        // })


        //   for(let j = 0; j < result2.length;j++){
        //          client0.on("ready",()=>{
        //   client0.size(result2[j].Comment_content,(err,size)=>{
        //       if(err){
        //           console.log("")

        //       }else{
        //           client0.get(result2[j].Comment_content,(err,stream)=>{
        //       if(err){
        //           console.log(err)
        //       }else{
        //           const chunks = [];
        //           stream.on("data",(chunk)=>
        //           {
        //               chunks.push(chunk)
        //           })


        //           stream.on("end",()=>{
        //               const imageData = Buffer.concat(chunks)
        //               const  imageBase64 = imageData.toString("base64")
        //               comment_pictures_for_completed_projects.push(imageBase64)
        //               supreme_array_for_completed_projects.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))

        //           })
        //       }
        //   })

        //               }
        //           })
        //       })    
        //   }


        [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
        [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);

        master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
        beta_array.push(result2)
        omega_array.push(result3);
        slave_array.push(result4);
        }
        let full_namex = req.session.Full_name;

        //for phase three

        let client = new ftp();
        let id = result5[0].id;
        let string_id = String(id)

        client.connect({
        host: "209.159.156.150",
        user:"kreativesv_kreativestackvault.com",
        password:"Olabode2112Ob@"

        })


        client.on("ready",()=>{
        client.get(string_id,(err,stream)=>{
        if(err){
        console.log(err)
        }else{
        const chunks = [];
        stream.on("data",(chunk)=>
        {
        chunks.push(chunk)
        })


        stream.on("end",()=>{
        const imageData = Buffer.concat(chunks)
        const  imageBase64 = imageData.toString("base64")
        profile_pictures_for_completed_projects.push(imageBase64)

        })
        }
        })

        })

        client.on("error",(err)=>{
        console.log(err)
        })

        req.session.profile_pictures = profile_pictures_for_completed_projects;


        res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_completed_projects,supreme_array:supreme_array_for_completed_projects,comment_pictures:comment_pictures_for_completed_projects});
        } 
        catch (err) {
        console.log(err)
        }
        }
        Music();
        })

        app.post("/Finance",(req,res)=>{

        async function Finance() {


        try {
        const db = await mySQL.createConnection({
        host:"209.159.156.150",
        user:"kreativesv_kreativesv",
        password:"SZdLvKiZF@",
        database:"kreativesv_users_database"
        })

        let master_array = new Array();
        let beta_array = new Array();
        let omega_array = new Array()
        const value2 = "Finance";
        [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain WHERE Post_category = ?",[value2])
        const x = result1[0].total_amount_of_rows;
        let [result2] = [0];
        let [result3] = [0];

        let slave_array = new Array()
        let [result4] = [0]
        let [result5] = [0];
        let [resultW] = [""]


        for(let i = 0; i < x; i++){
        const value = "Finance";
        const [random_row] = await db.execute("SELECT * FROM blockchain WHERE Post_category = ? ORDER BY RAND() LIMIT 1",[value])
        let first_name = random_row[0].First_name_of_poster;
        let last_name = random_row[0].Last_name_of_poster;
        let full_name = last_name+" "+ first_name;
        console.log(first_name,last_name);
        //for phase2
        [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

        // const client0 = new ftp()

        // client0.connect({
        //   host: "209.159.156.150",
        //   user:"kreativesv_kreativestackvault.com",
        //   password:"Olabode2112Ob@"

        // })

        // client0.on("error",(err)=>{
        //   console.log(err)
        // })


        //   for(let j = 0; j < result2.length;j++){
        //          client0.on("ready",()=>{
        //   client0.size(result2[j].Comment_content,(err,size)=>{
        //       if(err){
        //           console.log("")

        //       }else{
        //           client0.get(result2[j].Comment_content,(err,stream)=>{
        //       if(err){
        //           console.log(err)
        //       }else{
        //           const chunks = [];
        //           stream.on("data",(chunk)=>
        //           {
        //               chunks.push(chunk)
        //           })


        //           stream.on("end",()=>{
        //               const imageData = Buffer.concat(chunks)
        //               const  imageBase64 = imageData.toString("base64")
        //               comment_pictures_for_completed_projects.push(imageBase64)
        //               supreme_array_for_completed_projects.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))

        //           })
        //       }
        //   })

        //               }
        //           })
        //       })    
        //   }


        [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
        [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);

        master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
        beta_array.push(result2)
        omega_array.push(result3);
        slave_array.push(result4);
        }
        let full_namex = req.session.Full_name;

        //for phase three

        let client = new ftp();
        let id = result5[0].id;
        let string_id = String(id)

        client.connect({
        host: "209.159.156.150",
        user:"kreativesv_kreativestackvault.com",
        password:"Olabode2112Ob@"

        })


        client.on("ready",()=>{
        client.get(string_id,(err,stream)=>{
        if(err){
        console.log(err)
        }else{
        const chunks = [];
        stream.on("data",(chunk)=>
        {
        chunks.push(chunk)
        })


        stream.on("end",()=>{
        const imageData = Buffer.concat(chunks)
        const  imageBase64 = imageData.toString("base64")
        profile_pictures_for_completed_projects.push(imageBase64)

        })
        }
        })

        })

        client.on("error",(err)=>{
        console.log(err)
        })

        req.session.profile_pictures = profile_pictures_for_completed_projects;


        res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_completed_projects,supreme_array:supreme_array_for_completed_projects,comment_pictures:comment_pictures_for_completed_projects});
        } 
        catch (err) {
        console.log(err)
        }
        }
        Finance();
        })

        app.post("/Entertaiment",(req,res)=>{

        async function Entertaiment() {


        try {
        const db = await mySQL.createConnection({
        host:"209.159.156.150",
        user:"kreativesv_kreativesv",
        password:"SZdLvKiZF@",
        database:"kreativesv_users_database"
        })

        let master_array = new Array();
        let beta_array = new Array();
        let omega_array = new Array()
        const value2 = "Entertaiment";
        [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain WHERE Post_category = ?",[value2])
        const x = result1[0].total_amount_of_rows;
        let [result2] = [0];
        let [result3] = [0];

        let slave_array = new Array()
        let [result4] = [0]
        let [result5] = [0];
        let [resultW] = [""]


        for(let i = 0; i < x; i++){
        const value = "Entertaiment";
        const [random_row] = await db.execute("SELECT * FROM blockchain WHERE Post_category = ? ORDER BY RAND() LIMIT 1",[value])
        let first_name = random_row[0].First_name_of_poster;
        let last_name = random_row[0].Last_name_of_poster;
        let full_name = last_name+" "+ first_name;
        console.log(first_name,last_name);
        //for phase2
        [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

        // const client0 = new ftp()

        // client0.connect({
        //   host: "209.159.156.150",
        //   user:"kreativesv_kreativestackvault.com",
        //   password:"Olabode2112Ob@"

        // })

        // client0.on("error",(err)=>{
        //   console.log(err)
        // })


        //   for(let j = 0; j < result2.length;j++){
        //          client0.on("ready",()=>{
        //   client0.size(result2[j].Comment_content,(err,size)=>{
        //       if(err){
        //           console.log("")

        //       }else{
        //           client0.get(result2[j].Comment_content,(err,stream)=>{
        //       if(err){
        //           console.log(err)
        //       }else{
        //           const chunks = [];
        //           stream.on("data",(chunk)=>
        //           {
        //               chunks.push(chunk)
        //           })


        //           stream.on("end",()=>{
        //               const imageData = Buffer.concat(chunks)
        //               const  imageBase64 = imageData.toString("base64")
        //               comment_pictures_for_completed_projects.push(imageBase64)
        //               supreme_array_for_completed_projects.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))

        //           })
        //       }
        //   })

        //               }
        //           })
        //       })    
        //   }


        [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
        [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);

        master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
        beta_array.push(result2)
        omega_array.push(result3);
        slave_array.push(result4);
        }
        let full_namex = req.session.Full_name;

        //for phase three

        let client = new ftp();
        let id = result5[0].id;
        let string_id = String(id)

        client.connect({
        host: "209.159.156.150",
        user:"kreativesv_kreativestackvault.com",
        password:"Olabode2112Ob@"

        })


        client.on("ready",()=>{
        client.get(string_id,(err,stream)=>{
        if(err){
        console.log(err)
        }else{
        const chunks = [];
        stream.on("data",(chunk)=>
        {
        chunks.push(chunk)
        })


        stream.on("end",()=>{
        const imageData = Buffer.concat(chunks)
        const  imageBase64 = imageData.toString("base64")
        profile_pictures_for_completed_projects.push(imageBase64)

        })
        }
        })

        })

        client.on("error",(err)=>{
        console.log(err)
        })

        req.session.profile_pictures = profile_pictures_for_completed_projects;


        res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_completed_projects,supreme_array:supreme_array_for_completed_projects,comment_pictures:comment_pictures_for_completed_projects});
        } 
        catch (err) {
        console.log(err)
        }
        }
        Entertaiment();
        })

        app.post("/Spirituality_and_Religion",(req,res)=>{

        async function Spirituality_and_Religion() {


        try {
        const db = await mySQL.createConnection({
        host:"209.159.156.150",
        user:"kreativesv_kreativesv",
        password:"SZdLvKiZF@",
        database:"kreativesv_users_database"
        })

        let master_array = new Array();
        let beta_array = new Array();
        let omega_array = new Array()
        const value2 = "Spirituality and Religion";
        [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain WHERE Post_category = ?",[value2])
        const x = result1[0].total_amount_of_rows;
        let [result2] = [0];
        let [result3] = [0];

        let slave_array = new Array()
        let [result4] = [0]
        let [result5] = [0];
        let [resultW] = [""]


        for(let i = 0; i < x; i++){
        const value = "Spirituality and Religion";
        const [random_row] = await db.execute("SELECT * FROM blockchain WHERE Post_category = ? ORDER BY RAND() LIMIT 1",[value])
        let first_name = random_row[0].First_name_of_poster;
        let last_name = random_row[0].Last_name_of_poster;
        let full_name = last_name+" "+ first_name;
        console.log(first_name,last_name);
        //for phase2
        [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

        // const client0 = new ftp()

        // client0.connect({
        //   host: "209.159.156.150",
        //   user:"kreativesv_kreativestackvault.com",
        //   password:"Olabode2112Ob@"

        // })

        // client0.on("error",(err)=>{
        //   console.log(err)
        // })


        //   for(let j = 0; j < result2.length;j++){
        //          client0.on("ready",()=>{
        //   client0.size(result2[j].Comment_content,(err,size)=>{
        //       if(err){
        //           console.log("")

        //       }else{
        //           client0.get(result2[j].Comment_content,(err,stream)=>{
        //       if(err){
        //           console.log(err)
        //       }else{
        //           const chunks = [];
        //           stream.on("data",(chunk)=>
        //           {
        //               chunks.push(chunk)
        //           })


        //           stream.on("end",()=>{
        //               const imageData = Buffer.concat(chunks)
        //               const  imageBase64 = imageData.toString("base64")
        //               comment_pictures_for_completed_projects.push(imageBase64)
        //               supreme_array_for_completed_projects.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))

        //           })
        //       }
        //   })

        //               }
        //           })
        //       })    
        //   }


        [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
        [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);

        master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
        beta_array.push(result2)
        omega_array.push(result3);
        slave_array.push(result4);
        }
        let full_namex = req.session.Full_name;

        //for phase three

        let client = new ftp();
        let id = result5[0].id;
        let string_id = String(id)

        client.connect({
        host: "209.159.156.150",
        user:"kreativesv_kreativestackvault.com",
        password:"Olabode2112Ob@"

        })


        client.on("ready",()=>{
        client.get(string_id,(err,stream)=>{
        if(err){
        console.log(err)
        }else{
        const chunks = [];
        stream.on("data",(chunk)=>
        {
        chunks.push(chunk)
        })


        stream.on("end",()=>{
        const imageData = Buffer.concat(chunks)
        const  imageBase64 = imageData.toString("base64")
        profile_pictures_for_completed_projects.push(imageBase64)

        })
        }
        })

        })

        client.on("error",(err)=>{
        console.log(err)
        })

        req.session.profile_pictures = profile_pictures_for_completed_projects;


        res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_completed_projects,supreme_array:supreme_array_for_completed_projects,comment_pictures:comment_pictures_for_completed_projects});
        } 
        catch (err) {
        console.log(err)
        }
        }
        Spirituality_and_Religion();
        })


        app.post("/Parenting_and_Family",(req,res)=>{

        async function Parenting_and_Family() {


        try {
        const db = await mySQL.createConnection({
        host:"209.159.156.150",
        user:"kreativesv_kreativesv",
        password:"SZdLvKiZF@",
        database:"kreativesv_users_database"
        })

        let master_array = new Array();
        let beta_array = new Array();
        let omega_array = new Array()
        const value2 = "Parenting and Family";
        [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain WHERE Post_category = ?",[value2])
        const x = result1[0].total_amount_of_rows;
        let [result2] = [0];
        let [result3] = [0];

        let slave_array = new Array()
        let [result4] = [0]
        let [result5] = [0];
        let [resultW] = [""]


        for(let i = 0; i < x; i++){
        const value = "Parenting and Family";
        const [random_row] = await db.execute("SELECT * FROM blockchain WHERE Post_category = ? ORDER BY RAND() LIMIT 1",[value])
        let first_name = random_row[0].First_name_of_poster;
        let last_name = random_row[0].Last_name_of_poster;
        let full_name = last_name+" "+ first_name;
        console.log(first_name,last_name);
        //for phase2
        [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

        // const client0 = new ftp()

        // client0.connect({
        //   host: "209.159.156.150",
        //   user:"kreativesv_kreativestackvault.com",
        //   password:"Olabode2112Ob@"

        // })

        // client0.on("error",(err)=>{
        //   console.log(err)
        // })


        //   for(let j = 0; j < result2.length;j++){
        //          client0.on("ready",()=>{
        //   client0.size(result2[j].Comment_content,(err,size)=>{
        //       if(err){
        //           console.log("")

        //       }else{
        //           client0.get(result2[j].Comment_content,(err,stream)=>{
        //       if(err){
        //           console.log(err)
        //       }else{
        //           const chunks = [];
        //           stream.on("data",(chunk)=>
        //           {
        //               chunks.push(chunk)
        //           })


        //           stream.on("end",()=>{
        //               const imageData = Buffer.concat(chunks)
        //               const  imageBase64 = imageData.toString("base64")
        //               comment_pictures_for_completed_projects.push(imageBase64)
        //               supreme_array_for_completed_projects.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))

        //           })
        //       }
        //   })

        //               }
        //           })
        //       })    
        //   }


        [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
        [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);

        master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
        beta_array.push(result2)
        omega_array.push(result3);
        slave_array.push(result4);
        }
        let full_namex = req.session.Full_name;

        //for phase three

        let client = new ftp();
        let id = result5[0].id;
        let string_id = String(id)

        client.connect({
        host: "209.159.156.150",
        user:"kreativesv_kreativestackvault.com",
        password:"Olabode2112Ob@"

        })


        client.on("ready",()=>{
        client.get(string_id,(err,stream)=>{
        if(err){
        console.log(err)
        }else{
        const chunks = [];
        stream.on("data",(chunk)=>
        {
        chunks.push(chunk)
        })


        stream.on("end",()=>{
        const imageData = Buffer.concat(chunks)
        const  imageBase64 = imageData.toString("base64")
        profile_pictures_for_completed_projects.push(imageBase64)

        })
        }
        })

        })

        client.on("error",(err)=>{
        console.log(err)
        })

        req.session.profile_pictures = profile_pictures_for_completed_projects;


        res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_completed_projects,supreme_array:supreme_array_for_completed_projects,comment_pictures:comment_pictures_for_completed_projects});
        } 
        catch (err) {
        console.log(err)
        }
        }
        Parenting_and_Family();
        })

        app.post("/Pet_care_and_Animals",(req,res)=>{

        async function Pet_care_and_Animals() {


        try {
        const db = await mySQL.createConnection({
        host:"209.159.156.150",
        user:"kreativesv_kreativesv",
        password:"SZdLvKiZF@",
        database:"kreativesv_users_database"
        })

        let master_array = new Array();
        let beta_array = new Array();
        let omega_array = new Array()
        const value2 = "Pet care and Animals";
        [result1] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM blockchain WHERE Post_category = ?",[value2])
        const x = result1[0].total_amount_of_rows;
        let [result2] = [0];
        let [result3] = [0];

        let slave_array = new Array()
        let [result4] = [0]
        let [result5] = [0];
        let [resultW] = [""]


        for(let i = 0; i < x; i++){
        const value = "Pet care and Animals";
        const [random_row] = await db.execute("SELECT * FROM blockchain WHERE Post_category = ? ORDER BY RAND() LIMIT 1",[value])
        let first_name = random_row[0].First_name_of_poster;
        let last_name = random_row[0].Last_name_of_poster;
        let full_name = last_name+" "+ first_name;
        console.log(first_name,last_name);
        //for phase2
        [result2] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [resultW] = await db.execute("select * from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);

        // const client0 = new ftp()

        // client0.connect({
        //   host: "209.159.156.150",
        //   user:"kreativesv_kreativestackvault.com",
        //   password:"Olabode2112Ob@"

        // })

        // client0.on("error",(err)=>{
        //   console.log(err)
        // })


        //   for(let j = 0; j < result2.length;j++){
        //          client0.on("ready",()=>{
        //   client0.size(result2[j].Comment_content,(err,size)=>{
        //       if(err){
        //           console.log("")

        //       }else{
        //           client0.get(result2[j].Comment_content,(err,stream)=>{
        //       if(err){
        //           console.log(err)
        //       }else{
        //           const chunks = [];
        //           stream.on("data",(chunk)=>
        //           {
        //               chunks.push(chunk)
        //           })


        //           stream.on("end",()=>{
        //               const imageData = Buffer.concat(chunks)
        //               const  imageBase64 = imageData.toString("base64")
        //               comment_pictures_for_completed_projects.push(imageBase64)
        //               supreme_array_for_completed_projects.push(new Array(resultW[0].Commenter_full_name,result2[j].Comment_content))

        //           })
        //       }
        //   })

        //               }
        //           })
        //       })    
        //   }


        [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
        [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
        [result5] = await db.execute("select * from users_table where First_name = ? AND Last_name = ?",[first_name,last_name]);

        master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
        beta_array.push(result2)
        omega_array.push(result3);
        slave_array.push(result4);
        }
        let full_namex = req.session.Full_name;

        //for phase three

        let client = new ftp();
        let id = result5[0].id;
        let string_id = String(id)

        client.connect({
        host: "209.159.156.150",
        user:"kreativesv_kreativestackvault.com",
        password:"Olabode2112Ob@"

        })


        client.on("ready",()=>{
        client.get(string_id,(err,stream)=>{
        if(err){
        console.log(err)
        }else{
        const chunks = [];
        stream.on("data",(chunk)=>
        {
        chunks.push(chunk)
        })


        stream.on("end",()=>{
        const imageData = Buffer.concat(chunks)
        const  imageBase64 = imageData.toString("base64")
        profile_pictures_for_completed_projects.push(imageBase64)

        })
        }
        })

        })

        client.on("error",(err)=>{
        console.log(err)
        })

        req.session.profile_pictures = profile_pictures_for_completed_projects;


        res.render("feed",{master_array,data:beta_array,full_namex,omega_array,slave_array,profile_pictures:profile_pictures_for_completed_projects,supreme_array:supreme_array_for_completed_projects,comment_pictures:comment_pictures_for_completed_projects});
        } 
        catch (err) {
        console.log(err)
        }
        }
        Pet_care_and_Animals();
        })



    app.post("/upload_comment",(req,res)=>{

    async function save_comment_to_blockchain2() {
    try {
    const db = await mySQL.createConnection({
        host:"209.159.156.150",
        user:"kreativesv_kreativesv",
        password:"SZdLvKiZF@",
        database:"kreativesv_users_database"
    })

    let poster_name = req.body.poster_name;
    let comment = req.body.comment_content;
    let post_content = req.body.post_content;
    let commenter_full_name = req.body.commenter_full_name;

    const result = await db.execute("INSERT INTO blockchain2(Full_name_of_post_uploader,Post_content,Comment_content,Commenter_full_name) VALUES(?,?,?,?)",[poster_name,post_content,comment,commenter_full_name])

    } catch (err) {
    console.log(err)
    }
    }
    save_comment_to_blockchain2();
    })

    app.post("/profile",(req,res)=>{
    async function profile() {
    try {
    const db = await mySQL.createConnection({
        host:"209.159.156.150",
        user:"kreativesv_kreativesv",
        password:"SZdLvKiZF@",
        database:"kreativesv_users_database"
    })
    let master_array = new Array()
    let beta_array = new Array()
    let omega_array = new Array()
    let offset = parseInt(0);
    let Full_name_of_poster = req.body.poster_full_name;
    let split_full_name_of_poster = Full_name_of_poster.split(" ")
    let first_name = split_full_name_of_poster[1]
    let last_name = split_full_name_of_poster[0]
    let [result3] = [0];

    let [result4] = [0];
    let slave_array = new Array()

    let [result2] = await db.execute("SELECT COUNT(*) AS total_amount_of_rows FROM (SELECT * FROM blockchain WHERE First_name_of_poster = ? AND Last_name_of_poster = ?)AS X",[first_name,last_name])
    const x = result2[0].total_amount_of_rows;

    for(let i = 0; i < x; i++){
    const [random_row] = await db.execute("SELECT * FROM (SELECT * FROM blockchain WHERE First_name_of_poster =? AND Last_name_of_poster = ?) t ORDER BY id  LIMIT 1 OFFSET "+offset,[first_name,last_name]);
    let full_name = last_name+" "+ first_name;
    offset +=1;
    //for phase2
    let [result] = await db.execute("select (Comment_content) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
    [result3] = await db.execute("select (Commenter_full_name) from blockchain2 where Full_name_of_post_uploader = ? and Post_content = ?",[full_name,random_row[0].Text_based_post]);
    [result4] = await db.execute("select (Amount_of_love) from blockchain where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,random_row[0].Text_based_post]);
    master_array.push(new Array(full_name,random_row[0].Date_of_post_upload,random_row[0].Text_based_post))
    beta_array.push(result)
    omega_array.push(result3);
    slave_array.push(result4)
    }
    let full_namex = req.session.Full_name;
    res.render("profile",{master_array,data:beta_array,Full_name_of_poster,post_amount:master_array.length,full_namex,omega_array,slave_array});
       
} catch (err) {
        console.log(err)
    }
    }
    profile();

    })

app.post("/love_post",(req,res)=>{
    async function love_post() {
    try {
        const db = await mySQL.createConnection({
            host:"209.159.156.150",
            user:"kreativesv_kreativesv",
            password:"SZdLvKiZF@",
            database:"kreativesv_users_database"
        })

        let post_content = req.body.post_content;

            let Full_name_of_poster = req.body.poster_name;
            let split_full_name_of_poster = Full_name_of_poster.split(" ")
            let first_name = split_full_name_of_poster[1]
            let last_name = split_full_name_of_poster[0]

        let [result] = await db.execute("update blockchain SET Amount_of_love = Amount_of_love + 1 where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,post_content])

    }catch(err){
        console.log(err)
    }
        
    }

    love_post();
})

app.post("/unlove_post",(req,res)=>{
async function unlove_post() {
try {
    const db = await mySQL.createConnection({
        host:"209.159.156.150",
        user:"kreativesv_kreativesv",
        password:"SZdLvKiZF@",
        database:"kreativesv_users_database"
    })

    let post_content = req.body.post_content;

        let Full_name_of_poster = req.body.poster_name;
        let split_full_name_of_poster = Full_name_of_poster.split(" ")
        let first_name = split_full_name_of_poster[1]
        let last_name = split_full_name_of_poster[0]

    let [result] = await db.execute("update blockchain SET Amount_of_love = Amount_of_love - 1 where First_name_of_poster = ? and Last_name_of_poster = ? and Text_based_post = ?",[first_name,last_name,post_content])

}catch(err){
    console.log(err)
}

}

    unlove_post();
})

app.post("/upload_comment_with_image",upload.single("image"),(req,res)=>{
   
    async function save_comment_image() {
        try {
        const db = await mySQL.createConnection({
            host:"209.159.156.150",
            user:"kreativesv_kreativesv",
            password:"SZdLvKiZF@",
            database:"kreativesv_users_database"
        })
        const comment_image = req.file.path;
        let poster_name = req.body.poster_name;
        comment = req.body.comment_content;
        let post_content = req.body.post_content;
        let commenter_full_name = req.body.commenter_full_name;
      
        const result = await db.execute("INSERT INTO blockchain2(Full_name_of_post_uploader,Post_content,Comment_content,Commenter_full_name) VALUES(?,?,?,?)",[poster_name,post_content,comment,commenter_full_name])
    
        } catch (err) {
        console.log(err)
        }
        }
        save_comment_image();


        const client = new ftp()

        client.connect({
            host: "209.159.156.150",
            user:"kreativesv_kreativestackvault.com",
            password:"Olabode2112Ob@"
           
        })
    
    
        client.on("ready",()=>{
            client.put(req.file.path,comment,(err)=>{
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
    
        
        })

  



app.listen(3000)