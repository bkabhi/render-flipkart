
// const errorhandler = (req,res,next)=>{
//     try {
//         next()
//     } catch (error) {
//         console.log(error)
//     }
// }

const errorHandler = (err, req, res,next) => {
    if(req.headersSent) {
        return next(err);
    }
    res.status(500).send({
        error: err
    });
  }

export { errorHandler }