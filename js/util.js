function throttle(func, wait, mustRun){
  let timeout;
  let startTime = new Date();

  return function(){
    let context = this;
    let args = arguments;
    let curTime = new Date();

    clearTimeout(timeout);
    if (curTime - startTime >= mustRun) {
      func.apply(context, args);
      startTime = curTime;
    } else {
      timeout = setTimeout(func, wait);
    }
  }
}