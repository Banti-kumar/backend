const asyncHandler = (fn) => async (req, res, next) => {
  // fn is the function that we want to run
  try {
    // try to run the function
    await fn(req, res, next); // run the function
  } catch (error) {
    // if there is an error
    res.status(500).json({ success: false, message: error.message }); // send a 500 status code and the error message
  }
};

export { asyncHandler }; // export the asyncHandler function
