export default (user,statusCode,res) => {

    // crete JWT token
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly : true,
    };
    
    res.status(statusCode).cookie("token",token,options).json({
        token,
    });

}