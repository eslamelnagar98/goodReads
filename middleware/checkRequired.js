module.exports = (params) => (req,res,next) => { 
    
    const receivedParams = Object.keys(req.body); 
    const missingParams =  params.filter(param => !receivedParams.includes(param) );

    if(missingParams.length){
        res.send(missingParams.reduce((agg,param) =>{
            agg[param]={ type:"required"}
            return agg;
        },{} ));

    }        
    else
        next();
} 

