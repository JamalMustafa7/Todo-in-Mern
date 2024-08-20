const express=require('express')
const mongoose=require('mongoose')
const User=require('./models/userModel')
const Todo=require('./models/todoModel')
const bcrypt=require("bcrypt");
const cors=require('cors')
const port=process.env.PORT || 4000
const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://jamal:123@cluster0.uvdji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    function ()
    {
        console.log("Connected to database")
        app.listen(port,()=>
            {
                console.log("Server is listening")
            })
    }
).catch(err=>
{
    console.log("error occured")
    console.log(err)
}
)
app.post("/signup",async (req,res)=>
{
    const hash=await bcrypt.hash(req.body.password,10)
    const u=new User({name:req.body.name,email:req.body.email,password:hash})
    try{
        await u.save()
        res.status(200).send(u._id)
    }
    catch(err)
    {
        res.status(400).send(err)        
    }
})
app.post("/login",async (req,res)=>
{
    const {email,password}=req.body
    try{
        const user=await User.findOne({email})
        if(user)
        {
            match=await bcrypt.compare(password,user.password)
            if(match)
            {
                res.status(200).send(user)
            }
            else{
                res.status(400).send("Incorrect Password")
            }
        }
        else{
            res.status(400).send("Incorrect Email")
        }
    }
    catch(err)
    {
        res.send("Error processing Login",err)
    }
})
app.get('/todos', async (req, res) => {
    try {
      // Extract userId from query parameters
      const { userId } = req.query;
  
      if (!userId) {
        return res.status(400).send('User ID is required');
      }
  
      // Fetch todos specific to the user
      const todos = await Todo.find({ userId });
      // Send the todos as a JSON response
      res.status(200).json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
app.post("/addTodo",async(req,res)=>
{
    const {name,status,expiryDate,userId}=req.body
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send('Invalid ID format');
      }
    const todo=new Todo({name,status,expiryDate,userId})
    try{
        await todo.save()
        res.status(200).send("Todo Added")
    }
    catch(err)
    {
        console.log(err)
        res.status(400).send(err)
    }
})
app.post("/todo/changeStatus",async(req,res)=>
{
    const{todoId,status}=req.body
    try{
        const todo=await Todo.findById(todoId)
        todo.status=status
        todo.save()
        console.log("changed")
        res.status(200).send("Changed")
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})
app.get('/',(req,res)=>
{
    res.status(200).send("Hello World")
})
