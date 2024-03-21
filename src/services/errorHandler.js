export const errorHandler =(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(err =>{
            return res.json({message:"error", error:err.stack});
        })
    }
}